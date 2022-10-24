import { View, Text, Button, TouchableOpacity, Dimensions, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { styles, toastConfig } from '../../../style'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import Svg, { Image, Ellipse, ClipPath } from 'react-native-svg';
import Animated, { useSharedValue, useAnimatedStyle, interpolate, withTiming, withDelay } from 'react-native-reanimated';
import { LinearGradient } from 'react-native-svg'

import { useLoginUserMutation } from '../../../services/userAuthApi';
import { storeToken } from '../../../services/AsyncStorageServices'


const UserLoginScreen = () => {
  const navigation = useNavigation()
  const { height, width } = Dimensions.get('window');
  const imagePosition = useSharedValue(1);
  const formButtonScale = useSharedValue(1);
  const [isRegistering, setIsRegistering] = useState(false)
  const imageAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [-height / 2, 0])
    return {
      transform: [{ translateY: withTiming(interpolation, { duration: 1000 }) }]
    }
  })

  const loginHandler = () => {
    imagePosition.value = 0;
    if (isRegistering) {
      setIsRegistering(false);
    }
  }

  const registerHandler = () => {
    imagePosition.value = 0;
    if (!isRegistering) {
      setIsRegistering(true);
    }
  }

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1,], [250, 0])
    return {
      opacity: withTiming(imagePosition.value, { duration: 500 }),
      transform: [{ translateY: withTiming(interpolation, { duration: 1000 }) }]
    };
  });

  const closeButtonContainerStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [180, 360])
    return {
      opacity: withTiming(imagePosition.value === 1 ? 0 : 1, { duration: 800 }),
      transform: [{ rotate: withTiming(interpolation + "deg", { duration: 1000 }) }]
    }
  });

  const formAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: imagePosition.value === 0 ? withDelay(400, withTiming(1, { duration: 800 }))
        : withTiming(0, { duration: 300 }),
    };
  });

  const formButtonAnimatedStyle = useAnimatedStyle(() => {
    return {

    }
  })

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const clearTextInput = () => {
    setEmail('')
    setPassword('')
  }

  const [loginUser] = useLoginUserMutation()

  const handleFormSubmit = async () => {
    const formData = { email, password }
    const res = await loginUser(formData)
    if (res.data) {
      // console.log("Response Data", res.data)
      await storeToken(res.data.token)
      clearTextInput()
      navigation.navigate('UserPanelTab')
    }
    if (res.error) {
      // console.log("Response Error", res.error.data.errors)
      Toast.show({
        type: 'warning',
        position: 'top',
        topOffset: 0,
        ...(res.error.data.errors.email ? { text1: res.error.data.errors.email[0] } : ''),
        ...(res.error.data.errors.password ? { text1: res.error.data.errors.password[0] } : ''),
        ...(res.error.data.errors.non_field_errors ? { text1: res.error.data.errors.non_field_errors[0] } : ''),
      })
    }
  }

  return (
    // <SafeAreaView>
    //   <Toast config = {toastConfig}/>
    //   <ScrollView keyboardShouldPersistTaps = 'handled'>
    //     <View style = {{ marginHorizontal: 30 }}>
    //       <View style = {{ alignSelf: 'center', marginTop: 80 }}>
    //         <MaterialIcon name = 'shopping-bag' color = 'purple' size = {100} />
    //       </View>
    //       <View style = { styles.inputWithLabel }>
    //         <Text style = {
    //           styles.labelText
    //         }>Email</Text>
    //         <TextInput style = {
    //           styles.input
    //         } value = {email} onChangeText = {setEmail} placeholder = "Enter email" keyboardType = 'email-address' />
    //       </View>
    //       <View style = { styles.inputWithLabel }>
    //         <Text style = {
    //           styles.labelText
    //         }>Password</Text>
    //         <TextInput style = {
    //           styles.input
    //         } value = {password} onChangeText = {setPassword} placeholder = "Enter password" secureTextEntry = { true } />
    //       </View>
    //       <View style = {{ width: 200, alignSelf: 'center', margin: 20}} >
    //         <Button title = 'Login' onPress = { handleFormSubmit } color = 'purple' />
    //       </View>
    //       <View style = {{ flexDirection: 'row', justifyContent: 'space-between' }}>
    //         <View>
    //           <TouchableOpacity onPress = {() => { navigation.navigate('SendPasswordResetEmail')}} >
    //           <Text style = {{ fontWeight: 'bold' }} >Forgot Password</Text>
    //           </TouchableOpacity>
    //         </View>
    //         <View>
    //           <TouchableOpacity onPress = {() => { navigation.navigate('Registration')}}>
    //           <Text style = {{ fontWeight: 'bold' }} >Sign Up</Text>
    //           </TouchableOpacity>
    //         </View>
    //       </View>
    //     </View>
    //   </ScrollView>
    // </SafeAreaView>
    <View style={styles.container}>
      <Animated.View style={[StyleSheet.absoluteFill, imageAnimatedStyle]}>
        <Svg width={width} height={height}>
          <ClipPath id="clipPathId">
            <Ellipse cx={width / 2} rx={height} ry={height} />
          </ClipPath>
          <Image href={require('../../../assets/classic_razer.jpg')}
            width={width}
            height={height}
            preserveAspectRatio="xMidyMid slice"
            clipPath='url(#clipPathId)'
          />
        </Svg>
        <Animated.View style={[styles.closeButtonContainer, closeButtonContainerStyle]}>
          <Text onPress={() => imagePosition.value = 1}>X</Text>
        </Animated.View>
      </Animated.View>
      <View style={styles.bottomContainer}>
        <Animated.View style={buttonAnimatedStyle}>
          <Pressable style={styles.button} onPress={loginHandler}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </Pressable>
        </Animated.View>
        <Animated.View style={buttonAnimatedStyle}>
          <Pressable style={styles.button} onPress={registerHandler}>
            <Text style={styles.buttonText}>REGISTER</Text>
          </Pressable>
        </Animated.View>
        <Animated.View style={[styles.formInputContainer, formAnimatedStyle]}>
          {isRegistering && (
            <><TextInput placeholder='Name'
              placeholderTextColor='rgb(136,136,136)'
              style={styles.textInput} />
              <TextInput placeholder='ConfirmPassword'
                placeholderTextColor='rgb(136,136,136)'
                style={styles.textInput} /></>
          )}
          <TextInput placeholder='Email'
            placeholderTextColor='rgb(136,136,136)'
            style={styles.textInput}
          />
          <TextInput placeholder='Password'
            placeholderTextColor='rgb(136,136,136)'
            style={styles.textInput}
          />
          <View style={styles.formButton}>
            <Text style={styles.buttonText}>{isRegistering ? 'REGISTER' : 'LOGIN'}</Text>
          </View>
        </Animated.View>
      </View>
    </View>
  )
}

export default UserLoginScreen
