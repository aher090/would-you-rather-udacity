import React, { Component } from 'react'
import AppNav from './NavigationBar/AppNav'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { createQuestionAction } from '../actions/shared'

class CreateQuestion extends Component{
    constructor (props) {
        super(props)
        this.state = {
            redirect: false,
            showError: false
        }
        this.createQuestion = this.createQuestion.bind(this)
    }
    
    createQuestion (e) {
        e.preventDefault()
        const optOne = e.target[0].value
        const optTwo = e.target[1].value
        if(optOne && optTwo){
            this.props.dispatch(createQuestionAction(this.props.login, optOne, optTwo))
            this.setState({ redirect: true })
        }else{
            this.setState({ showError : true})
        }
    }

    render(){
        if (this.props.login === null) {
            return <Redirect to={{pathname: '/login', state: {redirectUrl: this.props.location.pathname}}} />
        }
        if (this.state.redirect) {
            return <Redirect to='/home' />
        }
        return(
            <div>
                <AppNav activeTab={'create'} />
                <div className="create-question">
                    { this.state.showError && <span className = "error">Please add both the options...</span> }
                    <form onSubmit={this.createQuestion}>
                        <p>Ask! Would you rather...</p>
                        <span>Option 1 :</span>
                        <input type="text" id="optionOne"/>
                        <span>Option 2 :</span>
                        <input type="text" id="optionTwo"/>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps ({ login }) {
    return{
        login
    }
}

export default connect(mapStateToProps) (CreateQuestion)