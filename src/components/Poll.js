import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import AppNav from './NavigationBar/AppNav'
import { handleAnswer } from '../actions/shared'
import moment from 'moment'

class Poll extends Component{
    constructor (props){
        super(props)
        this.state = {
            answer: this.props.userSelectedAnswer
        }
    }

    selectAnswer(selectedOption) {
        const { dispatch, login, question } = this.props        
        if (selectedOption === 1) {
            dispatch(handleAnswer(login, question.id, 'optionOne'))
            this.setState({ answer: 'optionOne' })
        } else if (selectedOption === 2) {
            dispatch(handleAnswer(login, question.id, 'optionTwo'))
            this.setState({ answer: 'optionTwo' })
        }
    }

    render(){
        const { 
                    login, 
                    question, 
                    userSelectedAnswer, 
                    total, 
                    percFist, 
                    percSecond, 
                    author,
                    votesOpt1,
                    votesOpt2
                } = this.props        

        if (login === null) {
            return <Redirect to={{pathname: '/login', state: {redirectUrl: this.props.location.pathname}}} />
        }

        if(!question){
            return <Redirect to='/page404' />
        }

        const { avatarURL, name } = author
        let styleClass = []
        if (userSelectedAnswer){
            if (userSelectedAnswer === 'optionOne'){
                styleClass = ['opt option-one selected', 'opt option-two']
            } else if (userSelectedAnswer === 'optionTwo') {
                styleClass = ['opt option-one', 'opt option-two selected']
            }
        } else{
            styleClass = ['opt option-one', 'opt option-two']
        }
        
        return(
            <div>
                <AppNav activeTab={'poll'}/>
                <div className="poll">                
                    <img src={avatarURL} alt={name} className="avatar" /> 
                    <div className="optDetails">
                        <p>{name} asks, would you rather!</p>
                        <span>Posted {moment(question.timestamp).fromNow()}</span>
                        <div className={styleClass[0]} onClick={() => this.selectAnswer(1)}>{question.optionOne.text}</div>
                        <div className="progressbar">
                            <div style={{ width: `${percFist}%` }}>{`${percFist}%`}</div>
                        </div>                        
                        <span>{votesOpt1} out of {total}</span>
                        <div className={styleClass[1]} onClick={() => this.selectAnswer(2)}>{question.optionTwo.text}</div>
                        <div className="progressbar">
                            <div style={{ width: `${percSecond}%` }}>{`${percSecond}%`}</div>
                        </div>                        
                        <span>{votesOpt2} out of {total}</span>
                    </div>                    
                </div>

            </div>

        )
    }
}

function mapStateToProps ({ login, questions, users }, { match }) {
    let question = questions[match.params.question_id]
    let userSelectedAnswer, percFist, percSecond, total, author, votesOpt1, votesOpt2
    if (null !== login && question) {
        const answers = users[login].answers
        if (answers.hasOwnProperty(question.id)) {
            userSelectedAnswer = answers[question.id]
        }
        votesOpt1 = question.optionOne.votes.length
        votesOpt2 = question.optionTwo.votes.length
        total = question.optionOne.votes.length + question.optionTwo.votes.length
        percFist = (question.optionOne.votes.length / total) * 100
        percSecond = (question.optionTwo.votes.length / total) * 100
        author = Object.keys(users).map(index => users[index]).filter(user => user.id === question.author)[0]
    }

    return {
        login,
        question,
        userSelectedAnswer,
        total,
        percFist,
        percSecond,
        author,
        votesOpt1,
        votesOpt2
    }
  }
  
  export default connect(mapStateToProps)(Poll)