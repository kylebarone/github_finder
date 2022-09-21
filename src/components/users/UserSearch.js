import React, { useContext, useState } from 'react'
import AlertContext from '../../contexts/alert/AlertContext'
import GithubContext from '../../contexts/github/GithubContext'

function UserSearch() {

  const { users, searchUsers, clearUsers } = useContext(GithubContext)
  const { setAlert } = useContext(AlertContext)

  const [text, setText] = useState('')

  const handleChange = (e) => { setText(e.target.value) }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(process.env.REACT_APP_GITHUB_TOKEN)
    if (text === '') {
      setAlert('Please enter something', 'ERROR')
    } else if (typeof process.env.REACT_APP_GITHUB_TOKEN === 'undefined') {
      setAlert('You need to configure an API token to use, see comments of userSearch', 'ERROR')
      // i'm not going to post my github token on github so instead create a .env file
      // and set REACT_APP_GITHUB_URL="https://api.github.com" 
      // additionally set REACT_APP_GITHUB_TOKEN to be your github personal acces token
    } else {
      searchUsers(text)
      setText('')
    }
  }

  const handleClear = () => {
    clearUsers()
  }


  return (
    <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8'>
      <div>
        <form onSubmit={handleSubmit}>
          <div className='form-control'>
            <div className='relative'>
              <input className='w-full pr-40 bg-gray-200 input input-lg text-black'
                placeholder='Search' value={text} onChange={handleChange} />
              <button className='absolute top-0 right-0 rounded-l-none w-36 btn btn-lg' type='submit'>
                Go
              </button>
            </div>
          </div>
        </form>

      </div>
      {users.length > 0 && (
        <div>
          <button className='btn btn-ghost btn-lg' onClick={handleClear}>
            Clear
          </button>
        </div>
      )}
    </div>
  )
}

export default UserSearch