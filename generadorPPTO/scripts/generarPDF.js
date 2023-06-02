const tbody = document.querySelector("#tableOutput tbody");
item = 1;
subTotalHorasPropias = false;
horasComunes = true;

document.getElementById("download").addEventListener("click", function (e) {
	datos = generar();

	if (datos.mecanizadoHoras && datos.mecanizadoHoras !== 0) {
		addRow(datos.mecanizadoHoras, datos.costeHora, "Mecanizado");
	}
	if (datos.ajusteHoras && datos.ajusteHoras !== 0) {
		addRow(datos.ajusteHoras, datos.costeHora, "Ajuste");
	}
	if (datos.caldereriaHoras && datos.caldereriaHoras !== 0) {
		addRow(datos.caldereriaHoras, datos.costeHora, "Calderería");
	}
	if (datos.verificadoHoras && datos.verificadoHoras !== 0) {
		addRow(datos.verificadoHoras, datos.costeHora, "Verificado");
	}
	if (datos.trazadoHoras && datos.trazadoHoras !== 0) {
		addRow(datos.trazadoHoras, datos.costeHora, "Trazado");
	}
	if (datos.otrosHoras && datos.otrosHoras !== 0) {
		addRow(datos.otrosHoras, datos.costeHora, "Otros");
	}
	if (subTotalHorasPropias) {
		// Crear una nueva fila
		const row = document.createElement("tr");

		// Crear y añadir las celdas a la fila
		const cell1 = document.createElement("td");
		cell1.colSpan = "1";
		// cell1.textContent = item+0.01;
		row.appendChild(cell1);

		const cell2 = document.createElement("td");
		cell2.colSpan = "7";
		cell2.textContent =
			"Subtotal Horas Propias Fabricación en Talleres Propios";
		row.appendChild(cell2);

		const cell3 = document.createElement("td");
		cell3.colSpan = "1";
		cell3.textContent =
			datos.subtotalHorasPropiasFabricacionTalleresPropios;
		row.appendChild(cell3);

		const cell4 = document.createElement("td");
		cell4.colSpan = "1";
		cell4.textContent =
			datos.subtotalHorasPropiasFabricacionTalleresPropios *
			parseFloat(datos.costeHora);
		row.appendChild(cell4);

		// Añadir la fila a la tabla
		tbody.appendChild(row);
	}

	if (datos.horasExterior && datos.horasExterior !== 0) {
		// Crear una nueva fila
		const row = document.createElement("tr");

		// Crear y añadir las celdas a la fila
		const cell1 = document.createElement("td");
		cell1.colSpan = "1";
		cell1.textContent = "";
		row.appendChild(cell1);

		const cell2 = document.createElement("td");
		cell2.colSpan = "7";
		cell2.textContent = "Horas propias en el Exterior";
		row.appendChild(cell2);

		const cell3 = document.createElement("td");
		cell3.colSpan = "1";
		row.appendChild(cell3);

		const cell4 = document.createElement("td");
		cell4.colSpan = "1";
		row.appendChild(cell4);

		// Añadir la fila a la tabla
		tbody.appendChild(row);
		subTotalHorasPropias = true;

		// -----------------------

		// Crear una nueva fila
		const row2 = document.createElement("tr");

		// Crear y añadir las celdas a la fila
		const cell1_2 = document.createElement("td");
		cell1_2.colSpan = "1";
		item = item + 0.01;
		cell1_2.textContent = item;
		row2.appendChild(cell1_2);

		const cell2_2 = document.createElement("td");
		cell2_2.colSpan = "7";
		cell2_2.textContent =
			"Asistencia, Mantenimiento y Reparaciones In Situ";
		row2.appendChild(cell2_2);

		const cell3_2 = document.createElement("td");
		cell3_2.colSpan = "1";
		cell3_2.textContent = datos.horasExterior;
		row2.appendChild(cell3_2);

		const cell4_2 = document.createElement("td");
		cell4_2.colSpan = "1";
		cell4_2.textContent = (
			datos.horasExterior * datos.costeHora
		).toString();
		row2.appendChild(cell4_2);

		// Añadir la fila a la tabla
		tbody.appendChild(row2);
		subTotalHorasPropias = true;

		// -------------------------------

		const row3 = document.createElement("tr");

		const cell1_3 = document.createElement("td");
		cell1_3.colSpan = "1";
		cell1_3.textContent = "";
		row3.appendChild(cell1_3);

		const cell2_3 = document.createElement("td");
		cell2_3.colSpan = "7";
		cell2_3.textContent = "Subtotal Horas Propias en el Exterior";
		row3.appendChild(cell2_3);

		const cell3_3 = document.createElement("td");
		cell3_3.colSpan = "1";
		cell3_3.textContent = datos.horasExterior;
		row3.appendChild(cell3_3);

		const cell4_3 = document.createElement("td");
		cell4_3.colSpan = "1";
		cell4_3.textContent = (
			datos.horasExterior * datos.costeHora
		).toString();
		row3.appendChild(cell4_3);

		// Añadir la fila a la tabla
		tbody.appendChild(row3);
		subTotalHorasPropias = true;
	}

	if (horasComunes) {
		// Crear una nueva fila
		const row1 = document.createElement("tr");

		// Crear y añadir las celdas a la fila
		const cell1_1 = document.createElement("td");
		cell1_1.colSpan = "1";
		cell1_1.textContent = "";
		row1.appendChild(cell1_1);

		const cell2_1 = document.createElement("td");
		cell2_1.colSpan = "7";
		cell2_1.textContent = "Desglose horas comunes";
		row1.appendChild(cell2_1);

		const cell3_1 = document.createElement("td");
		cell3_1.colSpan = "1";
		row1.appendChild(cell3_1);

		const cell4_1 = document.createElement("td");
		cell4_1.colSpan = "1";
		row1.appendChild(cell4_1);

		// Añadir la fila a la tabla
		tbody.appendChild(row1);

		// -----------------------------------------------

		// Crear una nueva fila
		const row2 = document.createElement("tr");

		// Crear y añadir las celdas a la fila
		const cell1_2 = document.createElement("td");
		cell1_2.colSpan = "1";
		item = item + 0.01;
		cell1_2.textContent = item;
		row2.appendChild(cell1_2);

		const cell2_2 = document.createElement("td");
		cell2_2.colSpan = "4";
		cell2_2.textContent = "Comunes Fabricación";
		row2.appendChild(cell2_2);

		const cell2_3 = document.createElement("td");
		cell2_3.colSpan = "2";
		cell2_3.textContent = "% sobre Horas Propias Fabricación Talleres";
		row2.appendChild(cell2_3);

		// Insertar otra columna con colspan 1 y el texto "datos.porcentajeHorasTalleres"
		const cell2_4 = document.createElement("td");
		cell2_4.colSpan = "1";
		cell2_4.textContent = "15,0%";
		row2.appendChild(cell2_4);

		const cell3_2 = document.createElement("td");
		cell3_2.colSpan = "1";
		cell3_2.textContent = Math.round(
			datos.subtotalHorasPropiasFabricacionTalleresPropios * 0.15
		);
		row2.appendChild(cell3_2);

		const cell4_2 = document.createElement("td");
		cell4_2.colSpan = "1";
		cell4_2.textContent = (
			Math.round(
				datos.subtotalHorasPropiasFabricacionTalleresPropios * 0.15
			) * datos.costeHora
		).toString();
		row2.appendChild(cell4_2);

		// Añadir la fila a la tabla
		tbody.appendChild(row2);

		// ----------------------------------------------

		// Crear una nueva fila
		const row3 = document.createElement("tr");

		// Crear y añadir las celdas a la fila
		const cell1_3 = document.createElement("td");
		cell1_3.colSpan = "1";
		item = item + 0.01;
		cell1_3.textContent = item;
		row3.appendChild(cell1_3);

		const cell2_5 = document.createElement("td");
		cell2_5.colSpan = "4";
		cell2_5.textContent = "Comunes Fabricación";
		row3.appendChild(cell2_5);

		const cell2_6 = document.createElement("td");
		cell2_6.colSpan = "2";
		cell2_6.textContent = "% sobre Horas Propias Fabricación Talleres";
		row3.appendChild(cell2_6);

		// Insertar otra columna con colspan 1 y el texto "datos.porcentajeHorasTalleres"
		const cell2_7 = document.createElement("td");
		cell2_7.colSpan = "1";
		cell2_7.textContent = "5,0%";
		row3.appendChild(cell2_7);

		const cell3_3 = document.createElement("td");
		cell3_3.colSpan = "1";
		cell3_3.textContent = Math.round(
			datos.subtotalHorasPropiasFabricacionTalleresPropios * 0.05
		);
		row3.appendChild(cell3_3);

		const cell4_3 = document.createElement("td");
		cell4_3.colSpan = "1";
		cell4_3.textContent = Math.round(
			datos.subtotalHorasPropiasFabricacionTalleresPropios *
				0.05 *
				datos.costeHora
		);
		row3.appendChild(cell4_3);

		// Añadir la fila a la tabla
		tbody.appendChild(row3);

		// -----------------------------------------------------------------------------

        const row4 = document.createElement("tr");

        // Crear y añadir las celdas a la fila
        const cell1_4 = document.createElement("td");
        cell1_4.colSpan = "1";
        cell1_4.textContent = "";
        row4.appendChild(cell1_4);
        
        const cell2_8 = document.createElement("td");
        cell2_8.colSpan = "7";
        cell2_8.textContent = "SubtotalHoras Comunes Fabricación";
        row4.appendChild(cell2_8);
        
        const cell3_4 = document.createElement("td");
        cell3_4.colSpan = "1";
        cell3_4.textContent = Math.round(
            datos.subtotalHorasPropiasFabricacionTalleresPropios * 0.05 +
                datos.subtotalHorasPropiasFabricacionTalleresPropios * 0.15
        );
        row4.appendChild(cell3_4);
        
        const cell4_4 = document.createElement("td");
        cell4_4.colSpan = "1";
        cell4_4.textContent = Math.round(
            (datos.subtotalHorasPropiasFabricacionTalleresPropios * 0.05 * datos.costeHora) + 
            (datos.subtotalHorasPropiasFabricacionTalleresPropios * 0.15 * datos.costeHora)
        );
        row4.appendChild(cell4_4);
        
        // Añadir la fila a la tabla
        tbody.appendChild(row4);
	}

    if (datos.horasIPP != 0 || 
        datos.horasCalidad != 0 || 
        datos.horasGPP != 0 || 
        datos.horasIngenieria != 0 || 
        datos.horasCompras != 0 || 
        datos.horasAlmacen != 0) {
        
        // Crear una nueva fila
        const row = document.createElement("tr");

        // Crear y añadir las celdas a la fila
        const cell1 = document.createElement("td");
        cell1.colSpan = "1";
        row.appendChild(cell1);

        const cell2 = document.createElement("td");
        cell2.colSpan = "7";
        cell2.textContent = "Horas Resto de Áreas";
        row.appendChild(cell2);

        const cell3 = document.createElement("td");
        cell3.colSpan = "1";
        row.appendChild(cell3);

        const cell4 = document.createElement("td");
        cell4.colSpan = "1";
        row.appendChild(cell4);

        // Añadir la fila a la tabla
        tbody.appendChild(row);

        if (datos.horasIPP != 0) {addHorasRestoAreas("Horas Ingeniería de Producción IPP", datos.horasIPP);}
        if (datos.horasCalidad != 0) {addHorasRestoAreas("Horas Calidad", datos.horasCalidad);}
        if (datos.horasGPP != 0) {addHorasRestoAreas("Horas Gestión de Producto y Posventa", datos.horasGPP);}
        if (datos.horasIngenieria != 0) {addHorasRestoAreas("Horas Ingeniería", datos.horasIngenieria);}
        if (datos.horasCompras != 0) {addHorasRestoAreas("Horas de Compras", datos.horasCompras);}
        if (datos.horasAlmacen != 0) {addHorasRestoAreas("Horas de Almacenes", datos.horasAlmacen);}
    }

        // Crear una nueva fila
        const row2 = document.createElement("tr");

        // Crear y añadir las celdas a la fila
        const cell1_2 = document.createElement("td");
        cell1_2.colSpan = "1";
        cell1_2.textContent = "1";
        row2.appendChild(cell1_2);

        const cell2_2 = document.createElement("td");
        cell2_2.colSpan = "7";
        cell2_2.textContent = "TOTAL HORAS MANO DE OBRA PROPIA";
        row2.appendChild(cell2_2);

        const cell3_2 = document.createElement("td");
        cell3_2.colSpan = "1";
        cell3_2.textContent = Math.round(datos.totalHorasManoObraPropia);
        row2.appendChild(cell3_2);

        const cell4_2 = document.createElement("td");
        cell4_2.colSpan = "1";
        cell4_2.textContent = Math.round(datos.totalHorasManoObraPropia * datos.costeHora);
        row2.appendChild(cell4_2);

        // Añadir la fila a la tabla
        tbody.appendChild(row2);

    

	console.log(datos);
});

