import React, { Component } from 'react'
import { Image, View, ScrollView, Text, FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { withNavigation } from 'react-navigation';
import { db, auth } from '../Config/firebase'

class BodyAddFriends extends Component {
    state = {
        myProfile: {},
        myId: null,
        myFriendId: [],
        myFriendProfile: []
    }
    componentDidMount() {
        this.listenMyData()
    }

    listenMyData() {
        let itemsRef = db.ref('/data-username');
        itemsRef.on('value', (res) => {
            let data = res.val();
            const objectKeys = Object.keys(data)
            const objectArray = Object.values(data)

            for (let i = 0; i < objectArray.length; i++) {
                if (objectArray[i].email == auth.currentUser.email) {
                    this.setState({ myProfile: objectArray[i], myId: objectKeys[i] })
                } else {
                    this.state.myFriendProfile.push(objectArray[i])
                    this.state.myFriendId.push(objectKeys[i])

                }
            }
        })
    }

    render() {
        return (
            <ScrollView >
                <View style={{ flex: 1, marginBottom: 5 }}>
                    <FlatList
                        data={this.state.myFriendProfile}
                        renderItem={({ item }) =>
                            <>
                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                    <View style={{ flex: 1, marginLeft: 10, marginVertical: 10, }}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ProfileScreen', { data: item.email })}>
                                            <Image source={require('../Asset/default_foto.png')}
                                                style={{ height: 60, width: 60 }}>
                                            </Image>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flex: 4, flexDirection: 'row', marginRight: 10, marginLeft: 20, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
                                        < View style={{ flex: 3 }}>
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('ChatDetailScreen', { email: item.email, username: item.username })}>
                                                < Text style={{ fontSize: 18 }}>{item.username}</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ fontSize: 18, color: 'blue' }}>Add++ </Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={{ backgroundColor: 'grey', flex: 1, height: 0.5, }}>
                                </View>
                            </>
                        }

                    >

                    </FlatList>

                </View>


                <View style={{ marginTop: 60 }}></View>
            </ScrollView >
        )
    }
}

const BodyAddFriendsComponent = withNavigation(BodyAddFriends)

export default BodyAddFriendsComponent
