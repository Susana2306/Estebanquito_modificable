import "./Recuperacion.css";
import { useState } from "react";
import {Link} from "react-router";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";

function Recuperacion(){

    const navigate= useNavigate();

    const retrocede = ()=>{
        navigate("/login")
    }

    const [nuevaContraseña, setNuevaContraseña]= useState("");
    const [cedula, setCedula]= useState("");
    const [numCuenta, setNumCuenta]= useState("");
    

    const guardarRe = async () => {
    if (!cedula || !numCuenta || !nuevaContraseña) {
        alert("Todos los campos son obligatorios");
        return;
    }

    const usuario = JSON.parse(localStorage.getItem("usuarioActual"));
    const actual = usuario?.contrasena;
    if (actual === nuevaContraseña) {
        alert("La nueva contraseña no puede ser igual a la actual");
        return;
    }

    try {
        const res = await fetch(`http://localhost:3001/recuperarContrasena/${numCuenta}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cedula, nuevaContraseña }),
    });

        const data = await res.json();

        if (res.ok) {
            alert(data.message); 
            navigate("/login");
        } else {
            alert("Error al cambiar la contraseña: " + (data.message || res.statusText));
        }
    } catch (err) {
        console.error("Error al actualizar contraseña:", err);
        alert("Ocurrió un error al actualizar la contraseña");
    }
};

    return(
        <div id = "principalRecuperacion">
            <div id="top">
                <img src="src/Logo/logo_Estebanquito.png" id="logo" width="125px"/>
            </div>
            
            <div id = "ventanaRecuperacionP">
                <div id = "contenedorSolicitudesRe">
                    <div id= "alignRe">
                        <button id="menuHamburguesaRe" onClick={retrocede}>
                            <i className="bi bi-x-circle"></i>
                        </button>
                    </div>
                    
                    <h1>Cambia tu contraseña</h1>
                        < div id="contenedorInputRe">
                            <input type="text" 
                            onChange={(e)=> setCedula(e.target.value)}
                            className="inputContraseñaA"
                            placeholder="Ingresa tu número de identificación"/>

                            <input type="textRe" 
                            onChange={(e)=> setNumCuenta(e.target.value)}
                            className="numeroCuenta" 
                            placeholder="Ingresa tu número de cuenta"/>

                            <input type="passwordRe" 
                            onChange={(e)=> setNuevaContraseña(e.target.value)}
                            className="nuevaContrasenaRe" 
                            placeholder="Ingresa tu nueva contraseña"/>

                            <button id="botonGuardarRe" onClick={guardarRe}>Guardar</button>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default Recuperacion;