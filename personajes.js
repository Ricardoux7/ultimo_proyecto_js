async function cargarPersonajes() { fetch('https://rickandmortyapi.com/api/character').then(response => {
    return response.json();
})

.then(data =>{
    if (data && data.results) {
        document.getElementById('personajes').innerHTML = data.results.map(personaje =>{
            return `<div class="bg-[rgba(255,255,255,0.3)] border-[#0FAB83] border-[5px] p-4 rounded-lg shadow-md hover:transition-transform hover:scale-105 hover:duration-500">
                <button class="flex justify-end ml-auto" class="flex justify-end ml-auto" onclick="agregarFavorito(event)" data-id="${personaje.id}" data-name="${personaje.name}" data-image="${personaje.image}" data-fav="${personaje.favoritos}"><img src="./Icons/heart2.svg" class="w-[30px]" name="addFav"></button>
                <img src="${personaje.image}" alt="${personaje.name}" class="w-full h-auto rounded-t-lg">
                <h2 class="text-xl font-semibold mt-2">${personaje.name}</h2>
            </div>`;
        }).join('');
    }
})
.catch(error => {
    console.error('Error al cargar los datos:', error);
})
}

cargarPersonajes()