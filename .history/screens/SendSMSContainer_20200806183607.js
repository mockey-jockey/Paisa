import React, { Component } from 'react';
import Scan from './scan';
import SmsAndroid from 'react-native-get-sms-android';
//https://github.com/mdshadman/React_Native_Send_Get_Delete_SMS/blob/master/screens/scan.js
class SendSMSContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        };
        console.log('initial');
    }

    //https://stackoverflow.com/questions/31068134/extract-parse-amount-and-description-from-biz-transaction-sms

    isYesterday = (date) => {
        const msgDate = new Date(date);
        const today = new Date();
        const yesterday = new Date(today.setDate(today.getDate()-1));
        const yearDate = msgDate.getYear();
        const monthDate = msgDate.getMonth();
        const dayDate = msgDate.getDate();
        const yearNow = yesterday.getYear();
        const monthNow = yesterday.getMonth();
        const dayNow = yesterday.getDate();
        if (yearDate === yearNow && monthDate === monthNow && dayDate === 
          dayNow) {
          return true
        }
        return false
    };

    isToday = (date) => {
        const msgDate = new Date(date);
        const now = new Date();
        const yearDate = msgDate.getYear();
        const monthDate = msgDate.getMonth();
        const dayDate = msgDate.getDate();
        const yearNow = now.getYear();
        const monthNow = now.getMonth();
        const dayNow = now.getDate();
        if (yearDate === yearNow && monthDate === monthNow && dayDate === 
          dayNow) {
          return true
        }
        return false
    }

    convertTimestampToDate = (timestamp) => {
        var monthName = {
            1: "Jan",
            2: "Feb",
            3: "Mar",
            4: "Apr",
            5: "May",
            6: "Jun",
            7: "Jul",
            8: "Aug",
            9: "Sep",
            10: "Oct",
            11: "Nov",
            12: "Dec"
        };
        var dayList = {
            0: "Sun",
            1: "Mon",
            2: "Tus",
            3: "Wed",
            4: "Thu",
            5: "Fri",
            6: "Sat"
        };
        var date = new Date(timestamp).getDate();
        var day = new Date(timestamp).getDay();
        var month = new Date(timestamp).getMonth()+1;
        var dayName;
        if(this.isToday(timestamp)){
            dayName = 'Today';
        }else if(this.isYesterday(timestamp)){
            dayName = 'Yesterday';
        }else {
            dayName = dayList[day]
        }
        return `${dayName} ${monthName[month]} ${date}`;
    }

    getAmount = (message) => {
        var regex = /(?:(?:RS|INR|MRP)\.?\s?)(\d+(:?\,\d+)?(\,\d+)?(\.\d{1,2})?)/gmi;
        var amt = regex.exec(message);
        return amt && amt.length && amt[1] || '';
    }

    getAcctAndCardNumber = (message) => {
        var acctRegex = /(?:a\/c\s|acct\s*)([0-9|*|X|a-z]*\s)/gmi;// /(?:\sa\/c\s|\sacct\s*)([0-9|*|X]{6})/gmi,
        cardRegex = /(?:\scard\s*)([0-9|*|X]{6})/gmi,obj={};
        
        var acct = acctRegex.exec(message);
        var card = cardRegex.exec(message);
        if(acct && acct.length){
            obj.accountNumber = `${acct[0]}` || '';
            obj.number = `${acct[1]}` || '';
            obj.type = 'account';
        }else if(card && card.length){
            obj.cardNumber = `${card[0]}` || '';
            obj.number = `${card[1]}` || '';
            obj.type = 'card';
        }
        return obj;
    }

    getMerchantName = (message) => {
        //var regex = /(?:\sat\s|\sin\s|\sto\s*)([A-Za-z0-9]*\s?-?\s?[A-Za-z0-9]*\s?-?\.?)/gmi;
        //var regex = /(?:\sat\s|\sin\s|\sto\s*)([A-Za-z0-9|+|@|\/]*\s?-?\s?[A-Za-z0-9|+|@|\/|-]*\s?-?\.?)/gmi;
        var atRegex = /(?:\sat\s|\sin\s)(.*\s)(on)/gmi;
        var merchantName = atRegex.exec(message);
        return (merchantName && merchantName.length && merchantName[1]) || '';
    }

    modeOfPayment = (message) => {
        var mode = '';
        var IMPS = /(?:IMPS)/gmi;
        var NEFT = /(?:NEFT)/gmi;
        var UPI = /(?:UPI)/gmi;
        var SALARY = /(?:SALARY)/gmi;
        if(IMPS.test(message)){
            mode = 'IMPS';
        }else if(NEFT.test(message)){
            mode = 'NEFT';
        }else if(UPI.test(message)){
            mode = 'UPI';
        }else if(SALARY.test(message)){
            mode = 'SALARY';
        }
        return mode;
    }

    parseMessage = (object,type) => {
        console.log('------------------------------------------->');
        console.log('-->' + object.body);
        console.log('-->' + this.convertTimestampToDate(object.date));
        console.log('-->' + this.getAmount(object.body));
        console.log('-->' + this.getMerchantName(object.body));
        console.log('-->' + this.modeOfPayment(object.body));
        console.log('-->' + JSON.stringify(this.getAcctAndCardNumber(object.body)));
        console.log('-->' + type);
        console.log('-->' + object.address);
        console.log('------------------------------------------->');
    }

    // Function to read particular message from inbox with id
    getSMS = () => {
        console.log("INBOX");
        console.log("minDate"+ new Date('01/01/2020').getTime())
        console.log("maxDate"+ new Date().getTime());
        var bankList = {
            HDFC : [],
            ICICI : [],
            SBI : []
        }
        let filter = {
            box: 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all
            // the next 4 filters should NOT be used together, they are OR-ed so pick one
            // read: 0, // 0 for unread SMS, 1 for SMS already read
            // _id: 1234, // specify the msg id
            minDate: new Date('07/01/2020').getTime(), // timestamp (in milliseconds since UNIX epoch)
            maxDate: new Date().getTime(),
            //address: 'ADHDFCBK', // sender's phone number
            bodyRegex: '(.*)(?i)(?:(?:RS|INR|MRP)\\.?\\s?)(\\d+(:?\\,\\d+)?(\\,\\d+)?(\\.\\d{1,2})?)(.*)',
            // body: 'How are you shadman', // content to match
            // // the next 2 filters can be used for pagination
            // indexFrom: 0, // start from index 0
            // maxCount: 10, // count of SMS to return each time
        };
        SmsAndroid.list(
            JSON.stringify(filter),
            (fail) => {
                console.log('Failed with this error: ' + fail);
            },
            (count, smsList) => {
                console.log('Count: ', count);
                //console.log('List: ', smsList);
                var arr = JSON.parse(smsList);

                arr.forEach((object) => {
                    //console.log('Object: ' + object);
                    
                    
                    var status = ['withdrawn','debited','spent','deposited','credited'];
                    if(object.body.indexOf('withdrawn') !== -1){
                        this.parseMessage(object,'withdrawn');
                    }else if(object.body.indexOf('debited') !== -1){
                        this.parseMessage(object,'debited');
                    }else if(object.body.indexOf('spent') !== -1){
                        this.parseMessage(object,'debited');
                    }else if(object.body.indexOf('deposited') !== -1){
                        this.parseMessage(object,'credited');
                    }else if(object.body.indexOf('credited') !== -1){
                        this.parseMessage(object,'credited');
                    }
                    
                    

                    // For finding out amount from bank transaction message.

                    // (?i)(?:(?:RS|INR|MRP)\.?\s?)(\d+(:?\,\d+)?(\,\d+)?(\.\d{1,2})?)
                    // For finding out merchant name from bank transaction message.

                    // (?i)(?:\sat\s|in\*)([A-Za-z0-9]*\s?-?\s?[A-Za-z0-9]*\s?-?\.?)
                    // For finding out card name(debit/credit card) from bank transaction message.

                    // (?i)(?:\smade on|ur|made a\s|in\*)([A-Za-z]*\s?-?\s[A-Za-z]*\s?-?\s[A-Za-z]*\s?-?)
                    // regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/ 
                    // /* for dd-mon-yyyy */
                    //  regex = [0-9]{1,2}-[a-zA-Z]{3}-[0-9]{4} 
                   // alert('your message with selected id is --->' + object.body)
                });
            },
        );
    }


    render() {
        return (
            <Scan getSMS={this.getSMS}/>
        );
    }
}

export default SendSMSContainer;