import React from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import Spinner from '../components/layout/Spinner'
import GithubContext from '../contexts/github/GithubContext'
import RepoList from '../components/users/RepoList'
import { useParams, Link } from 'react-router-dom'
import { FaCodepen, FaStore, FaUserFriends, FaUsers } from 'react-icons/fa'


function User() {

    const { user, loadUser, user_repos, getRepos, isLoading } = useContext(GithubContext)

    const params = useParams()
    useEffect(() => {
        loadUser(params.login)
        getRepos(params.login)
    }, [])

    if (isLoading) {
        return <Spinner />
    }

    const {
        name,
        type,
        avatar_url,
        location,
        bio,
        blog,
        twitter_username,
        login,
        html_url,
        followers,
        following,
        public_repos,
        public_gists,
        hireable
    } = user

    return (
        <>
            <div className="w-full mx-auto lg:w-10/12">
                <div className="mb-4">
                    <Link to='/' className='btn btn-ghost'>
                        Back to Search
                    </Link>
                </div>

                <div className='grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 mg-8 md:gap-8'>
                    <div className="custom-card-image mb-6 md:mb-0">
                        <div className="rounded-lg shadow-xl card image-full">
                            <figure>
                                <img src={avatar_url} />
                            </figure>
                            <div className="card-body justify-end">
                                <h2 className="card-title mb-0">{name}</h2>
                                <p className='flex-grow-0'>{login}</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-2">
                        <div className="mb-6">
                            <h1 className="text-3xl card-title">
                                {name}
                                <div className="ml-2 mr-1 badge badge-success">
                                    {type}
                                </div>
                                {hireable && (
                                    <div className="mx-1 badge badge-info">
                                        Hireable
                                    </div>
                                )}
                            </h1>
                            <p>{bio}</p>
                            <div className="mt-4 card-actions">
                                <a href={html_url} target="_blank"
                                    rel='noreferrer' className='btn btn-outline'>Visit Github Profile</a>
                            </div>
                        </div>
                        <div className="w-full rounded-lg shadow-md bg-base-100 stats">
                            <div className='grid grid-cols-1 md:grid-cols-3'>
                            {location && (<div className="stat">
                                <div className="stat-title">Location</div>
                                <div className="stat-value text-lg">{location}</div>
                            </div>)}
                            {blog && (<div className="stat">
                                <div className="stat-title">Website</div>
                                <div className="stat-value text-lg"><a href={`https://${blog}`} target="_blank" rel='noreferrer'>{blog}</a></div>
                            </div>)}
                            {twitter_username && (<div className="stat">
                                <div className="stat-title">Twitter</div>
                                <div className="stat-value text-lg"><a href={`https://twitter.com/${twitter_username}`} target="_blank" rel='noreferrer'>{blog}</a></div>
                            </div>)}
                            </div>

                        </div>
                    </div>
                </div>
                <div className="w-full py-5 mb-6 rounded-lg shadow-md bg-base-100 stats">
                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <FaUsers className='text-3xl'/>
                        </div>
                        <div className="stat-title">Followers</div>
                        <div className="stat-value">{followers}</div>
                    </div>
                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <FaUserFriends className='text-3xl'/>
                        </div>
                        <div className="stat-title">Following</div>
                        <div className="stat-value">{following}</div>
                    </div>
                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <FaCodepen className='text-3xl'/>
                        </div>
                        <div className="stat-title">Public Repos</div>
                        <div className="stat-value">{public_repos}</div>
                    </div>
                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <FaStore className='text-3xl'/>
                        </div>
                        <div className="stat-title">Public Gists</div>
                        <div className="stat-value">{public_gists}</div>
                    </div>
                </div>
                <RepoList user_repos={user_repos}/>
            </div>
        </>
    )

}

User.defaultProps = {
    login: "kylebarone"
}

export default User