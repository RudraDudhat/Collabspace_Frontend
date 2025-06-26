import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import TeamPage from './pages/TeamPage';
import Landing from './pages/Landing';
import Chat from './pages/Chat';
import Tasks from './pages/Tasks';
import AppWrapper from './AppWrapper';

function App() {
  return (
    <Router>
      <AppWrapper>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/teams/:teamId" element={<TeamPage />} />
        </Routes>
      </AppWrapper>
    </Router>
  );
}

export default App;