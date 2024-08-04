import { SERVER_URL } from "@/utils/constants";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
const token = localStorage.getItem("token");

const config = {
  headers: {
    "user-auth-token": `Bearer ${token}`,
  },
};
export const fetchExpenseData = createAsyncThunk("fetchExpense", async () => {
  const response = await axios.get(
    `${SERVER_URL}/user/expense/accessExpenses`,
    config,
  );
  return response.data.data;
});

interface ExpenseState {
  isLoading: boolean;
  data: any;
  isError: boolean;
}

const initialState: ExpenseState = {
  isLoading: false,
  data: null,
  isError: false,
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    removeExpense: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchExpenseData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    }),
      builder.addCase(fetchExpenseData.pending, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(fetchExpenseData.rejected, (state) => {
        state.isError = true;
      });
  },
});

export const { removeExpense } = expenseSlice.actions;
export default expenseSlice.reducer;
