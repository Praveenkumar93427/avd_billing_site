/* Bill Info */
function generateBillNo(){
    return "AVD-" + Date.now();
  }
  
  document.getElementById("billNo").innerText = generateBillNo();
  document.getElementById("billDate").innerText =
    new Date().toLocaleDateString();
  
  /* Machines */
  const machines = [
    {name:'Drilling Machine',price:150},
    {name:'Drilling machine +Hole Bit',price:200},
    {name:'auger machine',price:1000},
    {name:'11kg Breaker',price:800},
    {name:'7kg Breaker',price:500},
    {name:'5kg Breaker',price:450},
    {name:'Welding Machine',price:200},
    {name:'Screw Machine',price:100},
    {name:'Marble Cutter / wood cutter',price:150},
    {name:'Wall Cutter',price:100},
    {name:'Wall Cutter 7 Inch',price:150},
    {name:'Big Cutting Machine',price:200},
    {name:'Patti Mixer',price:150},
    {name:'Patti Sander',price:500},
    {name:'Vibrator Small',price:200},
    {name:'Vibrator Big',price:250},
    {name:'1 HP Motor',price:400},
    {name:'2 HP Motor',price:800},
    {name:'Sledge Motor',price:900},
    {name:'Petrol Engine',price:1000},
    {name:'2 Feet Manual Cutter',price:150},
    {name:'4 Feet Manual Cutter',price:250},
    {name:'Ladder 10 Feet',price:100},
    {name:'Ladder 12 Feet',price:100},
    {name:'Ladder 15 Feet',price:100},
    {name:'Ladder 20 Feet',price:150},
    {name:'4/5 Feet Kudhirai',price:100},
    {name:'7 Feet Kudhirai',price:150},
    {name:'8 Feet Kudhirai',price:200},
    {name:'10 Feet Kudhirai',price:250},
    {name:'7 Feet Mattapalagai',price:40},
    {name:'5/6 Feet Mattapalagai',price:30}
  ];
  
  const list = document.getElementById("machineList");
  
  machines.forEach(m=>{
    list.innerHTML += `
      <tr class="machine-row" data-name="${m.name.toLowerCase()}">
        <td><input type="checkbox" data-name="${m.name}" value="${m.price}"></td>
        <td>${m.name}</td>
        <td>${m.price}</td>
      </tr>
    `;
  });
  
  /* Search */
  function filterMachines(){
    const v = document.getElementById("searchMachine").value.toLowerCase().trim();
    document.querySelectorAll(".machine-row").forEach(r=>{
      r.style.display = v && r.dataset.name.includes(v)
        ? "table-row"
        : "none";
    });
  }
  
  /* Generate Bill */
  function generateBill(){
    document.getElementById("billNo").innerText = generateBillNo();
  
    const days = Number(document.getElementById("days").value);
    let total = 0;
    let rows = "";
  
    document.querySelectorAll("#machineList input:checked").forEach(cb=>{
      const amt = Number(cb.value) * days;
      total += amt;
      rows += `<tr><td>${cb.dataset.name}</td><td>₹${amt}</td></tr>`;
    });
  
    if(total === 0){
      alert("Please select at least one machine");
      return;
    }
  
    document.getElementById("selectedTable").innerHTML =
      "<tr><th>Machine</th><th>Amount</th></tr>" + rows;
  
    document.getElementById("total").innerText = "Total: ₹ " + total;
    document.getElementById("billArea").style.display = "block";
  
    saveHistory(total);
  }
  
  /* Save History */
  function saveHistory(amount){
    let history = JSON.parse(localStorage.getItem("bills")) || [];
    history.push({ date:new Date().toISOString(), amount });
    localStorage.setItem("bills", JSON.stringify(history));
  }
  
  /* Toggle History */
  function toggleHistory(){
    const box = document.getElementById("historyBox");
    box.style.display = box.style.display === "block" ? "none" : "block";
  
    const list = document.getElementById("historyList");
    list.innerHTML = "";
  
    (JSON.parse(localStorage.getItem("bills")) || [])
      .slice(-10).reverse()
      .forEach(b=>{
        list.innerHTML +=
          `<li>${new Date(b.date).toLocaleDateString()} - ₹${b.amount}</li>`;
      });
  }
  
  /* Monthly Income */
  function monthlyIncome(){
    let sum = 0;
    (JSON.parse(localStorage.getItem("bills")) || []).forEach(b=>{
      if((new Date() - new Date(b.date)) <= 30*24*60*60*1000){
        sum += b.amount;
      }
    });
    alert("Last 1 Month Income: ₹ " + sum);
  }
  