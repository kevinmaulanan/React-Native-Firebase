import React, { Component } from 'react'
import { View, Text, Image, Modal } from 'react-native'
import { Button } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { TouchableOpacity } from 'react-native-gesture-handler'
import BodyHomeComponent from '../Component/BodyHome'
import BodyFriendsComponent from '../Component/BodyFriends'
import BodyAddFriendsComponent from '../Component/BodyAddFriends'

class HomeScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pageActive: 1,
            modalSetting: false,
        }
    }

    toogleModalSetting() {
        this.setState({ modalSetting: !this.state.modalSetting })
    }

    toogleMyProfile() {
        this.setState({ modalSetting: !this.state.modalSetting })
        this.props.navigation.navigate('MyProfileScreen')
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ height: 105, backgroundColor: '#f590e6' }}>
                    <View style={{ height: 50, flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ width: 130, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('MyProfileScreen')}>
                                <Image source={require('../Asset/Navbar.png')} style={{ width: 95, height: 25 }} ></Image>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center', marginHorizontal: 20 }}>
                            <TouchableOpacity onPress={() => this.toogleModalSetting()}>
                                <Icon name="ellipsis-v" size={20} color="white" />
                            </TouchableOpacity>

                            <Modal
                                animationType="fade"
                                transparent={true}
                                visible={this.state.modalSetting}
                                onRequestClose={() => {
                                    this.toogleModalSetting();
                                }}
                            >
                                <View style={{ height: 90, width: 140, marginLeft: 210, marginTop: 10, backgroundColor: 'white', }}>
                                    <View style={{ marginHorizontal: 10, justifyContent: 'center' }}>
                                        <View style={{ height: 40 }}>
                                            <Button transparent onPress={() => this.toogleMyProfile()}>
                                                <Text style={{ fontSize: 16 }}>Lihat Profile</Text>
                                            </Button>
                                        </View>
                                        <View style={{ height: 40 }}>
                                            <Button transparent onPress={() => this.toogleModalSetting()}>
                                                <Text style={{ fontSize: 16 }}>Batal</Text>
                                            </Button>
                                        </View>
                                    </View>
                                </View>
                            </Modal>

                        </View>
                    </View>

                    <View style={{ height: 45, flexDirection: 'row', alignItems: 'center', }}>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity onPress={() => this.setState({ pageActive: 1 })}>
                                <View style={{ height: 50, justifyContent: 'center' }}>
                                    <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', color: `${this.state.pageActive == 1 ? 'white' : '#fce8f2'}` }}>CHAT</Text>
                                </View>
                            </TouchableOpacity>

                            {this.state.pageActive == 1 &&
                                <View style={{ height: 5, justifyContent: 'center', alignItems: 'center', marginTop: -8 }}>
                                    <View style={{ height: 1, backgroundColor: 'white', width: 110 }}></View>
                                </View>
                            }
                        </View>

                        <View style={{ flex: 1 }}>
                            <TouchableOpacity onPress={() => this.setState({ pageActive: 2 })}>
                                <View style={{ height: 50, justifyContent: 'center' }}>
                                    <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', color: `${this.state.pageActive == 2 ? 'white' : '#fce8f2'}` }}>TEMAN</Text>
                                </View>
                            </TouchableOpacity>

                            {this.state.pageActive == 2 &&
                                <View style={{ height: 5, justifyContent: 'center', alignItems: 'center', marginTop: -8 }}>
                                    <View style={{ height: 1, backgroundColor: 'white', width: 110 }}></View>
                                </View>
                            }
                        </View>

                        <View style={{ flex: 1 }}>
                            <TouchableOpacity onPress={() => this.setState({ pageActive: 3 })}>
                                <View style={{ height: 50, justifyContent: 'center' }}>
                                    <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', color: `${this.state.pageActive == 3 ? 'white' : '#fce8f2'}` }}>CARI</Text>
                                </View>
                            </TouchableOpacity>

                            {this.state.pageActive == 3 &&
                                <View style={{ height: 5, justifyContent: 'center', alignItems: 'center', marginTop: -8 }}>
                                    <View style={{ height: 1, backgroundColor: 'white', width: 110 }}></View>
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
