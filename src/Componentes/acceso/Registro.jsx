import "./Registro.css";
import { useState, useEffect } from "react";
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


    const [usuario, setUsuario] = useState(() => {
        const dataGuardada = localStorage.getItem("usuarios");
        return dataGuardada ? JSON.parse(dataGuardada)
        :[
            {
                nombre: "Susana Solórzano",
                fechaNacimiento: "2006-02-03",
                tipoIdentidad: "CE",
                numI: "1035973422",
                tipoCuenta: "Ahorros",
                apodo: "Susi",
                correo: "ssolorzano@correo.iue.edu.co",
                contraseña: "123",
            },
        ];
});

    const [name, setName]= useState("");
    const [fechaN, setFechaN]= useState("");
    const [tipoI, setTipoI]= useState("");
    const [numI, setNumI]= useState("");
    const [tipoC, setTipoC]= useState("");
    const [apodo, setApodo]= useState("");
    const [correo, setCorreo]= useState("");
    const [contraseña, setContraseña]= useState("");
    const [confirmacion, setConfirmacion]= useState("");

    useEffect(() => {
    localStorage.setItem("usuarios", JSON.stringify(usuario))}, [usuario]);

    const crearUsuario = ()=>{
        if(contraseña==confirmacion){
            setUsuario([...usuario, { nombre: name, 
                fechaNacimiento: fechaN,
                tipoIdentidad: tipoI,
                numI: numI,
                tipoCuenta: tipoC,
                apodo: apodo,
                correo: correo,
                contraseña: contraseña}]);
                
            localStorage.setItem("pruebita", apodo)
            navigate("/dashboard");
        }
        else{
            alert("Las contraseñas no coinciden");
        }
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

                        <input type="text" 
                        onChange={(e)=> setName(e.target.value)} 
                        placeholder="Ingresa tu nombre completo" 
                        className="input"/>

                        <input type="date" 
                        onChange={(e)=> setFechaN(e.target.value)} 
                        placeholder="Ingresa tu fecha de nacimiento" 
                        className="input"/>

                        <div id="identidad">
                            <select className="identidadBox"
                            onChange={(e)=> setTipoI(e.target.value)}>
                                <option value="CC">CC</option>
                                <option value="CE">CE</option>
                            </select>

                        <input type="number" 
                        onChange={(e)=> setNumI(e.target.value)}
                        placeholder="Ingresa tu número de documento" 
                        className="identidadInput"/>

                        </div>

                        <select className="identidadInput"
                        onChange={(e)=> setTipoC(e.target.value)}>
                                <option value= "" disabled selected>Selecciona el tipo de persona</option>
                                <option value="ahorros">Natural</option>
                                <option value="corriente">Jurídica</option>
                        </select>

                        <input type="text" 
                        onChange={(e)=> setApodo(e.target.value)}
                        placeholder="¿Cómo te gusta que te llamen?" 
                        className="input"/>

                        <input type="text" 
                        onChange={(e)=> setCorreo(e.target.value)}
                        placeholder="Ingresa tu correo electrónico" 
                        className="input"/>

                        <input type="text" 
                        onChange={(e)=> setContraseña(e.target.value)}
                        placeholder="Ingresa tu contraseña" 
                        className="input"/>

                        <input type="password" 
                        onChange={(e)=> setConfirmacion(e.target.value)}
                        placeholder="Repite la contraseña" 
                        className="input"/>

                        <button id="registra" onClick={crearUsuario}>Registrarme</button>
                        <Link to="/login" id="link">¿Ya tienes una cuenta? Inicia sesión</Link>
                    </div>
            </div>

        </div>
    )
}

export default Registro;