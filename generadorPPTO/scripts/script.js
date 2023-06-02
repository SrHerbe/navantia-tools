window.onload = function() {
    let select = document.getElementById('cliente');
    let numSAPCliente = document.getElementById('numSAPCliente');

    // Añadir una opción inicial sin valor
    let defaultOption = document.createElement('option');
    defaultOption.text = "Selecciona un cliente";
    defaultOption.value = ""; // no tiene un valor
    select.add(defaultOption);

    // Llenar la lista desplegable con los nombres de los clientes
    clientes.forEach(function(cliente, index) {
        let option = document.createElement('option');
        option.value = index; // guardamos el índice como valor de la opción para buscarlo después
        option.text = cliente.nombre;
        select.add(option);
    });

    // Cuando se selecciona un nuevo cliente, llenamos el input numSAPCliente con su número SAP
    select.addEventListener('change', function() {
        let clienteSeleccionado = clientes[this.value]; // this.value es el índice del cliente seleccionado
        numSAPCliente.value = clienteSeleccionado ? clienteSeleccionado.numSAP : '';
    });
};




// Añadir fecha de hoy al input fechaEmisión
document.addEventListener("DOMContentLoaded", function () {
	const fechaEmision = document.getElementById("fechaEmision");
	const today = new Date().toISOString().slice(0, 10);
	fechaEmision.value = today;

	document.getElementById("costeHora").value = costeHorario;
});

//Conceptos de los checkboxes
const conceptos = [
	"mecanizado",
	"ajuste",
	"caldereria",
	"verificado",
	"trazado",
	"otros",
];
const horasConceptos = {};

function actualizarTotales() {
	const costeHora = parseFloat(document.getElementById("costeHora").value);
	let totalHoras = 0;

	conceptos.forEach((concepto) => {
		if (horasConceptos[concepto]) {
			totalHoras += parseFloat(horasConceptos[concepto]);
		}
	});

	const importe = totalHoras * costeHora;

	document.getElementById("totalHoras").value = totalHoras.toFixed(2);
	document.getElementById("importe").value = importe.toFixed(2);
	actualizarTotalComunes();
	calculateTotalHorasManoObraPropia();
}

conceptos.forEach((concepto) => {
	const checkbox = document.getElementById(concepto);
	const horasDiv = document.getElementById(`${concepto}Horas`);
	const horasInput = horasDiv.querySelector("input");

	checkbox.addEventListener("change", function () {
		if (checkbox.checked) {
			horasDiv.classList.remove("d-none");
		} else {
			horasDiv.classList.add("d-none");
			horasInput.value = "";
			horasConceptos[concepto] = 0;
			actualizarTotales();
		}
	});

	horasInput.addEventListener("input", function () {
		horasConceptos[concepto] = horasInput.value;
		actualizarTotales();
	});
});

document
	.getElementById("costeHora")
	.addEventListener("input", actualizarTotales);

//Apartado horas propias en el exterior
const horasExteriorCheck = document.getElementById("horasExteriorCheck");
const horasExterior = document.getElementById("horasExterior");
const horasExteriorInput = document.getElementById("horasExteriorInput");
const importeExterior = document.getElementById("importeExterior");

horasExteriorCheck.addEventListener("change", function () {
	if (horasExteriorCheck.checked) {
		horasExterior.classList.remove("d-none");
	} else {
		horasExterior.classList.add("d-none");
		horasExteriorInput.value = "0";
		importeExterior.value = "0";
	}
	calculateTotalHorasManoObraPropia();
});

horasExteriorInput.addEventListener("input", function () {
	importeExterior.value = horasExteriorInput.value * costeHorario;
});

// Apartado horas comunes
const porcentajeTalleres = document.getElementById("porcentajeTalleres");
const porcentajeExterior = document.getElementById("porcentajeExterior");
const totalHorasComunes = document.getElementById("totalHorasComunes");

