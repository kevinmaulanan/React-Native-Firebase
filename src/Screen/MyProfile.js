import React, { Component } from 'react'
import { View, ScrollView, Image, Text, FlatList } from 'react-native'
import { withNavigation } from 'react-navigation'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome5'
// import ImagePicker from 'react-native-image-picker'
import { storage, auth } from '../Config/firebase'


class Profile extends Component {
    state = {
        foto: ['../Component/default_foto.png', '../Component/default_foto.png', '../Component/default_foto.png', '../Component/default_foto.png'
            , '../Component/default_foto.png'
        ],
        filePath: {},
    }

    // upload() {
    //     const image = {
    //         type: "image/jpeg",
    //         uri: this.state.filePath.uri,
    //         name: this.state.filePath.fileName
    //     }
    //     ref.put(image).then(function (snapshot) {
    //         console.log(snapshot)
    //         console.log('Uploaded a blob or file!');
    //     })
    // }

    // chooseFile = () => {
    //     const options = {
    //         noData: true,
    //     };

    //     ImagePicker.showImagePicker(options, response => {
    //         if (response.didCancel) {
    //             console.log('User cancelled image picker');
    //         } else if (response.error) {
    //             console.log('ImagePicker Error: ', response.error);
    //         } else if (response.customButton) {
    //             console.log('User tapped custom button: ', response.customButton);
    //             alert(response.customButton);
    //         } else {
    //             let source = response;
    //             this.setState({
    //                 filePath: source,
    //             });
    //             this.upload()
    //         }
    //     });
    // };

    render() {
        console.log(auth)

        return (
            <ScrollView style={{ flex: 1, backgroundColor: '#FCCAE5' }}>

                <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
                    <TouchableOpacity onPress={() => this.upload()}>
                        <Image source={require('../Asset/default_foto.png')} style={{ height: 200, width: 200, borderRadius: 140 }}></Image>
                    </TouchableOpacity>
                </View>

                <ScrollView style={{ backgroundColor: 'white' }}>
                    <View style={{ height: 150, width: '100%', marginHorizontal: 20, marginVertical: 8 }}>
                        <View style={{ height: 30 }}>
                            <Text style={{ color: '#f590e6', fontSize: 14 }}>Status dan Username</Text>
                        </View>

                        <View style={{ height: 60, flexDirection: 'row' }}>
                            <View style={{ flex: 2 }}>
                                <Text style={{ fontSize: 18 }}>No Status</Text>
                                <Text style={{ fontSize: 14, color: 'grey' }}>Status</Text>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 20, color: 'blue' }}>Edit</Text>
                            </View>
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
                            <Text style={{ color: '#f590e6', fontSize: 12 }}>Temanku (26)</Text>
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

const MyProfileScreen = withNavigation(Profile)
export default MyProfileScreen