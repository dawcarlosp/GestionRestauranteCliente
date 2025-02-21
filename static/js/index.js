const token = localStorage.getItem("token");
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
        const reservas = await response.json();
        console.log(reservas[0].horaReserva);

    } catch (error) {
        console.error("Error:", error);
    }
}
function contruirInterfaz(){
    let select = document.getElementById("horaReserva");
    let opcion = document.createElement("option");
    opcion.value = "14:00";
    opcion.textContent = "14:00";
    select.appendChild(opcion);
}
contruirInterfaz();