import { StyleSheet } from "react-native";
import { screenWidth } from "../../constant";


export const styles= StyleSheet.create({
    main:{flex:1, alignItems:'center'},
    branding:{
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    },
    headerContainer:{marginTop:100, gap:20},
    iconContainer:{backgroundColor:'white', borderRadius:20,padding:20},
    navigationFooter:{
      display:'flex',
      padding:20,
      gap:10
    },
    inputStyle:{borderWidth:1, width:screenWidth/1.6, borderRadius:10},
    loginContainer:{marginTop:50, gap:20},
    footerTextContain:{
      flexDirection:'row', alignItems:'center', justifyContent:'center'
    },
  })

  