function actualizarTotalComunes() {
	const totalHoras =
		parseFloat(document.getElementById("totalHoras").value) || 0;
	const porcentajeTalleresVal = parseFloat(porcentajeTalleres.value) || 0;
	const porcentajeExteriorVal = parseFloat(porcentajeExterior.value) || 0;

	const totalCalculado =
		(porcentajeTalleresVal / 100) * totalHoras +
		(porcentajeExteriorVal / 100) * totalHoras;
	totalHorasComunes.value = totalCalculado.toFixed(2);

	const costeHora = parseFloat(document.getElementById("costeHora").value);

	const importeHorasComunes = totalCalculado * costeHora;

	document.getElementById("importeHorasComunes").value =
		importeHorasComunes.toFixed(2);
}

porcentajeTalleres.addEventListener("input", actualizarTotalComunes);
porcentajeExterior.addEventListener("input", actualizarTotalComunes);

//Apartado calcular total de horas
function calculateTotalHorasManoObraPropia() {
	const subtotalHorasPropias = parseFloat(document.getElementById("totalHoras").value) || 0;
	const horasPropiasExterior = parseFloat(document.getElementById("horasExteriorInput").value) || 0;
	const subtotalHorasComunes = parseFloat(document.getElementById("totalHorasComunes").value) || 0;
	const horasIngenieriaProduccion = parseFloat(document.getElementById("horasIngenieriaProduccion").value) || 0;
	const horasCalidad = parseFloat(document.getElementById("horasCalidad").value) || 0;
	const horasGestionProducto =
		parseFloat(document.getElementById("horasGestionProducto").value) || 0;
	const horasIngenieria =
		parseFloat(document.getElementById("horasIngenieria").value) || 0;
	const horasCompras =
		parseFloat(document.getElementById("horasCompras").value) || 0;
	const horasAlmacenes =
		parseFloat(document.getElementById("horasAlmacenes").value) || 0;

	const totalHorasManoObraPropia =
		subtotalHorasPropias +
		horasPropiasExterior +
		subtotalHorasComunes +
		horasIngenieriaProduccion +
		horasCalidad +
		horasGestionProducto +
		horasIngenieria +
		horasCompras +
		horasAlmacenes;

	document.getElementById("totalHorasManoObraPropia").value =
		totalHorasManoObraPropia.toFixed(2);
	calcularImporteTotalHorasManoObra();
}

document.getElementById("totalHoras").addEventListener("input", calculateTotalHorasManoObraPropia);
document.getElementById("horasExteriorInput").addEventListener("input", calculateTotalHorasManoObraPropia);
document.getElementById("totalHorasComunes").addEventListener("input", calculateTotalHorasManoObraPropia);
document.getElementById("horasIngenieriaProduccion").addEventListener("input", calculateTotalHorasManoObraPropia);
document.getElementById("horasCalidad").addEventListener("input", calculateTotalHorasManoObraPropia);
document.getElementById("horasGestionProducto").addEventListener("input", calculateTotalHorasManoObraPropia);
document.getElementById("horasIngenieria").addEventListener("input", calculateTotalHorasManoObraPropia);
document.getElementById("horasCompras").addEventListener("input", calculateTotalHorasManoObraPropia);
document.getElementById("horasAlmacenes").addEventListener("input", calculateTotalHorasManoObraPropia);

function calcularImporteTotalHorasManoObra() {
	let importeTotal = document.getElementById("totalHorasManoObraPropia").value * document.getElementById("costeHora").value;
	document.getElementById("importeTotalHorasManoObra").value = importeTotal.toFixed(2);
    actualizarTotalSeguros();
}

//TEST
const costesExternos = [
	"costesExternosTalleresPropios",
	"repuestosVenta",
	"costesExternosIPPComunes",
	"tratamientoTermico",
	"proteccionLimpieza",
	"end",
	"costesExternosCalidad",
	"costesExternosGestionProducto",
	"costesExternosIngenieria",
	"costesExternosComprasAlmacenes",
];

const horasCostesExternos = {};

function actualizarTotalCostesExternos() {
	let total = 0;

	costesExternos.forEach((coste) => {
		const checkbox = document.getElementById(`${coste}Check`);

		if (checkbox.checked) {
			const inputs = document.querySelectorAll(`#${coste} input`);
			let subtotal = 0;

			if (inputs.length != 4) {
				inputs.forEach((input) => {
					if (input.value) {
						subtotal += parseFloat(input.value);
					}
				});
			} else {
				subtotal +=
					parseFloat(
						(inputs[0].value || 0) * (inputs[1].value || 0)
					) +
					parseFloat(inputs[2].value || 0) +
					parseFloat(inputs[3].value || 0);
			}

			total += subtotal;
		}
	});

	document.getElementById("totalCostesExternos").value = total.toFixed(2);
}

