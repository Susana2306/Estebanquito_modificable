import "./Prestamo.css";
import { useNavigate } from "react-router";
import { useState } from "react";

function Prestamo() {

    const navigate= useNavigate();

    const retrocede = ()=>{
        navigate("/dashboard")
    }

    const [solicitado, setSolicitado]= useState("");
    const [cuotas, setCuotas]= useState("");
    const [salario, setSalario]= useState("");
    const [gastos, setGastos]= useState("");
    const [ValorAPagar, setValorAPagar]= useState("");

    const precioCuotas = () =>{
        if((parseFloat(salario)-parseFloat(gastos))>(parseFloat(solicitado)/ parseFloat(cuotas))){
            setValorAPagar((parseFloat(solicitado)/parseFloat(cuotas)).toString());
        }
        else{
            alert("No se puede realizar el préstamo.")
        }
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
                <input type="number" 
                onChange={(e)=> setSolicitado(e.target.value)}
                placeholder="Valor a solicitar" className="input"/>

                <input type="number" 
                onChange={(e)=> setCuotas(e.target.value)}
                placeholder="Número de cuotas a pagar" className="input"/>

                <input type="number" 
                onChange={(e)=> setSalario(e.target.value)}
                placeholder="Valor del salario mensual" className="input"/>
                <input type="number" 
                onChange={(e)=> setGastos(e.target.value)}
                placeholder="Valor de los gastos mensuales" className="input"/>
                <h5>El valor que tendrías que pagar mensualmente es:</h5>
                <h5>{ValorAPagar}</h5>
                <button id="registra" onClick={precioCuotas}>Realizar Préstamo</button>
            </div>
        </div>
    )
}

export default Prestamo;