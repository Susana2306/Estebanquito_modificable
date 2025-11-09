import "./ReporteFinanciero.css";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";

function ReporteFinanciero(){

    const navigate= useNavigate();

    const retrocede = ()=>{
        navigate("/dashboard")
    }

    const [saldoDisponible, setSaldoDisponible] = useState("");
    const [numCuenta, setNumCuenta] = useState("");
    const [ingresoActual, setIngresoActual] = useState(0);
    const [ultimoDeposito, setUltimoDeposito] = useState("");
    const [ultimoRetiro, setUltimoRetiro] = useState("");
    const [ultimoAbono, setUltimoAbono] = useState("");
    

    const FijarCuenta = () => {
        const dataGuardada = JSON.parse(localStorage.getItem("usuarioActual"));
        setNumCuenta(dataGuardada.numeroCuenta);
    };

    const FijarSaldoDisponible = ()=>{
        const dataGuardada =  JSON.parse(localStorage.getItem("usuarioActual"));
        setSaldoDisponible(parseFloat(dataGuardada.totalSaldo));
    }

    const getDeposito= async()=>{
                    return fetch(`http://localhost:3001/ultimo_deposito/${numCuenta}`).
                        then((res)=> {return res.json()}). 
                        then((data) => {setUltimoDeposito(data); return data;}).
                        catch((err)=> console.log(err))
                }

    const getRetiro=()=>{
                    return fetch(`http://localhost:3001/ultimo_retiro/${numCuenta}`).
                        then((res)=> {return res.json()}). 
                        then((data) => {setUltimoRetiro(data); return data;}).
                        catch((err)=> console.log(err))
                }

    const getAbono=()=>{
                    return fetch(`http://localhost:3001/ultimo_abono/${numCuenta}`).
                        then((res)=> {return res.json()}). 
                        then((data) => {setUltimoAbono(data); return data;}).
                        catch((err)=> console.log(err))
                }

    useEffect(() => {
        FijarSaldoDisponible()
        FijarCuenta();
    }, []);

    useEffect(() => {
        if (numCuenta) {
            getDeposito();
            getRetiro();
            getAbono()
        }
    }, [numCuenta]);

    useEffect(() => {
        const montoDeposito = parseFloat(ultimoDeposito.monto) || 0;
        const montoRetiro = parseFloat(ultimoRetiro.monto) || 0;
        const montoAbono = parseFloat(ultimoAbono.monto) || 0;

        const diferencia = montoDeposito - (montoRetiro + montoAbono);
        setIngresoActual(diferencia);
        
    }, [ultimoDeposito, ultimoRetiro, ultimoAbono]);

    return(
        <div id="principalAdjust">
            <div id="vistaPrincipal">
                <div id="top">
                    <img src="src/Logo/logo_Estebanquito.png" id="logo" width="125px"/>

                    <button id="volver" onClick={retrocede}>
                        <i className="bi bi-backspace-fill"></i>
                    </button>
                </div>
            </div>
            <div id="ordenArriba">
                <div id="balance">
                    <div id="containerBalance">
                        <h4>Balance Actual</h4>
                        <div id="containerCont">
                            <h2>$ {saldoDisponible.toLocaleString("es-CO")}</h2>
                            <div id="ingresos">
                                <h4> Ingresos actuales</h4>
                                <h3>{ingresoActual >= 0 ? "+" : "-"}{" "} 
                                    {Math.abs(ingresoActual).toLocaleString("es-CO")}</h3>
                            </div>
                        </div>
                    </div>
                    <div id="containerBalance">
                        <h4>Ingresos recientes</h4>
                        <div id="containerCont2">
                            <h2>$ {(parseFloat(ultimoDeposito?.monto) || 0).toLocaleString("es-CO")}</h2>
                            <div className="gastos-container">
                                <div id="gastos">
                                <h4> Último retiro</h4>
                                <h3>- {(parseFloat(ultimoRetiro?.monto) || 0).toLocaleString("es-CO")}</h3>
                                </div>
                                <div id="gastos">
                                    <h4> Último Abono</h4>
                                    <h3>- {(parseFloat(ultimoAbono?.monto) || 0).toLocaleString("es-CO")}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="grafica1">
                    <h4>Grafica por Categoria</h4>
                    <img src="src\Logo\GraficoCircular.png" alt="Grafico Circular" className="graficoC"/>
                </div>
            </div>
            <div id="grafica2">
                <h4>Evolucion de Balance</h4>
                <img src="src\Logo\reportesFinancieros.png" alt="Reporte" className="graficoL"/>
            </div>
        </div>
    )

}

export default ReporteFinanciero;