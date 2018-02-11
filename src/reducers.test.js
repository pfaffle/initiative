import reducer, { addInitiative, nextTurn } from './reducers'

const initialState = [{
  name: 'Karis',
  initiative: 16,
  turn: true
}, {
  name: 'Riku',
  initiative: 14,
  turn: false
}]

describe('reducer', () => {
  it('should have a default state', () => {
    expect(reducer()).toEqual([])
  })
})

describe('addInitiative', () => {
  it('should add initiative for the first character', () => {
    const character = {
      name: 'Karis',
      initiative: 16
    }
    expect(reducer(undefined, addInitiative(character))).toEqual([{
      ...character,
      turn: true
    }])
  })
  it('should add a character with higher initiative', () => {
    const newCharacter = {
      name: 'newPerson',
      initiative: 18
    }
    expect(reducer(initialState, addInitiative(newCharacter))).toEqual([{
      name: 'newPerson',
      initiative: 18,
      turn: true
    }, {
      name: 'Karis',
      initiative: 16,
      turn: false
    }, {
      name: 'Riku',
      initiative: 14,
      turn: false
    }])
  })
  it('should add a character with low initiative', () => {
    const newCharacter = {
      name: 'newPerson',
      initiative: 12
    }
    expect(reducer(initialState, addInitiative(newCharacter))).toEqual([{
      name: 'Karis',
      initiative: 16,
      turn: true
    }, {
      name: 'Riku',
      initiative: 14,
      turn: false
    }, {
      name: 'newPerson',
      initiative: 12,
      turn: false
    }])
  })
  it('should add a character with the same initiative as another character', () => {
    const newCharacter = {
      name: 'newPerson',
      initiative: 16
    }
    expect(reducer(initialState, addInitiative(newCharacter))).toEqual([{
      name: 'Karis',
      initiative: 16,
      turn: true
    }, {
      name: 'newPerson',
      initiative: 16,
      turn: false
    }, {
      name: 'Riku',
      initiative: 14,
      turn: false
    }])
  })
  it('should add a character with initiative somewhere in the middle', () => {
    const newCharacter = {
      name: 'newPerson',
      initiative: 15
    }
    expect(reducer(initialState, addInitiative(newCharacter))).toEqual([{
      name: 'Karis',
      initiative: 16,
      turn: true
    }, {
      name: 'newPerson',
      initiative: 15,
      turn: false
    }, {
      name: 'Riku',
      initiative: 14,
      turn: false
    }])
  })
})

describe('nextTurn', () => {
  it('should do nothing for an empty initiative list', () => {
    expect(reducer(undefined, nextTurn)).toEqual([])
  })
  it('should do nothing for an initiative list with one person in it', () => {
    const initialState = [{
      name: 'Karis',
      initiative: 16,
      turn: true
    }]
    expect(reducer(initialState, nextTurn)).toEqual(initialState)
  })
  it('should move the current turn to the next person in the list', () => {
    const initialState = [{
      name: 'Karis',
      initiative: 16,
      turn: true
    }, {
      name: 'Riku',
      initiative: 14,
      turn: false
    }]
    expect(reducer(initialState, nextTurn())).toEqual([{
      name: 'Karis',
      initiative: 16,
      turn: false
    }, {
      name: 'Riku',
      initiative: 14,
      turn: true
    }])
  })
  it('should move the current turn to the first person in the list if at the end', () => {
    const initialState = [{
      name: 'Karis',
      initiative: 16,
      turn: false
    }, {
      name: 'Riku',
      initiative: 14,
      turn: true
    }]
    expect(reducer(initialState, nextTurn())).toEqual([{
      name: 'Karis',
      initiative: 16,
      turn: true
    }, {
      name: 'Riku',
      initiative: 14,
      turn: false
    }])
  })
})
