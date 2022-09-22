import { View, Text } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import HomeScreen from './HomeScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

const ShopTab = () => {
  const navigation = useNavigation();
  return (
    <Drawer.Navigator screenOptions={{
      headerTransparent:true,
    }}>
        <Drawer.Screen name='Home'  component = {HomeScreen} options={{ headerTitle:'' , headerRight: () => <TouchableOpacity onPress = {() => navigation.navigate('UserLogin')}>
          <Text style = {{
            fontSize: 18,
            paddingRight: 20,
            fontWeight: '400'
          }} >Login</Text>
        </TouchableOpacity>}}/>
    </Drawer.Navigator>
  )
}

export default ShopTab