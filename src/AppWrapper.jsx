import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setToken, getMe, logout } from './features/auth/authSlice';
import { fetchTeams } from './features/team/teamSlice';
import { getAuthData } from './utils/auth';

const AppWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const { token, user, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { token: savedToken, user: savedUser } = getAuthData();
        
        if (savedToken && !token) {
          // If we have a saved token but no token in state, restore it
          dispatch(setToken(savedToken));
        } else if (token && !user && !isLoading) {
          // If we have a token but no user, fetch user data
          await dispatch(getMe()).unwrap();
          // Fetch teams after getting user data
          await dispatch(fetchTeams()).unwrap();
        } else if (!token && user) {
          // If we have a user but no token, something is wrong
          dispatch(logout());
          window.location.href = '/login';
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        dispatch(logout());
        window.location.href = '/login';
      }
    };

    initializeAuth();
  }, [dispatch, token, user, isLoading]);

  return children;
};

export default AppWrapper;
