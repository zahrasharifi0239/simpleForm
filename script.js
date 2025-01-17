const form = document.getElementById("formData");
const table = document.getElementById("tableData");

const data = JSON.parse(localStorage.getItem("tableData") || "[]");
data.forEach(addRowToTable);

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const family = document.getElementById("family").value.trim();
  const score = document.getElementById("score").value.trim();

  const newRow = { name, family, score };
  data.push(newRow);
  localStorage.setItem("tableData", JSON.stringify(data));

  addRowToTable(newRow);
  form.reset();
});

function addRowToTable(row) {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${row.name}</td>
    <td>${row.family}</td>
    <td>${row.score}</td>
  `;
  table.appendChild(tr);
}
