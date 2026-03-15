import React from 'react'
import { Text,Pressable } from 'react-native'
import { primaryColor } from '../constant/theme/color'

const CustomButton = (props) => {
  return (
    <Pressable 
        style={{
            borderRadius:5,
            height:50,
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:props.mode === 'outlined' ? 'white': primaryColor,
        }}
    {...props}>
        <Text style={{color:'white', fontSize:20}}>{props.children}</Text>
    </Pressable>
  )
}

export default CustomButton