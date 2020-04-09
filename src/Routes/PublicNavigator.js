import React, { Component } from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import LoginScreen from '../Screen/Login'
import RegisterScreen from '../Screen/Register'


const AppNavigator = createStackNavigator({
    LoginScreen,
    RegisterScreen
}, {
    headerMode: 'none'
})

export default createAppContainer(AppNavigator)
