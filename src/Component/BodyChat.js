import React, { Component } from 'react'
import { withNavigation } from 'react-navigation'
import { ScrollView, Text, View } from 'react-native'

class BodyChat extends Component {
    render() {
        return (
            <ScrollView style={{ flex: 1, backgroundColor: '#FCCAE5' }}>
                <View style={{ borderRadius: 15, width: 250, backgroundColor: 'white', marginHorizontal: 10, marginTop: 10 }}>
                    <View style={{ margin: 7 }}>
                        <Text>Kevin Maulana Kevin Maulana Kevin Maulana Kevin Maulana Kevin Maulana Kevin Maulana Kevin Maulana</Text>
                    </View>
                </View>

                <View style={{ alignItems: 'flex-end' }}>
                    <View style={{ borderRadius: 15, width: 250, backgroundColor: '#ff7df8', marginHorizontal: 10, marginTop: 10 }}>
                        <View style={{ margin: 7 }}>
                            <Text>Kevin Maulana Kevin Maulana Kevin Maulana Kevin Maulana Kevin Maulana Kevin Maulana Kevin Maulana</Text>
                        </View>
                    </View>
                </View>

            </ScrollView>
        )
    }
}

const BodyChatComponent = withNavigation(BodyChat)

export default BodyChatComponent
