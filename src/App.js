import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import TodoPage from './pages/TodoPage';
import MemoPage from './pages/MemoPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';


function App() {
  return (
    <BrowserRouter>
    <div className='app'>
      <Navbar />
      <hr />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/todo" element={<TodoPage />}></Route>
        <Route path="/memo" element={<MemoPage />}></Route>
        <Route path="/profile" element={<ProfilePage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        
        <Route path="/register" element={<RegisterPage />}></Route>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
