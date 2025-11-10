import "./ReporteFinanciero.css";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale, } from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement);


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

    const usuario= JSON.parse(localStorage.getItem("usuarioActual"))

    const numeroCuenta= usuario.numeroCuenta;
    const [movimientos, setMovimientos] = useState([]);

    useEffect(() => {
    const obtenerHistorial = async () => {
        try {
            if (!numeroCuenta) return;
            const res = await fetch(`http://localhost:3001/movimientos/${numeroCuenta}`);
            const data = await res.json();
            setMovimientos(data);
            console.log(movimientos)
        } catch (error) {
            console.error("Error al obtener movimientos:", error);
        }
    };

        obtenerHistorial();

    }, [numeroCuenta]);

    const obtenerDatosGrafico = () => {
    const resumen = { deposito: 0, retiro: 0, transferencia: 0, recibidas: 0 };

    movimientos.forEach((mov) => {
        if (mov.tipoMovimiento.toLowerCase().includes("depósito")) resumen.deposito++;
        else if (mov.tipoMovimiento.toLowerCase().includes("retiro")) resumen.retiro++;
        else if (mov.tipoMovimiento.toLowerCase().includes("transferencia enviada")) resumen.transferencia++;
        else if (mov.tipoMovimiento.toLowerCase().includes("transferencia recibida")) resumen.recibidas++;
    });

    return {
        labels: ["Depósitos", "Retiros", "Transferencias Enviadas", "Transferencias Recibidas"],
        datasets: [
        {
            data: [resumen.deposito, resumen.retiro, resumen.transferencia, resumen.recibidas],
            backgroundColor: ["#eccc74ff", "#fc99aeff", "#8bf7e9ff", "#75fa99ff"],
            borderWidth: 1,
        },
        ],
    };
    };

    const data = obtenerDatosGrafico();
    const total = data.datasets[0].data.reduce((acc, val) => acc + val, 0);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
            callbacks: {
            label: function (context) {
                const label = data.labels[context.dataIndex];
                const value = context.dataset.data[context.dataIndex];
                const porcentaje = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
            return `${label}: ${value} (${porcentaje}%)`;
            },
            },
        },
        legend: {
            position: "right",
            align: "center",
            labels: {
            boxWidth: 20,
            padding: 10,
            font: { size: 13 },
            },
        },
        },
        layout: {
        padding: {
            right: 20, 
        },
        },
    };

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


    const obtenerDatosGrafico_lineas = () => {

    const hoy = new Date();
    const dias = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(hoy.getDate() - (6 - i)); 
        return d.toISOString().split("T")[0]; 
    });

    const resumen = dias.map(() => ({ deposito: 0, retiro: 0, transferencia: 0 }));

        movimientos.forEach((mov) => {
        const fechaMov = new Date(mov.fecha).toISOString().split("T")[0];

        const index = dias.indexOf(fechaMov);

        if (index !== -1) {
        const tipo = mov.tipoMovimiento.toLowerCase();
        const monto = Number(mov.monto) || 0;

        if (tipo.includes("depósito")) resumen[index].deposito += monto;
        else if (tipo.includes("retiro")) resumen[index].retiro += monto;
        else if (tipo.includes("transferencia")) resumen[index].transferencia += monto;
        }
    });

    return {
        labels: dias.map((d) =>
        new Date(d).toLocaleDateString("es-CO", { weekday: "short", day: "numeric" })
        ),
        datasets: [
        {
            label: "Depósitos",
            data: resumen.map((r) => r.deposito),
            borderColor: "#eccc74",
            backgroundColor: "#eccc74",
            tension: 0.4,
        },
        {
            label: "Retiros",
            data: resumen.map((r) => r.retiro),
            borderColor: "#fc99ae",
            backgroundColor: "#fc99ae",
            tension: 0.4,
        },
        {
            label: "Transferencias",
            data: resumen.map((r) => r.transferencia),
            borderColor: "#8bf7e9",
            backgroundColor: "#8bf7e9",
            tension: 0.4,
        },
        ],
    };
    };

    const dataTime = obtenerDatosGrafico_lineas();



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
                    <h4>Porcentaje de movimientos de {usuario.apodo}</h4>
                    {movimientos.length > 0 && (
                        <div style={{ width: "790px", margin: "30px auto", padding: "10px" }}>
                        <Pie data={data} options={options}/>
                        </div>
                    )}
                </div>
            </div>
            <div id="grafica2">
                <h4>Evolucion de Balance</h4>
                <Line data={dataTime} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
        </div>
    )

}

export default ReporteFinanciero;