document.addEventListener("DOMContentLoaded", () => {
    actualizarTecnicas();
    document.querySelectorAll(".cantidad, #modelo, #tecnica, #extras, #diseñoExtra").forEach(el => {
        el.addEventListener("input", calcularPrecio);
    });
});

function actualizarTecnicas() {
    const modelo = document.getElementById("modelo").value;
    const tecnicaSelect = document.getElementById("tecnica");

    tecnicaSelect.innerHTML = ""; // Limpiar opciones
    if (modelo === "beagle") {
        tecnicaSelect.innerHTML = `<option value="DTF">DTF</option>`;
    } else {
        tecnicaSelect.innerHTML = `
            <option value="DTF">DTF</option>
            <option value="impresion_directa">Impresión directa</option>
        `;
    }

    calcularPrecio();
}

function calcularPrecio() {
    const modelo = document.getElementById("modelo").value;
    const tecnica = document.getElementById("tecnica").value;
    const diseñoExtra = document.getElementById("diseñoExtra").value;
    const zonasExtra = parseInt(document.getElementById("extras").value) || 0;

    // Precios base por modelo y técnica
    let precioBase = 0;
    if (modelo === "stafford") {
        precioBase = (tecnica === "DTF") ? 19.5 : 24.0;
    } else if (modelo === "beagle") {
        precioBase = 15.0;
    } else if (modelo === "bronx") {
        precioBase = (tecnica === "DTF") ? 22.0 : 28.0;
    }

    let totalUnidades = 0;
    document.querySelectorAll(".cantidad").forEach(input => {
        totalUnidades += parseInt(input.value) || 0;
    });

    let total = totalUnidades * precioBase;
    total += zonasExtra * 3 * totalUnidades;
    if (diseñoExtra === "Sí") total += 5;

    // Descuentos por cantidad
    if (totalUnidades >= 15 && totalUnidades <= 50) total *= 0.90;
    else if (totalUnidades > 50 && totalUnidades <= 100) total *= 0.85;

    document.getElementById("precioEstimado").textContent = `Precio estimado: ${total.toFixed(2)} € (con descuentos)`;
}
