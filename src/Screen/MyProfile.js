import React, { Component } from 'react'
import { View, ScrollView, Image, Text, FlatList, StyleSheet, Modal, Alert, YellowBox, TextInput, Button } from 'react-native'
import { withNavigation } from 'react-navigation'
import { TouchableOpacity, TouchableHighlight } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome5'
import ImagePicker from 'react-native-image-picker'
import { storage, auth, db } from '../Config/firebase'
import uriBlob from '../Helper/blob'

YellowBox.ignoreWarnings([
    'VirtualizedList: missing keys for items',
    'Setting a timer for a long',
    'VirtualizedLists should never be nested',
    'Failed child context type',
    `Can't perform a React state update on an`

])

class Profile extends Component {
    state = {
        foto: ['../Component/default_foto.png', '../Component/default_foto.png', '../Component/default_foto.png', '../Component/default_foto.png'
            , '../Component/default_foto.png'
        ],
        filePath: {},
        myId: null,
        myProfile: null,
        myImage: null,
        myStatus: null,
        modalVisible: false,
        modalStatus: false,
        fullname: '',
        status: '',
        filePath: []
    }


    componentDidMount() {
        this.listenMyData()
    }

    toogleModalStatus() {
        this.setState({ modalStatus: !this.state.modalStatus })
    }

    toogleModalFullname() {
        this.setState({ modalVisible: !this.state.modalVisible })
    }


    listenMyData() {
        let itemsRef = db.ref('/data-username');
        itemsRef.on('value', (res) => {
            let data = res.val();
            const objectKeys = Object.keys(data)
            const objectArray = Object.values(data)

            for (let i = 0; i < objectArray.length; i++) {
                if (objectArray[i].email == auth.currentUser.email) {
                    this.setState({ myProfile: objectArray[i], myId: objectKeys[i], })
                    if (objectArray[i].image !== '') {
                        this.setState({ myImage: 'oke' })
                    }
                    if (objectArray[i].status !== '') {
                        this.setState({ myStatus: 'oke' })
                    }
                } else {

                }
            }
        })
    }

    updateFullName() {
        const fullname = this.state.fullname
        const id = this.state.myId
        db.ref('data-username/' + id).update({
            username: fullname,
        })
        this.toogleModalFullname()
    }

    updateStatus() {
        const status = this.state.status
        const id = this.state.myId
        db.ref('data-username/' + id).update({
            status: status,
        })
        if (status == '') {
            this.setState({ myStatus: null })
        }
        this.toogleModalStatus()
    }

    logoutUser() {
        auth.signOut().then(() => {
            this.props.navigation.navigate('LoginScreen')
        }).catch(function (error) {
        })
    }

