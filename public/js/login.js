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
        console.log(res.data.message);
        if(res.data.message === 'Login Successful!')
        {
            alert(res.data.message);
            window.location.href = "expense";
        }
        else if(res.data.message === 'Incorrect Password')
        {
            alert('Incorrect password')
        }
    }
    catch(e){
        console.log(e);
    }
}
