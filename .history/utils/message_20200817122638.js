import SmsAndroid from 'react-native-get-sms-android';
const isYesterday = (date) => {
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

const isToday = (date) => {
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

const convertTimestampToDate = (timestamp) => {
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
    var dayName;
    var messageDate = new Date(timestamp);
    var date = messageDate.getDate();
    var day = messageDate.getDay();
    var month = messageDate.getMonth()+1;
    var hour = messageDate.getHours();
    var minute = messageDate.getMinutes();
    var mode = (hour >= 12)? "PM" : "AM";
    hour = (hour >= 12)? hour - 12: hour;
    if (hour === 0 && mode === 'PM') 
    { 
        if (minute === 0)
        { 
            hour = 12;
            mode = 'Noon';
        }else { 
            hour = 12;
            mode = 'PM';
        } 
    } 
    if (hour === 0 && mode === 'AM') 
    { 
        if (minute === 0)
        { 
            hour = 12;
            mode ='Midnight';
        }else{ 
            hour = 12;
            mode = 'AM';
        } 
    } 
    var time = `${hour}:${minute} ${mode}`;
    
    if(isToday(timestamp)){
        dayName = `Today ${time}`;
    }else if(isYesterday(timestamp)){
        dayName = `Yesterday ${time}`;
    }else {
        dayName = `${dayList[day]} ${monthName[month]} ${date}`;
    }
    return dayName;
}

const getAmount = (message) => {
    var regex = /(?:(?:RS|INR|MRP)\.?\s?)(\d+(:?\,\d+)?(\,\d+)?(\.\d{1,2})?)/gmi;
    var amt = regex.exec(message);
    return amt && amt.length && amt[1] || '';
}

const getAcctAndCardNumber = (message,address) => {
    // /(?:\sa\/c\s|\sacct\s*)([0-9|*|X]{6})/gmi,
    // /(?:a\/c\s|acct\s*)([0-9|*|X|a-z]*\s)/gmi
    var acctRegex = /(?:a\/c\s|acct\s*)(?:no.\s|)([0-9|*|X|a-z]*\s?)/gmi,
    cardRegex = /(?:\scard\s*)([0-9|*|X]{6})/gmi,obj={bankName:address};
    
    var acct = acctRegex.exec(message);
    var card = cardRegex.exec(message);
    if(acct && acct.length){
        obj.accountNumber = `${acct[0]}` || '';
        obj.number = `${acct[1]}` || '';
        obj.type = 'account';
    }else if(card && card.length){
        obj.accountNumber = `${card[0]}` || '';
        obj.number = `${card[1]}` || '';
        obj.type = 'card';
    }
    return obj;
}

const getMerchantName = (message) => {
    //var regex = /(?:\sat\s|\sin\s|\sto\s*)([A-Za-z0-9]*\s?-?\s?[A-Za-z0-9]*\s?-?\.?)/gmi;
    //var regex = /(?:\sat\s|\sin\s|\sto\s*)([A-Za-z0-9|+|@|\/]*\s?-?\s?[A-Za-z0-9|+|@|\/|-]*\s?-?\.?)/gmi;
    var atRegex = /(?:\sat\s|\sin\s)(.*\s)(on)/gmi,acctRegex = /(?:a\/c\s|acct\s*)(?:no.\s|)([0-9|*|X|a-z]*\s?)/gmi,
    cardRegex = /(?:\scard\s*)([0-9|*|X]{6})/gmi,merchantName='';
    
    var merchantRegex = atRegex.exec(message);
    var acct = acctRegex.exec(message);
    var card = cardRegex.exec(message);
    if(merchantRegex && merchantRegex.length){
        merchantName = merchantRegex[1] || '';
    }else if(acct && acct.length){
        merchantName = `A/C ${acct[1]}` || '';
    }else if(card && card.length){
        merchantName = `Card ${acct[1]}` || '';
    }
    
    return merchantName;
}

const modeOfPayment = (message) => {
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

const parseMessage = (object,type,index) => {
    console.log('------------------------------------------->', index);
    var merchantName = getMerchantName(object.body);
    var number = JSON.stringify(getAcctAndCardNumber(object.body,object.address))
    // console.log('-->' + object.body);
    // console.log('-->' + merchantName);
    // console.log('-->' + convertTimestampToDate(object.date));
    // console.log('-->' + getAmount(object.body));
    // console.log('-->' + type);
    // console.log('-->' + number);
    // console.log('-->' + modeOfPayment(object.body));
    // console.log('------------------------------------------->');
    return {
        merchantName,
        date:convertTimestampToDate(object.date),
        amount: getAmount(object.body),
        type,
        accountDetails: getAcctAndCardNumber(object.body,object.address),
        mode:modeOfPayment(object.body),
        index
    }
}

// Function to read particular message from inbox with id
export const getSMS = () => {
    return new Promise((resolve, reject) => {
        console.log("INBOX");
        console.log("minDate"+ new Date('01/01/2020').getTime())
        console.log("maxDate"+ new Date().getTime());
        // var bankList = {
        //     HDFC : [],
        //     ICICI : [],
        //     SBI : []
        // }
        var bankList = [];
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
        try{
            SmsAndroid.list(
                JSON.stringify(filter),
                (fail) => {
                    console.log('Failed with this error: ' + fail);
                    reject(fail)
                },
                (count, smsList) => {
                    console.log('Count: ', count);
                    //console.log('List: ', smsList);
                    var arr = JSON.parse(smsList);
    
                    arr.forEach((object,index) => {
                        //console.log('Object: ' + object);
                        var status = ['withdrawn','debited','spent','deposited','credited'];
                        if(object.body.indexOf('withdrawn') !== -1){
                            bankList.push(parseMessage(object,'withdrawn',index));
                        }else if(object.body.indexOf('debited') !== -1){
                            bankList.push(parseMessage(object,'debited',index));
                        }else if(object.body.indexOf('spent') !== -1){
                            bankList.push(parseMessage(object,'debited',index));
                        }else if(object.body.indexOf('deposited') !== -1){
                            bankList.push(parseMessage(object,'credited',index));
                        }else if(object.body.indexOf('credited') !== -1){
                            bankList.push(parseMessage(object,'credited',index));
                        }
                    });
                    resolve(bankList); 
                },
            );
        }catch(e){
            throw e;
        }
        
    })
}