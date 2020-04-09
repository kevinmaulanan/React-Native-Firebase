import React, { Component } from 'react'
import { withNavigation } from 'react-navigation'
import { View, Text, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

class FooterChat extends Component {
    render() {
        return (
            <View style={{ height: 50, backgroundColor: '#FCCAE5', marginVertical: 10 }}>
                <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#FCCAE5' }}>
                    <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#FCCAE5' }}>
                        <View style={{ borderRadius: 40, backgroundColor: 'white', marginLeft: 20, width: 275 }}>
                            <TextInput placeholder="Tulis Pesan..." style={{ height: 50, fontSize: 15, borderRadius: 10, paddingLeft: 30 }}></TextInput>
                        </View>
                    </View>
                    <View style={{ width: 60, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f590e6', borderRadius: 30 }}>
                        <Icon name='md-send' size={20}></Icon>
                    </View>
                </View>
            </View>
        )
    }
}

const FooterChatComponent = withNavigation(FooterChat)

export default FooterChatComponent