function descargarPDF() {
	e.preventDefault();

	// Crear una instancia de jsPDF
	var doc = new jsPDF();

	// Agregar el título
	doc.setFontSize(20);
	doc.text("Datos clientes", 15, 15);

	doc.autoTable({
		html: "#tableOutput",
	});

	// Descargar el PDF
	doc.save("DatosClientes.pdf");
}

function addRow(mecanizado, costeHora, name) {
	// Crear una nueva fila
	const row = document.createElement("tr");

	// Crear y añadir las celdas a la fila
	const cell1 = document.createElement("td");
	cell1.colSpan = "1";
	item = item + 0.01;
	cell1.textContent = item;
	row.appendChild(cell1);

	const cell2 = document.createElement("td");
	cell2.colSpan = "7";
	cell2.textContent = name;
	row.appendChild(cell2);

	const cell3 = document.createElement("td");
	cell3.colSpan = "1";
	cell3.textContent = mecanizado.toString();
	row.appendChild(cell3);

	const cell4 = document.createElement("td");
	cell4.colSpan = "1";
	cell4.textContent = (mecanizado * costeHora).toString();
	row.appendChild(cell4);

	// Añadir la fila a la tabla
	tbody.appendChild(row);
	subTotalHorasPropias = true;
}

function addHorasRestoAreas(name, horas) {
	// Crear una nueva fila
	const row = document.createElement("tr");

	// Crear y añadir las celdas a la fila
	const cell1 = document.createElement("td");
	cell1.colSpan = "1";
	item = item + 0.01;
	cell1.textContent = item;
	row.appendChild(cell1);

	const cell2 = document.createElement("td");
	cell2.colSpan = "5";
	cell2.textContent = name;
	row.appendChild(cell2);

    const cell2_2 = document.createElement("td");
	cell2_2.colSpan = "1";
	cell2_2.textContent = "% sobre horas fabricación";
	row.appendChild(cell2_2);

	const cell3 = document.createElement("td");
	cell3.colSpan = "1";
	cell3.textContent = parseFloat(horas/(datos.subtotalHorasPropiasFabricacionTalleresPropios+
        datos.horasExterior+
        Math.round(
            datos.subtotalHorasPropiasFabricacionTalleresPropios * 0.05 +
                datos.subtotalHorasPropiasFabricacionTalleresPropios * 0.15
        ))*100).toFixed(1) + "%";
	row.appendChild(cell3);

	const cell4 = document.createElement("td");
	cell4.colSpan = "1";
	cell4.textContent = horas;
	row.appendChild(cell4);
	
    const cell5 = document.createElement("td");
	cell5.colSpan = "1";
	cell5.textContent = Math.round(horas*datos.costeHora);
	row.appendChild(cell5);

	// Añadir la fila a la tabla
	tbody.appendChild(row);
}
