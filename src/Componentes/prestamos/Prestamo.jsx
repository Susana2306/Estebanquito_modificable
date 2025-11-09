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
    const [frecuenciaPago, setFrecuenciaPago] = useState("");
    const [concepto, setConcepto] = useState("");

    const usuario= JSON.parse(localStorage.getItem("usuarioActual"));
    const [formData_prestamo, setFormData_prestamo] = useState({
                valorPrestamo: "",
                numeroCuotas: "",
                frecuenciaPago: "",
                concepto: ""
            });

    const precioCuotas = async () => {
        const salarioNum = parseFloat(salario);
        const gastosNum = parseFloat(gastos);
        const solicitadoNum = parseFloat(formData_prestamo.valorPrestamo);
        const cuotasNum = parseFloat(formData_prestamo.numeroCuotas);
        const frecuenciaPago = formData_prestamo.frecuenciaPago;

        let valorCuota;
        let ingresoDisponible;

        if (frecuenciaPago === "Quincenal") {
            ingresoDisponible = (salarioNum - gastosNum) / 2;
            valorCuota = (solicitadoNum / cuotasNum);
        } else {
            ingresoDisponible = salarioNum - gastosNum;
            valorCuota = (solicitadoNum / cuotasNum);
        }

        if (ingresoDisponible > parseFloat(valorCuota)) {
            setValorAPagar(valorCuota);
        } else {
            alert("No se puede realizar el préstamo. Tus gastos superan tu capacidad de pago.");
        }
    };

    const updateStorage = async () =>{
            console.log(`${usuario.correo}`)

            return fetch(`http://localhost:3001/usuario_interes/${usuario.correo}`).
            then((res)=> res.json()). 
            then((data) => data).
            catch((err)=> console.log(err))
        }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData_prestamo({
        ...formData_prestamo,
        [name]: value,
        });
    };
    const handleSubmit = async (e) => {
                e.preventDefault();

                try{
                    console.log(formData_prestamo);
                    const urlbase = "http://localhost:3001/"
                    const response = await fetch(urlbase + `prestamo/${usuario.numeroCuenta}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData_prestamo)})

                const data= await updateStorage();

                const user = {
                ...data.generales[0],
                deuda:data.deuda
                };
                localStorage.setItem("usuarioActual", JSON.stringify(user))

                alert("Préstamo realizado con éxito")
                navigate("/dashboard")
                }
                catch(err){
                    console.log(err)
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
                <form onSubmit={handleSubmit} id="contenido">
                    <input
                    type="number"
                    name="valorPrestamo"
                    onChange={handleChange}
                    value={formData_prestamo.valorPrestamo}
                    placeholder="Valor a solicitar"
                    className="input"
                    />

                    <input
                    type="number"
                    name="numeroCuotas"
                    onChange={handleChange}
                    value={formData_prestamo.numeroCuotas}
                    placeholder="Número de cuotas a pagar"
                    className="input"
                    />

                    <select
                    name="frecuenciaPago"
                    onChange={handleChange}
                    value={formData_prestamo.frecuenciaPago}
                    className="input"
                    >
                        <option value="">Selecciona la frecuencia de pago</option>
                        <option value="Mensual">Mensual</option>
                        <option value="Quincenal">Quincenal</option>
                    </select>

                    <input
                    type="number"
                    onChange={(e) => setSalario(e.target.value)}
                    value={salario}
                    placeholder="Salario mensual"
                    className="input"
                    />

                    <input
                    type="number"
                    onChange={(e) => setGastos(e.target.value)}
                    value={gastos}
                    placeholder="Gastos mensuales"
                    className="input"
                    />

                    <input
                    type="text"
                    name="concepto"
                    onChange={handleChange}
                    value={formData_prestamo.concepto}
                    placeholder="Concepto del préstamo"
                    className="input"
                    />
                    <h5>El valor que tendrías que pagar es: {ValorAPagar}</h5>
                    <button id="registra" type="button" onClick={precioCuotas}>Calcular valor a pagar</button>

                    <button id="registraPrestamo" type="submit">Realizar Préstamo</button>
                </form>
            </div>
        </div>
    )
}

export default Prestamo;