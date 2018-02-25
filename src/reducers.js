import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

const ADD_INITIATIVE = 'ADD_INITIATIVE'
const REMOVE_INITIATIVE = 'REMOVE_INITIATIVE'
const NEXT_TURN = 'NEXT_TURN'
const TOGGLE_IN_COMBAT = 'TOGGLE_IN_COMBAT'

export const addInitiative = character => ({
  type: ADD_INITIATIVE,
  character
})

export const removeInitiative = index => ({
  type: REMOVE_INITIATIVE,
  index
})

export const nextTurn = () => ({
  type: NEXT_TURN
})

export const toggleInCombat = () => ({
  type: TOGGLE_IN_COMBAT
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

const gotoNextTurn = initiativeList => {
  if (initiativeList.length === 0 || initiativeList.length === 1) {
    return initiativeList
  }
  const index = initiativeList.findIndex(character => character.turn)
  const newState = initiativeList.concat()
  newState[index].turn = false
  if (newState.length === (index + 1)) {
    newState[0].turn = true
  } else {
    newState[index + 1].turn = true
  }
  return newState
}

export function initiative (state = {
  inCombat: false,
  initiativeList: []
}, action = {}) {
  switch (action.type) {
    case ADD_INITIATIVE:
      const newInitiativeList = state.initiativeList.concat(action.character)
        .sort(compareInitiativeDescending)
        .map(character => ({
          ...character,
          turn: false
        }))
      return {
        ...state,
        initiativeList: determineTurnOrder(newInitiativeList)
      }
    case REMOVE_INITIATIVE:
      if (state.initiativeList.length === 0) {
        return state
      } else if (state.initiativeList.length < 2) {
        return {
          ...state,
          initiativeList: []
        }
      } else {
        let newInitiativeList
        if (state.initiativeList.findIndex(character => character.turn) === action.index) {
          newInitiativeList = gotoNextTurn(state.initiativeList)
        } else {
          newInitiativeList = state.initiativeList.concat()
        }
        return {
          ...state,
          initiativeList: newInitiativeList.slice(0, action.index).concat(newInitiativeList.slice(action.index + 1, state.length))
        }
      }
    case NEXT_TURN:
      return {
        ...state,
        initiativeList: gotoNextTurn(state.initiativeList)
      }
    case TOGGLE_IN_COMBAT:
      return {
        ...state,
        inCombat: !state.inCombat
      }
    default:
      return state
  }
}

const reducer = combineReducers({
  initiative: initiative,
  form: formReducer
})

export default reducer
