import { View, Text } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import { useNavigation } from '@react-navigation/native'
import { removeToken } from '../../services/AsyncStorageServices';

const SideBar = ({ ...props }) => {
    const handleLogout = async () => {
      await removeToken()
      navigation.navigate('Home'); console.log("Logout")
    }
    const navigation = useNavigation()
  return (
    <DrawerContentScrollView { ...props }>
        <View style = {{ margin: 15 }}>
            <Text style = {{ fontSize: 18, marginBottom: 5, fontWeight: 'bold' }}>Nithin Vadakkethil</Text>
            <Text style = {{ fontSize: 16, marginBottom: 5}}>nithin@gmail.com</Text> 
        </View>
        <DrawerItemList {...props}/>
        <DrawerItem label= "Logout" onPress = { handleLogout }/> 
    </DrawerContentScrollView>
  );
};

export default SideBar