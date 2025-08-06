const modelo = document.getElementById("modelo");
const tecnica = document.getElementById("tecnica");
const tecnicaContainer = document.getElementById("tecnicaContainer");
const cantidades = document.querySelectorAll(".cantidad");
const zonasExtra = document.getElementById("zonas_extra");
const disenoExtra = document.getElementById("diseño_extra");
const precioEstimado = document.getElementById("precioEstimado");
const precioFinalInput = document.getElementById("precioFinal");

function actualizarTecnicas() {
  const modeloSeleccionado = modelo.value;
  if (modeloSeleccionado === "beagle") {
    tecnica.value = "DTF";
    tecnica.disabled = true;
  } else {
    tecnica.disabled = false;
  }
  calcularPrecio();
}

function calcularPrecio() {
  const precios = {
    stafford: { DTF: 19.5, impresion_directa: 24 },
    beagle: { DTF: 15 },
    bronx: { DTF: 22, impresion_directa: 28 }
  };

  const cantidadesTotal = [...cantidades].reduce((acc, input) => acc + parseInt(input.value || 0), 0);
  const zonas = parseInt(zonasExtra.value || 0);
  const quiereDisenoExtra = disenoExtra.value === "Sí";
  const precioBase = precios[modelo.value][tecnica.value] || 0;

  let precioUnitario = precioBase;
  if (cantidadesTotal >= 15 && cantidadesTotal <= 50) {
    precioUnitario *= 0.9;
  } else if (cantidadesTotal > 50 && cantidadesTotal <= 100) {
    precioUnitario *= 0.85;
  }

  let total = precioUnitario * cantidadesTotal;
  total += zonas * 3;
  if (quiereDisenoExtra) total += 5;

  precioEstimado.innerHTML = `<strong>Precio estimado:</strong> ${total.toFixed(2)} € (con descuentos)`;
  precioFinalInput.value = `${total.toFixed(2)} €`;
}

document.querySelectorAll("input, select").forEach(el => {
  el.addEventListener("input", calcularPrecio);
});

actualizarTecnicas();
