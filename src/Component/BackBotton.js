//import liraries
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { withNavigation } from 'react-navigation';



// create a component
class BackButtonComponent extends Component {

    render() {
        return (
            <View style={styles.container} >
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                    <Icon name="ios-arrow-back" style={styles.icon} />
                </TouchableOpacity>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        borderRadius: 30,
    },
    icon: {
        fontSize: 30,
        color: '#3399ff'
    },
});

const BackButton = withNavigation(BackButtonComponent)
export default BackButton;
