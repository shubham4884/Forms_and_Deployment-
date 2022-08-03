fetch(`http://localhost:4000/get-author`)
  .then((data) => data.json())
  .then((data) => display(data));

function deleteFunction(id) {
  fetch("http://localhost:4000/delete-author/" + id, {
    method: "DELETE",
  })
    .then((res) => res.text())
    .then((res) => console.log(res));
}

function display(datas) {
  console.log(datas);
  let list = document.getElementById("author-data");
  list.innerHTML = "";
  for (let i = 0; i < datas.length; i++) {
    deleteId = datas[i]._id;

    // console.log(deleteId);
    const row = document.createElement("tr");
    row.innerHTML = `<td>${datas[i].firstName}</td> <td>${datas[i].lastName}</td>  <td>${datas[i].dob}</td> <td> <button onclick="deleteFunction('${deleteId}')">Delete</button> </td> `;
    list.appendChild(row);
  }
}

fetch(`http://localhost:4000/get-book`)
  .then((data) => data.json())
  .then((data) => nnn(data));

function deleteFunction(id) {
  fetch("http://localhost:4000/delete-book/" + id, {
    method: "DELETE",
  })
    .then((res) => res.text())
    .then((res) => console.log(res));
}

function nnn(datas) {
  console.log(datas);
  let list = document.getElementById("book-data");
  list.innerHTML = "";
  for (let i = 0; i < datas.length; i++) {
    deleteId = datas[i]._id;

    // console.log(deleteId);
    const row = document.createElement("tr");
    row.innerHTML = `<td>${datas[i].title}</td> <td>${datas[i].author}</td>  <td>${datas[i].summary}</td>  <td> <button onclick="deleteFunction('${deleteId}')">Delete</button> </td> `;
    list.appendChild(row);
  }
}
