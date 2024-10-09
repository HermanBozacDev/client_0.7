import './App.css';
import { BrowserRouter as BrowserRouter, Routes, Route } from 'react-router-dom';
//NAVBAR
import GuiaDeCompra from './Components/GuiaDeCompra/GuiaDeCompra';
import AccesoProd from './Components/AccesoProd/AccesoProd';
import AtencionCliente from './Components/AtencionCliente/AtencionCliente';
//ESTRUCTURALES
import Footer from './Components/Footer/Footer';
import Navbar from './Components/Navbar/Navbar';
//ETC
import CardContainer from './Components/CardContainer/CardContainer';
import CardDetail from './Components/CardDetail/CardDetail';
import Error from './Components/Error/Error';
import Notifications from './Components/Notifications/Notifications';
//PANELES DE ADMINISTRACON
import PanelAdmin from './Components/AdminPanel/AdminPanel';
import PanelAdminEvento from './Components/PanelAdminEvento/PanelAdminEvento';
//MERCADOPAGO
import Success from './Components/MercadoPago/Success/Success';
import Pending from './Components/MercadoPago/Pending/Pending';
import Failure from './Components/MercadoPago/Failure/Failure';
import TicketDetail from './Components/TicketDetail/TicketDetail';
//ADMINISTRACION
import AdminLogin from './Components/AdminPanel/AdminLogin/AdminLogin';

//import Banner from './Components/Banner/Banner';

function App() {
  /* const [count, setCount] = useState(0) */
  return (
    <BrowserRouter>
      <div className='APP container-fluid'>
        <Navbar />   
        <Routes>
          <Route path="/" element={<CardContainer/>}/>
          <Route path="/GuiaCompra" element={<GuiaDeCompra />} />
          <Route path="/AtencionAlCliente" element={<AtencionCliente />} />
          <Route path="/AccesoProductores" element={<AccesoProd />} />
          <Route path='/CardDetail' element={<CardDetail/>} />
          <Route path="/PanelAdminEvento" element={<PanelAdminEvento />} />
          <Route path="/Success" element={<Success />} />
          <Route path="/Error" element={<Error />} />
          <Route path="/Pending" element={<Pending />} />
          <Route path="/Notifications" element={<Notifications />} />
	  <Route path="/PanelAdmin" element={<PanelAdmin />} />
	  <Route path="/TicketDetail" element={<TicketDetail />} />
	  <Route path="/AdminLogin" element={<AdminLogin />} />



        </Routes>

       {/*  <Banner /> */}



        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App