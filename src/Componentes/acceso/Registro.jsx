import "./Registro.css";
import { useState } from "react";
import {Link} from "react-router";
import { useNavigate } from "react-router";

function Registro (){
    const [visible, setVisible] = useState(false);
    
    const navigate= useNavigate();

    const mostrarMenu = () => {
        setVisible(!visible);
    };

    const ocultarMenu= ()=>{
        setVisible(!visible);
    }

    const abrirDashboard= ()=>{
        navigate("/dashboard");
    }

    return(
        <div id="fondo">
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
            
            <div id="ventanaPrincipal">
                    <div id="form">
                        <h1>Organiza tus <strong>finanzas</strong></h1>
                        <h2>con nosotros</h2>
                        <input type="text" placeholder="Ingresa tu nombre completo" className="input"/>
                        <input type="date" placeholder="Ingresa tu fecha de nacimiento" className="input"/>
                        <div id="identidad">
                            <select className="identidadBox">
                                <option value="cc">CC</option>
                                <option value="cc">CE</option>
                            </select>
                            <input type="number" placeholder="Ingresa tu número de documento" className="identidadInput"/>
                        </div>
                        <select className="identidadInput">
                                <option value= "" disabled selected>Selecciona el tipo de persona</option>
                                <option value="ahorros">Natural</option>
                                <option value="corriente">Jurídica</option>
                            </select>
                        <input type="text" placeholder="¿Cómo te gusta que te llamen?" className="input"/>
                        <input type="text" placeholder="Ingresa tu correo electrónico" className="input"/>
                        <input type="text" placeholder="Ingresa tu contraseña" className="input"/>
                        <input type="password" placeholder="Repite la contraseña" className="input"/>
                        <button id="registra" onClick={abrirDashboard}>Registrarme</button>
                        <Link to="/login" id="link">¿Ya tienes una cuenta? Inicia sesión</Link>
                    </div>
            </div>

        </div>
    )
}

export default Registro;