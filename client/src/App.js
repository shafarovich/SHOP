import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import { observer } from "mobx-react-lite";
import NavBar from './components/NavBar';
import { check } from './http/userAPI';
import { Spinner } from 'react-bootstrap';
import { Context } from '.';
import Footer from './components/Footer';

const App = observer(() => {
  const { user, product } = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    check().then(data => {
      user.setUser(data.role)
      user.setIsUser(data.id)
      user.setIsAuth(true)
      if (data.role === 'ADMIN') { 
        user.setIsAdmin(true); 
      } 
    }).catch(error => {
      // Обработка ошибки при запросе
      console.error('Failed to check user authentication:', error);
    }).finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <Spinner animation={"grow"} />
  }

  return (

    <BrowserRouter>
      <NavBar />
      <AppRouter />
      <Footer />
    </BrowserRouter>
  );
});

export default App;