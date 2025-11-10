import "./Adjust.css";
import { useState } from "react";
import {Link} from "react-router";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";

function Adjust(){

    const navigate= useNavigate();

    const retrocede = ()=>{
        navigate("/dashboard")
    }

    const [contraseñaAntigua, setContraseñaAntigua]= useState("");
    const [contraseñaNueva, setContraseñaNueva]= useState("");
    const [confirmacion, setConfirmacion]= useState("");


const guardar = async () => {

    if (!contraseñaAntigua || !contraseñaNueva || !confirmacion) {
        alert("Todos los campos son obligatorios");
    return;

    }
    if (contraseñaAntigua === contraseñaNueva) {
        alert("Tu nueva contraseña debe ser diferente a la actual");
        return;
    }

    if (contraseñaAntigua === confirmacion) {
        alert("Los campos no son válidos");
        return;
    }

    if (contraseñaNueva !== confirmacion) {
        alert("Las contraseñas no coinciden");
        return;
    }

    try {
        const usuario = JSON.parse(localStorage.getItem("usuarioActual"));
        const id = usuario?.correo;

        if (!id) {
            alert("No se encontró el usuario");
            return;
        }

        const res = await fetch(`http://localhost:3001/cambiarContrasena/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ nuevaContraseña: contraseñaNueva }),
        });

        console.log("Respuesta raw:", res);

        const data = await res.json();
        console.log("Respuesta json:", data);

        if (res.ok) {
            alert(data.message); 
            navigate("/dashboard");
        } else {
            alert("Error al cambiar la contraseña: " + (data.message || res.statusText));
        }

    } catch (err) {
        console.error("Error al actualizar contraseña:", err);
        alert("Ocurrió un error al actualizar la contraseña");
    }
};
    

    return(
        <div id = "principalAdjust">
            <div id="top">
                <img src="src/Logo/logo_Estebanquito.png" id="logo" width="125px"/>
            </div>
            
            <div id = "ventanaAdjustP">
                <div id = "contenedorSolicitudes">
                    <div id= "align">
                        <button id="menuHamburguesaAd" onClick={retrocede}>
                            <i className="bi bi-x-circle"></i>
                        </button>
                    </div>
                    
                    <h1>Cambia tu contraseña</h1>
                        < div id="contenedorInputAd">
                            <input type="text" 
                            onChange={(e)=> setContraseñaAntigua(e.target.value)}
                            className="inputContraseñaA"
                            placeholder="Ingresa tu contraseña actual"/>

                            <input type="text" 
                            onChange={(e)=> setContraseñaNueva(e.target.value)}
                            className="inputContraseñaN" 
                            placeholder="Ingresa tu nueva contraseña"/>

                            <input type="password" 
                            onChange={(e)=> setConfirmacion(e.target.value)}
                            className="inputContraseñaN" 
                            placeholder="Repite tu nueva contraseña"/>
                            <button id="botonGuardar" onClick={guardar}>Guardar</button>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default Adjust;

