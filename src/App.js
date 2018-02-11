import React, { Component } from 'react'
import logo from './img/d20.png'
import { Column, Table } from 'react-virtualized'
import Flexbox from 'flexbox-react'
import './App.css'
import 'react-virtualized/styles.css'
import { connect } from 'react-redux' // only needs to be imported once
import PropTypes from 'prop-types'
import { addInitiative } from './reducers'

// export the unconnected class for testing
export class App extends Component {
  render () {
    const {initiativeList, addInitiative} = this.props
    const characterNames = ['Karis', 'Riku', 'Fletcher', 'Mei', 'Madison', 'Morrison', 'Oskar']
    const characterToAdd = {
      name: characterNames[Math.floor(Math.random() * characterNames.length)],
      initiative: Math.floor(Math.random() * 20)
    }
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>D&D Initiative Tracker</h1>
        </header>
        <h2>Initiative Table</h2>
        <Flexbox justifyContent='center'>
          <Table
            width={300}
            height={300}
            headerHeight={20}
            rowHeight={20}
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
        <button>Next</button>
        <button onClick={() => addInitiative(characterToAdd)}>Add</button>
      </div>
    )
  }
}

App.propTypes = {
  initiativeList: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  initiativeList: state
})
const mapDispatchToProps = {
  addInitiative
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
