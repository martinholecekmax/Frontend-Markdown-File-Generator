import * as actionTypes from "../actions/actionTypes";

const initialState = {
  model: [
    {
      field: "title",
      type: "string"
    },
    {
      field: "price",
      type: "number"
    },
    {
      field: "groupProducts",
      type: "array",
      value: [
        {
          type: "string"
        }
      ]
    },
    {
      field: "options",
      type: "array",
      value: [
        {
          type: "object",
          value: [
            {
              key: "name",
              type: "string"
            },
            {
              key: "value",
              type: "string"
            }
          ]
        }
      ]
    }
  ]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_MODEL_START:
      return {
        ...state,
        model: []
      };
    case actionTypes.FETCH_MODEL_SUCCESS:
      return {
        ...state,
        model: action.model
      };
    case actionTypes.FETCH_MODEL_FAILED:
      return {
        ...state,
        model: []
      };
    default:
      return state;
  }
};

export default reducer;
