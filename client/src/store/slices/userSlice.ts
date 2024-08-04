import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserData {
  fullName: string;
  email: string;
}

interface UserState {
  token: string | null;
  userData: UserData | null;
}

const initialState: UserState = {
  token: null,
  userData: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setUserData: (state, action: PayloadAction<UserData | null>) => {
      state.userData = action.payload;
    },
    removeToken: (state) => {
      state.token = null;
    },
    removeUserData: (state) => {
      state.userData = null;
    },
  },
});

export const { addToken, setUserData, removeToken, removeUserData } =
  userSlice.actions;
export default userSlice.reducer;
