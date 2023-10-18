var form = document.getElementById("form");

var list = document.getElementById("list");

async function renderList() {

  try {
    const expenses = await axios.get("http://localhost:3000/expenses");
    expenses.data.forEach((expense) => {

      var li = document.createElement("li");
      var deleteBtn = document.createElement("button");
      var editBtn = document.createElement("button");

      li.className = "items";
      deleteBtn.className = "delete btn btn-dark";

      editBtn.id = expense.id;
      deleteBtn.id = expense.id;
      deleteBtn.appendChild(document.createTextNode("Delete"));
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
      list.appendChild(li);
    });
  } catch (e) {
    console.log(e);
  }
}
window.addEventListener("DOMContentLoaded", () => {
  renderList();
});

async function del(e) {
  if (e.target.classList.contains("delete")) {
    var li = e.target.parentElement;
    let id = e.target.id;
    await axios.get(`http://localhost:3000/deleteExpense/${id}`);
    list.removeChild(li);
  }
}

list.addEventListener("click", (e) => {
  del(e);
});
