import "./PaginaPrincipal.css";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState } from "react";
import { useNavigate } from "react-router";

function PaginaPrincipal (){

    const [visible, setVisible] = useState(false);
    const navigate= useNavigate();

    const mostrarMenu = () => {
        setVisible(!visible);
    };

    const ocultarMenu= ()=>{
        setVisible(!visible);
    }

    const abrirRegistro = ()=>{
        navigate("/registro")
    }

    return(
        <div id="principal">
            <div id="top">
                <img src="src\Logo\logo_Estebanquito.png" id="logo" width="125px"/>
            
                <div id="navegadorPaginas">
                    <ul id="paginas"  style={{ display: visible ? "flex" : "none" }}>
                        <button id="cerrar" onClick={ocultarMenu}><i className="bi bi-x-circle"></i></button>
                        <Link to="/" className="pagina"> Página Principal</Link>
                        <Link to="/login" className="pagina"> Inciar Sesión</Link>
                        <Link to="/registro" className="pagina"> Registrarme</Link>
                    </ul>
                    {!visible && (
                        <button id="menuHamburguesa" onClick={mostrarMenu}>
                            <i className="bi bi-list" style={{fontSize: '36px', color:"rgb(0, 53, 24)"}}></i>
                        </button>
                    )}
                </div>
            </div>

            <div id= "center">
                    <div id="panel">
                        <h1>Descubre lo que Estebanquito tiene para ti...</h1>
                        <button id="registrar" onClick={abrirRegistro}>Registrate ahora</button>
                    </div>
            </div>

            <div id="bottom">
                <h1>Conoce nuestros servicios</h1>
                <div id="servicios">
                    <ul id="lista">
                        <li className="servicio"> <h2>Transacciones</h2>
                            <img src="src\Logo\6221107.png" alt="Transacciones" width="180px" className="imagen"/></li>
                        <li className="servicio"><h2>Préstamos</h2>
                            <img src="src\Logo\images.png" alt="Prestamos" width="180px" className="imagen"/></li>
                        <li className="servicio"><h2>Reportes</h2>
                            <img src="src\Logo\2278946.png" alt="Reportes" width="180px" className="imagen"/></li>
                        <li className="servicio"><h3>Administra tu cuenta</h3>
                            <img src="src\Logo\images (1).png" alt="Configura" width="180px" className="imagen"/></li>
                        
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default PaginaPrincipal;