const HeaderPanel = ({ onLogout }) => (
  <div>
    <h1>Panel de Administración de Eventos</h1>
    <button onClick={onLogout}>Cerrar Sesión</button>
    <h3>Esta funcionando la base de datos, puedes crear eventos, eliminarlos, modificarlos, y buscar por día, descripción o nombre. Estamos trabajando para usted.</h3>
  </div>
);
export default HeaderPanel
