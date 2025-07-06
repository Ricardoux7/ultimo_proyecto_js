function agregarFavorito(event) {
    event.preventDefault();
    const button = event.currentTarget;
    const personaje = {
        id: button.dataset.id,
        name: button.dataset.name,
        image: button.dataset.image,
    };
        
    let usuarioActual = localStorage.getItem('currentUser');
    if (localStorage.getItem('currentUser') === null) {
        alert('Por favor, inicia sesión para agregar favoritos.');
        return;
    }
    
    const usuarioActual1 = JSON.parse(localStorage.getItem('usuarios') || '[]')
    const index = usuarioActual1.findIndex(p => p.user === usuarioActual)
        if(index===-1){
            alert('usuario No encontrado')
            return
        }

        if (!usuarioActual1[index].favoritos) {
            usuarioActual1[index].favoritos = [];
        }
        
        if(!usuarioActual1[index].favoritos.some(p => p.id === personaje.id)){
            usuarioActual1[index].favoritos.push(personaje);
            localStorage.setItem('usuarios', JSON.stringify(usuarioActual1));
            const contenedor = document.createElement('div')
            contenedor.className = "bg-white p-4 rounded-lg shadow-md hover:transition-transform hover:scale-105 hover:duration-500"
            const rellenar = event.currentTarget.closest('button')
            rellenar.remove()
            contenedor.innerHTML = `
                <button class="absolute top-2 right-2" data-id="${personaje.id}" data-name="${personaje.name}" data-image="${personaje.image}" name="addFav">
                    <img src="./Icons/heart-filled.svg" class="w-[45px]">
                </button>
                <img src="${personaje.image}" alt="${personaje.name}" class="w-full h-auto rounded-t-lg">
                <h2 class="text-xl font-semibold mt-2">${personaje.name}</h2>
                `;
            alert(`${personaje.name} agregado a favoritos`)
            const mostrar = document.getElementById('favoritos-container')
            mostrar.appendChild(contenedor);
        }else {
            alert(`${personaje.name} ya está en favoritos.`);
        }
}

function renderizar(){
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]')
    const usuarioActual = localStorage.getItem('currentUser')
    const index = usuarios.findIndex(p=>p.user === usuarioActual)
    const contenedor = document.getElementById('favoritos-container')
    contenedor.innerHTML = ""

    if(index !== -1 && usuarios[index].favoritos){
        usuarios[index].favoritos.forEach(personaje=>{
            const div = document.createElement('div')
            div.className = `bg-[rgba(255,255,255,0.3)] rounded-lg shadow-md hover:transition-transform hover:scale-105 hover:duration-500 relative border-[5px] border-[#0FAB83]`
            div.innerHTML = `
                <div class="relative">
                    <img src="${personaje.image}" alt="${personaje.name}" class="w-full h-[40vh] mx-auto object-cover">
                    <button class="absolute top-2 right-2" data-id="${personaje.id}" data-name="${personaje.name}" data-image="${personaje.image}">
                        <img src="./Icons/heart-filled.svg" class="w-[45px]" name="UnaddFav">
                    </button>
                </div>
                <h2 class="text-xl font-semibold mt-2 py-2 pl-4 font-bold text-black">${personaje.name}</h2>
            `
            contenedor.appendChild(div)
        })
    } else{
        div.className = "rounded-lg shadow-md hover:transition-transform hover:scale-105 hover:duration-500 relative";
        contenedor.innerHTML = "<p class='text-center text-gray-500'>No tienes favoritos guardados.</p>"
    }
}

document.addEventListener('DOMContentLoaded', function() {
    renderizar();
});

document.addEventListener('click', function(e) {
    if (e.target.name === "UnaddFav") {
        const boton = e.target.closest('button');
        const personajeId = boton.dataset.id;
        const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
        const usuarioActual = localStorage.getItem('currentUser');
        const index = usuarios.findIndex(p => p.user === usuarioActual);

        if (index !== -1 && usuarios[index].favoritos) {
            const indexPersonaje = usuarios[index].favoritos.findIndex(p => p.id === personajeId);
            if (indexPersonaje !== -1) {
                const personaje = usuarios[index].favoritos[indexPersonaje];
                usuarios[index].favoritos.splice(indexPersonaje, 1);
                localStorage.setItem('usuarios', JSON.stringify(usuarios));
                alert(`${personaje.name} fue eliminado`);
                renderizar();
            }
        }
    }
});
