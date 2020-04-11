import React, { Component } from 'react'
import { View, ScrollView, Image, Text, FlatList } from 'react-native'
import { withNavigation } from 'react-navigation'
import { db, auth } from '../Config/firebase'
import Icon from 'react-native-vector-icons/FontAwesome5'


class Profile extends Component {
    state = {
        foto: ['../Component/default_foto.png', '../Component/default_foto.png', '../Component/default_foto.png', '../Component/default_foto.png'
            , '../Component/default_foto.png'

        ],
        profile: {},
        image: null,
    }

    componentDidMount() {
        this.listenMyData()
    }
    listenMyData() {
        let itemsRef = db.ref(`/data-username/`);
        itemsRef.on('value', (res) => {
            let data = res.val();
            const objectArray = Object.values(data)
            const email = this.props.navigation.state.params.data.data.email
            for (let i = 0; i < objectArray.length; i++) {
                if (objectArray[i].email == email) {
                    this.setState({ profile: objectArray[i] })

                    if (objectArray[i].image !== '') {
                        this.setState({ image: 'oke' })
                    }
                } else {

                }
            }
        })
    }
    render() {
        console.log(this.state.profile)
        console.log(this.props.navigation.state.params.data.data, 'params')
        console.log(this.state.image, 'params')
        return (
            <ScrollView style={{ flex: 1, backgroundColor: '#FCCAE5' }}>

                <View>
                    {this.state.image == null &&
                        <Image source={require('../Asset/default_foto.png')} style={{ height: 250, width: '100%' }}></Image>
                    }

                    {this.state.image !== null &&
                        <Image source={{ uri: this.state.profile.image }} style={{ height: 250, width: '100%' }}></Image>
                    }
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
                            {this.state.profile &&
                                <Text style={{ fontSize: 18 }}>{this.state.profile.status}</Text>
                            }
                            <Text style={{ fontSize: 14, color: 'grey' }}>Status</Text>
                        </View>

                        <View style={{ height: 60 }}>
                            {this.state.profile &&
                                <Text style={{ fontSize: 18 }}>{this.state.profile.username}</Text>
                            }
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