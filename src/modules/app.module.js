// ------------------------------------
// Constants
// ------------------------------------

const SET_THEME_TYPE = 'SET_THEME_TYPE'
const SET_SIDE_MENU_OPEN = 'SET_SIDE_MENU_OPEN'

const hours = new Date().getHours()
const isDayTime = hours > 6 && hours < 20

const initialState = {
  theme: isDayTime ? 'light' : 'dark',
  isOpen: false,
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

const setSideMenuOpen = (isOpen) => (dispatch) =>
  dispatch({
    type: SET_SIDE_MENU_OPEN,
    isOpen,
  })

export const actions = {
  setTheme,
  setSideMenuOpen,
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [SET_THEME_TYPE]: (state, { theme }) => ({
    ...state,
    theme,
  }),
  [SET_SIDE_MENU_OPEN]: (state, { isOpen }) => ({
    ...state,
    isOpen,
  }),
}

// ------------------------------------
// Reducer
// ------------------------------------

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
