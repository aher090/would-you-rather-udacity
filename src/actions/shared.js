import { getUsers, saveUserAnswer, createUserQuestion } from './users'
import { getQuestions, saveAnswer, handleCreateQuestion } from './questions'
import { handleUserLogin } from './login'
import {
    _getQuestions,
    _getUsers,
    _saveQuestion,
    _saveQuestionAnswer,
    _saveNewUser
} from '../api/_DATA'

export const GET_INITIAL_DATA = 'GET_INITIAL_DATA'

function _getInitialData () {
    return Promise.all([
      _getQuestions(),
      _getUsers()
    ]).then(([ questions, users ]) => ({
      questions,
      users
    }))
}

export function handleInitialData () {
  return (dispatch) => {
    _getInitialData().then(({users, questions}) => {
      dispatch(getUsers(users))
      dispatch(getQuestions(questions))
      dispatch(handleUserLogin(null))
    })
  }
}

export function handleUserRegistration (username, name) {
  return (dispatch) => {
    _saveNewUser({ username, name })
      .then((users) => {
        if (users.error) {
          console.error('Username already exists!s')
        } else {
          dispatch(getUsers(users))
          dispatch(handleUserLogin(username))
        }
      })
  }
}

export function handleAnswer (auth, qid, option) {
  const data = {
    authedUser: auth,
    qid,
    answer: option
  }
  return (dispatch) => {
    _saveQuestionAnswer(data)
      .then(() => {
        dispatch(saveAnswer(auth, qid, option))
        dispatch(saveUserAnswer(auth, qid, option))
      })
  }
}

export function createQuestionAction (auth, optionOne, optionTwo) {
  return dispatch => {
    _saveQuestion({
      optionOneText: optionOne,
      optionTwoText: optionTwo,
      author: auth
    }).then(question => {
      dispatch(createUserQuestion(question))
      dispatch(handleCreateQuestion(question))
    })
  }
}
