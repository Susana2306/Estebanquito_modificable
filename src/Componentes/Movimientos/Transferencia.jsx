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

    const mostrarEnPanel = () => {
        if (accion === "transferir") {
            return (
                <div id="transferencia">
                    <div id="paraAlinear">
                        <button id="menuHamburguesa" onClick={retrocede}>
                            <i className="bi bi-x-circle"></i>
                        </button>
                    </div>
                    <h4>Transferencia</h4>
                    <div id="contenido">
                        <input placeholder="Cuenta destino"  className="input"/>
                        <input placeholder="Monto a transferir" className="input"/>
                        <button id="registra">Enviar</button>
                    </div>
                </div>
            );
            } 
            else if (accion === "depositar") {
            return (
                <div id="transferencia">
                    <div id="paraAlinear2">
                        <button id="menuHamburguesa" onClick={retrocede}>
                            <i className="bi bi-x-circle"></i>
                        </button>
                    </div>
                    <div id="containerMov">
                        <h4>Depósito</h4>
                        <input placeholder="Monto a depositar" className="input"/>
                        <button id="registra">Confirmar</button>
                    </div>
                </div>
            );
            }
            else if (accion === "retirar") {
            return (
                <div id="transferencia">
                    <div id="paraAlinear2">
                        <button id="menuHamburguesa" onClick={retrocede}>
                            <i className="bi bi-x-circle"></i>
                        </button>
                    </div>
                    
                    <div id="containerMov">
                        <h4>Retiro</h4>
                        <input placeholder="Monto a retirar" className="input"/>
                        <button id="registra">Retirar</button>
                    </div>
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