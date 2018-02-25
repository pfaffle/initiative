import React, { Component } from 'react'
import logo from './img/d20.png'
import { Column, Table } from 'react-virtualized'
import Flexbox from 'flexbox-react'
import './App.css'
import 'react-virtualized/styles.css'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  addInitiative, nextTurn, removeInitiative,
  toggleInCombat
} from './reducers'
import AddInitiativeForm from './AddInitiativeForm'

// export the unconnected class for testing
export class App extends Component {
  render () {
    const {initiativeList, addInitiative, removeInitiative, nextTurn, inCombat, toggleInCombat} = this.props
    const rowHeight = 20
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>D&D Initiative Tracker</h1>
        </header>
        <h2>Initiative Table</h2>
        <Flexbox className='initiative-table' justifyContent='center'>
          <Table
            width={400}
            height={(rowHeight * (initiativeList.length + 1))}
            headerHeight={rowHeight}
            rowHeight={rowHeight}
            rowCount={initiativeList.length}
            rowGetter={({index}) => initiativeList[index]}
          >
            <Column
              label='Turn'
              dataKey='turn'
              width={100}
              cellRenderer={({cellData}) => cellData ? '->' : ''}
            />
            <Column
              label='Name'
              dataKey='name'
              width={100}
            />
            <Column
              label='Initiative'
              dataKey='initiative'
              width={100}
            />
            <Column
              label=''
              dataKey='remove'
              width={25}
              cellRenderer={({rowIndex}) => (
                <div
                  className='remove-link'
                  onClick={() => { removeInitiative(rowIndex) }}>
                  X
                </div>
              )}
            />
          </Table>
        </Flexbox>
        <div className='in-combat'>In combat?
          <input type="checkbox" checked={inCombat} onClick={toggleInCombat} />
        </div>
        <button onClick={nextTurn}>Next turn</button>
        <AddInitiativeForm onSubmit={formValues => addInitiative(formValues)} />
      </div>
    )
  }
}

App.propTypes = {
  initiativeList: PropTypes.array.isRequired,
  addInitiative: PropTypes.func.isRequired,
  removeInitiative: PropTypes.func.isRequired,
  nextTurn: PropTypes.func.isRequired,
  toggleInCombat: PropTypes.func.isRequired,
  inCombat: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  initiativeList: state.initiative.initiativeList,
  inCombat: state.initiative.inCombat
})
const mapDispatchToProps = {
  addInitiative,
  removeInitiative,
  nextTurn,
  toggleInCombat
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