costesExternos.forEach((coste) => {
	const checkbox = document.getElementById(`${coste}Check`);
	const inputsDiv = document.getElementById(coste);
	const inputs = inputsDiv.querySelectorAll("input");

	checkbox.addEventListener("change", function () {
		if (checkbox.checked) {
			inputsDiv.classList.remove("d-none");
		} else {
			inputsDiv.classList.add("d-none");
			inputs.forEach((input) => {
				input.value = "";
			});
			horasCostesExternos[coste] = 0;
			actualizarTotalCostesExternos();
		}
	});

	inputs.forEach((input) => {
		input.addEventListener("input", function () {
			actualizarTotalCostesExternos();
		});
	});
});

//Apartado costes externos trabajos in situ

const costesExternosCheckboxes = document.querySelectorAll('[id$="Check"]');
const costesExternosInputs = document.querySelectorAll(
	'[id^="costesExternos"], [id^="viajes"], [id^="dietas"], [id^="alquilerCoches"]'
);

costesExternosCheckboxes.forEach((checkbox) => {
	const target = document.getElementById(`${checkbox.id.slice(0, -5)}`);

	checkbox.addEventListener("change", () => {
		if (checkbox.checked) {
			target.classList.remove("d-none");
		} else {
			target.classList.add("d-none");
			const inputs = target.querySelectorAll("input");
			inputs.forEach((input) => (input.value = ""));
		}
		actualizarTotalCostesExternosInSitu();
	});
});

function actualizarTotalCostesExternosInSitu() {
	const costesExternosInSitu = [
		"costesExternosTrabajosInSitu",
		"viajes",
		"dietas",
		"alquilerCoches",
	];
	let total = 0;
	costesExternosInSitu.forEach((coste, i) => {
		const checkbox = document.getElementById(`${coste}Check`);
		if (checkbox.checked) {
			const inputs = document.querySelectorAll(`#${coste} input`);
			let subtotal = 0;
			if (i === 0) {
				// Suma de los inputs
				inputs.forEach((input) => {
					if (input.value) {
						subtotal += parseFloat(input.value);
					}
				});
			} else if (i === 1) {
				// Multiplicación de los inputs
				let multiplicacion = 1;
				inputs.forEach((input) => {
					if (input.value) {
						multiplicacion *= parseFloat(input.value);
					}
				});
				subtotal = multiplicacion;
			} else if (i === 2) {
				// Multiplicación y suma de los inputs
				const numPersonas = parseFloat(inputs[0].value);
				const dias = parseFloat(inputs[1].value);
				const dietaDiaria = parseFloat(inputs[2].value);
				const alojamiento = parseFloat(inputs[3].value);
				if (numPersonas && dias && dietaDiaria) {
					subtotal = numPersonas * dias * dietaDiaria;
				}
				if (alojamiento) {
					subtotal += alojamiento;
				}
			} else if (i === 3) {
				// Multiplicación y suma de los inputs
				const numVehiculos = parseFloat(inputs[0].value);
				const dias = parseFloat(inputs[1].value);
				const alquilerDia = parseFloat(inputs[2].value);
				const combustible = parseFloat(inputs[3].value);
				if (numVehiculos && dias && alquilerDia) {
					subtotal = numVehiculos * dias * alquilerDia;
				}
				if (combustible) {
					subtotal += combustible;
				}
			}
			total += subtotal;
		}
	});
	document.getElementById("totalCostesExternosInSitu").value =
		total.toFixed(2);
}

costesExternosInputs.forEach((input) => {
	input.addEventListener("input", () => {
		actualizarTotalCostesExternosInSitu();
        actualizarTotalSeguros();
	});
});

// Otros costes Operacionales

const checkboxes = document.querySelectorAll('input[type="checkbox"][data-group="costesOperacionales"]');
const numberInputs = document.querySelectorAll('input[type="number"][data-group="costesOperacionales"]');

