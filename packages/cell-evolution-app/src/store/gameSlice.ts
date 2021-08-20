/* eslint-disable no-param-reassign */
// import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '.';

// Define a type for the slice state
export interface IGameData {
  day: number;
  cell: number;
  env: number;
  reproduction: number;
  adaptability: number;
  survivability: number;
  lifeCycle: number;
}
interface GameState {
  data: IGameData;
}

// Define the initial state using that type
const initialState: GameState = {
  data: {
    day: 1,
    cell: 0,
    env: 0,
    reproduction: 0,
    adaptability: 0,
    survivability: 0,
    lifeCycle: 20,
  },
};

export const gameSlice = createSlice({
  name: 'game',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setData: (state, { payload }) => {
      state.data = { ...state.data, ...payload };
    },
  },
});

export const { setData } = gameSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectGame = (state: RootState) => state.game.data;

export default gameSlice.reducer;
