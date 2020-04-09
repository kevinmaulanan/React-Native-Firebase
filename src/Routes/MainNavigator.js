import React, { Component } from 'react'
import PrivateNavigator from './PrivateNavigator'
import PublicNavigator from './PublicNavigator'
import { db, auth } from '../Config/firebase'



export default class MainNavigator extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null,
        }
    }


    loginUser() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({ data: user })
            } else {
                console.log('belum login')
            }
        })
    }


    componentDidMount() {
        this.loginUser()
    }

    render() {
        if (this.state.data) {
            return (
                <PrivateNavigator />
            )
        } else {
            console.log('woi')
            return (
                <PublicNavigator />
            )
        }



    }
}
