import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';
import Register from './pages/Register';
import Home from './pages/Home';
import { PostProvider } from './context/PostContext';
import CreatePost from './pages/CreatePost';
import ConversationsList from './pages/ConversationsList';
import { ConversationProvider } from './context/ConversationContext';
import { SocketProvider } from './context/SocketContext';
import ChatRoom from './pages/ChatRoom';
import PrivateRoute from './components/PrivateRoute';
import Profile from './pages/Profie';
import Navbar from './components/NavBar';

function App() {
  return (
    <>
     <AuthProvider> 
      <SocketProvider>
    <ConversationProvider>
     <PostProvider>
     <Navbar />   
     <Routes>
          <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>} />  
          <Route path="/list" element={<PrivateRoute><ConversationsList/></PrivateRoute>} />  
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-post" element={<PrivateRoute><CreatePost /></PrivateRoute>} />
          <Route path="/chat/:conversationId" element={<PrivateRoute><ChatRoom /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      </Routes>
    </PostProvider>
    </ConversationProvider>
    </SocketProvider>
    </AuthProvider>
    </>
  );
}

export default App;