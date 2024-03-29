import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth';

function App() {
  const AuthLandingPage = Auth(LandingPage, null);
  const AuthLoginPage = Auth(LoginPage, false);
  const AuthRegisterPage = Auth(RegisterPage, false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthLandingPage />}></Route>
        <Route path="/login" element={<AuthLoginPage />}></Route>
        <Route path="/register" element={<AuthRegisterPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
