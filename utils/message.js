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
    var regex = /(?:(?:RS|INR|MRP)\.?\s?)(\d+(:?\,\d+)?(\,\d+)?(\.\d{1,2})?)/gi;
    var amt = regex.exec(message);
    return amt && amt.length && Math.round(Number(amt[1].replace(/[^0-9.-]+/g,""))) || '';
}

const getAvailableBalance = (message) => {
    var regex = /(?:(?:Avl\.? bal\.?|Availabel Balance|Avbl Bal).*(?:RS|INR|MRP)\.?\s?)(\d+(:?\,\d+)?(\,\d+)?(\.\d{1,2})?)/gi;
    var amt = regex.exec(message);
    return amt && amt.length && amt[1] || '';
}

const getAcctAndCardNumber = (message,name) => {
    // /(?:\sa\/c\s|\sacct\s*)([0-9|*|X]{6})/gi,
    // /(?:a\/c\s|acct\s*)([0-9|*|X|a-z]*\s)/gi
    var acctRegex = /(?:a\/c\s|acct\s*)(?:no.\s|)([0-9|*|X|a-z]*\s?)/gi,
    cardRegex = /(?:\scard\s*)([0-9|*|X]{6})/gi,obj={bankName:name};
    
    var acct = acctRegex.exec(message);
    var card = cardRegex.exec(message);
    if(acct && acct.length){
        obj.accountNumber = `${acct[0]}` || '';
        obj.number = `${acct[1].substr(acct[1].length - 5)}` || '';
        obj.type = 'account';
    }else if(card && card.length){
        obj.accountNumber = `${card[0]}` || '';
        obj.number = `${card[1].substr(card[1].length - 5)}` || '';
        obj.type = 'card';
    }
    return obj;
}

const getMerchantName = (message) => {
    //(?:(?:Ref No|UPI).*?)(\d+(\d+)?)
    //VPA\s([\w.-]*[@][\w]*)
    //var regex = /(?:\sat\s|\sin\s|\sto\s*)([A-Za-z0-9]*\s?-?\s?[A-Za-z0-9]*\s?-?\.?)/gi;
    //var regex = /(?:\sat\s|\sin\s|\sto\s*)([A-Za-z0-9|+|@|\/]*\s?-?\s?[A-Za-z0-9|+|@|\/|-]*\s?-?\.?)/gi;
    var atRegex = /(?:\sat\s|\sin\s)(.*\s)(on)/gi,acctRegex = /(?:a\/c\s|acct\s*)(?:no.\s|)([0-9|*|X|a-z]*\s?)/gi,
    cardRegex = /(?:\scard\s*)([0-9|*|X]{6})/gi,vpaRegex = /VPA\s([\w.-]*[@][\w]*)/gi;merchantName='';
    
    var merchantRegex = atRegex.exec(message);
    var acct = acctRegex.exec(message);
    var card = cardRegex.exec(message);
    var vpa = vpaRegex.exec(message);
    if(merchantRegex && merchantRegex.length){
        merchantName = merchantRegex[1] || '';
    }else if(vpa && vpa.length){
        merchantName = vpa[1] || '';
    }else if(acct && acct.length){
        merchantName = `A/C ${acct[1]}` || '';
    }else if(card && card.length){
        merchantName = `Card ${acct[1]}` || '';
    }
    
    return merchantName;
}

const modeOfPayment = (message) => {
    var mode = '';
    var IMPS = /(?:IMPS)/gi;
    var NEFT = /(?:NEFT)/gi;
    var UPI = /(?:UPI)/gi;
    var SALARY = /(?:SALARY)/gi;
    var WITHDRAWN = /(?:withdraw)/gi;
    if(IMPS.test(message)){
        mode = 'IMPS';
    }else if(NEFT.test(message)){
        mode = 'NEFT';
    }else if(UPI.test(message)){
        mode = 'UPI';
    }else if(SALARY.test(message)){
        mode = 'SALARY';
    }else if(WITHDRAWN.test(message)){
        mode = 'ATM';
    }
    return mode;
}

