// ------------------------------------
// Constants
// ------------------------------------

const SET_THEME_TYPE = 'SET_THEME_TYPE'

const hours = new Date().getHours()
const isDayTime = hours > 6 && hours < 20

const initialState = {
  theme: isDayTime ? 'light' : 'dark',
}

// ------------------------------------
// Actions
// ------------------------------------

const setTheme = (theme) => (dispatch) => {
  dispatch({
    type: SET_THEME_TYPE,
    theme,
  })
}

export const actions = {
  setTheme,
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [SET_THEME_TYPE]: (state, { theme }) => ({
    ...state,
    theme,
  }),
}

// ------------------------------------
// Reducer
// ------------------------------------

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
