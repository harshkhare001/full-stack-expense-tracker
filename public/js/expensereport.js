const table1 = document.getElementById('monthly-table');
const table2 = document.getElementById('Year-table');
const table_container = document.getElementById('totalExpenseContainer');

const Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

window.addEventListener("DOMContentLoaded", () => {
    renderList();
  });

async function renderList()
{
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:3000/getexpenses",{ headers: { Authorization: token }});
    console.log(response);
    let total = 0;
    const d= new Date();
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
                        <td>${expense.amount}</td>`
            table1.appendChild(tr);
        }
        console.log(Months[d.getMonth()]);
        
    })
    var p = document.createElement('p');
    p.id = 'total1';
    p.appendChild(document.createTextNode(`Total Expense: ${total}`));
    table_container.appendChild(p);
}