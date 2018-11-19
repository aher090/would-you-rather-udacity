import React, { Component } from 'react'
import AppNav from './NavigationBar/AppNav'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class LeaderBoard extends Component{
    render(){        
        const { login, usersData} = this.props

        if (login === null) {
            return <Redirect to='/login' />
        }

        return(
            <div>
                <AppNav activeTab={'leaderBoard'} />
                <div className="leader-board">
                <ul>
                    {usersData.map((user, key) => (
                        <li key={user.userId}>
                            <img src={user.avatarURL} alt={user.name} className="avatar" />
                            <div className="user-details">
                                <p>{user.name}</p>
                                <p>Answered questions : {user.answers}</p>
                                <p>Created questions : {user.questions}</p>
                            </div>
                            <div className="score">
                                <p>Score</p>
                                <span>{user.questions + user.answers}</span>
                            </div>
                        </li>
                    ))}
                </ul>
                </div>
            </div>
        )
    }
}

function mapStateToProps({login, users}){
    let usersData = []
    Object.keys(users).map(userId => {
        usersData.push({
            id: userId,
            name: users[userId].name,
            avatarURL: users[userId].avatarURL,
            questions: users[userId].questions.length,
            answers: Object.keys(users[userId].answers).length
        })
    })

    usersData.sort(function (user1, user2) {
        return (user2.questions + user2.answers) - (user1.questions + user1.answers)
    })

    return {
        login,
        usersData
    }
}
export default connect(mapStateToProps)(LeaderBoard)