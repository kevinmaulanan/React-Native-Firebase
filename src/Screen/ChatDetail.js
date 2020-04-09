import React, { Component } from 'react'
import { View, Text } from 'react-native'
import NavBarChatComponent from '../Component/NavBarChat'
import BodyChatComponent from '../Component/BodyChat'
import FooterChatComponent from '../Component/FooterChat'

export default class ChatDetailScreen extends Component {
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#FCCAE5' }}>
                <NavBarChatComponent />
                <BodyChatComponent />
                <FooterChatComponent />
            </View>
        )
    }
}
