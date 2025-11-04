import "./Login.css";
import {Link} from "react-router";
import { useNavigate } from "react-router";
import { useState } from "react";

function Login(){

    const navigate= useNavigate();

    const [visible, setVisible] = useState(false);

    const mostrarMenu = () => {
        setVisible(!visible);
    };

    const ocultarMenu= ()=>{
        setVisible(!visible);
    }

    const [formData, setFormData] = useState({
        correo: "",
        contrasena: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value,
        });
    };

    
    const[user, setUser]= useState({});

    const getUser= async()=>{
            return fetch(`http://localhost:3001/usuario_interes/${formData.correo}`).
                then((res)=> {return res.json()}). 
                then((data) => {setUser(data); return data;}).
                catch((err)=> console.log(err))
            }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await getUser();
        try {

            console.log("DATA RECIBIDA DEL BACKEND:", data);

            if((formData.correo===data.generales[0].correo) && (formData.contrasena===data.generales[0].contrasena)){

                const usuario = {
                ...data.generales[0],
                deuda:data.deuda
                };

                localStorage.setItem("usuarioActual", JSON.stringify(usuario))
                navigate("/dashboard");
            }
            else{
                alert("Credenciales incorrectas")
            }
        }
        catch(error){
            console.log(error)
        }
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
                <form id="contenedorInputs" onSubmit={handleSubmit}>
                    <input type="text" 
                    onChange={handleChange}
                    name="correo"
                    value={formData.correo}
                    className="inputLogin"
                    placeholder="Correo electrónico"/>

                    <input type="password" 
                    name="contrasena"
                    value={formData.contrasena}
                    onChange={handleChange}
                    className="inputLogin" 
                    placeholder="Contraseña"/>
                    <Link to="/adjust" id="link"> ¿Olvidaste tu contraseña?</Link>

                    <button id="boton" type="submit">Iniciar Sesión</button>
                    <Link to="/registro" id="link"> ¿No tienes una cuenta? Registrate</Link>
                </form>
            </div>

            <img src="src\Logo\Gemini_Generated_Image_igf225igf225igf2.png" id= "image"/> 
        </div>
    </div>    
    )
}

export default Login;