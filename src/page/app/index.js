/* eslint-disable */

import React, { useState, useReducer, useContext, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'

import { ME } from './queries'
import { Client, AuthContext, initState, reducer } from '../../tools'
import { LoadableComponent, CircularIndeterminate } from '../../components'

function TravelApp (props) {
  const { state, dispatch } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    if (localStorage.getItem('access-token')) {
      Client.query({
        query: ME
      }).then(res => {
        const { data } = res
        if(data && data.me) {
          dispatch({ type: 'LOGIN', payload: { userProfile: data.me } })
        } else {
          dispatch({ type: 'LOGOUT' })
        }
        setLoading(false)
      }).catch(err => {
        dispatch({ type: 'LOGOUT' })
        setLoading(false)
      })
    } else {
      setLoading(false)
    }
  }, [])

  if(loading) {
    return (
      <CircularIndeterminate />
    )
  }

  return (
    <Router>
        <Switch>
          {state.isLogin ? (
            <Route
            path='/'
            component={LoadableComponent(import(`../dashboard`), { userProfile: state.userProfile })}
          />
          ) : (
            <>
              <Route exact path='/login' component={LoadableComponent(import(`../login`))} />
              <Redirect to='/login' />
            </>
          )}
        </Switch>
    </Router>
  )
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initState)

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <ApolloProvider client={Client}>
        <TravelApp />
      </ApolloProvider>
    </AuthContext.Provider>
  )
}

export default App