//HERMAN EDITO ACA
import './App.css';
import { BrowserRouter as BrowserRouter, Routes, Route } from 'react-router-dom';
import GuiaDeCompra from './Components/GuiaDeCompra/GuiaDeCompra';
import AccesoProd from './Components/AccesoProd/AccesoProd';
import CardContainer from './Components/CardContainer/CardContainer';
import CardDetail from './Components/CardDetail/CardDetail';
import PanelAdminEvento from './Components/PanelAdminEvento/PanelAdminEvento';
import AtencionCliente from './Components/AtencionCliente/AtencionCliente';
import Footer from './Components/Footer/Footer';
import Navbar from './Components/Navbar/Navbar';

import Error from './Components/Error/Error';

import Notifications from './Components/Notifications/Notifications';
import Banner from './Components/Banner/Banner';

import Login from './Components/Login/Login';
import LoginAdmin from './Components/LoginAdmin/LoginAdmin';
import PanelAdmin from './Components/AdminPanel/AdminPanel';
import TicketDetail from './Components/TicketDetail/TicketDetail';

//MERCADOPAGO
import Success from './Components/mercadopago/Success/Success';
import Pending from './Components/mercadopago/Pending/Pending';
import Failure from './Components/mercadopago/Failure/Failure';


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
          <Route path="/Login" element={<Login />} />
	  <Route path="/LoginAdmin" element={<LoginAdmin />} />
	  <Route path="/PanelAdmin" element={<PanelAdmin />} />
	  <Route path="/TicketDetail" element={<TicketDetail />} />



        </Routes>

       {/*  <Banner /> */}



        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
