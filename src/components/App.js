import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import WouldYouRather from './WouldYouRather'
import Login from './Login'
import Register from './Register'
import Home from './Home'
import Poll from './Poll'
import CreateQuestion from './CreateQuestion'
import LeaderBoard from './LeaderBoard'

class App extends Component {
    componentDidMount () {
        this.props.dispatch(handleInitialData())
    }
    render () {
        return (
        <div>
            <Route exact path='/' component={WouldYouRather} />
            <div className="container">
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/home' component={Home} />
            <Route exact path='/question/:question_id' component={Poll} />
            <Route exact path='/add' component={CreateQuestion} />
            <Route exact path='/leaderboard' component={LeaderBoard} />
            </div>
        </div>
        )
    }
  }
  
  export default withRouter(connect()(App))