const container = document.querySelector('.material-container');
const btnnew = document.querySelector('.new')
const btnagg = document.querySelector('.add')
const btndel = document.querySelector('.del')
const menuNewM = document.getElementById('newM')
const menuAddM = document.getElementById('addM')
const menuDelM = document.getElementById('delM')

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
    subtitulo.textContent = 'TOTAL'

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

    //ERROR: Pone la imagen como obligatoria, y hasta que no se ponga no hara nada
}

// Add event listener para cambiar el evento del elemento imagenFinal
const imagenfinal = document.getElementById('archivo')
imagenfinal.addEventListener('change', capturarNuevoMaterial, false);

// Funciones Lista
let selectedMaterial = null;
const setMaterialName = (material) => {
    selectedMaterial = material;
}
const listaElementos = function (materials) {
    const list = document.querySelector('.material-list');

    // Remueve elementos existentes de la lista
    while (list.firstChild) {
        list.removeChild(list.firstChild)
    }

    // Por cada material se crea un elemento
    materials.forEach((material) => {
        const li = document.createElement('li');
        li.textContent = material.name;
        li.classList.add('li-element')
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'material-radio';
        input.value = material.name;
        li.appendChild(input)

        // Cuando se de click, se ejecutara la funcion para mostrar cantidad
        li.addEventListener('click', () => {
            setMaterialName(material); // Establece el material seleccionado
            mostrarCantidad(material.quantity);
            mostrarElemento(material.name);
        });

        // Se agrega la li a la lista
        list.appendChild(li);
    })
    // Funcion que imprime en pantalla
    const mostrarCantidad = function (quantity) {
        document.getElementById('numMaterialLec').value = quantity;
    }
    const mostrarElemento = function (name) {
        document.getElementById('nameMaterialLec').value = name;
    }
}

const listaEliminar = function (materials) {
    const list = document.querySelector('#material-list');

    // Remueve elementos existentes de la lista
    while (list.firstChild) {
        list.removeChild(list.firstChild)
    }

    // Por cada material se crea un elemento
    materials.forEach((material) => {
        const li = document.createElement('li');
        li.textContent = material.name;
        li.classList.add('li-element')
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'material-radio';
        input.value = material.name;
        li.appendChild(input)

        // Cuando se de click, se ejecutara la funcion para mostrar cantidad
        li.addEventListener('click', () => {
            setMaterialName(material); // Establece el material seleccionado
            mostrarElemento(material.name);
        });

        // Se agrega la li a la lista
        list.appendChild(li);
    })
    // Funcion que imprime en pantalla
    const mostrarElemento = function (name) {
        document.querySelector('.nameMaterialLec').value = name;
    }
} //Exactamente igual que la anterior, pero con otras clases, lo hice pq la otra no se leia en el menu de eliminar

// Lista para pruebas
const materials = [
    { name: 'CARBON', quantity: 1000 },
    { name: 'GRAFITO', quantity: 2000 },
    { name: 'LATON', quantity: 3000 },

];

listaElementos(materials);
listaEliminar(materials);

// Funciones de Suma, Resta y Eliminar
const botonSuma = document.getElementById('btnsuma');
const botonResta = document.getElementById('btnresta')
const botonEliminar = document.getElementById('btnEliminar')
const cantModificar = document.getElementById('addles')

botonSuma.addEventListener("click", () => {
    if (!selectedMaterial) {
        alert("Ningún material seleccionado.");
        return;
    }

    const materialQuantity = parseInt(cantModificar.value);
    let materialIndex;

    materials.forEach((material, index) => {
        if (selectedMaterial.name === material.name) {
            materialIndex = index;
        }
    });

    materials[materialIndex].quantity += materialQuantity;

    const mostrarCantidad = function (quantity) {
        document.getElementById('numMaterialLec').value = quantity;
    }
    mostrarCantidad(materials[materialIndex].quantity)
    cantModificar.value = 0

});

botonResta.addEventListener("click", () => {
    if (!selectedMaterial) {
        alert("Ningún material seleccionado.");
        return;
    }

    const materialQuantity = parseInt(cantModificar.value);
    let materialIndex;

    materials.forEach((material, index) => {
        if (selectedMaterial.name === material.name) {
            materialIndex = index;
        }
    });

    materials[materialIndex].quantity -= materialQuantity;

    if (materials[materialIndex].quantity < 0) {
        materials[materialIndex].quantity = 0
    }

    const mostrarCantidad = function (quantity) {
        document.getElementById('numMaterialLec').value = quantity;
    }
    mostrarCantidad(materials[materialIndex].quantity)
    cantModificar.value = 0

});

botonEliminar.addEventListener("click", () => {
    if (!selectedMaterial) {
        alert("Ningún material seleccionado.");
        return;
    }

    const materialIndex = materials.findIndex(material => material.name === selectedMaterial.name);

    if (materialIndex !== -1) {
        materials.splice(materialIndex, 1);
    }

    // Actualiza las listas después de eliminar el material
    listaElementos(materials);
    listaEliminar(materials);

    // Reinicia el material seleccionado
    selectedMaterial = null;

    const mostrarElemento = function (name) {
        document.querySelector('.nameMaterialLec').value = name;
    }
    mostrarElemento('');

    const mostrarElemento2 = function (name) {
        document.getElementById('nameMaterialLec').value = name;
    }
    mostrarElemento2('');

    const mostrarCantidad = function (quantity) {
        document.getElementById('numMaterialLec').value = quantity;
    }
    mostrarCantidad('')
    

});

//Abrir y Cerrar Menus
const newMaterialMenuOpen = function () {
    btnnew.addEventListener('click', () => {
        menuNewM.classList.add('active')
    })
}

const modificarCantidadMenuOpen = function () {
    btnagg.addEventListener('click', () => {
        menuAddM.classList.add('active')
    })
}

const eliminarElementoMenuOpen = function () {
    btndel.addEventListener('click', () => {
        menuDelM.classList.add('active');
    })
}

const cerrar = function () {
    menuAddM.classList.remove('active')
    menuNewM.classList.remove('active')
    menuDelM.classList.remove('active')
}

//Cambiar Menu
const cambiarZona = document.querySelector('.cambio')
const main = document.querySelector('main')
cambiarZona.addEventListener('click', () => {
    cambiarZona.classList.toggle('activado')
    main.classList.toggle('movido')
})