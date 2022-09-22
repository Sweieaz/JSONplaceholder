'use strict';

let pageSize = 10;
let currentPage = 1;
let postData = [];

const renderTable = function () {
  postData.map((row, index) => {
    const start = (currentPage - 1) * pageSize;
    const end = currentPage * pageSize;

    if (index >= start && index < end) return true;
    console.log(postData);
  });
};
renderTable();

const request = async function () {
  await fetch('https://jsonplaceholder.typicode.com/posts')
    .then(function (response) {
      return response.json();
    })
    .then(function (postData) {
      console.log(postData);
      let placeholder = document.querySelector('#data');
      let tableData = '';

      for (let product of postData) {
        tableData += `
            <tr>
                <td>${product.title}</td>
                <td>${product.body}</td>
                <td>458</td>
                <td>Leanne Graham</td>
            </tr>
     
            `;
      }

      placeholder.innerHTML = tableData;
    });
};
request();

// postData.map((row, index) => {
//   const start = (currentPage - 1) * pageSize;
//   const end = currentPage * pageSize;

//   if (index >= start && index < end) return true;
//   console.log(postData);
// });
