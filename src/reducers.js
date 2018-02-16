import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

const ADD_INITIATIVE = 'ADD_INITIATIVE'
const NEXT_TURN = 'NEXT_TURN'

export const addInitiative = character => ({
  type: ADD_INITIATIVE,
  character
})

export const nextTurn = () => ({
  type: NEXT_TURN
})

// TODO consider modifier as a tiebreaker
const compareInitiativeDescending = function (a, b) {
  return b.initiative - a.initiative
}

// expects sorted array
const determineTurnOrder = state => {
  state[0].turn = true
  return state
}

const gotoNextTurn = state => {
  if (state.length === 0 || state.length === 1) {
    return state
  }
  const index = state.findIndex(character => character.turn)
  const newState = state.concat()
  newState[index].turn = false
  if (newState.length === (index + 1)) {
    newState[0].turn = true
  } else {
    newState[index + 1].turn = true
  }
  return newState
}

// TODO add logic for when we're in combat vs. not, e.g. if we need to mark turn order & sort as we add
export function initiative (state = [], action = {}) {
  switch (action.type) {
    case ADD_INITIATIVE:
      const newState = state.concat(action.character)
        .sort(compareInitiativeDescending)
        .map(character => ({
          ...character,
          turn: false
        }))
      return determineTurnOrder(newState)
    case NEXT_TURN:
      return gotoNextTurn(state)
    default:
      return state
  }
}

const reducer = combineReducers({
  initiative: initiative,
  form: formReducer
})

export default reducer
