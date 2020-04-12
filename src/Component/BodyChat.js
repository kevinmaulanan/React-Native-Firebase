import React, { Component } from 'react'
import { withNavigation } from 'react-navigation'
import { ScrollView, Text, View, Image, Linking, } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { auth, db } from '../Config/firebase'
import { Button } from 'native-base'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import NetInfo from "@react-native-community/netinfo"



class BodyChat extends Component {
    state = {
        data: null,
        isConnected: true,
    }

    componentDidMount() {
        this.getMessage()
        this.getStatusConnection()
    }

    getStatusConnection() {
        const unsubscribe = NetInfo.addEventListener(state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
            this.setState({ isConnected: state.isConnected })
        })
        unsubscribe()
    }

    getMessage() {
        let pesanRef = db.ref('/pesan');
        pesanRef.on('value', (res) => {
            let data = res.val();
            const objectArray = Object.values(data)
            this.setState({ data: objectArray })

        })
    }


    render() {
        console.log(this.props.data)
        return (
            <ScrollView style={{ flex: 1, backgroundColor: '#FCCAE5', marginVertical: 8 }}>

                {this.state.isConnected !== true &&
                    <View style={{ width: 200, height: 60, alignItems: 'center', alignContent: 'center', marginLeft: 80 }}>
                        <View style={{ width: 180, height: 60, backgroundColor: 'red' }}>
                            <View style={{ height: 25, alignItems: 'center', alignContent: 'center' }}>
                                <Text style={{ fontSize: 14, color: 'white' }}>Tidak Ada Koneksi</Text>
                            </View>
                            <View style={{ height: 25, alignItems: 'center', alignContent: 'center', borderRadius: 10 }}>
                                <TouchableOpacity onPress={() => this.getStatusConnection()}>
                                    <Button transparent>
                                        <Text style={{ fontSize: 14, color: 'white' }}>Reload</Text>
                                    </Button>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                }




                {this.state.data &&
                    this.state.data.map((v) => {
                        <>
                            <View style={{ borderRadius: 15, width: 250, backgroundColor: 'white', marginHorizontal: 10, marginTop: 10 }}>
                                <Text>{v.pesan}</Text>
                                <Text style={{ textAlign: 'right', marginTop: -16, color: 'grey' }}>07.12</Text>
                            </View>
                        </>
                        if (v.pengirim == auth.currentUser.email && v.penerima == this.props.data.data.email || v.pengirim == this.props.data.data.email && v.penerima == auth.currentUser.email) {
                            if (v.pengirim == auth.currentUser.email) {
                                if (v.pesan) {
                                    return (
                                        <View style={{ alignItems: 'flex-end' }}>
                                            <View style={{ borderRadius: 10, minWidth: 100, maxWidth: 250, backgroundColor: '#fdbce7', marginHorizontal: 10, marginTop: 10 }}>
                                                <View style={{}}>
                                                    <View style={{ margin: 10 }}>
                                                        <Text>
                                                            {v.pesan}
                                                        </Text>
                                                        <Text style={{ textAlign: 'right', marginTop: -5, opacity: 0.5, fontSize: 12 }}>{v.jam}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                } else {
                                    return (
                                        <View style={{ alignItems: 'flex-end' }}>
                                            <View style={{ borderRadius: 10, minWidth: 100, maxWidth: 250, backgroundColor: '#fdbce7', marginHorizontal: 10, marginTop: 10 }}>
                                                <View style={{}}>
                                                    <View style={{ margin: 5 }}>
                                                        <MapView ref="map" provider={PROVIDER_GOOGLE} style={{ height: 140, minWidth: 160 }} region={{
                                                            latitude: v.latitude, longitude: v.longitude, latitudeDelta: 0.015, longitudeDelta: 0.0121,
                                                        }}
                                                        >
                                                            <MapView.Marker coordinate={{
                                                                latitude: v.latitude, longitude: v.longitude,
                                                            }}
                                                                anchor={{ x: 0.5, y: 0.4 }}
                                                                title="Lokasi"
                                                                description={this.props.data.data.username} >
                                                                <View>
                                                                    <Image source={{ uri: this.props.data.data.image }} style={{ width: 40, height: 40, borderRadius: 40, borderWidth: 1, borderColor: 'blue' }}></Image>
                                                                </View>
                                                            </MapView.Marker>

                                                        </MapView>
                                                    </View>
                                                    <View style={{ margin: 10 }}>
                                                        <Button transparent onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${v.latitude},${v.longitude}`)}>
                                                            <Text style={{ fontSize: 16, color: 'blue' }}>https://www.google.com/maps/search/?api=1&query={v.latitude},{v.longitude}</Text>
                                                        </Button>
                                                        <Text style={{ textAlign: 'right', marginTop: -5, opacity: 0.5, fontSize: 12 }}>{v.jam}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                }

                            } else if (v.penerima == auth.currentUser.email) {
                                if (v.pesan) {
                                    return (
                                        <View style={{ marginHorizontal: 4, marginTop: 10, alignItems: 'flex-start' }}>
                                            <View style={{ marginHorizontal: 5, marginVertical: 1, minWidth: 100, maxWidth: 140, backgroundColor: 'white', borderRadius: 10, }}>
                                                <View style={{ minWidth: 80, margin: 6 }}>
                                                    <Text>
                                                        {v.pesan}
                                                    </Text>

                                                    <Text style={{ textAlign: 'right', marginTop: -5, color: 'grey', fontSize: 12 }}>{v.jam}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                } else {
                                    return (
                                        <View style={{}}>
                                            <View style={{ borderRadius: 10, minWidth: 100, maxWidth: 250, backgroundColor: 'white', marginHorizontal: 10, marginTop: 10 }}>
                                                <View style={{}}>
                                                    <View style={{ margin: 5 }}>
                                                        <MapView ref="map" provider={PROVIDER_GOOGLE} style={{ height: 140, minWidth: 160 }} region={{
                                                            latitude: v.latitude, longitude: v.longitude, latitudeDelta: 0.015, longitudeDelta: 0.0121,
                                                        }}
                                                        >

                                                            <MapView.Marker coordinate={{
                                                                latitude: v.latitude, longitude: v.longitude,
                                                            }}
                                                                anchor={{ x: 0.5, y: 0.4 }}
                                                                title="Lokasi"
                                                                description="kevin" >

                                                                {this.props.data.data.image == '' &&
                                                                    <View style={{ alignItems: 'center' }}>
                                                                        <Image source={require('../Asset/default_foto.png')} style={{ width: 40, height: 40, borderRadius: 50 }}></Image>
                                                                        <Text style={{}}>{this.props.data.data.username}</Text>

                                                                    </View>
                                                                }

                                                                {this.props.data.data.image !== '' &&
                                                                    <View>
                                                                        <Image source={{ uri: this.props.data.data.image }} style={{ width: 40, height: 40, borderRadius: 50 }}></Image>
                                                                        <Text style={{ textAlign: 'center' }}>{this.props.data.data.username}</Text>
                                                                    </View>
                                                                }

                                                            </MapView.Marker>

                                                        </MapView>
                                                    </View>
                                                    <View style={{ margin: 10 }}>
                                                        <Button transparent onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${v.latitude},${v.longitude}`)}>
                                                            <Text style={{ fontSize: 16, color: '#547cff' }}>https://www.google.com/maps/search/?api=1&query={v.latitude},{v.longitude}</Text>
                                                        </Button>
                                                        <Text style={{ textAlign: 'right', marginTop: -5, opacity: 0.5, fontSize: 12 }}>{v.jam}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    )

                                }



                            }
                        } else {

                        }

                    })

                }









            </ScrollView >
        )
    }
}

const BodyChatComponent = withNavigation(BodyChat)

export default BodyChatComponent
