import React, { Component } from 'react'
import { Image, View, ScrollView, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { withNavigation } from 'react-navigation';

class BodyFriends extends Component {
    render() {
        return (
            <ScrollView >
                <View style={{ flex: 1, marginBottom: 5 }}>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ flex: 1, marginLeft: 10, marginVertical: 10, }}>
                            <Image source={require('../Asset/default_foto.png')}
                                style={{ height: 60, width: 60 }}>
                            </Image>
                        </View>
                        <View style={{ flex: 4, flexDirection: 'row', marginRight: 10, marginLeft: 20, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
                            < View style={{ flex: 3 }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('ProfileScreen')}>
                                    < Text style={{ fontSize: 18 }}>Kevin Maulana </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <View style={{ width: 10, height: 10, backgroundColor: 'green', borderRadius: 10 }}></View>
                            </View>
                        </View>
                    </View>

                    <View style={{ backgroundColor: 'grey', flex: 1, height: 0.5, }}>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ flex: 1, marginLeft: 10, marginVertical: 10, }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('ProfileScreen')}>
                                <Image source={require('../Asset/default_foto.png')}
                                    style={{ height: 60, width: 60 }}>
                                </Image>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 4, flexDirection: 'row', marginRight: 10, marginLeft: 20, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
                            < View style={{ flex: 3 }}>

                                < Text style={{ fontSize: 18 }}>Kevin Maulana </Text>

                            </View>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <View style={{ width: 10, height: 10, backgroundColor: 'red', borderRadius: 10 }}></View>
                            </View>
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

const BodyFriendsComponent = withNavigation(BodyFriends)

export default BodyFriendsComponent
