import React from "react"
import { Provider } from "react-redux"
import store from "./src/utils/store"

// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"

export const wrapRootElement = ({ element }) => {
  return <Provider store={store}>{element}</Provider>
}
