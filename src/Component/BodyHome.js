import React, { Component } from 'react'
import { Image, View, ScrollView, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { withNavigation } from 'react-navigation';
import { db, auth } from '../Config/firebase'


class BodyHome extends Component {

    state = {
        filtered: [],
        friend: [],
    }
    componentDidMount() {
        this.listenFriend()
    }

    listenFriend() {
        let friendChat = db.ref('/pesan')
        friendChat.on('value', (res) => {
            let data = res.val()
            const objectData = Object.values(data)
            for (let i = 0; i < objectData.length; i++) {
                if (objectData[i].penerima == auth.currentUser.email || objectData[i].pengirim == auth.currentUser.email) {
                    console.log('da', objectData[i++].jam)
                    console.log('da', objectData[i].jam)
                    this.setState({ friend: objectData[i] })


                } else {

                }
            }

        })



        // this.state.filtered.map((v) => {
        //     if (v.pengirim == auth.currentUser.email || v.penerima == auth.currentUser.email) {

        //     }
        // }


    }

    checkFilter() {

    }

    render() {
        console.log('ath', auth.currentUser.email)
        return (
            <ScrollView >
                <View style={{ flex: 1, marginBottom: 5 }}>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ flex: 1, marginLeft: 10, marginVertical: 10, }}>
                            <Image source={require('../Asset/default_foto.png')}
                                style={{ height: 60, width: 60, borderRadius: 50 }}>
                            </Image>
                        </View>
                        <View style={{ flex: 4, marginTop: 8, marginRight: 10, borderRadius: 15, }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('ChatDetailScreen')
                            }>
                                <View style={{ marginLeft: 5, marginTop: 3, marginBottom: 10 }}>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ fontWeight: 'bold', marginBottom: 5, fontSize: 18 }}>Kevin</Text>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ textAlign: 'right', marginBottom: 5, fontSize: 12, color: 'grey' }}>30/01/20</Text>
                                        </View>
                                    </View>
                                    <Text style={{ color: 'grey' }}>Kevin Maulana</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ backgroundColor: 'grey', flex: 1, height: 0.5, }}>
                    </View>
                </View>
                <View style={{ marginTop: 60 }}></View>
            </ScrollView >
        )
    }
}

const BodyHomeComponent = withNavigation(BodyHome)

export default BodyHomeComponent
