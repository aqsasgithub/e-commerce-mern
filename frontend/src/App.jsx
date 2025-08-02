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
    <main className="py-3">
      <Outlet></Outlet>
    </main>
    </>
  )
}

export default App;