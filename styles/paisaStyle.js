import { Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';
import { color } from 'react-native-reanimated';
const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;
    
const styles = (theme) => StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: theme.palette.primaryColor,
    },
    flexView: {
        flex: 1
    },
    enableAccessView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    enableAccessText: {
        fontSize: 24,
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
        alignSelf:'center',
        textAlign:'center'
    },
    headerViewStyle: {
        backgroundColor: theme.dark.primaryColor,
        alignItems:'flex-start'
    },
	cardViewStyle: {
        padding: 10,
        borderBottomColor: '#cccccc',
        borderBottomWidth: 0.5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    leftElements: {
        display:'flex',
        flexDirection:'column',
        alignItems: 'flex-start'
    },
    rightElements: {
        flex:1,
        flexDirection:'column',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    monthView: {
        display:'flex',
        flexDirection:'row',
        backgroundColor: theme.dark.secondaryColor
    },
    monthViewText : {
        width:deviceWidth/6,
        textAlign:'center',
        padding:5,
        fontWeight: "bold",
        color: theme.dark.primaryColor
    },
    selectedMonth: {
        width:deviceWidth/6,
        textAlign:'center',
        padding:5,
        color: "white",
        fontWeight: "bold",
        backgroundColor: theme.dark.primaryColor
    },
    transactionsView: {
        display:'flex',
        flexDirection:'column',
        marginBottom:10,
        backgroundColor: "white",
    },
    lastTransactionsView: {
        display:'flex',
        flexDirection:'column',
        marginBottom:0,
        backgroundColor: "white",
    },
    transactionsHeader: {
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        padding:10,
        borderBottomColor: theme.palette.primaryColor,
        borderBottomWidth:0.8
    },
    bankName: {
        fontWeight:'bold',
        width:deviceWidth-200,
        color: theme.dark.primaryColor
    },
    bankLogo:{
        width: 15,
        height: 15,
    },
    bankCard: {
        width: 16,
        height: 16
    },
    bankBalance: {
        color: theme.light.primaryColor,
        fontWeight:'bold',
        width:100,
        textAlign:'right'
    },
    textColor: {
        color: "rgba(0,0,0,0.7)",
    },
    dateColor:{
        color:'#999999',
        backgroundColor: "white"
    },
    chipView: {
        flex:1,
        height:15,
    },
    chipViewText:{
        position:'relative',
        backgroundColor: theme.palette.primaryColor,
        color: theme.dark.primaryColor,
        paddingRight:4,
        paddingLeft:4,
        borderRadius:8
    },
    transactionsTypeView:{
        flexGrow: 1, 
        justifyContent:'center',
        alignItems: 'center', 
        paddingLeft:2
    },
    iconDown: {
        color: theme.light.primaryColor,
        fontSize:15
    },
    iconUp: {
        color: theme.dark.secondaryColor,
        fontSize:15,
        height:10
    },
    transactionsFooter: {
        flex: 1,
        flexDirection:'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding:6
    },
    transactionsFooterTxt: {
        fontSize: 18,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: theme.dark.primaryColor
    },
    scrollViewDates: {
        display:'flex',
        flexDirection:'row',
        backgroundColor:theme.palette.primaryColor
    },
    dates:{
        display:'flex',
        justifyContent:'center',
        padding:8,
        color:theme.dark.primaryColor
    },
    selectedDates: {
        display:'flex',
        justifyContent:'center',
        alignSelf:'center',
        padding:8,
        fontFamily: 'fontFamily-bold',
        backgroundColor:theme.light.primaryColor,
        color:'white'
    },
    disableDates:{
        display:'flex',
        justifyContent:'center',
        padding:8,
        color:theme.dark.primaryColor,
        opacity:0.5
    },
    totalView : {
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        padding:10,
        shadowColor: '#000',
        borderTopColor: theme.palette.primaryColor,
        borderTopWidth:0.8,
        borderBottomColor: theme.palette.primaryColor,
        borderBottomWidth:0.8
    },
    totalText: {
        fontWeight:'bold',
        width:100,
        color: theme.light.primaryColor
    },
    totalValue: {
        fontWeight:'bold',
        width:100,
        textAlign:"right",
        color: theme.dark.primaryColor
    },
    noTransactions: {
        flex:1,
        display:'flex',
        flexDirection:'column',
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center'
    },
    noTransactionText: {
        fontSize:20,
        opacity:0.5
    }
});
export default styles;