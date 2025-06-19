function crearUsuario(e) {
    e.preventDefault();
    const usuario = document.getElementById('user').value;
    const correo = document.getElementById('correo').value;
    const password = document.getElementById('contrasena').value;
    const confirmarPassword = document.getElementById('confirmar-password').value;
    const userRegex = /^[a-zA-Z0-9_]{3,15}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let mensajes = []
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    if (usuario === '' || correo === '' || password === '' || confirmarPassword === '') {
        alert('Por favor, completa todos los campos.');
    }
    if (!userRegex.test(usuario)) {
        mensajes.push('usuario invalido');
    }
    if (!emailRegex.test(correo)) {
        mensajes.push('correo invalido');
    }
    if(password !== confirmarPassword) {
        mensajes.push('Las contraseñas no coinciden');
    } 
    if (mensajes.length === 0) {
        usuarios.push({
            user: usuario,
            correo: correo,
            password: password
        });
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        window.location.href = './iniciarSesion.html';
    } else {
        document.getElementById('mensajes').innerHTML = mensajes.map(mensaje => `<p class="text-red-500">${mensaje}</p>`).join('');
    }
}

function iniciarSesion(e){
    e.preventDefault();
    const usuario = document.getElementById('username').value
    const password = document.getElementById('password').value

    if (usuario === '' || password === '') {
        alert('Por favor, completa todos los campos.');
        return;
    }
    let usuarios = JSON.parse(localStorage.getItem('usuarios'));
    const usuarioEncontrado = usuarios.find(u => u.user === usuario && u.password === password);
    if(usuarioEncontrado){

        setTimeout(() => {
    window.location.href = './personajes.html';
}, 500);
    } else {
        alert('Usuario o contraseña incorrectos');
    }
}


addEventListener('submit', (e) => {
    if (e.target.id === 'registro-form') {
        crearUsuario(e);
    }

    else if (e.target.id === 'login-form') {
        iniciarSesion(e);
    }
});