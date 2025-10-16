import "./ReporteFinanciero.css";
import { useState } from "react";
import {Link} from "react-router";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";

function ReporteFinanciero(){

    const [visible, setVisible] = useState(false);
    const navigate= useNavigate();

    const location= useLocation();

    return(
        <div id="pnlPrincipal">
            <div id="vistaPrincipal">
                <div id="top">
                    <img src="src/Logo/logo_Estebanquito.png" id="logo" width="125px"/>
                </div>
            </div>
            <div id="ordenArriba">
                <div id="balance">
                    <div id="containerBalance">
                        <h4>Balance Actual</h4>
                        <div id="containerCont">
                            <h2>$ 2.000.000</h2>
                            <div id="ingresos">
                                <h4> Ingresos del mes</h4>
                                <h3>+ 500.000,78</h3>
                            </div>
                        </div>
                    </div>
                    <div id="containerBalance">
                        <h4>Ingresos del mes</h4>
                        <div id="containerCont">
                            <h2>$ 600.000,78</h2>
                            <div id="gastos">
                                <h4> Gastos del mes</h4>
                                <h3>- 100.000</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="grafica1">
                    <h4>Grafica por Categoria</h4>
                    <h4>Grafica random</h4>
                </div>
            </div>
            <div id="grafica2">
                <h4>Evolucion de Balance</h4>
            </div>
        </div>
    )

}

export default ReporteFinanciero;