import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import { setAuthData, getAuthData, clearAuthData } from '../../utils/auth';

// Helper function to set token in axios headers
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Initialize state from localStorage
const { token, user } = getAuthData();
if (token) {
  setAuthToken(token);
}

const initialState = {
  user: user,
  token: token,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
  signupSuccess: false
};

// Register user
// export const register = createAsyncThunk(
//   'auth/register',
//   async (userData, thunkAPI) => {
//     try {
//       const response = await axios.post('/auth/signup', userData);
//       if (response.data.token) {
//         setAuthToken(response.data.token);
//         setAuthData(response.data.token, response.data.user);
//       }
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || 'Registration failed'
//       );
//     }
//   }
// );

export const register = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post('/auth/signup', userData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // rest of your code...
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Registration failed'
      );
    }
  }
);


// Login user
export const login = createAsyncThunk(
  'auth/login',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post('/auth/login', userData);
      if (response.data.token) {
        setAuthToken(response.data.token);
        setAuthData(response.data.token, response.data.user);
      }
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Login failed'
      );
    }
  }
);

// Get user profile
export const getMe = createAsyncThunk(
  'auth/getMe',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      if (!token) {
        throw new Error('No token available');
      }
      const response = await axios.get('/users/me');
      // Update stored user data
      setAuthData(token, response.data);
      return response.data;
    } catch (error) {
      if (error.message === 'No token available') {
        setAuthToken(null);
        clearAuthData();
      }
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to fetch user profile'
      );
    }
  }
);

// Logout user
export const logout = createAsyncThunk('auth/logout', async () => {
  setAuthToken(null);
  clearAuthData();
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    clearError: (state) => {
      state.isError = false;
      state.message = '';
    },
    resetSignupSuccess: (state) => {
      state.signupSuccess = false;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      setAuthToken(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      // Register cases
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.signupSuccess = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        state.token = null;
        setAuthToken(null);
        clearAuthData();
      })
      // Login cases
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        state.token = null;
        setAuthToken(null);
        clearAuthData();
      })
      // GetMe cases
      .addCase(getMe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        state.token = null;
        setAuthToken(null);
        clearAuthData();
      })
      // Logout case
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isSuccess = false;
        state.isError = false;
        state.message = '';
      });
  }
});

export const { reset, clearError, resetSignupSuccess, setToken } = authSlice.actions;
export default authSlice.reducer;