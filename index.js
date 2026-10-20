const URL_APPS_SCRIPT =
  "https://script.google.com/macros/s/AKfycbzx3vrD4zyZZ-o0LgjCnPuUy6jyn1j7mcpi3tWiy-ejVpCZh5n-zuqY7Tuazp4RDs34_w/exec";

const SEDES = [
  {
    id: "ent_1",
    nombre: "Altos Mirandinos",
    imagenUrl: "./imagenes/Altos Mirandinos.webp",
  },
  { id: "ent_2", nombre: "Amazonas", imagenUrl: "./imagenes/Amazonas.webp" },
  {
    id: "ent_3",
    nombre: "Anzoátegui",
    imagenUrl: "./imagenes/Anzoategui.webp",
  },
  { id: "ent_4", nombre: "Apure", imagenUrl: "./imagenes/Apure.webp" },
  { id: "ent_5", nombre: "Aragua", imagenUrl: "./imagenes/Aragua.webp" },
  { id: "ent_6", nombre: "Barinas", imagenUrl: "./imagenes/Barinas.webp" },
  { id: "ent_7", nombre: "Baruta", imagenUrl: "./imagenes/Baruta.webp" },
  { id: "ent_8", nombre: "Bolívar", imagenUrl: "./imagenes/Bolívar.webp" },
  { id: "ent_9", nombre: "Carabobo", imagenUrl: "./imagenes/Carabobo.webp" },
  { id: "ent_10", nombre: "Cojedes", imagenUrl: "./imagenes/Cojedes.webp" },
  {
    id: "ent_11",
    nombre: "Delta Amacuro",
    imagenUrl: "./imagenes/Delta Amacuro.webp",
  },
  {
    id: "ent_12",
    nombre: "Eje Barlovento",
    imagenUrl: "./imagenes/Barlovento.webp",
  },
  {
    id: "ent_13",
    nombre: "Eje Guarenas - Guatire",
    imagenUrl: "./imagenes/Guarenas.webp",
  },
  { id: "ent_14", nombre: "Falcón", imagenUrl: "./imagenes/Falcón.webp" },
  {
    id: "ent_15",
    nombre: "La California",
    imagenUrl: "./imagenes/La California.webp",
  },
  { id: "ent_16", nombre: "Lara", imagenUrl: "./imagenes/Lara.webp" },
  {
    id: "ent_17",
    nombre: "Libertador",
    imagenUrl: "./imagenes/Libertador.webp",
  },
  { id: "ent_18", nombre: "Mérida", imagenUrl: "./imagenes/Merida.webp" },
  { id: "ent_19", nombre: "Monagas", imagenUrl: "./imagenes/Monagas.webp" },
  {
    id: "ent_20",
    nombre: "Nueva Esparta",
    imagenUrl: "./imagenes/Nueva Esparta.webp",
  },
  {
    id: "ent_21",
    nombre: "Portuguesa",
    imagenUrl: "./imagenes/Portuguesa.webp",
  },
  { id: "ent_22", nombre: "Sucre", imagenUrl: "./imagenes/Sucre.webp" },
  { id: "ent_23", nombre: "Táchira", imagenUrl: "./imagenes/Tachira.webp" },
  { id: "ent_24", nombre: "Trujillo", imagenUrl: "./imagenes/Trujillo.webp" },
  {
    id: "ent_25",
    nombre: "Valles el Tuy",
    imagenUrl: "./imagenes/Valles del Tuy.webp",
  },
  { id: "ent_26", nombre: "Yaracuy", imagenUrl: "./imagenes/Yaracuy.webp" },
  { id: "ent_27", nombre: "Zulia", imagenUrl: "./imagenes/Zulia.webp" },
  {
    id: "ent_28",
    nombre: "Sede Nacional",
    imagenUrl: "./imagenes/Dirección General.webp",
  },
];
let obraSeleccionada = null;
let votanteActualId = null;
let votanteActualNombre = null;

// Elementos del selector
const dropdownBtn = document.getElementById("dropdown-btn");
const dropdownMenu = document.getElementById("dropdown-menu");
const dropdownTexto = document.getElementById("dropdown-texto");
const badgeEstado = document.getElementById("badge-estado");

// Contenedores
const gridObras = document.getElementById("grid-obras");
const panelConfirmacion = document.getElementById("panel-confirmacion");
const resumenSeleccion = document.getElementById("resumen-seleccion");
const btnEnviar = document.getElementById("btn-enviar");
const mensajeEstado = document.getElementById("mensaje-estado");

// Modal
const modal = document.getElementById("lightbox-modal");
const modalImg = document.getElementById("lightbox-img");
const modalCaption = document.getElementById("lightbox-caption");
const modalClose = document.getElementById("lightbox-close");

// 1. Poblar la lista de opciones
SEDES.forEach((sede) => {
  const li = document.createElement("li");
  li.className = "dropdown-item";
  li.dataset.value = sede.id;
  li.dataset.nombre = sede.nombre;
  li.textContent = sede.nombre;
  dropdownMenu.appendChild(li);
});

// 2. Control de apertura/cierre del menú
dropdownBtn.addEventListener("click", () => {
  dropdownMenu.classList.toggle("show");
  dropdownBtn.classList.toggle("active");
});

// Cerrar si se hace clic fuera del menú
document.addEventListener("click", (e) => {
  if (!dropdownBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
    dropdownMenu.classList.remove("show");
    dropdownBtn.classList.remove("active");
  }
});

