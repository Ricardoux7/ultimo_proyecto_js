function crearUsuario(e) {
    e.preventDefault();
    const usuario = (document.getElementById('user').value).trim();
    const correo = document.getElementById('correo').value;
    const password = document.getElementById('contrasena').value;
    const confirmarPassword = document.getElementById('confirmar-password').value;
    const telefono = document.getElementById('telefono').value;
    const userRegex = /^[a-zA-Z0-9_]{3,15}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const telefonoRegex = /^[09][0-9]{1,11}$/;
    let mensajes = []
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    if (usuario === '' || correo === '' || password === '' || confirmarPassword === '' || telefono === '') {
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
    if (!telefonoRegex.test(telefono)) {
        mensajes.push('Teléfono inválido');
    }
    if (mensajes.length === 0) {
        usuarios.push({
            user: usuario,
            correo: correo,
            password: password,
            telefono: telefono,
            favoritos: []
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
        localStorage.setItem('currentUser', usuario);
        setTimeout(() => {
            window.location.href = './personajes.html';
        }, 500);
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

function favoritos(){
    setTimeout(() => {
        if (!localStorage.getItem('currentUser')) {
            alert('Por favor, inicia sesión para acceder a los favoritos.');
        }else {
            window.location.href = './favoritos.html';
        }
    }, 500);
}

function perfil(){
    setTimeout(() =>{
        if (!localStorage.getItem('currentUser')) {
            alert('Por favor, inicia sesión para acceder a un perfil.');
        }else {
            window.location.href = './ajustesUser.html';
        }
    }, 500)
}

function salir() {
    setTimeout(()=> {
        if (!localStorage.getItem('currentUser')) {
            alert('No se puede accerder a esta opcion sin iniciar sesion.');
        }else {
            window.location.href = './iniciarSesion.html';
            localStorage.removeItem('currentUser');
        }
    },500)
}

function inicio(){
    setTimeout(() => {
        if (!localStorage.getItem('currentUser')) {
            alert('Por favor, inicia sesión para acceder a esta opción.');
        }else {
            window.location.href = './personajes.html';
        }
    }, 500);
}
