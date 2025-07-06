let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

function agregarFavorito(event) {
    const button = event.currentTarget;
    const personaje = {
        id: button.dataset.id,
        name: button.dataset.name,
        image: button.dataset.image,
    };
        if (!favoritos.some(p => p.id === personaje.id)) {
            let usuario = JSON.parse(localStorage.getItem('usuario'));
            usuario.favoritos.push(personaje);
            localStorage.setItem('favoritos', JSON.stringify(usuario.favoritos));
            localStorage.setItem('usuario', JSON.stringify(usuario));
            const contenedor = document.createElement('div');
            contenedor.class= 'bg-white p-4 rounded-lg shadow-md hover:transition-transform hover:scale-105 hover:duration-500';
            contenedor.innerHTML = `
            <img src="${personaje.image}" alt="${personaje.name}" class="w-full h-auto rounded-t-lg">
            <h2 class="text-xl font-semibold mt-2">${personaje.name}</h2>
            `;
            const mostrar = document.getElementById('favoritos-container')
            mostrar.appendChild(contenedor);
            alert(`${personaje.name} añadido a favoritos!`);
        } else {
            alert(`${personaje.name} ya está en favoritos.`);
        }
}
function eliminarFavorito(event){
        event.preventDefault()
        const usuarios = JSON.parse(localStorage.getItem("usuarios"))
        const usuarioActual = localStorage.getItem("currentUser")
        const personaje = event.currentTarget.dataset.id
        const index = usuarios.findIndex(p => p.user === usuarioActual)
        
}