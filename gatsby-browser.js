import React from 'react'
import { Provider } from 'react-redux'
import ReactGA from 'react-ga'

// custom typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

import store from './src/utils/store'

export const onInitialClientRender = () => {
  setTimeout(() => {
    const loader = document.getElementById('___loader')
    loader.style.visibility = 'hidden'
    loader.style.transition = 'visibility 0s 0.4s, opacity 0.4s linear'
    loader.style.opacity = 0
  }, 1000)
}

export const wrapRootElement = ({ element }) => {
  ReactGA.initialize('UA-185111252-1')
  ReactGA.pageview('/')
  return <Provider store={store}>{element}</Provider>
}
