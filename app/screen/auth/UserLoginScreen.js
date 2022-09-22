import { View, Text, Button, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { styles, toastConfig } from '../../../style'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'


const UserLoginScreen = () => {
  const navigation = useNavigation()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const clearTextInput = () => {
    setEmail('')
    setPassword('')
  }

  const handleFormSubmit = () => {
    if (email && password) {
      console.log("Login Success")
      const formData = { email, password }
      console.log(formData)
      clearTextInput()
      Toast.show({
        type: 'done',
        position: 'top',
        topOffset: 0,
        text1: "Login Success"
      })
      navigation.navigate('UserPanelTab')
    } else {
      console.log("All fields are Required")
      Toast.show({
        type: 'warning',
        position: 'top',
        topOffset: 0,
        text1: "All fields are Required"
      })
    }
  }

  return (
    <SafeAreaView>
      <Toast config = {toastConfig}/>
      <ScrollView keyboardShouldPersistTaps = 'handled'>
        <View style = {{ marginHorizontal: 30 }}>
          <View style = {{ alignSelf: 'center', marginTop: 80 }}>
            <MaterialIcon name = 'shopping-bag' color = 'purple' size = {100} />
          </View>
          <View style = { styles.inputWithLabel }>
            <Text style = {
              styles.labelText
            }>Email</Text>
            <TextInput style = {
              styles.input
            } value = {email} onChangeText = {setEmail} placeholder = "Enter email" onPress = {console.log(email)} keyboardType = 'email-address' />
          </View>
          <View style = { styles.inputWithLabel }>
            <Text style = {
              styles.labelText
            }>Password</Text>
            <TextInput style = {
              styles.input
            } value = {password} onChangeText = {setPassword} placeholder = "Enter password" onPress = {console.log(password)} secureTextEntry = { true } />
          </View>
          <View style = {{ width: 200, alignSelf: 'center', margin: 20}} >
            <Button title = 'Login' onPress = { handleFormSubmit } color = 'purple' />
          </View>
          <View style = {{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <TouchableOpacity onPress = {() => { navigation.navigate('SendPasswordResetEmail')}} >
              <Text style = {{ fontWeight: 'bold' }} >Forgot Password</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress = {() => { navigation.navigate('Registration')}}>
              <Text style = {{ fontWeight: 'bold' }} >Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default UserLoginScreen