import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Flexbox from 'flexbox-react'

const AddInitiativeForm = props => {
  const {handleSubmit} = props
  return <div>
    <h3>Add character:</h3>
    <Flexbox justifyContent='center'>
      <form onSubmit={handleSubmit}>
        <Flexbox className='initiative-form' width='30%' justifyContent='space-between'>
          <div>
            <label>Name</label>
            <Field
              name={'name'}
              component={'input'}
              type={'text'}
            />
          </div>
          <div>
            <label>Initiative</label>
            <Field
              name={'initiative'}
              component={'input'}
              type={'number'}
            />
          </div>
        </Flexbox>
        <button type='submit'>Add</button>
      </form>
    </Flexbox>
  </div>
}

export default reduxForm({
  form: 'addInitiative'
})(AddInitiativeForm)
