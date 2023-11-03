var form = document.getElementById('loginForm');

form.addEventListener('submit', login);

var email = document.querySelector("#email");
var password = document.querySelector("#password");

async function login(e){
    e.preventDefault();
    const users = {
        email : e.target.email.value,
        password : e.target.password.value
    };
    try{
        const res = await axios.post("http://localhost:3000/login", users);
        console.log(res);
    }
    catch(e){
        console.log(e);
    }
}