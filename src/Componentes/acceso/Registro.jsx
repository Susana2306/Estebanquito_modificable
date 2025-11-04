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

    const [confirmacion, setConfirmacion]= useState("");
    
    const [formData, setFormData] = useState({
        nombre: "",
        fechaNacimiento: "",
        tipoIdentificacion: "",
        numeroIdentificacion: "",
        tipoCuenta: "",
        apodo: "",
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

    const [errorMsg, setErrorMsg] = useState("");
    const[user, setUser]= useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("")
        console.log("Datos enviados:", formData);
        try {
            const deuda=0.00;

            if(formData.contrasena===confirmacion){

                const urlbase = "http://localhost:3001/"

                const response = await fetch(urlbase + "usuarios_estebanquito", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),

                })

                const data = await response.json();

                if(data.codigo===1){
                    alert(data.message)
                }
                else{
                    alert(data.message)

                    const getUser= async()=>{
                    return fetch(`http://localhost:3001/usuario_interes/${formData.correo}`).
                        then((res)=> {return res.json()}). 
                        then((data2) => {setUser(data2); return data2;}).
                        catch((err)=> console.log(err))
                    }

                    const data2 = await getUser();
                    const usuario = {
                    ...data2.generales[0],
                    deuda:deuda
                    };
                    navigate("/dashboard");
                    
                    localStorage.setItem("usuarioActual", JSON.stringify(usuario))
                }
                
                
                
            }
            else{
                setErrorMsg("Las contraseñas no coinciden");
                return;
            }
            
        } catch (error) {
            console.log(error)
            
        }
};


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
                <form id="form" onSubmit={handleSubmit}>
                        <h1>Organiza tus <strong>finanzas</strong></h1>
                        <h2>con nosotros</h2>

                        <input 
                        placeholder="Ingresa tu nombre completo" 
                        className="input"
                        onChange={handleChange}
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        />

                        <input type="date" 
                        placeholder="Ingresa tu fecha de nacimiento" 
                        className="input"
                        name="fechaNacimiento"
                        value={formData.fechaNacimiento}
                        onChange={handleChange}
                        />

                        <div id= "identidad">
                            <select
                            className="identidadBox"
                            name="tipoIdentificacion"
                            value={formData.tipoIdentificacion}
                            onChange={handleChange}>
                                <option value= "" disabled>Tipo</option>
                                <option value= "CC">CC</option>
                                <option value= "CE">CE</option>
                                <option value= "NIT">NIT</option>
                            </select>

                            <input type="number" 
                                placeholder="Ingresa tu número de documento" 
                                className="identidadInput"
                                name="numeroIdentificacion"
                                value={formData.numeroIdentificacion}
                                onChange={handleChange}
                            />
                        </div>


                    <select className="input"
                    name="tipoCuenta"
                    value={formData.tipoCuenta}
                    onChange={handleChange}>
                        <option value= "" disabled>Selecciona el tipo de persona</option>
                        <option value="Natural">Natural</option>
                        <option value="Jurídica">Jurídica</option>
                    </select>   
                        

                    <input
                            className="input"
                            type="text"
                            name="apodo"
                            value={formData.apodo}
                            onChange={handleChange}
                            placeholder="Apodo"
                    />


                    <input
                        className="input"
                        type="text"
                        name="correo"
                        value={formData.correo}
                        onChange={handleChange}
                        placeholder="Correo"
                    />


                    <input
                        className="input"
                        type="password"
                        name="contrasena"
                        value={formData.contrasena}
                        onChange={handleChange}
                        placeholder="Contraseña"
                    />

                    <input
                        className="input"
                        type="password"
                        onChange={(e)=> setConfirmacion(e.target.value)}
                        placeholder="Repite la contraseña"
                    />

                    {errorMsg && <h5 style={{ color: "red" }}>{errorMsg}</h5>}

                        <button id="registra" type="submit">Registrarme</button>
                        <Link to="/login" id="link">¿Ya tienes una cuenta? Inicia sesión</Link>
                </form>
            </div>

        </div>
    )
}

export default Registro;
