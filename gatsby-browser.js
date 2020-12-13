import React from 'react'
import { Provider } from 'react-redux'
import store from './src/utils/store'
import ReactGA from 'react-ga'

// custom typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

export const wrapRootElement = ({ element }) => {
  ReactGA.initialize('UA-185111252-1', { debug: true })
  ReactGA.pageview('/')
  return <Provider store={store}>{element}</Provider>
}
