import { View, TextInput, Keyboard, Alert } from 'react-native'
import React, { useState } from 'react'
import { styles } from './styles'
import CustomText from '../../component/CustomText'
import { primaryColor } from '../../constant/theme/color'
import CustomInput from '../../component/CustomInput'
import CustomButton from '../../component/CustomButton'
import { getAuth, signInWithEmailAndPassword } from '@react-native-firebase/auth';
import EncryptedStorage from 'react-native-encrypted-storage'
import { updateUserInfo, updateUserLoggedStatus } from '../../redux/auth/authSlice'
import { useDispatch } from 'react-redux'
import { validateLogin } from '../../util'
import { LocalString } from '../../constant/StringConst'

const Login = () => {

  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailErr, setEmailErr] = useState<string>('');
  const [passwordErr, setPasswordErr] = useState<string>('');

    const onEmailEdit =(text: string)=>{
        setEmailErr("")
        setEmail(text)
    }

    const onPasswordEdit =(text: string)=>{
        setPasswordErr("")
        setPassword(text)
    }

    const signInUser=()=>{
        signInWithEmailAndPassword(getAuth(), email, password)
        .then((res) => {
            const userUID = res?.user?.uid;
            storeSecretEncrypt(userUID);
        })
        .catch(error => {
            console.log('Sign in errror!', error);
            Alert.alert("Login Error", error.message);
        });
    }

    async function storeSecretEncrypt(userUID: string) {
        // result as res added /can be used
        
        const userInfoToStore={
            email,
            userUID
        }
        await EncryptedStorage.setItem('user_session', JSON.stringify({ userInfo: userInfoToStore }));
        dispatch(updateUserInfo(userInfoToStore));
        dispatch(updateUserLoggedStatus(true));
    }

    const onSubmit = () => {
        // Email and password validation
        const result = validateLogin(email, password);
        Keyboard.dismiss();
        if (!result.valid) {
          if (result.field === "email") {
            setEmailErr(result.message);
          }
      
          if (result.field === "password") {
            setPasswordErr(result.message);
          }
      
          return;
        }

        // If validation passed
        signInUser();
        
      };



  return (
    <View style={styles.main}>
       <View style={styles.headerContainer}>
        <CustomText value={LocalString.LOGIN} fontSize={30} fontWeight='700' color={primaryColor}/>
        <CustomText value={LocalString.LOGIN_DESC} fontSize={16} fontWeight='400' color="gray"/>
      </View>
      <View style={styles.loginContainer}>
            <TextInput 
                placeholder={LocalString.EMAIL_PLACEHOLDER}
                style={styles.inputStyle}
                onChangeText={onEmailEdit}
                keyboardType="email-address"
            />
            {emailErr && <CustomText value={emailErr} fontSize={10} color={'red'}/>}

            <TextInput 
                placeholder={LocalString.PASSWORD_PLACEHOLDER}
                secureTextEntry={false}
                onChangeText={onPasswordEdit}
                style={styles.inputStyle}
            />
            {passwordErr && <CustomText value={passwordErr} fontSize={10} color={'red'}/>}

        <CustomButton onPress={onSubmit}>{LocalString.LOGIN}</CustomButton>
      
      </View>
    </View>
  )
}

export default Login