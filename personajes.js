fetch('https://rickandmortyapi.com/api/character').then(response => {
    return response.json();
})

.then(data =>{
    if (data && data.results) {
        document.getElementById('personajes').innerHTML = data.results.map(personaje =>{
            return `<div class="bg-white p-4 rounded-lg shadow-md hover:transition-transform hover:scale-105 hover:duration-500">
                <button class="flex justify-end ml-auto" onclick="agregarFavorito(personaje)"><img src="./Icons/heart2.svg" class="w-[30px]" name="addFav"></button>
                <img src="${personaje.image}" alt="${personaje.name}" class="w-full h-auto rounded-t-lg">
                <h2 class="text-xl font-semibold mt-2">${personaje.name}</h2>
            </div>`;
        }).join('');
    }
})
.catch(error => {
    console.error('Error al cargar los datos:', error);
})

let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

function agregarFavorito(personaje){
    if(!favoritos.some(p => p.id === personaje.id)){
        favoritos.push(personaje);
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
        const contenedor = document.createElement('div');
        contenedor.classList.add('bg-white', 'p-4', 'rounded-lg', 'shadow-md', 'hover:transition-transform', 'hover:scale-105', 'hover:duration-500');
        contenedor.innerHTML = `
        <img src="${personaje.image}" alt="${personaje.name}" class="w-full h-auto rounded-t-lg">
        <h2 class="text-xl font-semibold mt-2">${personaje.name}</h2>
        `;
        favoritos.appendChild(contenedor);
    }
    else{
        alert(`${personaje.name} ya está en tus favoritos.`);
    }

}