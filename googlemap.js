import React, { Component } from 'react'

import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { StyleSheet, View, Button, Image, Text, TextInput, FlatList, ScrollView, YellowBox } from 'react-native';
import { db } from './src/Config/firebase';

YellowBox.ignoreWarnings([
    'VirtualizedLists should never be nested',
    'VirtualizedList: missing keys for items',
    'Failed child context type',
    'Each child in a list should',
    'Setting a timer for a long period'
])

export default class App extends Component {

    state = {
        name: '',
        latitude: null,
        longitude: null,
        data: [],
    }

    componentDidMount() {
        this.listenData()
    }

    handleSend() {
        const { name, latitude, longitude } = this.state
        this.addData(name, parseFloat(latitude), parseFloat(longitude));
        this.setState({ name: '', latitude: null, longitude: null })
    }


    addData(name, latitude, longitude) {
        try {
            db.ref('/data-name').push({
                name,
                latitude,
                longitude
            })

        } catch (error) {
            console.log(error)
        }
    }

    updateData() {

    }

    deleteData() {

    }


    listenData() {
        let itemsRef = db.ref('/data-name');
        itemsRef.on('value', (res) => {
            let data = res.val();
            const objectArray = Object.values(data)
            console.log('ObjectArray', objectArray)
            this.setState({ data: objectArray })

        })
    }


    handleMove() {
        this.refs.map.animateToRegion({
            latitude: -6.5950181,
            longitude: 106.7218509,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
        })
    }


    handleBalik() {
        this.refs.map.animateToRegion({
            latitude: -6.5950181,
            longitude: 106.7218509,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
        })
    }

    render() {
        console.log('datadatadatadatadatadata', this.state.data)
        return (
            <View style={styles.container}>
                <View style={{ flex: 1, marginBottom: 20 }}>
                    <MapView
                        ref="map"
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={styles.map}
                        region={{
                            latitude: -6.5950181,
                            longitude: 106.7218509,
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.0121,
                        }}
                    >

                        {this.state.data !== [] &&
                            this.state.data.map((item, index) =>
                                < MapView.Marker
                                    coordinate={{
                                        latitude: parseFloat(item.latitude),
                                        longitude: parseFloat(item.longitude),
                                    }}
                                    anchor={{ x: 1, y: 0.4 }}
                                    title="Lokasi"
                                    description={item.name} >
                                    <View>
                                        <Image source={{ uri: "https://4.bp.blogspot.com/_S0f-AWxKVdM/S5TpU6kRmUI/AAAAAAAAL4Y/wrjx3_23kw4/d_silhouette%5B2%5D.jpg?imgmax=800" }} style={{ width: 40, height: 40, borderRadius: 40, borderWidth: 1, borderColor: 'blue' }}></Image>
                                        <Text style={{ textAlign: 'center' }}>{item.name}</Text>
                                    </View>
                                </MapView.Marker>

                            )}


                    </MapView>

                </View>



                <ScrollView style={{ flex: 2 }}>
                    <Button onPress={() => this.handleMove()} title="Pindah"></Button>
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1 }}>
                            <TextInput
                                onChangeText={(text) => this.setState({ name: text })}
                                placeholder="Masukkan Nama"
                                value={this.state.name}
                            ></TextInput>
                        </View>
                        <View style={{ flex: 1 }}>
                            <TextInput
                                onChangeText={(text) => this.setState({ latitude: text })}
                                placeholder="Masukkan latitude"
                                value={this.state.latitude}
                            ></TextInput>
                        </View>
                        <View style={{ flex: 1 }}>
                            <TextInput
                                onChangeText={(text) => this.setState({ longitude: text })}
                                placeholder="Masukkan longitude"
                                value={this.state.longitude}
                            ></TextInput>
                        </View>
                    </View>
                    <Button onPress={() => this.handleSend()} title="Kirim"></Button>
                    <FlatList
                        data={this.state.data}
                        renderItem={({ item, index }) =>

                            <Text style={{ color: 'black' }}>{' '} {index + 1} {item.name}  {item.latitude} {item.longitude}</Text>

                        }
                    />
                </ScrollView>
            </View >
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 3,
        height: 400,
        width: 400,

    },
    map: {
        ...StyleSheet.absoluteFillObject,

    },
});