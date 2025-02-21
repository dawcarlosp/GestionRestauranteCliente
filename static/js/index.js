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
        //Despues esto ira dentro de una funcion
    } catch (error) {
        console.error("Error:", error);
    }
}
function generarHorasDisponibles(inicio, cierre) {
    const select = document.getElementById("select");
    for (let i = inicio; i < cierre; i++) {
       let hora = `${i}:00`;
       let option = document.createElement("option");
       option.textContent = hora;
       select.appendChild(option);
    } 
}
generarHorasDisponibles(12,20);
