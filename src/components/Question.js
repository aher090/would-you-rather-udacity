import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleAnswer } from '../actions/shared'
import { Link } from 'react-router-dom'

class Question extends Component{
    constructor (props){
        super(props)
        this.state = {
            answer: this.props.answer
        }
        this.selectAnswer = this.selectAnswer.bind(this)
        this.getQuestionAuthorDetails = this.getQuestionAuthorDetails.bind(this)
    }

    selectAnswer(selectedOption) {
        const { dispatch, login, question } = this.props
        if (!this.state.answer) {
            if (selectedOption === 1) {
                dispatch(handleAnswer(login, question.id, 'optionOne'))
                this.setState({ answer: 'optionOne' })
            } else if (selectedOption === 2) {
                dispatch(handleAnswer(login, question.id, 'optionTwo'))
                this.setState({ answer: 'optionTwo' })
            }
        }
    }

    getQuestionAuthorDetails(users, author) {        
        return Object.keys(users).map(index => users[index]).filter(user => user.id === author)[0]
    }

    render () {
        const { question, users } = this.props
        const { answer } = this.state
        const authorDetails = this.getQuestionAuthorDetails(users, question.author)
        const { avatarURL, name } = authorDetails
        let styleClass = []
        if (answer){
            if (answer === 'optionOne'){
                styleClass = ['opt option-one selected', 'opt option-two']
            } else if (answer === 'optionTwo') {
                styleClass = ['opt option-one', 'opt option-two selected']
            }
        } else{
            styleClass = ['opt option-one', 'opt option-two']
        }
        return(
            <div className="question">               
                <div className="options">                
                    <img src={avatarURL} alt={name} className="avatar" /> 
                    <div className="optDetails">
                        <p>{name} asks, would you rather!</p>
                        <div className={styleClass[0]} onClick={() => this.selectAnswer(1)}>{question.optionOne.text}</div>
                        <div className={styleClass[1]} onClick={() => this.selectAnswer(2)}>{question.optionTwo.text}</div>
                    </div> 
                    {                   
                        answer && <Link to={`/question/${question.id}`} className="more">View poll</Link>
                    }
                </div>
            </div>
        )
    }
}
    
    function mapStateToProps ({ login }) {
        return {
            login
        }
}

export default connect(mapStateToProps)(Question)
