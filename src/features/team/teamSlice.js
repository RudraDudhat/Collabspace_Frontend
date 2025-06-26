import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axios';
import { getAuthData } from '../../utils/auth';

// Initial state
const initialState = {
  teams: [],
  currentTeam: null,
  status: 'idle',
  error: null,
  addMemberStatus: 'idle',
  addMemberError: null,
  joinLink: null,
  joinLinkStatus: 'idle',
  joinLinkError: null,
  joinTeamStatus: 'idle',
  joinTeamError: null,
  fetchTeamByIdStatus: 'idle',
  fetchTeamByIdError: null,
};

// Add member to team
export const addMemberToTeam = createAsyncThunk(
  'team/addMemberToTeam',
  async ({ teamId, email }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/teams/add-member/${teamId}`, { email });
      return response.data;
    } catch (error) {
      console.log('Error in addMemberToTeam:', error.response);
      // Handle 404 error specifically
      if (error.response?.status === 404) {
        return rejectWithValue('This email address is not registered. Please make sure the user has created an account first.');
      }
      // Handle other errors
      const errorMessage = error.response?.data?.message || error.message || 'Failed to add member';
      return rejectWithValue(errorMessage);
    }
  }
);

// Fetch a single team by ID
export const fetchTeamById = createAsyncThunk(
  'team/fetchById',
  async (teamId, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/teams/${teamId}`);
      return response.data.team;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to fetch team'
      );
    }
  }
);


// Create team
export const createTeam = createAsyncThunk(
  'teams/create',
  async (teamData, thunkAPI) => {
    try {
      const { user } = thunkAPI.getState().auth;

      await axiosInstance.post('/teams/create-team', {
        name: teamData.name,
        createdBy: user._id,
      });

      const teamsResponse = await axiosInstance.get('/users/teams');
      return Array.isArray(teamsResponse.data.teams) ? teamsResponse.data.teams : [];
    } catch (error) {
      console.error('Create team error:', error);
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// Fetch teams
export const fetchTeams = createAsyncThunk(
  'teams/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/users/teams');
      return Array.isArray(response.data.teams) ? response.data.teams : [];
    } catch (error) {
      console.error('Fetch teams error:', error);
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// Generate join link
export const generateJoinLink = createAsyncThunk(
  'teams/generateJoinLink',
  async (teamId, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/teams/generate-join-link/${teamId}`);
      return response.data.joinLink;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || error.message
      );
    }
  }
);


// Join team using token
export const joinTeamWithLink = createAsyncThunk(
  'teams/joinTeamWithLink',
  async ({ teamId, token }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/teams/join-team/${teamId}`, { token });
      // After successfully joining, fetch the updated team data
      const teamResponse = await axiosInstance.get(`/teams/${teamId}`);
      return {
        message: response.data.message,
        team: teamResponse.data.team
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || error.message
      );
    }
  }
);


// Slice
const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    resetTeamState: (state) => {
      state.status = 'idle';
      state.error = null;
      state.teams = [];
    },
    resetAddMemberStatus: (state) => {
      state.addMemberStatus = 'idle';
      state.addMemberError = null;
    },
    resetJoinLinkState: (state) => {
      state.joinLink = null;
      state.joinLinkStatus = 'idle';
      state.joinLinkError = null;
    },
    resetJoinTeamStatus: (state) => {
      state.joinTeamStatus = 'idle';
      state.joinTeamError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch teams
      .addCase(fetchTeams.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchTeams.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.teams = action.payload;
      })
      .addCase(fetchTeams.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.teams = [];
      })

      // Create team
      .addCase(createTeam.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createTeam.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.teams = action.payload;
      })
      .addCase(createTeam.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Add member
      .addCase(addMemberToTeam.pending, (state) => {
        state.addMemberStatus = 'loading';
        state.addMemberError = null;
      })
      .addCase(addMemberToTeam.fulfilled, (state, action) => {
        state.addMemberStatus = 'succeeded';
        state.addMemberError = null;
        if (action.payload.team) {
          state.currentTeam = action.payload.team;
        }
      })
      .addCase(addMemberToTeam.rejected, (state, action) => {
        console.log('Add member rejected:', action.payload);
        state.addMemberStatus = 'failed';
        state.addMemberError = action.payload;
      })

      // Generate join link
      .addCase(generateJoinLink.pending, (state) => {
        state.joinLinkStatus = 'loading';
        state.joinLinkError = null;
      })
      .addCase(generateJoinLink.fulfilled, (state, action) => {
        state.joinLinkStatus = 'succeeded';
        state.joinLink = action.payload;
      })
      .addCase(generateJoinLink.rejected, (state, action) => {
        state.joinLinkStatus = 'failed';
        state.joinLinkError = action.payload;
      })

      // Join team via link
      .addCase(joinTeamWithLink.pending, (state) => {
        state.joinTeamStatus = 'loading';
        state.joinTeamError = null;
      })
      .addCase(joinTeamWithLink.fulfilled, (state, action) => {
        state.joinTeamStatus = 'succeeded';
        // Update the current team with the new data
        if (action.payload.team) {
          state.currentTeam = action.payload.team;
        }
      })
      .addCase(joinTeamWithLink.rejected, (state, action) => {
        state.joinTeamStatus = 'failed';
        state.joinTeamError = action.payload;
      })

      // Fetch team by ID
      .addCase(fetchTeamById.pending, (state) => {
        state.fetchTeamByIdStatus = 'loading';
        state.fetchTeamByIdError = null;
        state.currentTeam = null;
      })
      .addCase(fetchTeamById.fulfilled, (state, action) => {
        state.fetchTeamByIdStatus = 'succeeded';
        state.currentTeam = action.payload;
        state.fetchTeamByIdError = null;
      })
      .addCase(fetchTeamById.rejected, (state, action) => {
        state.fetchTeamByIdStatus = 'failed';
        state.fetchTeamByIdError = action.payload;
        state.currentTeam = null;
      });
  }
});

export const { resetTeamState, resetAddMemberStatus, resetJoinLinkState, resetJoinTeamStatus,} = teamSlice.actions;

export default teamSlice.reducer;
