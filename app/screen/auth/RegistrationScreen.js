import { View, Text, Button, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput, ScrollView } from 'react-native-gesture-handler'
import { styles, toastConfig } from '../../../style'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { useNavigation } from '@react-navigation/native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import Checkbox from 'expo-checkbox'

const RegistrationScreen = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [tc, setTc] = useState(false);

    const clearTextInput = () => {
        setName('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        setTc(false)
    }

    const navigation = useNavigation();

    const handleFormSubmit = () => {
        if (name, email && password && confirmPassword && tc) {
            if (password === confirmPassword){
                console.log("Login Success")
                const formData = { name, email, password, confirmPassword, tc }
                console.log(formData)
                clearTextInput()
                Toast.show({
                    type: 'done',
                    position: 'top',
                    topOffset: 0,
                    text1: "Login Success"
            })
            }else {
                console.log("All fields are Required")
                Toast.show({
                    type: 'warning',
                    position: 'top',
                    topOffset: 0,
                    text1: "Password & Confirm Password doesn't match"
                })
            }
        }else {
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
          <View style = {{ alignSelf: 'center', marginTop: 30 }}>
            <MaterialIcon name = 'shopping-bag' color = 'purple' size = {100} />
          </View>
          <View style = { styles.inputWithLabel }>
            <Text style = {
              styles.labelText
            }>Name</Text>
            <TextInput style = {
              styles.input
            } value = {name} onChangeText = {setName} placeholder = "Enter name" onPress = {console.log(name)}/>
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
          <View style = { styles.inputWithLabel }>
            <Text style = {
              styles.labelText
            }>Confirm Password</Text>
            <TextInput style = {
              styles.input
            } value = {confirmPassword} onChangeText = {setConfirmPassword} placeholder = "Enter confirm password" onPress = {console.log(confirmPassword)} secureTextEntry = { true } />
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