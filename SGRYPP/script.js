const container = document.querySelector('.material-container');
const btnnew = document.querySelector('.new')
const btnagg = document.querySelector('.add')
const btndel = document.querySelector('del')
const menuNewM = document.getElementById('newM')
const menuAddM = document.getElementById('addM')



//Subir Imagen
function mostrarImagen(event) {
    var imagenSource = event.target.result;
    var previewImage = document.getElementById('preview');
    previewImage.src = imagenSource;
}

function procesarArchivo(event) {
    var imagen = event.target.files[0];
    var lector = new FileReader();
    lector.addEventListener('load', mostrarImagen, false);
    lector.readAsDataURL(imagen);
}

//Nueva Carta
const crearNuevoMaterial = (name, number, description, image) => {
    // Check if the name exists in any of the existing cards
    const existingCard = Array.from(container.children).find(child => child.querySelector('.titulo').textContent.trim() === name);
    if (existingCard) {
        alert('El nombre ya existe en otra carta');
        return false;
    }

    const card = document.createElement('div');
    const imgBx = document.createElement('div');
    const img = document.createElement('img');
    const info = document.createElement('div');
    const nombre = document.createElement('h2');
    const descripcion = document.createElement('p');
    const total = document.createElement('div')
    const subtitulo = document.createElement('span');
    const cantidad = document.createElement('span');

    card.classList.add('material-card');
    imgBx.classList.add('material-card-imgBx');
    info.classList.add('material-card-info');
    nombre.classList.add('titulo')
    total.classList.add('material-card-total');
    subtitulo.classList.add('sub');
    cantidad.classList.add('num');

    // Set the image source
    if (image) {
        img.setAttribute('src', image)
    } else {
        img.setAttribute('src', 'IMG/signo.jpg')
    }

    nombre.textContent = name;
    cantidad.textContent = number;
    descripcion.textContent = description

    container.appendChild(card)
    card.appendChild(imgBx)
    card.appendChild(info)
    card.appendChild(total)
    imgBx.appendChild(img)
    info.appendChild(nombre)
    info.appendChild(descripcion)
    total.appendChild(subtitulo)
    total.appendChild(cantidad)

    return card
}

//Agregar Nuevos
const newMaterialMenuOpen = function () {
    btnnew.addEventListener('click', () => {
        menuNewM.classList.add('active')
    })
}

const capturarNuevoMaterial = function () {
    const nMaterialInput = document.getElementById('nMaterial').value;
    const dMaterialInput = document.getElementById('dMaterial').value;
    const numMaterialInput = document.getElementById('numMaterial').value;
    const imgMaterialInput = document.getElementById('archivo').files[0];

    if (nMaterialInput == '' || numMaterialInput == '') {
        alert('Necesito el nombre y la cantidad')
        return false
    } else {
        // Create a new FileReader to read the selected image file
        const reader = new FileReader();
        // Set the onload event handler for the reader
        reader.onload = (event) => {
            // Call the crearNuevoMaterial function with the image file as the image parameter
            crearNuevoMaterial(nMaterialInput, numMaterialInput, dMaterialInput, event.target.result);
        }
        // Read the selected image file as a data URL
        reader.readAsDataURL(imgMaterialInput);
    }

    menuNewM.classList.remove('active');
}
// Add event listener for the change event of the imagenfinal element
const imagenfinal = document.getElementById('archivo')
imagenfinal.addEventListener('change', capturarNuevoMaterial, false);



// Funciones Lista
const listaElementos = function (materials) {
    const list = document.querySelector('#material-list');

    // Remueve elementos existentes de la lista
    while (list.firstChild) {
        list.removeChild(list.firstChild)
    }

    // Por cada material se crea un elemento
    materials.forEach((material) => {
        const li = document.createElement('li');
        li.textContent = material.name;
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'material-radio';
        input.value = material.name;
        li.appendChild(input)

        // Cuando se de click, se ejecutara la funcion para mostrar cantidad
        li.addEventListener('click', () => {
            mostrarCantidad(material.quantity);
        });

        // Se agrega la li a la lista
        list.appendChild(li);
    })
    // Funcion que imprime el numero en pantalla
    const mostrarCantidad = function (quantity) {
        document.getElementById('numMaterialLec').value = quantity;
    }
}

// Lista para pruebas
const materials = [
    { name: 'CARBON', quantity: 1000 },
    { name: 'GRAFITO', quantity: 2000 },
    { name: 'LATON', quantity: 3000 },

];

listaElementos(materials);

const modificarCantidadMenuOpen = function () {
    btnagg.addEventListener('click', () => {
        addM.classList.add('active')
    })
}



