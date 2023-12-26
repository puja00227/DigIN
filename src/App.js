import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './Screens/Home';
import Login from './Screens/Login';
import SignUp from './Screens/SignUp';
import { SnackbarProvider } from 'notistack';
import { CartProvider } from './Components/ContextReducer';
import Start from './Screens/Start';
import MyOrder from './Screens/MyOrder';


function App() {
  return (
    <CartProvider>
      <Router>
        <SnackbarProvider>
          <div>
            <Routes>
              <Route exact path="/" element={<Start />} />
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/signin" element={<Login />} />
              <Route exact path="/signup" element={<SignUp />} />
              <Route exact path="/myorder" element={<MyOrder />} />
            </Routes>
          </div>
        </SnackbarProvider>
      </Router>
    </CartProvider>
  );
}

export default App;
