import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import HomeScreen from '../Screen/Home'
import ChatDetailScreen from '../Screen/ChatDetail'
import ProfileScreen from '../Screen/Profile'
import MyProfileScreen from '../Screen/MyProfile'


const AppNavigator = createStackNavigator({
    HomeScreen,
    ChatDetailScreen,
    ProfileScreen,
    MyProfileScreen
}, {
    headerMode: 'none'
}
)

export default createAppContainer(AppNavigator)