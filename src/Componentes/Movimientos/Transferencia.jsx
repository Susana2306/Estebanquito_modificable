import "./Transferencia.css";
import { useState } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";

function Transferencia(){

    const location= useLocation();

    const navigate= useNavigate();

    const {accion}= location.state;

    const retrocede = ()=>{
        navigate("/dashboard")
    }

    const usuario= JSON.parse(localStorage.getItem("usuarioActual"));
    const [formData_transferencia, setFormData_transferencia] = useState({
                cuentaDestino: "",
                valor: "",
                concepto:""
            });

    const [formData_deposito, setFormData_deposito] = useState({
                deposito: ""
            });
    
    const [formData_retiro, setFormData_retiro] = useState({
                retiro: ""
            });

    const updateStorage = async () =>{
                console.log(`${usuario.correo}`)

                return fetch(`http://localhost:3001/usuario_interes/${usuario.correo}`).
                then((res)=> res.json()). 
                then((data1) => data1).
                catch((err)=> console.log(err))
            }

    const [errorMsg, setErrorMsg] = useState("");
    const[user, setUser]= useState({});
    const[userD, setUserD]= useState({});

    const mostrarEnPanel = () => {
        
        if (accion === "transferir") {
            
            const handleChange = (e) => {
                const { name, value } = e.target;
                setFormData_transferencia({
                ...formData_transferencia,
                [name]: value,
                });
            };

            const handleSubmit = async (e) => {
                e.preventDefault();
                try{

                    

                const getUser = async()=>{
                    return fetch(`http://localhost:3001/usuario_transferencia/${formData_transferencia.cuentaDestino}`).
                        then((res)=> {return res.json()}). 
                        then((data) => {setUser(data); return data;}).
                        catch((err)=> console.log(err))
                }
                    
                    if(parseFloat(formData_transferencia.valor)<=parseFloat(usuario.totalSaldo)){
                    const urlbase = "http://localhost:3001/"

                    const response = await fetch(urlbase + `transferir/${usuario.numeroCuenta}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData_transferencia),



                })
                const data = await getUser();
                const data1= await updateStorage();

                const user = {
                ...data1.generales[0],
                deuda:data1.deuda
                };
                
                console.log(data1)
                console.log(data)

                localStorage.setItem("usuarioActual", JSON.stringify(user))

                alert(`Transferencia exitosa a ` + data[0].nombre)
                navigate("/dashboard");
                }
                else{
                    setErrorMsg("Error: Saldo insuficiente");
                    return;
                }

                console.log(formData_transferencia)

                }
                catch(err){
                    console.log(err)
                }
            }
            return (
                <div id="transferencia">
                    <div id="paraAlinear">
                        <button id="menuHamburguesa" onClick={retrocede}>
                            <i className="bi bi-x-circle"></i>
                        </button>
                    </div>
                    <h4>Transferencia</h4>
                    <form id="contenido" onSubmit={handleSubmit}>
                        {errorMsg && <h6 style={{ color: "red" }}>{errorMsg}</h6>}
                        <input placeholder="Cuenta destino"  
                        onChange={handleChange}
                        name="cuentaDestino"
                        value={formData_transferencia.cuentaDestino} 
                        className="input"/>
                        <input placeholder="Monto a transferir" 
                        onChange={handleChange}
                        name="valor"
                        value={formData_transferencia.valor}
                        className="input"/>
                        <input placeholder="Concepto" 
                        onChange={handleChange}
                        name="concepto"
                        value={formData_transferencia.concepto}
                        className="input"/>
                        <button id="registra" type="submit">Enviar</button>
                    </form>
                </div>
            );
            } 
            else if (accion === "depositar") {

                const handleChange = (e) => {
                const { name, value } = e.target;
                setFormData_deposito({
                ...formData_deposito,
                [name]: value,
                });
            };

            const handleSubmit = async (e) => {
                e.preventDefault();
                try{

                    console.log(formData_deposito);
                    const urlbase = "http://localhost:3001/"
                    const response = await fetch(urlbase + `deposito/${usuario.numeroCuenta}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData_deposito)})

                const data1= await updateStorage();

                const user = {
                ...data1.generales[0],
                deuda:data1.deuda
                };
                localStorage.setItem("usuarioActual", JSON.stringify(user))

                alert("Depósito exitoso")
                navigate("/dashboard")
                }
                catch(err){
                    console.log(err)
                }
            }

            return (
                <div id="transferencia">
                    <div id="paraAlinear2">
                        <button id="menuHamburguesa" onClick={retrocede}>
                            <i className="bi bi-x-circle"></i>
                        </button>
                    </div>
                    <form id="containerMov" onSubmit={handleSubmit}>
                        <h4>Depósito</h4>
                        <input placeholder="Monto a depositar" 
                        name="deposito"
                        onChange={handleChange}
                        value={formData_deposito.deposito}
                        className="input"/>
                        <button id="registra" type="submit">Confirmar</button>
                    </form>
                </div>
            );
            }
            else if (accion === "retirar") {

                const handleChange = (e) => {
                const { name, value } = e.target;
                setFormData_retiro({
                ...formData_retiro,
                [name]: value,
                });
            };
            
            const handleSubmit = async (e) => {
                e.preventDefault();
                try{

                    console.log(formData_retiro);
                    const urlbase = "http://localhost:3001/"
                    const response = await fetch(urlbase + `retiro/${usuario.numeroCuenta}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData_retiro)})

                const data1= await updateStorage();

                const user = {
                ...data1.generales[0],
                deuda:data1.deuda
                };
                localStorage.setItem("usuarioActual", JSON.stringify(user))

                alert("retiro exitoso")
                navigate("/dashboard")
                }
                catch(err){
                    console.log(err)
                }
            }
            return (
                <div id="transferencia">
                    <div id="paraAlinear2">
                        <button id="menuHamburguesa" onClick={retrocede}>
                            <i className="bi bi-x-circle"></i>
                        </button>
                    </div>
                    
                    <form id="containerMov" onSubmit={handleSubmit}>
                        <h4>Retiro</h4>
                        <input placeholder="Monto a retirar" 
                        name="retiro"
                        className="input"
                        onChange={handleChange}
                        value={formData_retiro.retiro}
                        />
                        <button id="registra" type="submit">Retirar</button>
                    </form>
                </div>
            );
            }
            else if (accion === "abono") {

            return (
                <div id="transferencia">
                    <div id="paraAlinear2">
                        <button id="menuHamburguesa" onClick={retrocede}>
                            <i className="bi bi-x-circle"></i>
                        </button>
                    </div>
                    
                    <form id="containerMov">
                        <h4>Retiro</h4>
                        <input placeholder="Monto a retirar" 
                        name="retiro"
                        className="input"
                        />
                        <button id="registra">Retirar</button>
                    </form>
                </div>
            );
            }
        };

    return(
        <div id="vistaPrincipal">
            <div id="top">
                <img src="src/Logo/logo_Estebanquito.png" id="logo" width="125px"/>
            </div>

            <div id="cuerpo">
                {mostrarEnPanel()}
            </div>

        </div>
    )
}

export default Transferencia;