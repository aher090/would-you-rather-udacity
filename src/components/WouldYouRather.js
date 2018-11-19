import React, { Component } from 'react'
import LoginNav from './NavigationBar/LoginNav'

class WouldYouRather extends Component{
    render(){
        return(
            <div>
                <LoginNav />
                <div className={'would-you-rather'}></div>
            </div>
        )
    }
}

export default WouldYouRather
