import React, { Component } from 'react'
import { View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { TouchableOpacity } from 'react-native-gesture-handler'
import BodyHomeComponent from '../Component/BodyHome'
import BodyFriendsComponent from '../Component/BodyFriends'
import BodyAddFriendsComponent from '../Component/BodyAddFriends'

class HomeScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pageActive: 1
        }
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ height: 95, backgroundColor: '#f590e6' }}>
                    <View style={{ height: 50, flexDirection: 'row' }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('MyProfileScreen')}>
                                <Text style={{ fontSize: 26, color: 'white' }}>MyChat</Text>
                            </TouchableOpacity>

                        </View>

                        <View style={{ flex: 1, }}>
                            <Icon name="ellipsis-v" />
                        </View>

                        <View style={{ flex: 1 }}>
                            <Icon name="user" size={26}></Icon>
                        </View>
                    </View>

                    <View style={{ height: 35, flexDirection: 'row', alignItems: 'center', }}>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity onPress={() => this.setState({ pageActive: 1 })}>
                                <View style={{ height: 40, justifyContent: 'center' }}>
                                    <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', color: `${this.state.pageActive == 1 ? 'white' : '#fce8f2'}` }}>CHAT</Text>
                                </View>
                            </TouchableOpacity>

                            {this.state.pageActive == 1 &&
                                <View style={{ height: 5, justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ height: 1, backgroundColor: 'white', width: 130 }}></View>
                                </View>
                            }
                        </View>

                        <View style={{ flex: 1 }}>
                            <TouchableOpacity onPress={() => this.setState({ pageActive: 2 })}>
                                <View style={{ height: 40, justifyContent: 'center' }}>
                                    <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', color: `${this.state.pageActive == 2 ? 'white' : '#fce8f2'}` }}>TEMAN</Text>
                                </View>
                            </TouchableOpacity>

                            {this.state.pageActive == 2 &&
                                <View style={{ height: 5, justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ height: 1, backgroundColor: 'white', width: 130 }}></View>
                                </View>
                            }
                        </View>

                        <View style={{ flex: 1 }}>
                            <TouchableOpacity onPress={() => this.setState({ pageActive: 3 })}>
                                <View style={{ height: 40, justifyContent: 'center' }}>
                                    <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', color: `${this.state.pageActive == 3 ? 'white' : '#fce8f2'}` }}>CARI</Text>
                                </View>
                            </TouchableOpacity>

                            {this.state.pageActive == 3 &&
                                <View style={{ height: 5, justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ height: 1, backgroundColor: 'white', width: 130 }}></View>
                                </View>
                            }
                        </View>
                    </View>
                </View >

                {this.state.pageActive == 1 &&
                    <BodyHomeComponent />
                }

                {this.state.pageActive == 2 &&
                    <BodyFriendsComponent />
                }


                {this.state.pageActive == 3 &&
                    <BodyAddFriendsComponent />
                }


            </View>
        )
    }
}

export default HomeScreen
