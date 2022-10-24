import { View, Text, Button, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput, ScrollView } from 'react-native-gesture-handler'
import { styles, toastConfig } from '../../../style'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { useNavigation } from '@react-navigation/native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import Checkbox from 'expo-checkbox'

import { useRegisterUserMutation } from '../../../services/userAuthApi'
import { storeToken } from '../../../services/AsyncStorageServices'

const RegistrationScreen = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [tc, setTc] = useState(null);

    const clearTextInput = () => {
        setName('')
        setEmail('')
        setPassword('')
        setPassword2('')
        setTc(null)
    }

    const navigation = useNavigation();

    const [registerUser] = useRegisterUserMutation()

    const handleFormSubmit = async () => {
      const formData = { name, email, password, password2, tc }
      const res = await registerUser(formData)
      // console.log("response:",res)
      if (res.data){
        // console.log("Response Data", res.data)
        await storeToken(res.data.token)
        clearTextInput()
        navigation.navigate('UserPanelTab')
      }
      if (res.error){
        // console.log("Response Error", res.error.data.errors)
        Toast.show({
          type: 'warning',
          position: 'top',
          topOffset: 0,
          ...(res.error.data.errors.name ? { text1: res.error.data.errors.name[0] } : ''),
          ...(res.error.data.errors.email ? { text1: res.error.data.errors.email[0] } : ''),
          ...(res.error.data.errors.password ? { text1: res.error.data.errors.password2[0] } : ''),
          ...(res.error.data.errors.tc ? { text1: res.error.data.errors.tc[0] } : ''),
          ...(res.error.data.errors.non_field_errors ? { text1: res.error.data.errors.non_field_errors[0] } : ''),
        })
      }
    }

  return (
    <SafeAreaView>
      <Toast config = {toastConfig}/>
      <ScrollView keyboardShouldPersistTaps = 'handled'>
        <View style = {{ marginHorizontal: 30 }}>
          <View style = {{ alignSelf: 'center', marginTop: 30 }}>
            <MaterialIcon name = 'shopping-bag' color = 'purple' size = {100} />
          </View>
          <View style = { styles.inputWithLabel }>
            <Text style = {
              styles.labelText
            }>Name</Text>
            <TextInput style = {
              styles.input
            } value = {name} onChangeText = {setName} placeholder = "Enter name"/>
          </View>
          <View style = { styles.inputWithLabel }>
            <Text style = {
              styles.labelText
            }>Email</Text>
            <TextInput style = {
              styles.input
            } value = {email} onChangeText = {setEmail} placeholder = "Enter email" keyboardType = 'email-address' />
          </View>
          <View style = { styles.inputWithLabel }>
            <Text style = {
              styles.labelText
            }>Password</Text>
            <TextInput style = {
              styles.input
            } value = {password} onChangeText = {setPassword} placeholder = "Enter password" secureTextEntry = { true } />
          </View>
          <View style = { styles.inputWithLabel }>
            <Text style = {
              styles.labelText
            }>Confirm Password</Text>
            <TextInput style = {
              styles.input
            } value = {password2} onChangeText = {setPassword2} placeholder = "Enter confirm password" secureTextEntry = { true } />
          </View>
          <View style = {{ flex: 1, flexDirection: 'row' }}>
            <Checkbox value = {tc} onValueChange = {setTc} color = {tc? '#4630EB' : undefined }/>
            <Text style = { styles.labelText } >I agree with the Terms and conditions.</Text>
          </View>
          <View style = {{ width: 200, alignSelf: 'center', margin: 20}} >
            <Button title = 'Join' onPress = { handleFormSubmit } color = 'purple' />
          </View>
          <View style = {{ alignItems: 'flex-end' }}>
            <TouchableOpacity onPress = {() => { navigation.navigate('UserLogin')}} >
            <Text style = {{ fontWeight: 'bold' }} >Registered ? Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default RegistrationScreen