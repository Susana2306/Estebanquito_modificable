import './App.css'
import PaginaPrincipal from './Componentes/principal/PaginaPrincipal'
import Dashboard from './Componentes/dashboard/Dashboard'
import { BrowserRouter, Routes, Route } from "react-router";
import Login from './Componentes/acceso/Login'
import Registro from './Componentes/acceso/Registro'
import Transferencia from './Componentes/Movimientos/Transferencia';
import ReporteFinanciero from './Componentes/reportes/ReporteFinanciero';
import Prestamo from './Componentes/prestamos/Prestamo';
import Historial from './Componentes/historial/Historial';
import Adjust from './Componentes/adjust/Adjust';



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaginaPrincipal />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/transferir" element={<Transferencia />} />
        <Route path="/reporteFinanciero" element={<ReporteFinanciero />} />
        <Route path="/SolicitarPrestamo" element={<Prestamo />} />
        <Route path="/historial" element={<Historial />} />
        <Route path="/adjust" element={<Adjust />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
