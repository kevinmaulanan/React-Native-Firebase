import React, { Component } from 'react'
import { withNavigation } from 'react-navigation'
import { View, Text, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { auth, db } from '../Config/firebase'

class FooterChat extends Component {
    state = {
        pesan: '',
    }

    kirimPesan() {
        const pesan = this.state.pesan
        const jam = new Date().getHours()
        const menit = new Date().getMinutes()
        const waktu = new Date()
        const yourEmail = this.props.data.data.email
        const myEmail = auth.currentUser.email

        try {
            db.ref(`/pesan/`).push({
                pengirim: myEmail,
                penerima: yourEmail,
                pesan: pesan,
                date: waktu,
                jam: jam + '.' + menit
            })
            this.setState({ pesan: '' })

        } catch (error) {
            console.log(error)
        }

    }

    render() {
        console.log(this.state.pesan)
        return (
            <View style={{ height: 50, backgroundColor: '#FCCAE5', marginVertical: 8 }}>
                <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#FCCAE5' }}>
                    <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#FCCAE5' }}>
                        <View style={{ borderRadius: 40, backgroundColor: 'white', marginLeft: 12, width: 275 }}>
                            <TextInput placeholder="Tulis Pesan..."
                                value={this.state.pesan}
                                style={{ height: 50, fontSize: 15, borderRadius: 10, paddingLeft: 30 }}
                                onChangeText={(text) => this.setState({ pesan: text })}
                            ></TextInput>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => this.kirimPesan()}>
                        <View style={{ width: 57, height: 53, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f590e6', borderRadius: 30, marginRight: 10 }}>
                            <Icon name='md-send' size={26} color="white"></Icon>
                        </View>
                    </TouchableOpacity>

                </View>
            </View>
        )
    }
}

const FooterChatComponent = withNavigation(FooterChat)

export default FooterChatComponent