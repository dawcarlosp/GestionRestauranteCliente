const token = localStorage.getItem("token");
let cuadro = document.getElementById("cuadro");
let reservas = [];
obtenerReservas();
async function obtenerReservas() {
    try {
        if (!token) {
            location.href = "html/login.html";
            throw new Error("No hay token, inicia sesión.");
        }
        const response = await fetch("http://localhost:8080/reservas", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        if(!response.ok)
        {
            throw new Error("Error al obtener las reservas")
        }
        const reservasObtenidas = await response.json();
        reservas = reservasObtenidas;
    } catch (error) {
        console.error("Error:", error);
    }
}
function generarHorasDisponibles(inicio, cierre) {
    let selectAnterior = document.getElementById("select");
    let labelAnterior = document.getElementById("label");
    //Si ya tengo un select y un label creado, lo borro para no tener elementos duplicados  
    if(selectAnterior && labelAnterior){
    cuadro.removeChild(labelAnterior);
    cuadro.removeChild(selectAnterior);
    }
    const select = document.createElement("select");
    select.id="select";
    const label = document.createElement("label");
    label.id = "label";
    alert(reservas[0].horaReserva);
    label.textContent = "Hora reserva:"
    for (let i = inicio; i <= cierre; i++) {
       let hora = `${i}:00`;
       let option = document.createElement("option");
       option.textContent = hora;
       option.value = hora;
       select.appendChild(option);
    }
    select.className="border";
    cuadro.appendChild(label);
    cuadro.appendChild(select);

}
//Intento de evento cuando se selecciona una fecha
let fechaInput = document.getElementById("fechaReserva");
fechaInput.addEventListener("change", () => generarHorasDisponibles(12,20));
//Intento pintar las mesas disponibles en la fecha y hora elegidas
let horaSeleccionada = document.getElementById("select");
if(horaSeleccionada){
horaSeleccionada.addEventListener("change", () =>{
    alert(horaSeleccionada.value);
})}
