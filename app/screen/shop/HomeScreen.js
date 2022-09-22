import { View, StatusBar, ScrollView, TouchableOpacity, Text } from 'react-native'
import React from 'react'
import { COLORS } from '../../../assets/constants';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen = () => {
  return (
    <View style = {{
      width: '100%',
      height: '100%',
      backgroundColor: COLORS.white,
    }}>
      <StatusBar backgroundColor = { COLORS.white } barStyle = "dark-content" />
      <ScrollView showsVerticalScrollIndicator = { false }>
        <View style = {{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 48,
        }}>
          <TouchableOpacity>
            <Entypo name = "shopping-bag"
            style = {{
              fontSize: 18,
              color: COLORS.backgroundMedium,
              padding: 12,
              borderRadius: 18,
              backgroundColor: COLORS.backgroundLight,
            }}/>
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons name = "cart"
            style = {{
              fontSize: 18,
              color: COLORS.backgroundMedium,
              padding: 12,
              borderRadius: 10,
              borderWidth: 1,
              backgroundColor: COLORS.backgroundLight,
              borderColor: COLORS.backgroundLight,
            }}/>
          </TouchableOpacity>
        </View>
        <View style = {{
          marginBottom: 10,
          padding: 16,
        }}>
          <Text style = {{
            fontSize: 25,
            fontWeight: '500',
            letterSpacing: 1,
            marginBottom: 10,
          }}>
            Nithin's-Shop &amp; Service
          </Text>
          <Text style = {{
            fontSize: 14,
            fontWeight: '400',
            letterSpacing: 1,
            lineHeight: 24,
          }}>
            Audio shop on Rustaveli Ave 57.
            {'\n'}This shop offers both products and services
          </Text>
        </View>
      </ScrollView>
    </View>
  )
}

export default HomeScreen