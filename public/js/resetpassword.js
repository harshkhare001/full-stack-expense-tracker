const form  = document.getElementById('resetpasswordform');

form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    console.log('working');
    const password = document.getElementById('psw').value;
    const cnfpassword = document.getElementById('cnf-psw').value;

    if(password!== cnfpassword)
    {
        window.alert('Password did not Match');
    }
    else{
        const uu_id = window.location.pathname.split('/').pop();
        console.log(uu_id);
        const data = {
            uu_id,
            password
        };
        try{
            const res = await axios.post('http://65.1.136.178:3000/password/resetpassword',data);
            console.log(res);
            window.alert(res.data.message);
        }
        catch(err)
        {
            console.log(err);
        }
    }
});



