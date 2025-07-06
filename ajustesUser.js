function editarUsuario(){
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioActual = localStorage.getItem('currentUser');
    const usuario = usuarios.find(u => u.user === usuarioActual);
    document.getElementById('ajustesNombre').value = usuario.user
    document.getElementById('ajustesEmail').value = usuario.correo
    document.getElementById('ajustesTelefono').value = usuario.telefono

    document.addEventListener('click', (e)=>{
        if(e.target.name === 'editar' && e.target.type === 'button'){
            e.preventDefault();
            const input = e.target.closest('div').querySelector('input');
            input.disabled = !input.disabled;
            input.focus();

            
        }
    })

    const form = document.getElementById('formAjustes')
    form.addEventListener('submit', (e)=>{
        const nuevoUser = document.getElementById('ajustesNombre').value
        const nuevoCorreo = document.getElementById('ajustesEmail').value
        const nuevoTelefono = document.getElementById('ajustesTelefono').value
        //const nuevaPassword = document.getElementById('ajustesPassword'.value)
        //const nuevaConfirmarPassword = document.getElementById('ajustesConfirmarPassword').value

        const index = usuarios.findIndex(u => u.user === usuarioActual);
        if (
            nuevoUser === usuario.user &&
            nuevoCorreo === usuario.correo &&
            nuevoTelefono === usuario.telefono
            ) {
                alert('No hiciste ningún cambio.');
                e.preventDefault();
            }
        if (index !== -1) {
            usuarios[index].user = nuevoUser;
            usuarios[index].correo = nuevoCorreo;
            usuarios[index].telefono = nuevoTelefono;
            /*usuarios[index].password = nuevaPassword;
            usuarios[index].confirmarPassword = nuevaConfirmarPassword;
            if (nuevaPassword !== nuevaConfirmarPassword) {
                alert('Las contraseñas no coinciden.');
                e.preventDefault();
                return;
            }*/
            localStorage.setItem('usuarios', JSON.stringify(usuarios))
            localStorage.setItem('currentUser', nuevoUser);
            alert('datos actualizados')
            e.preventDefault()
            const inputs = document.querySelectorAll('input');
            inputs.forEach((input => {
                input.disabled = true
            }))
        }
    })
}

editarUsuario()