checkboxes.forEach((checkbox) => {
    const target = document.getElementById(`${checkbox.id.slice(0, -5)}`);

    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            target.classList.remove('d-none');
            target.querySelector('input[type="number"]').disabled = false;
        } else {
            target.classList.add('d-none');
            target.querySelector('input[type="number"]').disabled = true;
            target.querySelector('input[type="number"]').value = ''; // Reset the input value
        }
        actualizarTotalSeguros();
    });
});

numberInputs.forEach((input) => {
    input.addEventListener('input', () => {
        actualizarTotalSeguros();
    });
});

function actualizarTotalSeguros() {
    let total = 0;
    numberInputs.forEach((input) => {
        if (input.value && !input.disabled) {
            total += parseFloat(input.value);
        }
    });
    document.getElementById('totalSeguros').value = total.toFixed(2);
}

// Actualizar total costes
function actualizarTotalCostes() {
    const importeTotalHorasManoObra = parseFloat(document.getElementById("importeTotalHorasManoObra").value) || 0;
    const totalCostesExternos = parseFloat(document.getElementById("totalCostesExternos").value) || 0;
    const totalCostesExternosInSitu = parseFloat(document.getElementById("totalCostesExternosInSitu").value) || 0;
    const totalSeguros = parseFloat(document.getElementById("totalSeguros").value) || 0;

    const totalCostes = importeTotalHorasManoObra + totalCostesExternos + totalCostesExternosInSitu + totalSeguros;
    document.getElementById("totalCostes").value = totalCostes.toFixed(2);
}

// Llama a actualizarTotalCostes en el evento 'input' de cada uno de los elementos relevantes
document.getElementById("importeTotalHorasManoObra").addEventListener("input", actualizarTotalCostes);
document.getElementById("totalCostesExternos").addEventListener("input", actualizarTotalCostes);
document.getElementById("totalCostesExternosInSitu").addEventListener("input", actualizarTotalCostes);

// Modifica la función actualizarTotalSeguros para que llame a actualizarTotalCostes cuando se actualice el total
function actualizarTotalSeguros() {
    let total = 0;
    numberInputs.forEach((input) => {
        if (input.value && !input.disabled) {
            total += parseFloat(input.value);
        }
    });
    document.getElementById("totalSeguros").value = total.toFixed(2);

    // Llama a actualizarTotalCostes aquí
    actualizarTotalCostes();
    calcularCostesGenerales();
    calcularMargenBruto();
    calcularCostesTotales()
}


// Más data

function calcularCostesGenerales() {
    const totalHorasManoObraPropia = parseFloat(document.getElementById("totalHorasManoObraPropia").value) || 0;
    const porcentajeCostesGenerales = parseFloat(document.getElementById("porcentajeCostesGenerales").value) || 0;

    const costesGenerales = totalHorasManoObraPropia * porcentajeCostesGenerales;
    document.getElementById("costesGenerales").value = costesGenerales.toFixed(2);
    calcularCostesTotales() 
}

document.getElementById("precioVenta").addEventListener("input", () => {
    calcularMargenBruto();
});

function calcularMargenBruto() {
    const totalCostes = parseFloat(document.getElementById("totalCostes").value) || 0;
    const precioVenta = parseFloat(document.getElementById("precioVenta").value) || 0;
    const porcentajeMargenBruto = parseFloat(document.getElementById("porcentajeMargenBruto").value) || 0;

    const margenBruto = precioVenta - totalCostes;
    document.getElementById("margenBruto").value = margenBruto.toFixed(2);

    document.getElementById("porcentajeMargenBruto").value = (margenBruto/precioVenta).toFixed(2)*100;

    calcularResultadoPrevisto()
}

function calcularCostesTotales() {
    const totalCostes = parseFloat(document.getElementById("totalCostes").value) || 0;
    const costesGenerales = parseFloat(document.getElementById("costesGenerales").value) || 0;

    const costesTotales = totalCostes + costesGenerales;
    document.getElementById("costesTotales").value = costesTotales.toFixed(2);
    calcularResultadoPrevisto();
    // calcularCostesTotales();
}

