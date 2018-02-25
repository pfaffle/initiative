import {
  addInitiative,
  initiative,
  nextTurn,
  removeInitiative
} from './reducers'

const initialState = {
  inCombat: false,
  initiativeList: [{
    name: 'Karis',
    initiative: 16,
    turn: true
  }, {
    name: 'Riku',
    initiative: 14,
    turn: false
  }]
}

describe('reducer', () => {
  it('should have a default state', () => {
    expect(initiative()).toEqual({inCombat: false, initiativeList: []})
  })
})

describe('addInitiative', () => {
  it('should add initiative for the first character', () => {
    const character = {
      name: 'Karis',
      initiative: 16
    }
    expect(initiative(undefined, addInitiative(character))).toEqual({
      inCombat: false,
      initiativeList: [{
        ...character,
        turn: true
      }]
    })
  })
  it('should add a character with higher initiative', () => {
    const newCharacter = {
      name: 'newPerson',
      initiative: 18
    }
    expect(initiative(initialState, addInitiative(newCharacter))).toEqual({
      inCombat: false,
      initiativeList: [{
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
      }]
    })
  })
  it('should add a character with low initiative', () => {
    const newCharacter = {
      name: 'newPerson',
      initiative: 12
    }
    expect(initiative(initialState, addInitiative(newCharacter))).toEqual({
      inCombat: false,
      initiativeList: [{
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
      }]
    })
  })
  it('should add a character with the same initiative as another character', () => {
    const newCharacter = {
      name: 'newPerson',
      initiative: 16
    }
    expect(initiative(initialState, addInitiative(newCharacter))).toEqual({
      inCombat: false,
      initiativeList: [{
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
      }]
    })
  })
  it('should add a character with initiative somewhere in the middle', () => {
    const newCharacter = {
      name: 'newPerson',
      initiative: 15
    }
    expect(initiative(initialState, addInitiative(newCharacter))).toEqual({
      inCombat: false,
      initiativeList: [{
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
      }]
    })
  })
})

describe('nextTurn', () => {
  it('should do nothing for an empty initiative list', () => {
    expect(initiative(undefined, nextTurn)).toEqual({
      inCombat: false,
      initiativeList: []
    })
  })
  it('should do nothing for an initiative list with one person in it', () => {
    const initialState = {
      inCombat: false,
      initiativeList: [{
        name: 'Karis',
        initiative: 16,
        turn: true
      }]
    }
    expect(initiative(initialState, nextTurn)).toEqual(initialState)
  })
  it('should move the current turn to the next person in the list', () => {
    const initialState = {
      inCombat: false,
      initiativeList: [{
        name: 'Karis',
        initiative: 16,
        turn: true
      }, {
        name: 'Riku',
        initiative: 14,
        turn: false
      }]
    }
    expect(initiative(initialState, nextTurn())).toEqual({
      inCombat: false,
      initiativeList: [{
        name: 'Karis',
        initiative: 16,
        turn: false
      }, {
        name: 'Riku',
        initiative: 14,
        turn: true
      }]
    })
  })
  it('should move the current turn to the first person in the list if at the end', () => {
    const initialState = {
      inCombat: false,
      initiativeList: [{
        name: 'Karis',
        initiative: 16,
        turn: false
      }, {
        name: 'Riku',
        initiative: 14,
        turn: true
      }]
    }
    expect(initiative(initialState, nextTurn())).toEqual({
      inCombat: false,
      initiativeList: [{
        name: 'Karis',
        initiative: 16,
        turn: true
      }, {
        name: 'Riku',
        initiative: 14,
        turn: false
      }]
    })
  })
})

describe('removeInitiative', () => {
  it('should return an empty list for an initiative list with one person in it', () => {
    const initialState = {
      inCombat: false,
      initiativeList: [{
        name: 'Karis',
        initiative: 16,
        turn: true
      }]
    }
    expect(initiative(initialState, removeInitiative(0))).toEqual({
      inCombat: false,
      initiativeList: []
    })
  })
  it('should retain existing initiative if possible', () => {
    const initialState = {
      inCombat: false,
      initiativeList: [{
        name: 'Karis',
        initiative: 16,
        turn: true
      }, {
        name: 'Riku',
        initiative: 14,
        turn: false
      }]
    }
    expect(initiative(initialState, removeInitiative(1))).toEqual({
      inCombat: false,
      initiativeList: [{
        name: 'Karis',
        initiative: 16,
        turn: true
      }]
    })
  })
  it('should move the current turn to the next person in the list if removing the person who currently has initiative', () => {
    const initialState = {
      inCombat: false,
      initiativeList: [{
        name: 'Karis',
        initiative: 16,
        turn: true
      }, {
        name: 'Riku',
        initiative: 14,
        turn: false
      }]
    }
    expect(initiative(initialState, removeInitiative(0))).toEqual({
      inCombat: false,
      initiativeList: [{
        name: 'Riku',
        initiative: 14,
        turn: true
      }]
    })
  })
  it('should move the current turn to the first person in the list if removing the person who currently has initiative and that person is at the end of the list', () => {
    const initialState = {
      inCombat: false,
      initiativeList: [{
        name: 'Karis',
        initiative: 16,
        turn: false
      }, {
        name: 'Riku',
        initiative: 14,
        turn: true
      }]
    }
    expect(initiative(initialState, removeInitiative(1))).toEqual({
      inCombat: false,
      initiativeList: [{
        name: 'Karis',
        initiative: 16,
        turn: true
      }]
    })
  })
})
