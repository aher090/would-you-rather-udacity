import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleUserLogin } from '../actions/login'
import { Link } from 'react-router-dom'

class Login extends Component{
    constructor(props) {
        super(props)
        this.state = {
            login: false,
            userNotFound: false
        }
        this.handleLogin = this.handleLogin.bind(this)
    }

    handleLogin(e) {
        e.preventDefault()
        const username = e.target[0].value
        let found = false
        const { users, dispatch } = this.props
        users.map(user => {
            if (user === username) {
            found = true
            dispatch(handleUserLogin(username))
            this.setState({ redirect: true })
            }
        })
        if (!found) {
            this.setState({ userNotFound: true })
        }
    }

    render() {
    const { userNotFound} = this.state
    const { login, users, location } = this.props

    if (login != null) {
        if(location && location.state && location.state.redirectUrl){
            return <Redirect to={location.state.redirectUrl} />
        }
        return <Redirect to='/home' />
    }

    return (
            <div className="registration-box">                          
                <div className={'login-section'} id='login-section'>
                    { userNotFound && (
                        <div style={{ color: 'red' }}>Wrong Username</div>
                    )}
                    <form onSubmit={this.handleLogin}>
                        <div className="input-field">
                        <label htmlFor="username">Username:</label><br/ >
                        <select>
                        {users && users.map((user, index) =>(
                            <option>{user}</option>
                        ))}
                        </select>
                        </div>
                        <button type="submit">Login</button>
                    </form>
                </div>
                <p>New user? <Link to='/register'>Register</Link> </p>
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

export default connect(mapStateToProps)(Login)