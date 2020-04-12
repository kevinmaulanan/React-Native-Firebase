import React, { Component } from 'react'
import { Image, View, ScrollView, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { withNavigation } from 'react-navigation';
import { db, auth } from '../Config/firebase'


class BodyHome extends Component {

    state = {
        filteredChat: [],
        filteredProfileFriend: [],
        friend: [],
        chatLength: null,
    }
    componentDidMount() {
        this.listenFriend()
        this.myProfileFriend()
    }

    listenFriend() {
        let friendChat = db.ref('/pesan')
        friendChat.on('value', (res) => {
            let data = res.val()
            const objectData = Object.values(data)
            const checkData = []
            var count = 0

            for (let i = 0; i < objectData.length; i++) {
                if (checkData.length == 0) {
                    if (objectData[i].pengirim == auth.currentUser.email || objectData[i].penerima == auth.currentUser.email) {
                        checkData.push(objectData[i])
                    }
                } else {
                    for (let y = 0; y < checkData.length; y++) {
                        if (objectData[i].penerima == checkData[y].penerima || objectData[i].pengirim == checkData[y].penerima) {
                            count = 0
                            break
                        }

                        else {
                            count++
                        }
                    }
                    if (count == checkData.length) {
                        checkData.push(objectData[i])
                    }
                }
            }
            console.log('anjir dah', checkData.length)
            this.setState({ chatLength: checkData.length, filteredChat: checkData })

        })
    }

    myProfileFriend() {
        let itemsRef = db.ref('/data-username');
        itemsRef.on('value', (res) => {
            let data = res.val();
            const objectKeys = Object.keys(data)
            const objectArray = Object.values(data)
            for (let i = 0; i < objectArray.length; i++) {
                if (objectArray[i].email == auth.currentUser.email) {
                } else {
                    this.state.filteredProfileFriend.push(objectArray[i])
                }
            }
        })
    }



    render() {
        console.log(auth.currentUser.email, 'emailku')
        console.log(this.state.filteredChat, 'emailku')
        console.log(this.state.filteredProfileFriend, 'emailku')
        return (
            <ScrollView >
                <View style={{ flex: 1, marginBottom: 5 }}>
                    {this.state.chatLength !== null &&
                        this.state.filteredChat.map((v) => {


                            for (let i = 0; i < this.state.filteredProfileFriend.length; i++) {
                                console.log('sad', this.state.filteredProfileFriend[i].email, v.penerima)
                                if (v.penerima == this.state.filteredProfileFriend[i].email && v.pengirim == auth.currentUser.email || v.penerima == auth.currentUser.email) {
                                    return (
                                        <>
                                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                                <View style={{ flex: 1, marginLeft: 10, marginVertical: 10, }}>
                                                    {this.state.filteredProfileFriend[i].image == '' &&
                                                        <Image source={require('../Asset/default_foto.png')}
                                                            style={{ height: 60, width: 60, borderRadius: 50 }}>
                                                        </Image>
                                                    }

                                                    {this.state.filteredProfileFriend[i].image !== '' &&
                                                        <Image source={{ uri: this.state.filteredProfileFriend[i].image }}
                                                            style={{ height: 60, width: 60, borderRadius: 50 }}>
                                                        </Image>
                                                    }

                                                </View>
                                                <View style={{ flex: 4, marginTop: 8, marginRight: 10, borderRadius: 15, }}>
                                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ChatDetailScreen', { data: { username: this.state.filteredProfileFriend[i].username, image: this.state.filteredProfileFriend[i].image, email: this.state.filteredProfileFriend[i].email } })
                                                    }>
                                                        <View style={{ marginLeft: 5, marginTop: 3, marginBottom: 10 }}>
                                                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                                                <View style={{ flex: 1 }}>
                                                                    <Text style={{ marginBottom: 5, fontSize: 18 }}>{this.state.filteredProfileFriend[i].username}</Text>
                                                                </View>
                                                                <View style={{ flex: 1 }}>
                                                                    <Text style={{ textAlign: 'right', marginBottom: 5, fontSize: 12, color: 'grey' }}>{v.jam}</Text>
                                                                </View>
                                                            </View>

                                                            <Text style={{ color: 'grey' }}>{v.pesan}</Text>

                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                            <View style={{ backgroundColor: 'grey', flex: 1, height: 0.5, }}>
                                            </View>
                                        </>
                                    )
                                }
                            }

                        })
                    }



                </View>
                <View style={{ marginTop: 60 }}></View>
            </ScrollView >
        )
    }
}

const BodyHomeComponent = withNavigation(BodyHome)

export default BodyHomeComponent
