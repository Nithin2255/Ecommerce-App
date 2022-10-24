import { View, Text } from 'react-native'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import HomeScreen from './HomeScreen';
import ProductInfo from './ProductInfo';
import MyCart from './MyCart';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { getToken } from '../../../services/AsyncStorageServices';
import { useState, useEffect } from 'react';

const Drawer = createDrawerNavigator();

const ShopTab = () => {
  const navigation = useNavigation();
  const [token, setToken] = useState({})
  useEffect(() => {
    (async () => {
      const token = await getToken()
      if (token) {
        const { access, refresh } = JSON.parse(token)
        setToken({
          "access":access,
          "refresh":refresh
        })
      }
    })();
  }, [])
  return (
    <Drawer.Navigator screenOptions={{
      headerTransparent:true,
    }}
    drawerContent={(props) => {
      const filteredProps = {
        ...props,
        state: {
          ...props.state,
          routeNames: props.state.routeNames.filter(
            // To hide single option
            (routeName) => routeName !== 'Home',
            // To hide multiple options you can add & condition
          //   (routeName) => {
          //     routeName !== 'HiddenPage1'
          //     && routeName !== 'HiddenPage2';
          //   },
          // ),
          // routes: props.state.routes.filter(
          //   (route) =>{
          //     route.name !== 'HiddenPage1'
          //     && route.name !== 'HiddenPage2',
          //   },
          ),
        },
      };
      return (
        <DrawerContentScrollView {...filteredProps}>
          <DrawerItemList {...filteredProps} />
        </DrawerContentScrollView>
      );
    }}>
        <Drawer.Screen name='Home'  component = {HomeScreen} options={{ headerTitle:'' , headerRight: () => <TouchableOpacity onPress = {() => navigation.navigate('UserLogin')}>

          { token.access ?  <Text style = {{
            fontSize: 18,
            paddingRight: 20,
            fontWeight: '400'
          }} >DashBoard</Text> : <Text style = {{
            fontSize: 18,
            paddingRight: 20,
            fontWeight: '400'
          }} >Login</Text>}
        </TouchableOpacity>}}/>
        <Drawer.Screen name = "ProductInfo" component = { ProductInfo } options = {{ headerShown:false }}/>
        <Drawer.Screen name = "MyCart" component = { MyCart } options = {{ headerShown:false }}/>
    </Drawer.Navigator>
  )
}

export default ShopTab



// https://www.youtube.com/watch?v=yZio9zSHLwg
// https://www.youtube.com/watch?v=Hcp9vHvE2a0
// https://www.youtube.com/watch?v=Om3f-tT8Kfs


// https://candorcodehrms.greythr.com/v3/portal/ess/home
// https://www.youtube.com/watch?v=XnjA8PlwFIc