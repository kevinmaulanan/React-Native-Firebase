
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import { db, auth } from '../Config/firebase'

class Splash extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null,
        }
    }

    componentDidMount() {
        this.loginUser()
        setTimeout(() => {
            if (this.state.data) {
                this.props.navigation.navigate('HomeScreen')
            }
            else {
                this.props.navigation.navigate('LoginScreen')
            }
        }, 3000)

    }

    loginUser() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({ data: user })
            } else {
                console.log('belum login')
            }
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../Asset/Logo.png')} style={styles.logo} />
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    logo: {
        width: 200,
        height: 200,
        marginTop: -10


    },
    title: {
        fontFamily: 'Nunito-Regular',
        fontSize: 33,
        color: '#00cc00',
        marginBottom: 50

    }
});



const SplashScreen = withNavigation(Splash)
//make this component available to the app
export default SplashScreen;
