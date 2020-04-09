import React, { Component } from 'react'
import { View, Text, ScrollView, TextInput } from 'react-native'
import { withNavigation } from 'react-navigation'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { db, auth } from '../Config/firebase'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            message: ''
        }

        auth.onAuthStateChanged(this.onAuthStateChanged)
    }

    onAuthStateChanged = (user) => {
        console.log('onAuthStateChanged')
        if (user) {
            this.props.navigation.navigate('HomeScreen')
        }
    }

    handleLoginUser() {
        const { email, password } = this.state
        auth.signInWithEmailAndPassword(email, password)
            .then(res => {
                this.props.navigation.navigate('HomeScreen')
            })
            .catch(error => {
                console.log(error.message)
                this.setState({ message: error.message })
            });
    }

    handleSend() {
        const { email, password } = this.state
        this.addData(email, password);
    }





    render() {
        console.log(this.state.password)
        console.log(auth)
        return (
            <ScrollView style={{ flex: 1 }}>
                <View style={{ height: 60, backgroundColor: '#f590e6', justifyContent: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 20, marginLeft: 10, fontWeight: 'bold' }}>Login Screen App</Text>
                </View>
                <View style={{ height: 90, justifyContent: 'center', }}>
                    <Text style={{ color: '#f590e6', fontSize: 30, marginLeft: 10, fontWeight: 'bold', textAlign: 'center' }}>My Chat</Text>
                </View>

                {this.state.message !== '' &&
                    <View style={{ height: 50, justifyContent: 'center', marginBottom: 8 }}>
                        <View style={{ minHeight: 40, marginHorizontal: 30, borderRadius: 5, justifyContent: 'center', backgroundColor: '#f590e6' }}>
                            <Text style={{ color: 'white', marginHorizontal: 10, marginVertical: 10, fontSize: 16, fontWeight: 'bold' }}>{this.state.message}</Text>
                        </View>
                    </View>
                }

                <View style={{ height: 80, justifyContent: 'center', }}>
                    <View style={{ height: 60, marginHorizontal: 30, borderWidth: 1, justifyContent: 'center', }}>
                        <TextInput style={{ marginHorizontal: 10, fontSize: 16 }} placeholder='Email'
                            onChangeText={email => this.setState({ email })}
                        ></TextInput>
                    </View>
                </View>

                <View style={{ height: 90, justifyContent: 'center', }}>
                    <View style={{ height: 60, marginHorizontal: 30, borderWidth: 1, justifyContent: 'center', }}>
                        <TextInput style={{ marginHorizontal: 10, fontSize: 16 }} placeholder='Password'
                            secureTextEntry={true}
                            onChangeText={password => this.setState({ password })}
                        ></TextInput>
                    </View>
                </View>

                <View style={{ height: 90, justifyContent: 'center', }}>
                    <TouchableOpacity onPress={() => this.handleLoginUser()}>
                        <View style={{ height: 60, marginHorizontal: 30, borderRadius: 5, justifyContent: 'center', backgroundColor: '#f590e6' }}>
                            <Text style={{ color: 'white', textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>Login</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ height: 50, justifyContent: 'center', }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('RegisterScreen')}>
                        <Text style={{ color: '#f590e6', fontSize: 16, marginLeft: 10, fontWeight: 'bold', textAlign: 'center', marginBottom: 7 }}>Daftar</Text>
                    </TouchableOpacity>
                    <Text style={{ color: '#f590e6', fontSize: 16, marginLeft: 10, fontWeight: 'bold', textAlign: 'center' }}>Forgot Password</Text>
                </View>
            </ScrollView >
        )
    }
}
const LoginScreen = withNavigation(Login)
export default LoginScreen