    chooseFile = () => {
        const options = {
            noData: true,
        };

        ImagePicker.showImagePicker(options, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                let source = response;

                this.setState({
                    filePath: source,
                });
                this.submitCreateItems()
            }
        });
    };

    async submitCreateItems() {
        try {
            const image = {
                name: this.state.filePath.fileName,
                uri: this.state.filePath.uri,
            }

            var metadata = {
                contentType: this.state.filePath.type
            };

            var blob = await uriBlob(this.state.filePath.uri);
            const data = await storage.ref(`images-profile/${this.state.myProfile.email}/MyChat-${image.name}`).put(blob, metadata)
            if (data) {
                storage.ref(data.metadata.fullPath).getDownloadURL().then((downloadURL) => {

                    const id = this.state.myId
                    db.ref('data-username/' + id).update({
                        image: `${downloadURL}`,
                    })
                })
            }
        } catch (error) {
            console.log(error)
        }
    }



    render() {
        return (
            <ScrollView style={{ flex: 1, backgroundColor: '#FCCAE5', }} >
                <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
                    <TouchableOpacity onPress={() => this.chooseFile()}>
                        {this.state.myImage !== null &&
                            <Image source={{ uri: `${this.state.myProfile.image}` }} style={{ height: 200, width: 200, borderRadius: 140 }}></Image>

                        }

                        {this.state.myImage == null &&
                            <Image source={require('../Asset/default_foto.png')} style={{ height: 200, width: 200, borderRadius: 140 }}></Image>

                        }
                    </TouchableOpacity>
                </View>

                <ScrollView style={{ backgroundColor: 'white' }}>
                    <View style={{ minHeight: 150, width: '100%', marginHorizontal: 20, marginVertical: 8, }}>
                        <View style={{ height: 30 }}>
                            <Text style={{ color: '#f590e6', fontSize: 14 }}>Status dan Username</Text>
                        </View>

                        <View style={{ height: 60, flexDirection: 'row', }}>

                            <View style={{ flex: 2 }}>
                                {this.state.myStatus !== null &&
                                    <Text style={{ fontSize: 18 }}>{this.state.myProfile.status}</Text>
                                }

                                {this.state.myStatus == null &&
                                    <Text style={{ fontSize: 18 }}>Tidak Ada Status</Text>
                                }
                                <Text style={{ fontSize: 14, color: 'grey' }}>Status</Text>
                            </View>

                            <View style={{ flex: 1, marginTop: 10, opacity: 0.5 }}>
                                <TouchableOpacity onPress={() => this.setState({ modalStatus: !this.state.modalStatus })}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ marginRight: 5 }}>
                                            <Text style={{ fontSize: 17, color: 'grey' }}>Edit</Text>
                                        </View>

                                        <View>
                                            <Icon name='edit' size={22} style={{ color: 'grey' }}></Icon>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>


                        <View style={{ height: 60, flexDirection: 'row', marginBottom: 10 }}>
                            <View style={{ flex: 2 }}>
                                {this.state.myProfile !== null &&
                                    <Text style={{ fontSize: 18 }}>{this.state.myProfile.username}</Text>
                                }


                                {this.state.myProfile == null &&
                                    <Text style={{ fontSize: 18 }}>null</Text>
                                }
                                <Text style={{ fontSize: 14, color: 'grey' }}>Username</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity onPress={() => this.setState({ modalVisible: !this.state.modalVisible })}>
                                    <View style={{ flexDirection: 'row', marginTop: 10, opacity: 0.5 }}>
                                        <View style={{ marginRight: 5 }}>
                                            <Text style={{ fontSize: 17, color: 'grey' }}>Edit</Text>
                                        </View>

                                        <View>
                                            <Icon name='edit' size={22} style={{ color: 'grey' }}></Icon>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
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


                <View style={{ height: 10 }}></View>


                {
                    this.state.modalVisible === true &&
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            this.toogleModalFullname();
                        }}
                    >
                        <View style={{ flex: 2 }}></View>
                        <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center' }}>
                            <View style={{ marginHorizontal: 20, marginVertical: 10, justifyContent: 'center' }}>
                                <View style={{ height: 30, }}>
                                    <Text style={{ fontWeight: 'bold', color: '#f590e6', fontSize: 18 }}>Masukkan nama Anda</Text>
                                </View>

                                <View style={{ height: 40, backgroundColor: 'white', marginTop: 10 }}>
                                    <View style={{ height: 38 }}>
                                        {this.state.myProfile !== null &&
                                            <TextInput style={{ fontSize: 16, }} placeholder='Fullname'
                                                defaultValue={this.state.myProfile.username}
                                                onChangeText={fullname => this.setState({ fullname })}
                                            ></TextInput>
                                        }
                                    </View>
                                    <View style={{ height: 3, backgroundColor: '#f590e6', marginTop: -5 }}>
                                    </View>
                                </View>



                                <View style={{ height: 40, marginTop: 10, flexDirection: 'row', marginHorizontal: 10 }}>
                                    <View style={{ flex: 1 }}></View>
                                    <View style={{ flex: 1, justifyContent: 'center' }}>
                                        <Button title='Batal' color="#f590e6" onPress={() => this.toogleModalFullname()}></Button>
                                    </View>

                                    <View style={{ flex: 1, justifyContent: 'center', marginHorizontal: 10 }}>
                                        <TouchableOpacity onPress={() => this.updateFullName()}>
                                            <Button title='Ganti' color="#f590e6" onPress={() => this.updateFullName()}></Button>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                            </View>
                        </View>
                    </Modal>
                }


                {
                    this.state.modalStatus === true &&
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={this.state.modalStatus}
                        onRequestClose={() => {
                            this.toogleModalStatus();
                        }}
                    >
                        <View style={{ flex: 2 }}></View>
                        <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center' }}>
                            <View style={{ marginHorizontal: 20, marginVertical: 10, justifyContent: 'center' }}>
                                <View style={{ height: 30, }}>
                                    <Text style={{ fontWeight: 'bold', color: '#f590e6', fontSize: 18 }}>Masukkan Status Anda</Text>
                                </View>

                                <View style={{ height: 40, backgroundColor: 'white', marginTop: 10 }}>
                                    <View style={{ height: 38 }}>
                                        {this.state.myProfile !== null &&
                                            <TextInput style={{ fontSize: 16, }} placeholder='Status...'
                                                defaultValue={this.state.myProfile.status}
                                                onChangeText={status => this.setState({ status })}
                                            ></TextInput>
                                        }
                                    </View>
                                    <View style={{ height: 3, backgroundColor: '#f590e6', marginTop: -5 }}>
                                    </View>
                                </View>



                                <View style={{ height: 40, marginTop: 10, flexDirection: 'row', marginHorizontal: 10 }}>
                                    <View style={{ flex: 1 }}></View>
                                    <View style={{ flex: 1, justifyContent: 'center' }}>
                                        <Button title='Batal' color="#f590e6" onPress={() => this.toogleModalStatus()}></Button>
                                    </View>

                                    <View style={{ flex: 1, justifyContent: 'center', marginHorizontal: 10 }}>
                                        <TouchableOpacity onPress={() => this.updateStatus()}>
                                            <Button title='Ganti' color="#f590e6" onPress={() => this.updateStatus()}></Button>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                            </View>
                        </View>
                    </Modal>
                }

                < View style={{ height: 20 }}>
                    <Button title='Logout' color='#f590e6' onPress={() => this.logoutUser()}></Button>
                </View >

                <View style={{ height: 30 }}></View>
            </ScrollView >
        )
    }
}


const MyProfileScreen = withNavigation(Profile)
export default MyProfileScreen