const table1 = document.getElementById('monthly-table');
const table2 = document.getElementById('Year-table');
const table_container = document.getElementById('totalExpenseContainer');
const table_container2 = document.getElementById('totalExpenseYearly')

const Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

window.addEventListener("DOMContentLoaded", () => {
    renderList();
  });

async function renderList()
{
    const token = localStorage.getItem("token");
    const response = await axios.get("http://43.205.102.27:3000/getexpenses",{ headers: { Authorization: token }});
    //console.log(response);
    if(response.status === 202)
    {
        alert(response.data.message);
        window.location.href = 'expense';
    }
    else
    {
        let total = 0;
        let yearTotal = 0;
        const d= new Date();
        let year = d.getFullYear();
        response.data.forEach((expense)=>
        {
            var date = new Date(expense.createdAt);
            date.toString();
            if(date.getMonth() === d.getMonth())
            {
                total+=expense.amount;
                var tr = document.createElement("tr");
                tr.innerHTML = `<td>${date}</td>
                            <td>${expense.name}</td>
                            <td>${expense.expense}</td>
                            <td>₹ ${expense.amount}</td>`
                table1.appendChild(tr);
            }
        })
        let monthExpense = [0,0,0,0,0,0,0,0,0,0,0,0];
        response.data.forEach((expense)=>
        {
            var date = new Date(expense.createdAt);
            date.toString();
            if(year === date.getFullYear())
            {
                monthExpense[date.getMonth()]+=expense.amount;
                yearTotal+=expense.amount;
            }
        })
        
        for(var i = 0; i < 12; i++)
        {
            if(monthExpense[i]>0)
            {
                var tr = document.createElement("tr");
                tr.innerHTML = `<td>${Months[i]}, ${year}</td>
                                <td>₹ ${monthExpense[i]}</td>`
                table2.appendChild(tr);
            }
        }
        var p = document.createElement('p');
        p.id = 'total1';
        p.appendChild(document.createTextNode(`Total Expense: ₹ ${total}`));
        table_container.appendChild(p);

        var p1 = document.createElement('p');
        p1.id = 'total2';
        p1.appendChild(document.createTextNode(`Total Expense: ₹ ${yearTotal}`))
        table_container2.appendChild(p1);
    }
    
}

const download = document.getElementById('download-file');

download.addEventListener('click', async (e)=>{
    e.preventDefault();
    const token = localStorage.getItem("token");
    const response = await axios.get("http://43.205.102.27:3000/download",{headers : { Authorization: token }})
    if(response.status === 200)
    {
        var a = document.createElement('a');
        a.href = response.data.fileUrl;
        a.download = "myexpense.csv";
        a.click();
    }
})
