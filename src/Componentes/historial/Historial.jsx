import "./Historial.css";
import { useState, useEffect } from "react";
import {Link} from "react-router";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";

function MostrarHistorial(){

    const navigate= useNavigate();

    const [movimientos, setMovimientos] = useState([]);

    const usuario= JSON.parse(localStorage.getItem("usuarioActual"))

    const numeroCuenta= usuario.numeroCuenta;

    useEffect(() => {
    const obtenerHistorial = async () => {
        try {
            if (!numeroCuenta) return;
            const res = await fetch(`http://localhost:3001/movimientos/${numeroCuenta}`);
            const data = await res.json();

            const resAbo = await fetch(`http://localhost:3001/abono/${numeroCuenta}`);
            const dataAbo = await resAbo.json();

        // Normalizar movimientos
        const movimientos = data.map(mov => ({
            tipoMovimiento: mov.tipoMovimiento,
            fecha: mov.fecha || mov.fechaMovimiento,
            monto: mov.monto || mov.valor || 0,
            cuentaDestino: mov.cuentaDestino || null,
            concepto: mov.concepto || mov.descripcion || "Sin especificar",
        }));

        // Normalizar abonos
        const abonos = dataAbo.map(abo => ({
            tipoMovimiento: "Abono",
            fecha: abo.fecha || abo.fechaAbono,
            monto: abo.monto || abo.valorAbonado || 0,
            cuentaDestino: null,
            concepto: "Pago de préstamo",
        }));


        const todos = [...movimientos, ...abonos].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

        setMovimientos(todos);
            // setMovimientos(data);
            // console.log(movimientos)
        } catch (error) {
            console.error("Error al obtener movimientos:", error);
        }
    };

    obtenerHistorial();

    }, [numeroCuenta]);

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
            <div id="historialM">
          {movimientos.length > 0 ? (
          movimientos.map((mov, i) => {
            const tipo = mov.tipoMovimiento?.toLowerCase();
            let color = "";
            let signo = "";

            switch (tipo) {
            case "transferencia enviada":
                color = "red";
                signo = "-";
            break;
            case "transferencia recibida":
                color = "green";
                signo = "+";
            break;
            case "retiro":
                color = "red";
                signo = "-";
            break;
            case "depósito":
                color = "green";
                signo = "+";
            break;
            case "abono":
                color = "red";
                signo = "-";
            break;
            default:
                color = "gray";
                signo = "";
            }

            return (
              <div key={i} className="Movimiento">
                <div className="Sujeto">
                  <h3 className="fecha">
                    {new Date(mov.fecha).toLocaleString("es-CO", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </h3>
                  <h3 className="tipoMovimiento" style={{ color }}>
                    {mov.tipoMovimiento}
                  </h3>
                </div>

                <div className="DetallesMovimiento">
                  {/* Solo mostrar cuenta destino si es transferencia enviada */}
                  {mov.cuentaDestino && tipo === "transferencia enviada" && (
                    <p className="cuentaDestino">
                      <strong>Cuenta destino:</strong> {mov.cuentaDestino}
                    </p>
                  )}

                  {/* Concepto o descripción */}
                  <p className="concepto">
                    <strong>Concepto:</strong> {mov.concepto || mov.descripcion || "Sin especificar"}
                  </p>

                  {/* Monto */}
                  <p className="monto" style={{ color }}>
                    <strong>Monto:</strong> {signo} $
                    {Number(mov.monto || mov.valor || 0).toLocaleString("es-CO")}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p>No hay movimientos registrados</p>
        )}

        </div>
      </div>
    </div>
  );
}

export default MostrarHistorial;