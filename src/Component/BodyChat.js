import React, { Component } from 'react'
import { withNavigation } from 'react-navigation'
import { ScrollView, Text, View } from 'react-native'
import { auth, db } from '../Config/firebase'



class BodyChat extends Component {
    state = {
        data: null
    }

    componentDidMount() {
        this.getMessage()
    }

    getMessage() {
        let pesanRef = db.ref('/pesan');
        pesanRef.on('value', (res) => {
            let data = res.val();
            const objectArray = Object.values(data)
            console.log('ObjectArray', objectArray)
            this.setState({ data: objectArray })

        })
    }


    render() {
        console.log('data friend', this.props.data)
        console.log('data ku', auth.currentUser.email)
        console.log('data pesan', this.state.data)
        return (
            <ScrollView style={{ flex: 1, backgroundColor: '#FCCAE5' }}>
                {this.state.data &&
                    this.state.data.map((v) => {
                        <>
                            <View style={{ borderRadius: 15, width: 250, backgroundColor: 'white', marginHorizontal: 10, marginTop: 10 }}>
                                <Text>{v.pesan}</Text>
                                <Text style={{ textAlign: 'right', marginTop: -16, color: 'grey' }}>07.12</Text>
                            </View>
                        </>
                        console.log(v)
                        if (v.pengirim == auth.currentUser.email && v.penerima == this.props.data.email || v.pengirim == this.props.data.email && v.penerima == auth.currentUser.email) {
                            if (v.pengirim == auth.currentUser.email) {
                                return (
                                    <View style={{ alignItems: 'flex-end' }}>
                                        <View style={{ borderRadius: 10, minWidth: 100, maxWidth: 250, backgroundColor: '#f07df0', marginHorizontal: 10, marginTop: 10 }}>
                                            <View style={{}}>
                                                <View style={{ margin: 10 }}>
                                                    <Text>
                                                        {v.pesan}
                                                    </Text>
                                                    <Text style={{ textAlign: 'right', marginTop: -5, color: 'grey', fontSize: 12 }}>{v.jam}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>

                                )
                            } else if (v.penerima == auth.currentUser.email) {
                                return (
                                    <View style={{ marginHorizontal: 1, marginTop: 10, alignItems: 'flex-start' }}>
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


                            }
                        } else {
                            console.log('woi pp')
                        }

                    })

                }


            </ScrollView >
        )
    }
}

const BodyChatComponent = withNavigation(BodyChat)

export default BodyChatComponent
