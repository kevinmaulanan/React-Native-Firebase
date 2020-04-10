import React, { Component } from 'react'
import { View, Text } from 'react-native'
import NavBarChatComponent from '../Component/NavBarChat'
import BodyChatComponent from '../Component/BodyChat'
import FooterChatComponent from '../Component/FooterChat'


export default class ChatDetailScreen extends Component {
    render() {
        console.log(this.props.navigation.state.params)
        return (
            <View style={{ flex: 1, backgroundColor: '#FCCAE5' }}>
                <NavBarChatComponent data={this.props.navigation.state.params} />
                <BodyChatComponent data={this.props.navigation.state.params} />
                <FooterChatComponent data={this.props.navigation.state.params} />
            </View>
        )
    }
}
