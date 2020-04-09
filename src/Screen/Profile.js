import React, { Component } from 'react'
import { View, ScrollView, Image, Text, FlatList } from 'react-native'
import { withNavigation } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome5'


class Profile extends Component {
    state = {
        foto: ['../Component/default_foto.png', '../Component/default_foto.png', '../Component/default_foto.png', '../Component/default_foto.png'
            , '../Component/default_foto.png'

        ]
    }
    render() {

        return (
            <ScrollView style={{ flex: 1, backgroundColor: '#FCCAE5' }}>

                <View>
                    <Image source={require('../Asset/default_foto.png')} style={{ height: 200, width: '100%' }}></Image>
                </View>

                <ScrollView style={{ marginTop: 10, backgroundColor: 'white' }}>
                    <View style={{ height: 90, width: '100%', marginHorizontal: 20, marginVertical: 8 }}>
                        <View style={{ height: 30 }}>
                            <Text style={{ color: '#f590e6', fontSize: 14 }}>Info</Text>
                        </View>

                        <View style={{ height: 60 }}>
                            <Text style={{ fontSize: 18 }}>Berteman</Text>
                            <Text style={{ fontSize: 14, color: 'grey' }}>Teman</Text>
                        </View>

                    </View>
                </ScrollView>

                <ScrollView style={{ marginTop: 10, backgroundColor: 'white' }}>
                    <View style={{ height: 150, width: '100%', marginHorizontal: 20, marginVertical: 8 }}>
                        <View style={{ height: 30 }}>
                            <Text style={{ color: '#f590e6', fontSize: 14 }}>Status dan Username</Text>
                        </View>

                        <View style={{ height: 60 }}>
                            <Text style={{ fontSize: 18 }}>No Status</Text>
                            <Text style={{ fontSize: 14, color: 'grey' }}>Status</Text>
                        </View>

                        <View style={{ height: 60 }}>
                            <Text style={{ fontSize: 18 }}>Kevin Maulana</Text>
                            <Text style={{ fontSize: 14, color: 'grey' }}>Username</Text>
                        </View>
                    </View>
                </ScrollView>

                <ScrollView style={{ marginTop: 10, backgroundColor: 'white' }}>
                    <View style={{ height: 100, width: '100%', marginHorizontal: 20, marginVertical: 8, }}>
                        <View style={{ height: 30 }}>
                            <Text style={{ color: '#f590e6', fontSize: 12 }}>Teman (26)</Text>
                        </View>

                        <ScrollView style={{ flex: 1 }} horizontal>
                            <FlatList
                                horizontal={true}
                                data={this.state.foto}
                                renderItem={({ item, index }) =>
                                    <Image source={require('../Asset/default_foto.png')} style={{ height: 50, width: 50, borderRadius: 30, marginRight: 8 }}></Image>

                                } />
                            <Text style={{ fontSize: 32, textAlign: 'center', marginTop: 2, marginLeft: 10, color: '#f590e6' }}>></Text>
                        </ScrollView>

                    </View>
                </ScrollView>

                <View style={{ height: 30 }}></View>

            </ScrollView >
        )
    }
}

const ProfileScreen = withNavigation(Profile)
export default ProfileScreen