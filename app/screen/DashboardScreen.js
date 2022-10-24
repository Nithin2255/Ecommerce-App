import { View, Text } from 'react-native'
import { useEffect, useState } from 'react'
import { getToken } from '../../services/AsyncStorageServices'
import { useLoggedUserQuery } from '../../services/userAuthApi'


const DashboardScreen = () => {

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

  const { data } = useLoggedUserQuery(token.access)
  console.log("userData: ",data)

  return (
    <View>
      <Text>DashboardScreen</Text>
    </View>
  )
}

export default DashboardScreen