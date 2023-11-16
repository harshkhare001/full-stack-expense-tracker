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
        const res = await axios.post("http://65.0.87.252:3000/login", users);
        console.log(res.data.message);
        if(res.data.message === 'Login Successful!')
        {
            alert(res.data.message);
            localStorage.setItem("token", res.data.token)
            window.location.href = "expense";
        }
    }
    catch(e){
        console.log(e.message);
        if(e.message === 'Request failed with status code 401')
        {
            alert('Incorrect Password')
        }
        else{
            alert('User does not exist');
        }

    }
}
