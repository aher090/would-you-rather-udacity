import {
    GET_QUESTIONS,
    ANSWER_QUESTION,
    CREATE_QUESTION
  } from '../actions/questions'
  
  export function questions (state = {}, action) {
    switch (action.type) {
      case CREATE_QUESTION:
        return {
          ...state,
          [action.question.id]: action.question
        }
      case GET_QUESTIONS:
        return {
          ...state,
          ...action.questions
        }
      case ANSWER_QUESTION:
        return {
          ...state,
          [action.qid]: {
            ...state[action.qid],
            [action.option]: {
              ...state[action.qid][action.option],
              votes: state[action.qid][action.option].votes.concat([action.auth])
            }
          }
        }
      default:
        return state
    }
  }
  