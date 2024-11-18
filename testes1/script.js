document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === "admin" && password === "1234") {
        document.getElementById('message').innerText = "Login realizado com sucesso!";
    } else {
        document.getElementById('message').innerText = "Credenciais inválidas!";
    }
});
