import { View, Text, Button, TextInput, ScrollView } from 'react-native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles, toastConfig } from '../../../style';
import { Toast } from 'react-native-toast-message/lib/src/Toast'


const ChangePasswordScreen = () => {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const clearTextInput = () => {
        setPassword('')
        setConfirmPassword('')
    }

    const handleFormSubmit = () => {
        if (password && confirmPassword) {
            if (password === confirmPassword) {
                console.log("Password changed Successfully")
                const formData = { password }
                console.log(formData)
                clearTextInput()
                Toast.show({
                    type: 'done',
                    position: 'top',
                    topOffset: 0,
                    text1: 'Password Changed Successfully'
                });
            } else {
                console.log("New Password and Confirm Password doesn't match")
                Toast.show({
                    type: 'warning',
                    position: 'top',
                    topOffset: 0,
                    text1: "New Password and Confirm Password doesn't match"
                });
            }
        } else {
            console.log("All Fields are Required")
            Toast.show({
                type: 'warning',
                position: 'top',
                topOffset: 0,
                text1: 'All Fields are Required'
            });
        }
    }

  return (
    <SafeAreaView>
        <Toast config = { toastConfig }/>
        <ScrollView keyboardShouldPersistTaps = 'handled'>
            <View style = {{ marginHorizontal: 30, marginTop: 80 }}>
                <View style = { styles.inputWithLabel }>
                    <Text style = {
                    styles.labelText
                    }>New Password</Text>
                    <TextInput style = {
                    styles.input
                    } value = {password} onChangeText = {setPassword} placeholder = "Enter New password" onPress = {console.log(password)} secureTextEntry = { true } />
                </View>
                <View style = { styles.inputWithLabel }>
                    <Text style = {
                    styles.labelText
                    }>New Confirm Password</Text>
                    <TextInput style = {
                    styles.input
                    } value = {confirmPassword} onChangeText = {setConfirmPassword} placeholder = "Enter New confirm password" onPress = {console.log(confirmPassword)} secureTextEntry = { true } />
                </View>
                <View style = {{ width: 200, alignSelf: 'center', margin: 20}} >
                    <Button title = 'Save' onPress = { handleFormSubmit } color = 'purple' />
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default ChangePasswordScreen
