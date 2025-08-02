import { Outlet } from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navigation from './pages/auth/Navigation.jsx';
import './index.css'

function App() {

  return (
    <>
    <ToastContainer />
    <Navigation />
    <main className="ml-[15%] hover:ml-[4%] transition-all duration-300">
    <Outlet></Outlet>
    </main>
    </>
  )
}

export default App;