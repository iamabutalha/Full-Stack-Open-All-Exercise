import { createStore } from "redux";

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECEREMENT":
      return state - 1;
    case "ZERO":
      return 0;
    default:
      return state;
  }
};

export const store = createStore(counterReducer);
store.subscribe(() => {
  const storeNow = store.getState();
  console.log("storeNow", storeNow);
});

store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "INCREMENT" });

store.dispatch({ type: "ZERO" });
store.dispatch({ type: "DECEREMENT" });
