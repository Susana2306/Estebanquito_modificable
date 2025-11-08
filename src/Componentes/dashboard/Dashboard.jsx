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
        localStorage.removeItem("usuarioActual");
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
    const [numCuenta, setNumCuenta] = useState("");
    const [tipoCuenta, setTipoCuenta] = useState("");
    const [saldoDisponible, setSaldoDisponible] = useState("");
    const [saldoPendiente, setSaldoPendiente] = useState("");

    const FijarApodo = ()=>{
        const dataGuardada =  JSON.parse(localStorage.getItem("usuarioActual"));
        setApodo(dataGuardada.apodo);
    }

    const FijarCuenta = ()=>{
        const dataGuardada =  JSON.parse(localStorage.getItem("usuarioActual"));
        setNumCuenta(dataGuardada.numeroCuenta);
    }
    const FijarSaldoDisponible = ()=>{
        const dataGuardada =  JSON.parse(localStorage.getItem("usuarioActual"));
        setSaldoDisponible(parseFloat(dataGuardada.totalSaldo));
    }
    const FijarSaldoPendiente = ()=>{
        const dataGuardada =  JSON.parse(localStorage.getItem("usuarioActual"));
        setSaldoPendiente(parseFloat(dataGuardada.deuda));
    }

    const FijarTipoCuenta = ()=>{
        const dataGuardada =  JSON.parse(localStorage.getItem("usuarioActual"));

        let tipoCuenta;

        if(dataGuardada.id_tipoCuenta===1){
            tipoCuenta= "Ahorros"
        }
        else{
            tipoCuenta="Corriente"
        }

        setTipoCuenta(tipoCuenta)
    }

    useEffect(() => {
        FijarApodo();
        FijarCuenta();
        FijarTipoCuenta();
        FijarSaldoDisponible();
        FijarSaldoPendiente();
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
                        <h5>{numCuenta}</h5>
                    </div>
                </div>
            </div>
            <div className="contenedorSaldo">
                <div id="cuenta">
                    <h5>Saldo disponible</h5>
                    <h2>$ {saldoDisponible.toLocaleString("es-CO")}</h2>
                </div>
                <div id="cuenta">
                    <h5>Tipo de cuenta</h5>
                    <h2>{tipoCuenta}</h2>
                </div>
                <div id="cuenta">
                    <h5>Saldo pendiente</h5>
                    <h2>$ {saldoPendiente.toLocaleString("es-CO")}</h2>
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
                    <button id="botonReportes" onClick={reporte}>
                        <img src="src\Logo\prestamo.png" alt="Reporte" width="180px" className="imagenR" />
                    </button>
                </div>

                <div id="prestamo">
                <h5>Préstamos</h5>
                <div className="botonesPrestamo">
                    <div className="botonContainer">
                        <button className="botonPrestamo" onClick={prestamo}>
                            <img src="src/Logo/solicitud.png" alt="Préstamo" className="imagenP" />
                        </button>
                        <h6>Solicitar Préstamo</h6>
                    </div>

                    <div className="botonContainer">
                        <button className="botonPrestamo" onClick={() => moverPlata("abonar")}>
                            <img src="src\Logo\cuentas-por-pagar.png" alt="Abonar" className="imagenP" />
                        </button>
                        <h6>Abonar</h6>
                    </div>
                </div>
            </div>
                
            </div>
        </div>
        </>
    )
}

export default Dashboard;