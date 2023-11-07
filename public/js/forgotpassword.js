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
        const res = await axios.post("http://localhost:3000/password/forgotpassword", credential);
        console.log(res);
    }
    catch(err)
    {
        console.log(err);
    }
})