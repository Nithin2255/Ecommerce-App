import { View, Text, Button, TextInput } from 'react-native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { styles, toastConfig } from '../../../style';

const SendPasswordResetEmailScreen = () => {
  const [email, setEmail] = useState("")
  const clearTextInput = () => {
    setEmail('')
  }

  const handleFormSubmit = () => {
    if (email) {
      console.log("Send Password reset emaol is success....")
      const formData = { email }
      console.log(formData)
      clearTextInput()
      Toast.show({
        type: 'done',
        position: 'top',
        topOffset: 0,
        text1: "Password Reset Email Sent. Please Check Your Email..."
      });
    }else {
      console.log("Email is required")
      Toast.show({
        type: 'warning',
        position: 'top',
        topOffset: 0,
        text1: "Email is required"
      });
    }
  }

  return (
   <SafeAreaView>
    <Toast config = {toastConfig}/>
    <View style = {{ marginHorizontal: 30, marginTop: 80 }}>
      <View style = { styles.inputWithLabel }>
        <Text style = {
          styles.labelText
          }>Email</Text>
          <TextInput style = {
          styles.input
          } value = {email} onChangeText = {setEmail} placeholder = "Enter email" onPress = {console.log(email)} keyboardType = 'email-address' />
      </View>
      <View style = {{ width: 200, alignSelf: 'center', margin: 20}} >
          <Button title = 'Send' onPress = { handleFormSubmit } color = 'purple' />
      </View>
    </View>
   </SafeAreaView>
  )
}

export default SendPasswordResetEmailScreen