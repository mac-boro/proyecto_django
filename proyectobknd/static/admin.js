const API_BASE_URL = 'http://127.0.0.1:8000/proyectobknd/';

document.addEventListener('DOMContentLoaded', () => {
  // Asignacion de manejadores de envio de formulario
  document.getElementById('form-lector').addEventListener('submit', guardarLector);
  document.getElementById('form-autor').addEventListener('submit', guardarAutor);
  document.getElementById('form-editorial').addEventListener('submit', guardarEditorial);
  document.getElementById('form-libro').addEventListener('submit', guardarLibro);
});

/**
 * FUNCION: guardarLector
 * Envía datos para crear un nuevo registro de Lector en Django
 */
async function guardarLector(e) {
  e.preventDefault();
  const payload = {
    nombres: document.getElementById('nombres').value,
    apellidoP: document.getElementById('apellidoP').value,
    apellidoM: document.getElementById('apellidoM').value,
    is_active: true
  };

  await enviarPeticionAPI('Lectores/', payload, 'Lector', 'form-lector');
}

/**
 * FUNCION: guardarAutor
 * Envía datos para crear un registro de Autor
 */
async function guardarAutor(e) {
  e.preventDefault();
  const payload = {
    pseudonimo: document.getElementById('pseudonimo').value,
    fNacimiento: document.getElementById('fNacimiento').value,
    is_active: true
  };

  await enviarPeticionAPI('Autores/', payload, 'Autor', 'form-autor');
}

/**
 * FUNCION: guardarEditorial
 * Envía datos para crear un registro de Editorial
 */
async function guardarEditorial(e) {
  e.preventDefault();
  const payload = {
    nombre: document.getElementById('nombreEditorial').value,
    fechaCreacion: document.getElementById('fechaCreacion').value,
    is_active: true
  };

  await enviarPeticionAPI('Editoriales/', payload, 'Editorial', 'form-editorial');
}

/**
 * FUNCION: guardarLibro
 * Envía datos para crear un registro de Libro
 */
async function guardarLibro(e) {
  e.preventDefault();
  const payload = {
    titulo: document.getElementById('titulo').value,
    isbn: document.getElementById('isbn').value,
    is_active: true
  };

  await enviarPeticionAPI('Libros/', payload, 'Libro', 'form-libro');
}

/**
 * FUNCION REUTILIZABLE: enviarPeticionAPI
 * Maneja las peticiones POST y las respuestas HTTP
 */
async function enviarPeticionAPI(endpoint, data, nombreEntidad, formId) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      alert(`¡${nombreEntidad} guardado con éxito!`);
      document.getElementById(formId).reset();
    } else {
      const errorData = await response.json();
      alert(`Error al guardar ${nombreEntidad}: ` + JSON.stringify(errorData));
    }
  } catch (err) {
    console.error(`Error en la petición a ${endpoint}:`, err);
  }
}