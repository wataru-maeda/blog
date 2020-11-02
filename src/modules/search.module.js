// ------------------------------------
// Constants
// ------------------------------------

const UPDATE_KEYWORD = "UPDATE_KEYWORD"

const initialState = {
  keyword: "",
}

// ------------------------------------
// Actions
// ------------------------------------

const updateKeyword = keyword => dispatch =>
  dispatch({
    type: UPDATE_KEYWORD,
    keyword,
  })

export const actions = {
  updateKeyword,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [UPDATE_KEYWORD]: (state, { keyword }) => ({
    ...state,
    keyword,
  }),
}

// ------------------------------------
// Reducer
// ------------------------------------

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
