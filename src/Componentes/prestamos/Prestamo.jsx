import "./Prestamo.css";
import { useNavigate } from "react-router";

function Prestamo() {

    const navigate= useNavigate();

    const retrocede = ()=>{
        navigate("/dashboard")
    }

    return(
        <div id="containerPrincipal">
            <div id="top">
                <img src="src/Logo/logo_Estebanquito.png" id="logo" width="125px"/>
            </div>
            <div id="centro">
                <div id="paraAlinear">
                            <button id="menuHamburguesa" onClick={retrocede}>
                                <i className="bi bi-x-circle"></i>
                            </button>
                </div>
                <h3>Solicita tu préstamo</h3>
                <input type="number" placeholder="Valor a solicitar" className="input"/>
                <input type="number" placeholder="Número de cuotas a pagar" className="input"/>
                <input type="number" placeholder="Valor del salario mensual" className="input"/>
                <input type="number" placeholder="Valor de los gastos mensuales" className="input"/>
                <h5>El valor que tendrías que pagar mensualmente es:</h5>
                <h5>valor</h5>
                <button id="registra">Realizar Préstamo</button>
            </div>
        </div>
    )
}

export default Prestamo;