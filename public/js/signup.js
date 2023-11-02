var form  = document.getElementById('signupForm');

var name = document.querySelector('#name');
var email = document.querySelector('#email');
var password = document.querySelector('#password');

var errcontainer = document.getElementById('err')

form.addEventListener('submit', signup);

async function signup(e){
    e.preventDefault();
    const user = {
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value,
    };
    try {
            let res;
            res = await axios.post("http://localhost:3000/adduser", user);
            console.log(res);
        } 
        catch (e) {
            const  p = document.createElement('p');
            p.appendChild(document.createTextNode('User already exists'));
            errcontainer.appendChild(p);
            console.log(e);

      }
}