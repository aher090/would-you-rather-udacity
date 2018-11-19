import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleUserRegistration } from '../actions/shared'
import { Link } from 'react-router-dom'

class Register extends Component {
    constructor(props) {
            super(props)
            this.state = {
            usernameAlreadyTaken: false
        }
        this.handleRegistration = this.handleRegistration.bind(this)
    }

    handleRegistration(e) {
        e.preventDefault()
        const username = e.target[0].value
        const name = e.target[1].value
        const { users, dispatch } = this.props
        if(username && name ){
            users.map(user => {
                if (user === username) {
                this.setState({ usernameAlreadyTaken: true })
                return
                }
            })
            dispatch(handleUserRegistration(username, name))
        }
    }

    render() {
        const { usernameAlreadyTaken} = this.state

        if (this.props.login != null) {
            return <Redirect to='/home' />
        }

        return(
            <div className="registration-box">
                { usernameAlreadyTaken && (
                    <div style={{ color: 'red' }}>Username Already Taken</div>
                )}
                <form onSubmit={this.handleRegistration}>
                    <div className="input-field">
                        <label htmlFor="username">Username:</label><br />
                        <input type="text" id="username" placeholder="Input your Username" />
                    </div>
                    <div className="input-field">
                        <label htmlFor="name">Name:</label><br />
                        <input type="text" id="name" placeholder="Input your Name" />
                    </div>
                    <button type="submit" className="submit-button">Register</button>
                </form>
                <p>Already a user? <Link to='/login'>Login</Link></p>
            </div>
        )
    }
}

function mapStateToProps ({ users, login }) {
    const usersProp = Object.keys(users)
    return {
        users: usersProp,
        login
    }
}

export default connect(mapStateToProps)(Register)