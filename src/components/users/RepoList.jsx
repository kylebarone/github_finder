import React from 'react'
import PropTypes from 'prop-types'
import RepoItem from './RepoItem'

function RepoList({ user_repos }) {
  return (
    <div className='rounded-lg shadow-lg card bg-base-100'>
        <div className="card-body">
            <h2 className="font-bold text-3xl my-4 card-title">
                Latest Repositories
            </h2>
            {user_repos.map((user_repo) => (
                <RepoItem key={user_repo.id} user_repo={user_repo} />
            )
            )}
        </div>
    </div>
  )
}

RepoList.propTypes = {
    user_repos: PropTypes.array.isRequired,
}

export default RepoList