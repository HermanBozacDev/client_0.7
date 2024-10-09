import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../AccesoProd/AccesoProd.css'; // Mantén el CSS original
import logoFloat from '../../assets/logoblancoSinFondo.png';

const AccesoProd = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://www.imperioticket.com/api/productorLogin', {
        username,
        password,
      });

      const { token } = response.data;

      localStorage.setItem('token', token);

      // Redirige a la página de administración
      navigate('/panelAdminEvento');
    } catch (error) {
      alert(error.response?.data?.message || 'Error al iniciar sesión');
    }
  };

  return (
    <div className='accesoProdContainer'>
      <div className="container w-75 mt-5 mb-5 rounded shadow">
        <div className="row aligns-items-strech formRow">
          <div className="col bg d-none d-lg-block col-xs-12 col-lg-6 col-xl-6 rounded logoform">
            <img src={logoFloat} alt="logo" className='logoblanco2' />
          </div>
          <div className="col col-xs-12 bg-white p-5 rounded-end">
            <h2 className="fw-bold text-center py-3 formulario-titulo">Imperio Ticket - Ingreso Panel Administrativo</h2>
            <form onSubmit={handleLogin}> {/* Cambiamos el 'action' por 'onSubmit' */}
              <div className="mb-2">
                <label htmlFor="username" className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)} // Manejo de estado
                />
              </div>
              <div className="mb-2">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Manejo de estado
                />
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccesoProd;
