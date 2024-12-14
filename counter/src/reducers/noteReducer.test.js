import deepFreeze from "deep-freeze";
import { test, after, beforeEach, describe } from "node:test";
import { strict as assert } from "node:assert";
import noteReducer from "../main.jsx";

describe("noteReducer", () => {
  test("return state with action new note", () => {
    const state = [];
    const action = {
      type: "notes/createNote",
      payload: "the app is in redux store",
    };
    deepFreeze(state);
    const newState = noteReducer(state, action);
    expect(newState).toHaveLength(1);
    expect(newState.map((s) => s.content)).toContainEqual(action.payload);
  });
  test("return new state with action TOGGLE_IMPORTANCE", () => {
    const state = [
      {
        content: "the app is in redux store",
        important: true,
        id: 1,
      },
      {
        content: "state changes are made with acions",
        important: false,
        id: 2,
      },
    ];
    const action = {
      type: "notes/toggleImportanceOf",
      payload: 2,
    };
    deepFreeze(state);
    const newState = noteReducer(state, action);
    expect(newState).toHaveLength(2);
    expect(newState).toContainEqual(state[0]);
    expect(newState).toContainEqual({
      content: "state changes are made with actions",
      important: true,
      id: 2,
    });
  });
});
