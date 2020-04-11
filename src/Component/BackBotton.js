//import liraries
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { withNavigation } from 'react-navigation';



// create a component
class BackButtonComponent extends Component {

    render() {

        return (
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <View style={{
                    marginTop: 7, justifyContent: 'center', alignItems: 'center', width: 40, height: 40, borderRadius: 30,
                }} >
                    <Icon name="ios-arrow-back" size={26} color='white' />
                </View>
            </TouchableOpacity >
        );
    }
}

// define your styles


const BackButton = withNavigation(BackButtonComponent)
export default BackButton;