function calcularResultadoPrevisto() {
    const precioVenta = parseFloat(document.getElementById("precioVenta").value) || 0;
    const costesTotales = parseFloat(document.getElementById("costesTotales").value) || 0;

    const resultadoPrevisto = precioVenta - costesTotales;
    document.getElementById("resultadoPrevisto").value = resultadoPrevisto.toFixed(2);

    const porcentajeResultadoPrevisto = (resultadoPrevisto / precioVenta) * 100;
    document.getElementById("porcentajeResultadoPrevisto").value = porcentajeResultadoPrevisto.toFixed(2);
}


// Procesar formulario

function generar() {
    return {
        numOferta: document.getElementById("numOferta").value,
        numObra: document.getElementById("numObra").value,
        cliente: document.getElementById("cliente").value,
        denominacion: document.getElementById("denominacion").value,
        rev: document.getElementById("rev").value,
        numPedido: document.getElementById("numPedido").value,
        numSAPCliente: document.getElementById("numSAPCliente").value,
        fechaEmision: document.getElementById("fechaEmision").value,
        fechaInicio: document.getElementById("fechaInicio").value,
        fechaTerminacion: document.getElementById("fechaTerminacion").value,
		// nifCliente: document.getElementById("nifCliente").value,
		// responsableProyecto: document.getElementById("responsableProyecto").value,
		// matSap: document.getElementById("matSap").value,
		costeHora: document.getElementById("costeHora").value,
        mecanizadoHoras: parseFloat(document.getElementById("mecanizadoHorasInput").value) || 0,
        ajusteHoras: parseFloat(document.getElementById("ajusteHorasInput").value) || 0,
        caldereriaHoras: parseFloat(document.getElementById("caldereriaHorasInput").value) || 0,
        verificadoHoras: parseFloat(document.getElementById("verificadoHorasInput").value) || 0,
        trazadoHoras: parseFloat(document.getElementById("trazadoHorasInput").value) || 0,
        otrosHoras: parseFloat(document.getElementById("otrosHorasInput").value) || 0,
		subtotalHorasPropiasFabricacionTalleresPropios: 
			(parseFloat(document.getElementById("mecanizadoHorasInput").value) || 0)+
			(parseFloat(document.getElementById("ajusteHorasInput").value) || 0)+
			(parseFloat(document.getElementById("caldereriaHorasInput").value) || 0)+
			(parseFloat(document.getElementById("verificadoHorasInput").value) || 0)+
			(parseFloat(document.getElementById("trazadoHorasInput").value) || 0)+
			(parseFloat(document.getElementById("otrosHorasInput").value) || 0),
        horasExterior: parseFloat(document.getElementById("horasExteriorInput").value) || 0,


		horasIPP: document.getElementById("horasIngenieriaProduccion").value || 0,
		horasCalidad: document.getElementById("horasCalidad").value || 0,
		horasGPP: document.getElementById("horasGestionProducto").value || 0,
		horasIngenieria: document.getElementById("horasIngenieria").value || 0,
		horasCompras: document.getElementById("horasCompras").value || 0,
		horasAlmacen:  document.getElementById("horasAlmacenes").value || 0,

		totalHorasManoObraPropia:
		(parseFloat(document.getElementById("mecanizadoHorasInput").value) || 0)+
		(parseFloat(document.getElementById("ajusteHorasInput").value) || 0)+
		(parseFloat(document.getElementById("caldereriaHorasInput").value) || 0)+
		(parseFloat(document.getElementById("verificadoHorasInput").value) || 0)+
		(parseFloat(document.getElementById("trazadoHorasInput").value) || 0)+
		(parseFloat(document.getElementById("otrosHorasInput").value) || 0)+

		(parseFloat(document.getElementById("horasExteriorInput").value) || 0)+

		(parseFloat(document.getElementById("horasIngenieriaProduccion").value) || 0)+
		(parseFloat(document.getElementById("horasCalidad").value) || 0)+
		(parseFloat(document.getElementById("horasGestionProducto").value) || 0)+
		(parseFloat(document.getElementById("horasIngenieria").value) || 0)+
		(parseFloat(document.getElementById("horasCompras").value) || 0)+
		(parseFloat(document.getElementById("horasAlmacenes").value) || 0)


    };
}



// --------------------------------------------------------------------