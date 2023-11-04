var form = document.getElementById("form");

var list = document.getElementById("list");

form.addEventListener('submit', addItem);

async function addItem(e){
  e.preventDefault();
  var name = document.getElementById('name').value;
  var amount = document.getElementById('amount').value;
  var category = document.getElementById('expense').value;

  try
  {
    const token = localStorage.getItem("token");
    let expense = {
      name: name,
      amount: amount,
      expense: category
    }
    await axios.post("http://localhost:3000/addExpense",expense,{headers: {Authorization : token}});
    window.location.reload();
  }
  catch(err)
  {
    console.log(err);
  }

}

async function renderList() {

  try {
    const token = localStorage.getItem("token");
    const expenses = await axios.get("http://localhost:3000/expenses",{ headers: { Authorization: token }});
    expenses.data.forEach((expense) => {

      var li = document.createElement("li");
      var deleteBtn = document.createElement("button");
      var editBtn = document.createElement("button");

      li.className = "items";
      deleteBtn.className = "delete btn btn-dark";
      editBtn.className = "edit btn btn-info"
      editBtn.id = expense.id;
      deleteBtn.id = expense.id;
      deleteBtn.appendChild(document.createTextNode("Delete Expense"));
      editBtn.appendChild(document.createTextNode("Edit"));
      let span1 = document.createElement("span");
      span1.textContent = `${expense.name}  `;
      let span2 = document.createElement("span");
      span2.textContent = `${expense.amount}  `;
      let span3 = document.createElement("span");
      span3.textContent = `${expense.expense} `;
      li.appendChild(span1);
      li.appendChild(span2);
      li.appendChild(span3);
      li.appendChild(deleteBtn);
      //li.appendChild(editBtn);
      list.appendChild(li);
    });
  } catch (e) {
    console.log(e);
  }
}
window.addEventListener("DOMContentLoaded", () => {
  renderList();
});



list.addEventListener("click", async function del(e){
  e.preventDefault();
  if (e.target.classList.contains("delete")) {
    var li = e.target.parentElement;
    let id = e.target.id;
    await axios.get(`http://localhost:3000/deleteExpense/${id}`);
    list.removeChild(li);
  }
  else if(e.target.classList.contains("edit")){
    
  }
});


document.getElementById('rzp-button-1').onclick = async function (e)
{
  const token = localStorage.getItem('token');
  const response = await axios.get('http://localhost:3000/prememiumuser',{headers: {Authorization:token}});
  console.log(response);
  var options = 
  {
    key: response.data.key_id,
    order_id: response.data.order.id, 
    handler: async function (response){
      const data1 = await axios.post('http://localhost:3000/updatetransaction',
        {
          order_id : options.order_id,
          payment_id : response.razorpay_payment_id,
        },
        {
          headers: {Authorization:token}
        }  
      )
      alert('You are a premium user!');
    }
  }
  const rzp1= new Razorpay(options);
  rzp1.open();
  e.preventDefault();

  rzp1.on('payment.failed', function (response){
    console.log(response);
    alert('somthing went wrong');
  })
}
