import { SERVER_URL } from "@/utils/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchExpenseData = createAsyncThunk("fetchExpense", async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${SERVER_URL}/user/expense/accessExpenses`,
    {
      headers: {
        "user-auth-token": `Bearer ${token}`,
      },
    },
  );
  return response.data.data;
});

export const deleteExpense = createAsyncThunk(
  "deleteExpense",
  async (id: number) => {
    const token = localStorage.getItem("token");
    await axios.delete(`${SERVER_URL}/user/expense/deleteExpense/${id}`, {
      headers: {
        "user-auth-token": `Bearer ${token}`,
      },
    });
    return id;
  },
);
interface DataType {
  amount: number;
  description: string;
  category: string;
  date: string;
  userId: string;
}

interface UpdateExpensePayload {
  expenseData: any;
  id: number;
}
export const insertExpense = createAsyncThunk(
  "insertExpense",
  async (expenseData: DataType, { dispatch }) => {
    const token = localStorage.getItem("token");
    await axios.post(`${SERVER_URL}/user/expense/insertExpense`, expenseData, {
      headers: {
        "user-auth-token": `Bearer ${token}`,
      },
    });
    dispatch(fetchExpenseData());
  },
);

export const updateExpense = createAsyncThunk(
  "updateExpense",
  async ({ expenseData, id }: UpdateExpensePayload, { dispatch }) => {
    const token = localStorage.getItem("token");
    await axios.put(
      `${SERVER_URL}/user/expense/updateExpense/${id}`,
      expenseData,
      {
        headers: {
          "user-auth-token": `Bearer ${token}`,
        },
      },
    );
    dispatch(fetchExpenseData());
  },
);

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
      }),
      builder.addCase(deleteExpense.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.filter(
          (expense: any) => expense.id !== action.payload,
        );
      }),
      builder.addCase(deleteExpense.pending, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(insertExpense.fulfilled, (state) => {
        state.isLoading = false;
      }),
      builder.addCase(insertExpense.pending, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(updateExpense.fulfilled, (state) => {
        state.isLoading = false;
      }),
      builder.addCase(updateExpense.pending, (state) => {
        state.isLoading = true;
      });
  },
});

export const { removeExpense } = expenseSlice.actions;
export default expenseSlice.reducer;
