const verifyToken = (navigate) => {
  const token = localStorage.getItem('superadmin');
  if (!token) {
    navigate('/loginAdmin'); // Redirigir si no hay token
    return null; // No continuar si no hay token
  }
  return token; // Retornar el token si existe
};
