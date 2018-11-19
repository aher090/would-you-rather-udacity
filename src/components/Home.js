import React, { Component } from 'react'
import AppNav from './NavigationBar/AppNav'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Question from './Question'

class Home extends Component {
    constructor (props) {
        super(props)
        this.state = {
            showAnswered: false
        }
        this.toggle = this.toggle.bind(this)
      }
    
      toggle () {
        if (this.state.showAnswered) {
            this.setState({ showAnswered: false })
        } else {
            this.setState({ showAnswered: true })
        }
        this.forceUpdate()
      }
    render(){
        const { login, user, answeredQue, unansweredQue, users } = this.props        
        if (login === null) {
            return <Redirect to='/login' />
        }
        const {name, answers} = user
        const avatarURL = user.avatarURL === '' ? './persona.png' : user.avatarURL
        const { showAnswered } = this.state
        return(
            <div>
                <AppNav activeTab={'home'}/>
                <div className="greeting-user"> 
                    <img src={avatarURL} alt={name} className="avatar" />
                    <span>Greetings! {name}</span>
                </div>
                <div className="questions-panel">
                    <div className="tabs">
                        <div className={ showAnswered ? 'answered active-link' : 'answered'} onClick={this.toggle}>Answered</div>
                        <div className={ showAnswered ? 'unanswered' : 'unanswered active-link'} onClick={this.toggle}>Unanswered</div>
                    </div>
                    <div className="questions">
                        { showAnswered && answeredQue.map(question => (
                        <Question question={question} answer={answers[question.id]} users={users} key={question.id} />
                        ))}
                        { !showAnswered && unansweredQue.map(question => (
                        <Question question={question} users={users} key={question.id} />
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps ({ questions, users, login }) {
    let user
    let answeredQue = []
    let unansweredQue = []
    if (login !== null) {
        user = users[login]
    }
    Object.keys(questions).map(index => questions[index]).filter(question => {
        if (user.answers.hasOwnProperty(question.id)) {
            answeredQue.push(question)
            answeredQue.sort(function (que1, que2) {
                return (que2.timestamp) - (que1.timestamp)
            })
        } else {
            unansweredQue.push(question)
            unansweredQue.sort(function (que1, que2) {
                return (que2.timestamp - que1.timestamp)
            })
        }
    })
    return {
        answeredQue,
        unansweredQue,
        login,
        user,
        users
    }
  }
  
  export default connect(mapStateToProps) (Home)