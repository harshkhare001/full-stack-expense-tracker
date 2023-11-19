var form  = document.getElementById('signupForm');

var name = document.querySelector('#name');
var email = document.querySelector('#email');
var password = document.querySelector('#password');

var errContainer = document.getElementById('err');
var msgContainer = document.getElementById('msg')

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
            res = await axios.post("http://3.110.158.191:3000/signup", user)
            console.log(res);
            
            const  p = document.createElement('p');
            if(res.status===201)
            {
                p.appendChild(document.createTextNode(`${res.data.message}`));
                msgContainer.appendChild(p);
                msgContainer.style.color = 'green';
            }
            else
            {
                p.appendChild(document.createTextNode(`${res.data.message}`));
                msgContainer.appendChild(p);
                msgContainer.style.color = 'red';
            }
            
            document.querySelector('#name').value = '';
            document.querySelector('#email').value = '';
            document.querySelector('#password').value = '';
        } 
        catch (e)
        {
            console.log(e);
        }
}
