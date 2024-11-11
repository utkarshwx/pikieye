import React, { useState } from 'react'
import Button from '../../style/Button'
import axios from 'axios';

const CreateProject = ({ handleSubmit }) => {

  const [input, setInputs] = useState({});
  const [loadingState, setLoadingState] = useState(false);

  const handleChange = (event) => {

    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }));

  };
  return (
    <>
      <div className='flex items-center justify-center'>

        <div className='container space-y-5 shadow-lg rounded-lg px-3 md:px-10 py-3 md:py-5 z-20'>
          <h1 className='md:text-3xl text-center text-xl font-bold my-10'>Create Project</h1>
          <div className='items-center space-y-5'>
            <form >
              <div>
                <input className='w-full p-3 rounded-2xl border-b-4 border-blue-600 bg-slate-200 text-semibold md:text-xl focus:bg-slate-200 focus:outline-none transition-all duration-250 hover:border-2 focus:border-2 hover:bg-slate-200'
                  placeholder='Project Name'
                  type="text"
                  name='p_name'
                  id='p_name'
                  onChange={handleChange}
                  required
                  value={input.p_name}
                />
              </div>
            </form>
          </div>
          <div className='items-center gap-5'>
            <Button title={loadingState ? 'Creating...' : 'Create'} disabled={loadingState} onClick={() => {
              if (loadingState) {
                return;
              }

              handleSubmit(input, setLoadingState)
            }} type={'primary'} />
          </div>

        </div>
      </div>
    </>
  )
}

export default CreateProject;
