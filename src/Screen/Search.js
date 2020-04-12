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

    }
    componentDidMount() {
        this.searchData()
    }

    searchData() {
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
            <ScrollView>
                <View style={{ height: 50, marginVertical: 8 }}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ borderRadius: 40, backgroundColor: 'white', marginLeft: 12, width: 275 }}>
                                <TextInput placeholder="Search..."
                                    style={{ height: 50, fontSize: 15, borderRadius: 10, paddingLeft: 30 }}
                                ></TextInput>
                            </View>
                        </View>
                        <TouchableOpacity>
                            <View style={{ width: 57, height: 53, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f590e6', borderRadius: 30, marginRight: 10 }}>
                                <Icon name='search' size={22} color="white"></Icon>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View >
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
            </ScrollView>
        )
    }
}

const SearchScreen = withNavigation(Search)
export default SearchScreen