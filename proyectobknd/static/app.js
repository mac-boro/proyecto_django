// URL base apuntando al router configurado en Django (proyectobknd)
const API_BASE_URL = 'http://127.0.0.1:8000/proyectobknd/';

document.addEventListener('DOMContentLoaded', () => {
  // Inicializacion de componentes de la pagina principal
  configurarFechaMinima();
  cargarLectoresEnSelect();
  cargarLibrosEnSelect();
  cargarCatalogo();
  cargarPrestamos();

  // Listener para el formulario de prestamos
  document.getElementById('form-prestamo').addEventListener('submit', registrarPrestamo);
});

/**
 * FUNCION: configurarFechaMinima
 * Establece la propiedad 'min' en el input tipo date para impedir que
 * el usuario elija fechas anteriores al dia actual.
 */
function configurarFechaMinima() {
  const hoy = new Date().toISOString().split('T')[0];
  const inputFecha = document.getElementById('fechaDev');
  inputFecha.min = hoy;
}

/**
 * FUNCION: cargarLectoresEnSelect
 * Obtiene los lectores desde la API Django y los despliega en el elemento <select>
 */
async function cargarLectoresEnSelect() {
  try {
    const response = await fetch(`${API_BASE_URL}Lectores/`);
    const lectores = await response.json();
    const select = document.getElementById('selectLector');
    select.innerHTML = '<option value="">-- Selecciona un lector --</option>';

    lectores.forEach(lector => {
      // Filtrar únicamente los activos
      if (lector.is_active) {
        const option = document.createElement('option');
        option.value = lector.id;
        option.textContent = `${lector.nombres} ${lector.apellidoP} (ID: ${lector.id})`;
        select.appendChild(option);
      }
    });
  } catch (error) {
    console.error('Error al obtener lectores:', error);
  }
}

/**
 * FUNCION: cargarLibrosEnSelect
 * Obtiene la lista de libros desde la API y llena el selector correspondiente
 */
async function cargarLibrosEnSelect() {
  try {
    const response = await fetch(`${API_BASE_URL}Libros/`);
    const libros = await response.json();
    const select = document.getElementById('selectLibro');
    select.innerHTML = '<option value="">-- Selecciona un libro --</option>';

    libros.forEach(libro => {
      if (libro.is_active) {
        const option = document.createElement('option');
        option.value = libro.id;
        option.textContent = `${libro.titulo} (ISBN: ${libro.isbn})`;
        select.appendChild(option);
      }
    });
  } catch (error) {
    console.error('Error al obtener libros:', error);
  }
}

/**
 * FUNCION: cargarCatalogo
 * Despliega visualmente los libros activos en forma de cuadrícula
 */
async function cargarCatalogo() {
  try {
    const response = await fetch(`${API_BASE_URL}Libros/`);
    const libros = await response.json();
    const contenedor = document.getElementById('grid-libros');
    contenedor.innerHTML = '';

    libros.forEach(libro => {
      if (libro.is_active) {
        const div = document.createElement('div');
        div.className = 'libro-item';
        div.innerHTML = `
          <h3>📖 ${libro.titulo}</h3>
          <p><strong>ISBN:</strong> ${libro.isbn}</p>
          <small>ID: ${libro.id}</small>
        `;
        contenedor.appendChild(div);
      }
    });
  } catch (error) {
    console.error('Error cargando catálogo:', error);
  }
}

/**
 * FUNCION: registrarPrestamo
 * Valida la fecha de devolucion y realiza la peticion POST hacia /Prestamos/
 */
async function registrarPrestamo(event) {
  event.preventDefault();

  const codLector = document.getElementById('selectLector').value;
  const codLibro = document.getElementById('selectLibro').value;
  const fechaDev = document.getElementById('fechaDev').value;

  // Validación JS de la fecha: Comprueba que no sea menor a la fecha de hoy
  const hoyStr = new Date().toISOString().split('T')[0];
  if (fechaDev < hoyStr) {
    alert('Error: La fecha de devolución no puede ser anterior al día de hoy.');
    return;
  }

  // Estructura de payload vinculando las 3 claves
  const payload = {
    codLector: parseInt(codLector),
    codLibro: parseInt(codLibro),
    fechaDev: fechaDev,
    is_active: true
  };

  try {
    const response = await fetch(`${API_BASE_URL}Prestamos/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      alert('¡Préstamo registrado exitosamente!');
      document.getElementById('form-prestamo').reset();
      configurarFechaMinima();
      cargarPrestamos();
    } else {
      const errData = await response.json();
      alert('Error al procesar el préstamo: ' + JSON.stringify(errData));
    }
  } catch (error) {
    console.error('Error al guardar préstamo:', error);
  }
}

/**
 * FUNCION: cargarPrestamos
 * Muestra el registro histórico de préstamos en la base de datos
 */
async function cargarPrestamos() {
  try {
    const response = await fetch(`${API_BASE_URL}Prestamos/`);
    const prestamos = await response.json();
    const lista = document.getElementById('lista-prestamos');
    lista.innerHTML = '';

    prestamos.forEach(p => {
      const li = document.createElement('li');
      li.textContent = `Préstamo ID #${p.id} | Lector ID: ${p.codLector} | Libro ID: ${p.codLibro} | Devolución: ${p.fechaDev}`;
      lista.appendChild(li);
    });
  } catch (error) {
    console.error('Error al obtener lista de préstamos:', error);
  }
}