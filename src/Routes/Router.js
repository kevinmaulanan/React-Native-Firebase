
import React, { Component } from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { Root, Tab } from 'native-base';
import LoginScreen from '../Screen/Login'
import RegisterScreen from '../Screen/Register'
import SplashScreen from '../Screen/Splash'
import HomeScreen from '../Screen/Home'
import ChatDetailScreen from '../Screen/ChatDetail'
import ProfileScreen from '../Screen/Profile'
import MyProfileScreen from '../Screen/MyProfile'
import SearchScreen from '../Screen/Search'
import GoogleMaps from '../../googlemap'


const privateNavigator = createStackNavigator({
    HomeScreen,
    ChatDetailScreen,
    ProfileScreen,
    MyProfileScreen,
    SearchScreen,
    GoogleMaps
}, {
    headerMode: 'none'
}
)


const splashNavigation = createStackNavigator({
    SplashScreen,

}, {
    headerMode: 'none'
})

const authNavigation = createStackNavigator({
    LoginScreen,
    RegisterScreen,
}, {
    headerMode: 'none'
})



const SwitchNav = createSwitchNavigator({
    splashNavigation,
    authNavigation,
    privateNavigator
}, {

})


const AppContainer = createAppContainer(SwitchNav)


class Router extends Component {
    render() {
        return (
            <Root>
                <AppContainer />
            </Root>
        );
    }
}

export default Router;
