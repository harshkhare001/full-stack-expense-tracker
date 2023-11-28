var form = document.getElementById("form");
var list = document.getElementById("list");
var list1 = document.getElementById("list1");
const paganation = document.getElementById('buttons-paganating');

//adding expense for a pirticular user
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
    await axios.post("http://65.1.136.178:3000/addExpense",expense,{ headers: {Authorization : token}});
    window.location.reload();
  }
  catch(err)
  {
    console.log(err);
  }

}


//getting all the expenses for the logged in user
async function renderList() {

  try {
    const token = localStorage.getItem("token");
    const decoded = parseJwt(token);
    const page = 1;
    const limit = localStorage.getItem("limit");
    //console.log(decoded);
    if(decoded.ispremiumuser){
      showPremiumUserMessage();
    }
    const res = await axios.get(`http://65.1.136.178:3000/expenses?page=${page}&limit=${limit}`,{ headers: { Authorization: token }});
    printList(res.data.expense);
    showPagation(res.data);
    
  } catch (e) {
    console.log(e);
  }
}

function printList(expenses)
{
  list.innerHTML =``;
  expenses.forEach((expense) => {

    var li = document.createElement("li");
    var deleteBtn = document.createElement("button");
    var editBtn = document.createElement("button");

    li.className = "items";
    deleteBtn.className = "delete btn btn-dark";
    editBtn.className = "edit btn btn-info"
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
    //li.appendChild(editBtn);
    list.appendChild(li);
  });
}

function showPagation({currentPage, hasNextPage, nextPage, hasPreviousPage, previousPage, lastPage})
{
  paganation.innerHTML =``;
  const limit = localStorage.getItem("limit");
  if(hasPreviousPage)
  {
    const btn2 = document.createElement('button');
    btn2.innerHTML = `${previousPage}`
    btn2.addEventListener('click', ()=>getExpenses(previousPage, limit));
    paganation.appendChild(btn2)
  }

  const btn1 = document.createElement('button');
  btn1.innerHTML =`${currentPage}`
  btn1.addEventListener('click', ()=>getExpenses(currentPage, limit));
  paganation.appendChild(btn1);

  if(hasNextPage)
  {
    const btn3 = document.createElement('button');
    btn3.innerHTML = `${nextPage}`
    btn3.addEventListener('click', ()=>getExpenses(nextPage, limit));
    paganation.appendChild(btn3)
  }
}

async function getExpenses(page, limit)
{
  paganation.innerHTML =``;
  const token = localStorage.getItem("token");
  const res = await axios.get(`http://65.1.136.178:3000/expenses?page=${page}&limit=${limit}`,{ headers: { Authorization: token }});
  printList(res.data.expense);
  showPagation(res.data);
}

const linesButton = document.getElementById('linesToShow');

linesButton.addEventListener('click',(e)=>{
  const lines = document.getElementById('lines').value;
  console.log(lines);
  localStorage.setItem("limit",lines);
  renderList();
})

window.addEventListener("DOMContentLoaded", () => {
  renderList();
});

//decode the jwt token to check for premium user
function parseJwt (token)
{
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}

//check if user is premium or not

function showPremiumUserMessage()
{
  document.getElementById('rzp-button-1').style.visibility = "hidden";
  document.getElementById('show-report').style.visibility = "visible";
  document.getElementById('premium-message').innerHTML = "Premium User ♛";
  document.getElementById('lead-button').style.visibility = "visible";
}


//delete expenses from the database
list.addEventListener("click", async function del(e){
  e.preventDefault();
  if (e.target.classList.contains("delete")) {
    var li = e.target.parentElement;
    let id = e.target.id;
    await axios.get(`http://65.1.136.178:3000/deleteExpense/${id}`);
    list.removeChild(li);
  }
  else if(e.target.classList.contains("edit")){
    
  }
});

//payment gateway
document.getElementById('rzp-button-1').onclick = async function (e)
{
  const token = localStorage.getItem('token');
  const response = await axios.get('http://65.1.136.178:3000/prememiumuser',{headers: {Authorization:token}});
  console.log(response);
  var options = 
  {
    key: response.data.key_id,
    order_id: response.data.order.id, 
    handler: async function (response){
      const res = await axios.post('http://65.1.136.178.191:3000/updatetransaction',
        {
          order_id : options.order_id,
          payment_id : response.razorpay_payment_id,
        },
        {
          headers: {Authorization:token}
        }  
      )
      alert('You are a premium user!');
      document.getElementById('rzp-button-1').style.visibility = "hidden";
      document.getElementById('premium-message').innerHTML = "Premium User ♛";
      document.getElementById('lead-button').style.visibility = "visible";
      document.getElementById('show-report').style.visibility = "visible";
      localStorage.setItem('token', res.data.token);
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


//logout function
document.getElementById('logout').onclick = function(e){
  e.preventDefault;
  localStorage.removeItem('token');
  localStorage.removeItem('limit');
  //window.location.reload();
  window.location.href= "login";
}

//adding leaderboard

document.getElementById('lead-button').onclick = async function(e)
{
  document.getElementById('leaderboard').style.visibility = "visible";
  let table = document.getElementById('leader-table-body');
  table.innerHTML=``;
  const token = localStorage.getItem('token');
  const response = await axios.get("http://65.1.136.178:3000/premium/getleaders",{ headers : { Authorization : token }});
  console.log(response);
  
  response.data.forEach((lead)=>
  {
    var tr = document.createElement("tr");
    tr.innerHTML = `<td>${lead.name}</td><td>₹${lead.totalExpense}</td>`;
    table.appendChild(tr);
  })
}

//navigate to expense report page

document.getElementById('show-report').addEventListener('click',()=>{
  window.location.href = "expensereport";
})
