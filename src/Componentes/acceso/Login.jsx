import "./Login.css";
import {Link} from "react-router";
import { useNavigate } from "react-router";
import { useState } from "react";

function Login(){

    const navigate= useNavigate();
    const [campo, setCampo]= useState("");
    const [contraseña, setConstraseña]= useState("");

    const [visible, setVisible] = useState(false);

    
    const mostrarMenu = () => {
        setVisible(!visible);
    };

    const ocultarMenu= ()=>{
        setVisible(!visible);
    }


    const validarUser= ()=>{
        
        const dataGuardada = localStorage.getItem("usuarios");
        const usuarios = dataGuardada ? JSON.parse(dataGuardada) : [];

        for (let i = 0; i < usuarios.length; i++) {
            if (usuarios[i].correo === campo) {
                if( usuarios[i].contraseña === contraseña){
                    localStorage.setItem("pruebita", campo);
                    navigate("/dashboard");
                    return;
                }
                else{
                    alert("Contraseña incorrecta");
                    return;
                }
            }
        }

        alert("Usuario no registrado");
    }

    return(
        <div id="panelPrincipal">

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

        <div id="contenedorPadre">            
            <div id="contenedorLogin">
                <h1 id="label">Bienvenido a <b>Estebanquito</b></h1>
                <div id="contenedorInputs">
                    <input type="text" 
                    onChange={(e)=> setCampo(e.target.value)} 
                    className="inputLogin"
                    placeholder="Correo electrónico"/>

                    <input type="password" 
                    onChange={(e)=> setConstraseña(e.target.value)}
                    className="inputLogin" 
                    placeholder="Contraseña"/>
                    <Link to="/adjust" id="link"> ¿Olvidaste tu contraseña?</Link>

                    <button id="boton" onClick={validarUser}>Iniciar Sesión</button>
                    <Link to="/registro" id="link"> ¿No tienes una cuenta? Registrate</Link>
                </div>
            </div>

            <img src="src\Logo\Gemini_Generated_Image_igf225igf225igf2.png" id= "image"/> 
        </div>
    </div>    
    )
}

export default Login;