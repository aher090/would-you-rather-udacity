import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class AppNav extends Component{
    render(){
        const { activeTab } = this.props
        return (
            <div className="menu application">
                <Link to='/home' style={{ background: `${activeTab.includes('home') ? '#ddd' : 'none'}` }}>Would You Rather?</Link>
                <Link to='/add' style={{ background: `${activeTab.includes('create') ? '#ddd' : 'none'}` }}>Create a question</Link>
                <Link to='/leaderboard' style={{ background: `${activeTab.includes('leaderBoard') ? '#ddd' : 'none'}` }}>Leader Board</Link>
                <Link to='/logout' style={{ background: `${activeTab.includes('login') ? '#ddd' : 'none'}` }}>Logout</Link>
            </div>
        )
    }
}

export default AppNav
