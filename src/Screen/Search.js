import React, { Component } from 'react'
import { TextInput, Text, View, ScrollView, FlatList, Image } from 'react-native'
import { Button } from 'native-base'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { withNavigation } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { db, auth } from '../Config/firebase'

class Search extends Component {
    state = {
        myProfile: {},
        myId: null,
        myFriendId: [],
        myFriendProfile: [],
        search: '',

    }
    componentDidMount() {
        this.searchData()
    }

    searchData() {
        const search = this.state.search
        console.log('search', search)
        if (search == '' || search == null || search == undefined) {
            console.log('somoosmodmsomdsosdmo')
            var itemsRef = db.ref('/data-username/').orderByChild('email')
        } else {
            var itemsRef = db.ref('/data-username/').orderByChild('email').startAt(search).endAt(search)
        }
        itemsRef.on('value', (res) => {
            let data = res.val();
            console.log('dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', data)
            if (data == null) {
                this.setState({ myFriendProfile: [] })
            } else {
                const objectKeys = Object.keys(data)
                const objectArray = Object.values(data)
                console.log('keys', objectArray.length)
                if (this.state.myFriendProfile.length == 0 || this.state.myFriendProfile.length == null) {
                    for (let i = 0; i < objectArray.length; i++) {
                        if (objectArray[i].email == auth.currentUser.email) {
                            console.log('daatatatatataaaa')
                            this.setState({ myProfile: objectArray[i], myId: objectKeys[i] })
                        } else if (objectArray.length == 1) {
                            console.log(objectArray[0])
                            this.setState({ myFriendProfile: [objectArray[0]] })
                            console.log('sini woi')
                        }
                        else {
                            console.log('daatatatatata', objectArray[i], this.state.myFriendProfile)
                            this.state.myFriendProfile.push(objectArray[i])

                        }
                    }
                } else if (this.state.myFriendProfile.length == 1 || this.state.myFriendProfile.length == objectArray.length - 1) {
                    this.setState({ myFriendProfile: [] })
                    for (let i = 0; i < objectArray.length; i++) {
                        if (objectArray[i].email == auth.currentUser.email) {
                            this.setState({ myProfile: objectArray[i], myId: objectKeys[i] })
                        } else if (objectArray.length == 1) {
                            console.log(objectArray[0])
                            this.setState({ myFriendProfile: [objectArray[0]] })
                            console.log('sini woi')
                        }
                        else {
                            this.state.myFriendProfile.push(objectArray[i])

                        }
                    }
                }

                else {
                    console.log('object', objectArray[0])
                    this.setState({ myFriendProfile: [objectArray[0]], myFriendId: objectKeys[0] })
                }

            }

        })
    }

    render() {
        console.log(this.state.myFriendProfile)
        console.log(this.state.myFriendProfile.length)
        return (
            <ScrollView>
                <View style={{ height: 50, marginVertical: 8, }}>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ borderRadius: 40, backgroundColor: 'white', marginLeft: 12, width: 275 }}>
                                <TextInput placeholder="Search..."
                                    onChangeText={(text) => this.setState({ search: text })}
                                    style={{ height: 50, fontSize: 15, borderRadius: 10, paddingLeft: 30 }}
                                ></TextInput>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => this.searchData()}>
                            <View style={{ width: 57, height: 53, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f590e6', borderRadius: 30, marginRight: 10 }}>
                                <Icon name='search' size={22} color="white"></Icon>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View >
                {this.state.myFriendProfile !== null &&
                    <View style={{ flex: 1, marginBottom: 5 }}>

                        <FlatList
                            data={this.state.myFriendProfile}
                            renderItem={({ item }) =>
                                <>
                                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                        <View style={{ flex: 1, marginLeft: 10, marginVertical: 10, }}>
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('ProfileScreen', { data: { data: item } })}>

                                                {item.image == '' &&
                                                    <Image source={require('../Asset/default_foto.png')}
                                                        style={{ height: 60, width: 60 }}>
                                                    </Image>
                                                }

                                                {item.image !== '' &&
                                                    <Image source={{ uri: item.image }}
                                                        style={{ height: 60, width: 60 }}>
                                                    </Image>
                                                }


                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ flex: 4, flexDirection: 'row', marginRight: 10, marginLeft: 20, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
                                            < View style={{ flex: 3 }}>
                                                <TouchableOpacity onPress={() => this.props.navigation.navigate('ChatDetailScreen', { data: item })}>
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
                }
                {this.state.myFriendProfile.length == 0 &&
                    <View style={{ height: 300, justifyContent: 'center', backgroundColor: 'white' }}>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={require('../Asset/not_found.png')} style={{ height: 200, width: 200 }}></Image>
                        </View>
                        <View style={{ height: 50, marginTop: -70 }}>
                            <Text style={{ fontSize: 26, fontWeight: 'bold', textAlign: 'center' }}>Email tidak ada</Text>
                        </View>
                    </View>
                }

            </ScrollView>
        )
    }
}

const SearchScreen = withNavigation(Search)
export default SearchScreen