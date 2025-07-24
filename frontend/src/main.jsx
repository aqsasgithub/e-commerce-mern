import { Profiler, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Route, RouterProvider, createRoutesFromElements } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import './index.css';
import App from './App.jsx';

//PrivateRoute
import PrivateRoute from './components/PrivateRoute.jsx';

//auth
import Login from './pages/auth/Login.jsx';
import Register from './pages/auth/Register.jsx';



import Profile from './pages/user/Profile.jsx'; 

//Admin Routes
import AdminRoutes from './pages/admin/AdminRoutes.jsx';
import UserList from './pages/admin/UserList.jsx';
import CategoryList from './pages/admin/CategoryList.jsx';
import ProductList from './pages/admin/ProductList.jsx';
import ProductUpdate from './pages/admin/ProductUpdate.jsx';
import AllProducts from './pages/admin/AllProducts.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route path='' element={<PrivateRoute />}>
      <Route path='/profile' element={<Profile />} />
      </Route>

      <Route path='/admin' element={<AdminRoutes />}>
      
      <Route path='userlist' element={<UserList />} />
      <Route path='categorylist' element={<CategoryList />} />
      <Route path='productlist/:pageNumber' element={<ProductList />} />
      <Route path='allproductslist' element={<AllProducts />} />
      <Route path='product/update/:_id' element={<ProductUpdate />} />
      </Route>
      </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
  </Provider>,
)
