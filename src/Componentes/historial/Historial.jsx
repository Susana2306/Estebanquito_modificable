import "./Historial.css";
import { useState } from "react";
import {Link} from "react-router";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";

function MostrarHistorial(){

    const navigate= useNavigate();

    const retrocede = ()=>{
        navigate("/dashboard")
    }

    return(
    <div id="vistaPrincipalM">
        <div id="top">
            <img src="src/Logo/logo_Estebanquito.png" id="logo" width="125px"/>
        </div>
        <div id = "PanelPrincipalM">
            <div id = "TituloM">
                <h1 id = "MisMov">Mis Movimientos</h1>
                <button id="menuHamburguesaM" onClick={retrocede}>
                    <i className="bi bi-x-circle"></i>
                </button>
            </div>
            <div id = "historialM">
                <div id = "Movimiento1">
                    <div id = "Sujeto1">
                        <h3 id = "fecha1">20/01/2025</h3>
                        <h3 id = "banco">Transferencia nominal</h3>
                    </div>
                    <div id = "Pago1">
                        <h1>+ $ 500.000,78</h1>
                    </div>
                </div>
                <div id = "Movimiento2">
                    <div id = "Sujeto2">
                        <h3 id = "fecha2">15/01/2025</h3>
                        <h3 id = "cobro">Tierra Querida</h3>
                    </div>
                    <div id = "Pago2">
                        <h1>- $ 26.000</h1>
                    </div>
                </div>
                <div id = "Movimiento3">
                    <div id = "Sujeto3">
                        <h3 id = "fecha3">14/01/2025</h3>
                        <h3 id = "ingreso">Pepito Perez</h3>
                    </div>
                    <div id = "Pago3">
                        <h1>+ $ 50.000</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default MostrarHistorial;