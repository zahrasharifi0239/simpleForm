const form = document.getElementById("formData");
const tableBody = document.querySelector(".table-body");

let editingIndex = null;

const data = JSON.parse(localStorage.getItem("tableData") || "[]");
data.forEach(addRowToTable);

form.addEventListener("submit", (event) => {
  event.preventDefault();

  document.getElementById("name-error").innerHTML = "";
  document.getElementById("family-error").innerHTML = "";
  document.getElementById("score-error").innerHTML = "";

  const name = document.getElementById("name").value.trim();
  const family = document.getElementById("family").value.trim();
  const score = document.getElementById("score").value.trim();

  let isValid = true;

  if (!/^[a-zA-Z]+$/.test(name)) {
    document.getElementById("name-error").textContent =
      "Name should contain only letters (A-Z).";
    isValid = false;
  }

  if (!/^[a-zA-Z]+$/.test(family)) {
    document.getElementById("family-error").textContent =
      "Family should contain only letters (A-Z).";
    isValid = false;
  }

  if (isNaN(score) || score < 0 || score > 100) {
    document.getElementById("score-error").textContent =
      "Score must be a number between 0 and 100.";
    isValid = false;
  }

  if (isValid) {
    if (editingIndex === null) {
      const newRow = { name, family, score };
      data.push(newRow);
      localStorage.setItem("tableData", JSON.stringify(data));
      addRowToTable(newRow);
    } else {
      data[editingIndex] = { name, family, score };
      localStorage.setItem("tableData", JSON.stringify(data));

      tableBody.innerHTML = "";
      data.forEach(addRowToTable);
    }

    form.reset();
    document.getElementById("save").textContent = "Save";
    editingIndex = null;
  }
});

function addRowToTable(row, index) {
  const rowDiv = document.createElement("div");
  rowDiv.classList.add("table-row");

  ["name", "family", "score"].forEach((key) => {
    const cellDiv = document.createElement("div");
    cellDiv.classList.add("table-cell");
    cellDiv.textContent = row[key];
    rowDiv.appendChild(cellDiv);
  });

  const actionCell = document.createElement("div");
  actionCell.classList.add("table-cell");

  const editButton = document.createElement("svg");
  editButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>
`;
  editButton.addEventListener("click", () => editRow(row, index));

  const deleteButton = document.createElement("svg");
  deleteButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>
`;
  deleteButton.addEventListener("click", () => deleteRow(row, index));

  actionCell.appendChild(editButton);
  actionCell.appendChild(deleteButton);
  rowDiv.appendChild(actionCell);

  tableBody.appendChild(rowDiv);
}

function editRow(row, index) {
  document.getElementById("name").value = row.name;
  document.getElementById("family").value = row.family;
  document.getElementById("score").value = row.score;

  document.getElementById("save").textContent = "Update";

  editingIndex = index;
}

function deleteRow(row, index) {
  if (confirm("Are you sure you want to delete this row?")) {
    data.splice(index, 1);
    localStorage.setItem("tableData", JSON.stringify(data));

    tableBody.innerHTML = "";
    data.forEach(addRowToTable);
  }
}