const getRefNo = (message) => {
    var regex1 = /UPI.*?\-(\d+)\-/gi;
    var regex2 = /(?:(?:IMPS|NEFT|UPI).*?)(\d+(\d+)?)/gi;

    var upi1 = regex1.exec(message);
    var upi2 = regex2.exec(message);
    if(upi1 && upi1.length){
        return upi1[1] || '';
    }else if(upi2 && upi2.length){
        return upi2[1] || '';
    }
    
}

const parseMessage = (object,type,index,name) => {
    var merchantName = getMerchantName(object.body);
    if(name === 'HDFC'){
        // console.log('------------------------------------------->');
        // var number = JSON.stringify(getAcctAndCardNumber(object.body,object.address))
        // console.log('-->' + object.body);
        // console.log('-->' + merchantName);
        // console.log('-->' + convertTimestampToDate(object.date));
        // console.log('-->' + getAmount(object.body));
        // console.log('-->' + type);
        // console.log('-->' + number);
        // console.log('-->' + modeOfPayment(object.body));
        // console.log('-->' + getAvailableBalance(object.body));
        // console.log('-->' + getRefNo(object.body));
        // console.log('------------------------------------------->');
    }
    return {
        //message:object.body,
        merchantName,
        timestamp:object.date,
        date:convertTimestampToDate(object.date),
        amount: getAmount(object.body),
        type,
        accountDetails: getAcctAndCardNumber(object.body,name),
        mode:modeOfPayment(object.body),
        index,
        availBalance: getAvailableBalance(object.body),
        refNo: getRefNo(object.body) || Math.random(index)
    }
}

// Function to read particular message from inbox with id
export const getSMS = (minDate,maxDate) => {
    return new Promise((resolve, reject) => {
        console.log("INBOX");
        console.log("minDate"+ minDate)
        console.log("maxDate"+ maxDate);
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
            minDate, // timestamp (in milliseconds since UNIX epoch)
            maxDate,
            //address: 'ADHDFCBK', // sender's phone number
            //bodyRegex: '(.*)(?i)(?:(?:RS|INR|MRP)\\.?\\s?)(\\d+(:?\\,\\d+)?(\\,\\d+)?(\\.\\d{1,2})?)(.*)',
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
                    var arr = JSON.parse(smsList);
                    var bankNames =  ["VYSA", "ALLA", "HDFC", "ANDB", "BARB", "BKID", "CBIN", "CITI", "CORP", "ICICI", "IDIB", "IOBA", "KVBL", "MAHB", "PUNB", "SBIN", "UBIN", "VIJB", "YESB", "BKDN", "CNRB", "DBSS", "IBKL", "IDFB", "INDB", "SYNB", "TMBL", "UCBA", "UTIB"];
    
                    arr.forEach((object,index) => {
                        var isBankNameMatch = bankNames.filter((item) => object.address.indexOf(item) !== -1);
                        if(isBankNameMatch.length){
                            var bankNameIndex = bankNames.indexOf(isBankNameMatch[0]);
                            var name = bankNames[bankNameIndex];
                            if(object.body.indexOf('withdrawn') !== -1){
                                bankList.push(parseMessage(object,'withdrawn',index.toString(),name));
                            }else if(object.body.indexOf('debited') !== -1){
                                bankList.push(parseMessage(object,'debited',index.toString(),name));
                            }else if(object.body.indexOf('spent') !== -1){
                                bankList.push(parseMessage(object,'debited',index.toString(),name));
                            }else if(object.body.indexOf('deposited') !== -1){
                                bankList.push(parseMessage(object,'credited',index.toString(),name));
                            }else if(object.body.indexOf('credited') !== -1){
                                bankList.push(parseMessage(object,'credited',index.toString(),name));
                            }
                        }
                    });
                    const filteredArr = bankList.reduce((acc, current) => {
                        const x = acc.find(item => item.refNo === current.refNo);
                        if (!x) {
                            return acc.concat([current]);
                        } else {
                            return acc;
                        }
                    }, []);
                    resolve(filteredArr); 
                },
            );
        }catch(e){
            throw e;
        }
        
    })
}