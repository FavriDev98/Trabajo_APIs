// Variables control pag
let currentPage = 1;
const maxPage = 10;
const itemsPerPage = 15;

// Funcion obtener 15 elementos
async function obtenerPokemonRange(start, end) {
    const pokemonArray = [];

    for (let i = start; i <= end; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        pokemonArray.push(datos);
    }

    return pokemonArray;
}

// Funcion mostrar grilla
async function mostrarPokemon() {
    const start = (currentPage - 1) * itemsPerPage + 1;
    const end = currentPage * itemsPerPage;
    const pokemon = await obtenerPokemonRange(start, end);
    const gridContainer = document.getElementById("pokemon-grid");

    // Limpiar para actualizar
    gridContainer.innerHTML = '';

    pokemon.forEach((p, index) => {
        const gridItem = document.createElement("div");
        gridItem.className = "grid-item";

        const imagen = document.createElement("img");
        imagen.src = p.sprites.front_default;

        const nombre = document.createElement("p");
        nombre.textContent = `${start + index}. ${p.name}`;

        gridItem.appendChild(imagen);
        gridItem.appendChild(nombre);
        gridContainer.appendChild(gridItem);
    });
}

// Funcion anterior
function paginaAnterior() {
    if (currentPage > 1) {
        currentPage--;
        mostrarPokemon();
    }
}

// Funcion siguiente
function paginaSiguiente() {
    if (currentPage < maxPage) {
        currentPage++;
    }
    mostrarPokemon();
}

mostrarPokemon();