// 3. Manejar selección de ítem
dropdownMenu.addEventListener("click", (e) => {
  const item = e.target.closest(".dropdown-item");
  if (!item) return;

  const valor = item.dataset.value;
  const nombre = item.dataset.nombre;

  dropdownMenu.classList.remove("show");
  dropdownBtn.classList.remove("active");

  if (
    confirm(
      `¿Confirmas que representas a "${nombre}"?\nUna vez confirmado no podrás modificarlo.`
    )
  ) {
    localStorage.setItem("votante_bloqueado_13aniv", valor);
    fijarIdentidad(valor, nombre);
  }
});

// 4. Bloqueos previos en LocalStorage
const votanteGuardado = localStorage.getItem("votante_bloqueado_13aniv");
const votoCompletado = localStorage.getItem("voto_realizado_13aniv");

if (votoCompletado) {
  dropdownBtn.disabled = true;
  gridObras.innerHTML = "";
  panelConfirmacion.style.display = "block";
  btnEnviar.style.display = "none";
  resumenSeleccion.innerHTML =
    "<strong>Ya has emitido tu voto desde este dispositivo.</strong> <br> <br> <h1 style: 'color: #16a34a'>¡Muchas Gracias!</h1>";
} else if (votanteGuardado) {
  const nombre =
    votanteGuardado === "JURADO" || votanteGuardado === "Jurado Calificador"
      ? "Jurado Calificador"
      : SEDES.find((s) => s.id === votanteGuardado)?.nombre || votanteGuardado;
  fijarIdentidad(votanteGuardado, nombre);
}

function fijarIdentidad(valor, nombre) {
  votanteActualId = valor; // <-- Asignamos el ID
  votanteActualNombre = nombre; // <-- Asignamos el nombre de la sede o jurado
  dropdownTexto.textContent = nombre;
  dropdownBtn.disabled = true;
  dropdownBtn.classList.remove("active");
  dropdownMenu.classList.remove("show");
  badgeEstado.textContent = `🔒 Identidad fijada: ${nombre}`;
  cargarObras(valor);
}

function cargarObras(votanteId) {
  gridObras.innerHTML = "";
  obraSeleccionada = null;
  btnEnviar.disabled = true;

  // Si es JURADO ve todas. Si es sede, se excluye la propia.
  const disponibles =
    votanteId === "JURADO" ? SEDES : SEDES.filter((s) => s.id !== votanteId);

  disponibles.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card-obra";
    card.id = `card-${item.id}`;
    card.innerHTML = `
      <div class="img-wrapper" title="Haz clic para ampliar">
        <img src="${item.imagenUrl}" alt="Obra de ${item.nombre}" loading="lazy">
        <span class="zoom-hint">🔍 Ampliar</span>
      </div>
      <h3>${item.nombre}</h3>
      <button type="button" class="btn-select">Votar por esta</button>
    `;

    // Ampliar modal
    const wrapper = card.querySelector(".img-wrapper");
    wrapper.addEventListener("click", (e) => {
      e.stopPropagation();
      abrirModal(item.imagenUrl, item.nombre);
    });

    // Seleccionar obra
    const btnVotar = card.querySelector(".btn-select");
    btnVotar.addEventListener("click", () => seleccionarObra(item));

    gridObras.appendChild(card);
  });

  resumenSeleccion.innerHTML =
    "<em>Selecciona una de las obras participantes para habilitar el voto.</em>";
  panelConfirmacion.style.display = "block";
}

// Funciones Modal
function abrirModal(src, caption) {
  modalImg.src = src;
  modalCaption.textContent = `Cuadro: ${caption}`;
  modal.classList.add("active");
}

function cerrarModal() {
  modal.classList.remove("active");
  modalImg.src = "";
}

modalClose.addEventListener("click", cerrarModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) cerrarModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("active")) cerrarModal();
});

// Seleccionar obra
function seleccionarObra(item) {
  obraSeleccionada = item;
  document.querySelectorAll(".card-obra").forEach((c) => {
    c.classList.remove("selected");
    c.querySelector(".btn-select").textContent = "Votar por esta";
  });

  const cardActual = document.getElementById(`card-${item.id}`);
  if (cardActual) {
    cardActual.classList.add("selected");
    cardActual.querySelector(".btn-select").textContent = "✓ Seleccionada";
  }

  resumenSeleccion.innerHTML = `Has seleccionado la obra de: <strong>${item.nombre}</strong>`;
  btnEnviar.disabled = false;
}

// Envío del voto
btnEnviar.addEventListener("click", async () => {
  if (!obraSeleccionada || !votanteActualNombre) return;

  const esJurado =
    votanteActualId === "JURADO" || votanteActualNombre === "Jurado Calificador";

  btnEnviar.disabled = true;
  mensajeEstado.textContent = "Registrando tu voto...";
  mensajeEstado.style.color = "#475569";

  const payload = {
    tipo: esJurado ? "jurado" : "sede",
    sedeVotante: votanteActualNombre, // Nombre explícito de la sede (o Jurado)
    votante: votanteActualNombre,
    votoPor: obraSeleccionada.nombre,
  };


  try {
    await fetch(URL_APPS_SCRIPT, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    localStorage.setItem("voto_realizado_13aniv", "true");
    gridObras.innerHTML = "";
    btnEnviar.style.display = "none";
    resumenSeleccion.innerHTML = `Tu voto por <strong>${obraSeleccionada.nombre}</strong> ha sido guardado exitosamente.`;
    mensajeEstado.innerHTML = `¡Muchas gracias por tu voto! <br> <br>  ¡Voto registrado con éxito!`;
    mensajeEstado.style.color = "#16a34a";
  } catch (err) {
    mensajeEstado.textContent = "Error al conectar. Intenta nuevamente.";
    mensajeEstado.style.color = "#dc2626";
    btnEnviar.disabled = false;
  }
});