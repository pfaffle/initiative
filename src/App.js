import React, { Component } from 'react'
import logo from './img/d20.png'
import { Column, Table } from 'react-virtualized'
import Flexbox from 'flexbox-react'
import './App.css'
import 'react-virtualized/styles.css'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addInitiative, nextTurn } from './reducers'

// export the unconnected class for testing
export class App extends Component {
  render () {
    const {initiativeList, addInitiative, nextTurn} = this.props
    const characterNames = ['Karis', 'Riku', 'Fletcher', 'Mei', 'Madison', 'Morrison', 'Oskar']
    const characterToAdd = {
      name: characterNames[Math.floor(Math.random() * characterNames.length)],
      initiative: Math.floor(Math.random() * 20)
    }
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
            width={300}
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
          </Table>
        </Flexbox>
        <button onClick={nextTurn}>Next</button>
        <button onClick={() => addInitiative(characterToAdd)}>Add</button>
      </div>
    )
  }
}

App.propTypes = {
  initiativeList: PropTypes.array.isRequired,
  addInitiative: PropTypes.func.isRequired,
  nextTurn: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  initiativeList: state
})
const mapDispatchToProps = {
  addInitiative,
  nextTurn
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
