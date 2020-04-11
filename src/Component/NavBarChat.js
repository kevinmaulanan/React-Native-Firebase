import React, { Component } from 'react'
import { withNavigation } from 'react-navigation'
import { View, Text, StyleSheet, Image, ScrollView, Modal } from 'react-native'
import { Button } from 'native-base'
import { SearchBar } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import BackButtonComponent from './BackBotton'
import Geolocation from '@react-native-community/geolocation';
import { auth, db } from '../Config/firebase'
import Icon from 'react-native-vector-icons/FontAwesome5'



class NavBarChat extends Component {
    state = {
        search: true,
        searchValue: '',
        modalSetting: false,
        latitudeSend: '',
        longtitudeSend: '',

    }

    toogleSetting() {
        this.setState({ modalSetting: !this.state.modalSetting })
    }

    componentDidMount() {
        this.lokasi()
    }
    lokasi() {
        Geolocation.getCurrentPosition(info =>
            this.setState({ latitudeSend: info.coords.latitude, longtitudeSend: info.coords.longitude })
        )
    }

    sendMap() {
        const latitude = this.state.latitudeSend
        const longitude = this.state.longtitudeSend
        const jam = new Date().getHours()
        const menit = new Date().getMinutes()
        const waktu = new Date()
        const yourEmail = this.props.data.data.email
        const myEmail = auth.currentUser.email

        try {
            db.ref(`/pesan/`).push({
                pengirim: myEmail,
                penerima: yourEmail,
                latitude: latitude,
                longitude: longitude,
                date: waktu,
                jam: jam + '.' + menit
            })
            this.setState({ modalSetting: !this.state.modalSetting })

        } catch (error) {
            console.log(error)
        }

    }

    render() {
        console.log('asad', this.state.longtitudeSend)
        console.log('adas', this.state.latitudeSend)
        console.log('adas', this.props.data.data.email)
        console.log('adas', auth.currentUser.email)
        return (
            <View style={{ flexDirection: 'row', height: 55, backgroundColor: '#f590e6', }}>
                <View style={{ width: 40 }}>
                    <BackButtonComponent />
                </View>

                <View style={{ width: 50, justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ProfileScreen', { data: this.props.data })}>
                        {this.props.data.data.image == '' &&
                            <Image source={require('../Asset/default_foto.png')} style={{ width: 40, height: 40, borderRadius: 50 }}></Image>
                        }

                        {this.props.data.data.image !== '' &&
                            <Image source={{ uri: this.props.data.data.image }} style={{ width: 40, height: 40, borderRadius: 50 }}></Image>
                        }

                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ProfileScreen', { data: this.props.data })}>
                        <Text style={{ color: 'white', fontSize: 18 }}>{this.props.data.data.username}</Text>
                        <Text style={{ color: 'white' }}>online</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => this.toogleSetting()}>
                    <View style={{ width: 57, height: 53, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f590e6', borderRadius: 30, marginRight: 10 }}>
                        <Icon name="ellipsis-v" size={20} color="white" />
                    </View>
                </TouchableOpacity>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalSetting}
                    onRequestClose={() => {
                        this.toogleSetting();
                    }}
                >
                    <View style={{ height: 90, width: 140, marginLeft: 210, marginTop: 10, backgroundColor: 'white', }}>
                        <View style={{ marginHorizontal: 10, justifyContent: 'center' }}>
                            <View style={{ height: 40 }}>
                                <Button transparent onPress={() => this.sendMap()}>
                                    <Text style={{ fontSize: 16 }}>Kirim Map</Text>
                                </Button>
                            </View>
                            <View style={{ height: 40 }}>
                                <Button transparent onPress={() => this.toogleSetting()}>
                                    <Text style={{ fontSize: 16 }}>Batal</Text>
                                </Button>
                            </View>
                        </View>
                    </View>
                </Modal>

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