import { createContext, useReducer, useState } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({ children }) => {

    const initialState = {
        users: [],
        user: {},
        user_repos: [],
        isLoading: false
    }

    const [state, dispatch] = useReducer(githubReducer, initialState)

    const clearUsers = () => {
        dispatch( {
            type: 'CLEAR_USERS',
        })
    }

    const searchUsers = async (text) => {
        setLoading();
        const params = new URLSearchParams({
            q: text,
        })
        const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`}
            })
        const { items } = await response.json()
        dispatch( {
            type: 'GET_USERS',
            payload: items
        })
    }

    // Get single user
    const loadUser = async (login) => {
        setLoading();
        const response = await fetch(`${GITHUB_URL}/users/${login}`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`}
            })
        if (response.status === 404) {
                window.location = '/notfound'
            }
        const data = await response.json()
        
        dispatch( {
            type: 'GET_USER',
            payload: data
        })
    }

    const getRepos = async (username) => {
        setLoading();
        const params = new URLSearchParams({
            sort: "updated",
            per_page: "10"
        })
        const response = await fetch(`${GITHUB_URL}/users/${username}/repos?${params}`, 
            {
                headers: {
                    Authorization: `token ${GITHUB_TOKEN}`
                }
            })
        const data = await response.json()

        //console.log(data)
        dispatch( {
            type: 'GET_USER_REPOS',
            payload: data
        })

    }

    const setLoading = () => dispatch({type: "SET_LOADING"})

    return <GithubContext.Provider value={{
        users: state.users,
        isLoading: state.loading,
        user: state.user,
        user_repos: state.user_repos,
        searchUsers,
        clearUsers,
        loadUser,
        getRepos

    }}> {  children } </GithubContext.Provider>

}

export default GithubContext