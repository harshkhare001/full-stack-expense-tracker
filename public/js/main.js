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
