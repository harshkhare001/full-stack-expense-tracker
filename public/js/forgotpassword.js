var form = document.getElementById('forgotpasswordform');

var email = document.querySelector("#email");

form.addEventListener('submit',async function (e)
{
    e.preventDefault();
    const credential = 
    {
        email : e.target.email.value
    }
    try
    {
        const res = await axios.post("http://3.110.158.191:3000/password/forgotpassword", credential);
        document.getElementById('email-message').innerText = res.data.message;
        document.getElementById('email').value = '';
        console.log(res);
    }
    catch(err)
    {
        console.log(err);
    }
})
