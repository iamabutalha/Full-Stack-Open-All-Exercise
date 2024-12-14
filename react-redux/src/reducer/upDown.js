const initialState = 0;

const chnageTheNumber = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + action.payload;
    case "DECREMENT":
      return state - action.payload;
    case "ZERO":
      return (state = 0);
    default:
      return state;
  }
};

export default chnageTheNumber;
