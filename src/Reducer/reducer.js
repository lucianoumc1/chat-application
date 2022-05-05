const initialState = {
  loagindState: false,
  hasError: false,
  content: [],
};

const ACTIONS = {
  SEND_API: "SEND_API",
  SUCCESS_API: "SUCCESS_API",
  ERROR_API: "ERROR_API",
};

// eslint-disable-next-line default-param-last
export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case ACTIONS.SEND_API:
      return { ...state, loagindState: true };

    case ACTIONS.SUCCESS_API:
      return { ...state, loagindState: false, content: payload };

    case ACTIONS.ERROR_API:
      return { ...state, loagindState: false, hasError: true };

    default:
      return state;
  }
}
