import "./Adjust.css";
import { useState } from "react";
import {Link} from "react-router";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";

function Adjust(){

    const [visible, setVisible] = useState(false);

    const navigate= useNavigate();

    const location= useLocation();

    const retrocede = ()=>{
        navigate("/dashboard")
    }
    return(
        <div id = "principalAdjust">
            <div id="top">
                <img src="src/Logo/logo_Estebanquito.png" id="logo" width="125px"/>
            </div>
            <button id="menuHamburguesaAd" onClick={retrocede}>
                <i className="bi bi-x-circle"></i>
            </button>
            <div id = "ventanaAdjustP">
                <div id = "contenedorSolicitudes">
                    <h1 id = "CambiarContraseña">Cambia tu contraseña</h1>
                    <div id="contenedorInputAd">
                        <input type="text" 
                        className="inputContraseñaA"
                        placeholder="Ingresa tu contraseña actual"/>

                        <input type="Nuevo Usuario" 
                        className="inputContraseñaN" 
                        placeholder="Ingresa tu nueva contraseña"/>
                        <button id="botonGuardar">Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Adjust;

