import React, { Component } from 'react'
import { withNavigation } from 'react-navigation'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import { SearchBar } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import BackButtonComponent from './BackBotton'

import Icon from 'react-native-vector-icons/FontAwesome5'



class NavBarChat extends Component {
    state = {
        search: true,
        searchValue: ''
    }

    searchUser(searchValue) {
        this.setState({ searchValue })
    }

    render() {
        console.log('data', this.props.data)
        return (
            <View style={{ flexDirection: 'row', height: 55, backgroundColor: '#f590e6', }}>
                <View style={{ width: 40 }}>
                    <BackButtonComponent />
                </View>

                <View style={{ width: 50, justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ProfileScreen', { data: this.props.data })}>
                        <Image source={require('../Asset/default_foto.png')} style={{ width: 40, height: 40, borderRadius: 50 }}></Image>
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ProfileScreen', { data: this.props.data })}>
                        <Text style={{ color: 'white', fontSize: 18 }}>{this.props.data.username}</Text>
                        <Text style={{ color: 'white' }}>online</Text>
                    </TouchableOpacity>
                </View>
            </View >
        )
    }

}

const styles = StyleSheet.create({
    container: {
        height: 60,
        paddingBottom: 10,
    },
    searchbarWrapper: { paddingHorizontal: 20, paddingBottom: 20 },
    searchbar: { backgroundColor: '#3399ff', borderRadius: 25, paddingLeft: 15, opacity: 0.7, height: 40, width: 180 },
    searchIcon: { fontSize: 20, color: 'white' },
    searchInput: { fontFamily: 'Nunito-Regular', fontSize: 16, color: 'white' }
});

const NavBarChatComponent = withNavigation(NavBarChat)
export default NavBarChatComponent