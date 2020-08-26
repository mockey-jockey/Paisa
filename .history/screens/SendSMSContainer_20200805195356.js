import React, { Component } from 'react';
import Scan from './scan';
import SendSMS from 'react-native-sms'
import SmsAndroid from 'react-native-get-sms-android';

class SendSMSContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        };
        console.log('initial');
    }

    // // Function to send message
    // sendSMS = () => {
    //     console.log('sendSMS');
    //     // alert('clicked');
    //     SendSMS.send({
    //         body: 'Hello shadmna you have done well !',
    //         recipients: ['9928872286', '7014859919'],
    //         successTypes: ['sent', 'queued'],
    //         allowAndroidSendWithoutReadPermission: true
    //     }, (completed, cancelled, error) => {
    //         if (completed) {
    //             console.log('SMS Sent Completed');
    //         } else if (cancelled) {
    //             console.log('SMS Sent Cancelled');
    //         } else if (error) {
    //             console.log('Some error occured');
    //         }
    //     });
    // }


    //https://stackoverflow.com/questions/31068134/extract-parse-amount-and-description-from-biz-transaction-sms

    convertTimestampToDate = (timestamp) => {
        var monthName = {
            1: "JAN",
            2: "FEB",
            3: "MAR",
            4: "APR",
            5: "MAY",
            6: "JUN",
            7: "JUL",
            8: "AUG",
            9: "SEP",
            10: "OCT",
            11: "NOV",
            12: "DEC",
        };
        var date = new Date(timestamp).getDate();
        var month = new Date(timestamp).getMonth()+1;
        return `${monthName[month]} ${date}`;
    }

    getAmount = (message) => {
        var regex = /(?:(?:RS|INR|MRP)\.?\s?)(\d+(:?\,\d+)?(\,\d+)?(\.\d{1,2})?)/gmi;
        var amt = regex.exec(message);
        return amt.length && amt[1];
    }


    getMerchantName = (message) => {
        var regex = /(?:\sat\s|in\*)([A-Za-z0-9]*\s?-?\s?[A-Za-z0-9]*\s?-?\.?)/gmi;
        var merchantName = regex.exec(message);
        return merchantName.length && merchantName[1];
    }


    // Function to read particular message from inbox with id
    getSMS = () => {
        console.log("INBOX");
        console.log("minDate"+ new Date('08/01/2020').getTime())
        console.log("maxDate"+ new Date().getTime());
        let filter = {
            box: 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all
            // the next 4 filters should NOT be used together, they are OR-ed so pick one
            // read: 0, // 0 for unread SMS, 1 for SMS already read
            // _id: 1234, // specify the msg id
            minDate: new Date('08/01/2020').getTime(), // timestamp (in milliseconds since UNIX epoch)
            maxDate: new Date().getTime(),
            address: 'ADHDFCBK', // sender's phone number
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
                console.log('List: ', smsList);
                var arr = JSON.parse(smsList);

                arr.forEach(function (object) {
                    console.log('Object: ' + object);
                    console.log('------------------------------------------->');
                    console.log('-->' + object.body);
                    console.log('-->' + convertTimestampToDate(object.date));
                    console.log('-->' + getAmount(object.body));
                    console.log('-->' + getMerchantName(object.body));
                    console.log('------------------------------------------->');

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

    // // Function to delete particular message from inbox with id
    // deleteSMS = () => {
    //     console.log('deleteSMS');
    //     SmsAndroid.delete(
    //         1234,
    //         (fail) => {
    //             console.log('Failed with this error: ' + fail);
    //         },
    //         (success) => {
    //             console.log('SMS deleted successfully');
    //         },
    //     );
    // }

    render() {
        return (
            <Scan
                sendSMS={this.sendSMS}
                getSMS={this.getSMS}
                deleteSMS={this.deleteSMS}
            />
        );
    }
}

export default SendSMSContainer;