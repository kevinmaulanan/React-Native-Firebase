import React, { Component } from 'react'
import { View, Text, ScrollView, TextInput } from 'react-native'
import { withNavigation } from 'react-navigation'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { db, auth } from '../Config/firebase'

class Register extends Component {
    state = {
        email: '',
        password: '',
        message: '',
    }

    handleSend() {
        const { email, password } = this.state
        this.handleAddData(email, password);
    }

    handleAddData(email, password) {
        auth.createUserWithEmailAndPassword(email, password)
            .then(res => {
                try {
                    db.ref('/data-username').push({
                        username: email,
                        email: email,
                        status: '',
                        image: ''
                    })
                } catch (error) {
                    console.log(error)
                }

                this.props.navigation.navigate('LoginScreen')

            })
            .catch(error => {
                console.log(error.message)
                this.setState({ message: error.message })
            })
    }







    render() {
        console.log(this.state.password)
        return (
            <ScrollView style={{ flex: 1 }}>
                <View style={{ height: 60, backgroundColor: '#f590e6', justifyContent: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 20, marginLeft: 10, fontWeight: 'bold' }}>Register Screen App</Text>
                </View>
                <View style={{ height: 90, justifyContent: 'center', }}>
                    <Text style={{ color: '#f590e6', fontSize: 30, marginLeft: 10, fontWeight: 'bold', textAlign: 'center' }}>My Chat</Text>
                </View>

                {this.state.message !== '' &&
                    <View style={{ height: 50, justifyContent: 'center', }}>
                        <View style={{ height: 50, marginHorizontal: 30, marginVertical: 10, borderRadius: 5, justifyContent: 'center', backgroundColor: '#f590e6' }}>
                            <Text style={{ color: 'white', marginLeft: 10, fontSize: 16, fontWeight: 'bold' }}>{this.state.message}</Text>
                        </View>
                    </View>
                }

                <View style={{ height: 90, justifyContent: 'center', }}>
                    <View style={{ height: 60, marginHorizontal: 30, borderWidth: 1, justifyContent: 'center', }}>
                        <TextInput style={{ marginHorizontal: 10, fontSize: 16 }} placeholder='email'
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
                    <TouchableOpacity onPress={() => this.handleSend()}>
                        <View style={{ height: 60, marginHorizontal: 30, borderRadius: 5, justifyContent: 'center', backgroundColor: '#f590e6' }}>
                            <Text style={{ color: 'white', textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>Register</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ height: 50, justifyContent: 'center', }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('LoginScreen')}>
                        <Text style={{ color: '#f590e6', fontSize: 16, marginLeft: 10, fontWeight: 'bold', textAlign: 'center', marginBottom: 7 }}>Login</Text>
                    </TouchableOpacity>
                    <Text style={{ color: '#f590e6', fontSize: 16, marginLeft: 10, fontWeight: 'bold', textAlign: 'center' }}>Forgot Password</Text>
                </View>
            </ScrollView>
        )
    }
}
const RegisterScreen = withNavigation(Register)
export default RegisterScreen