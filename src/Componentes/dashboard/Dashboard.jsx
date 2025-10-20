import "./Dashboard.css";
import { useState, useEffect } from "react";
import {Link} from "react-router";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";

function Dashboard(){

    const [visible, setVisible] = useState(false);
    
    const navigate= useNavigate();

    const mostrarMenu = () => {
        setVisible(!visible);
    };

    const ocultarMenu= ()=>{
        setVisible(!visible);
    }

    const logout = ()=>{
        navigate("/")
        localStorage.removeItem("pruebita");
    }

    const moverPlata = (accion)=>{

        navigate("/transferir", {state: {accion}})
    }

    const historicoMovimientos = () =>{
        navigate("/historial")
    }

    const reporte = ()=>{
        navigate("/reporteFinanciero")
    }

    const prestamo = ()=>{
        navigate("/SolicitarPrestamo")
    }

    const Adjust = () =>{
        navigate("/adjust")
    }

    const [apodo, setApodo] = useState("");

    const FijarApodo = ()=>{
        const dataGuardada = localStorage.getItem("usuarios");
        const usuarios = dataGuardada ? JSON.parse(dataGuardada) : [];

        for (let i = 0; i < usuarios.length; i++) {
            if(usuarios[i].correo=== localStorage.getItem("pruebita")){
                setApodo(usuarios[i].apodo);
                break;
            }
        }
    }

    useEffect(() => {
        FijarApodo();
    }, []);

    return(
        <>
        <div id="pnlPrincipal">
            <div id="top">
                <img src="src\Logo\logo_Estebanquito.png" id="logo" width="125px"/>

                <div id="accesos">
                    <button id="menuHamburguesa" onClick={Adjust}><i className="bi bi-gear-fill" style={{fontSize: '30px', color:"rgb(0, 53, 24)"}}></i></button>
                    <button id="menuHamburguesa" onClick={logout}><i className="bi bi-box-arrow-right" style={{fontSize: '30px', color:"rgb(0, 53, 24)"}}></i></button>
                </div>
            </div>

            <div id="saludo">
                <h1>Hola, {apodo}</h1>

                <div id="numeroCuenta">
                    <div id="icono">
                        <i className="bi bi-key-fill" style={{fontSize: '36px', color:"rgb(0, 53, 24)"}}></i>
                    </div>
                    
                    <div id="valores">
                        <h4>Tu número de cuenta es:</h4>
                        <h5>102436495</h5>
                    </div>
                </div>
            </div>
            <div className="contenedorSaldo">
                <div id="cuenta">
                    <h5>Saldo disponible</h5>
                    <h2>$ 2.000.000</h2>
                </div>
                <div id="cuenta">
                    <h5>Tipo de cuenta</h5>
                    <h2>Ahorros</h2>
                </div>
                <div id="cuenta">
                    <h5>Saldo pendiente</h5>
                    <h2>$ 1.530.000</h2>
                </div>
            </div>

            <div className="contenedorDetalles">

                <div id="detalles">
                    <h5>Movimientos</h5>

                    <div id="historial">
                        <button id="botonHistorial" onClick = {historicoMovimientos}>
                            <img src="src\Logo\historial.png" alt="Historial" width="50px" className="imagenH" />
                        </button>
                        <h6>Historial Transaccional</h6>
                    </div>

                    <div id="contenedorBotones">
                        <div id="movimientos">
                            <button id="botonHistorial" onClick={() => moverPlata("transferir")}>
                                <img src="src\Logo\Transferir.png" alt="Transferir" width="50px" className="imagenH" />
                            </button>
                            <h6>Transferir</h6>
                        </div>
                        <div id="movimientos">
                            <button id="botonHistorial" onClick={() => moverPlata("retirar")}>
                                <img src="src\Logo\retirar.png" alt="Retirar" width="50px" className="imagenH" />
                            </button>
                            <h6>Retirar</h6>
                        </div>
                        <div id="movimientosD">
                            <button id="botonHistorial" onClick={() => moverPlata("depositar")}>
                                <img src="src\Logo\deposito.png" alt="Deposito" width="60px" className="imagenH" />
                            </button>
                            <h6>Depositar</h6>
                        </div>
                    </div>
                </div>

                <div id="detalles">
                    <h5>Reportes financieros</h5>
                    <button id="botonPrestamo" onClick={reporte}>
                        <img src="src\Logo\prestamo.png" alt="Reporte" width="180px" className="imagenR" />
                    </button>
                </div>

                <div id="prestamo">
                    <h5>Solicita un préstamo aqui</h5>
                    <button id="botonPrestamo" onClick={prestamo}>
                        <img src="src\Logo\solicitud.png" alt="Préstamo" width="180px" className="imagenP" />
                    </button>
                </div>

            </div>
        </div>
        </>
    )
}

export default Dashboard;