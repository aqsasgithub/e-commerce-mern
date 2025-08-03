import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navigation from './pages/auth/Navigation.jsx';
import './index.css';

function App() {
  console.log("ENV TEST:", import.meta.env.VITE_API_BASE);

  return (
    <>
      <ToastContainer />
      <div className="flex">
        {/* Sidebar (Navigation) */}
        <Navigation />

        {/* Main Content */}
        <main className="main-content pt-[4.5rem] md:pt-0 transition-all duration-300 w-full">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
