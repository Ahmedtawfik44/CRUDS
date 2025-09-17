let product_name = document.getElementById("product");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let category = document.getElementById("category");
let count = document.getElementById("count");
let submit = document.getElementById("submit");
let table = document.querySelector("table tbody");
let delete_btn = document.querySelector("#delete");
let search = document.querySelector('#search');
let s_product = document.querySelector('.s_product');
let s_category = document.querySelector('.s_category');
let data;
let tmp_id;

//Save in Local Storage

if (localStorage.product != null) {
  data = JSON.parse(localStorage.product);
} else {
  data = [];
}

//Get Total Price

function get_total() {
  if (price.value !== "") {
    let total_price =
      +price.value + +taxes.value + +ads.value - +discount.value;
    total.style.backgroundColor = "#040";
    total.innerHTML = total_price;
  } else {
    total.style.backgroundColor = "#a00d02";
    total.innerHTML = "";
  }
}

//Submit Even

submit.addEventListener("click", (e) => {

  e.preventDefault();
  let data_obj = {
    title: product_name.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };

  if (product_name.value.trim() != "" && price.value.trim() != "" && category.value.trim() != "" && count.value < 100) {
    if (submit.value === 'انشاء') {
      if (data_obj.count > 1) {
        for (let i = 0; i < data_obj.count; i++) {
          data.push(data_obj);
        }
      } else {
        data.push(data_obj);
      }
    }

    if (submit.value === 'تحديث') {
      data[tmp_id] = data_obj;
      submit.value = 'انشاء';
      count.style.display = 'block';
    }
    clear_data();
  } else {
    Swal.fire({
      icon: "error",
      title: "الشروط",
      text: "   يجب عليك ملئ حقل المنتج والسعر والفئه ويجب ان يكون العدد اقل من 100 والارقام يجب ان تكون مكتوبه بالانجليزي",
    });
  }

  localStorage.setItem("product", JSON.stringify(data));
  Show_data();
  get_total()
});

//Clear Data

function clear_data() {
  product_name.value = "";
  price.value = "";
  ads.value = "";
  taxes.value = "";
  discount.value = "";
  count.value = "";
  total.innerHTML = "";
  category.value = "";
}

//Show Data

function Show_data() {
  let temp = "";
  for (let i = 0; i < data.length; i++) {
    temp += `
           <tr id="row${i}">
            <td>${i + 1}</td>
            <td>${data[i].title}</td>
            <td>${data[i].price}</td>
            <td>${data[i].taxes}</td>
            <td>${data[i].ads}</td>
            <td>${data[i].discount}</td>
            <td>${data[i].total}</td>
            <td>${data[i].category}</td>
            <td>${data[i].total}</td>
            <td><button type="button" id="update" onclick="update_item(${i})">تحديث</button></td>
            <td><button id="delete" onclick="delete_item(${i})">حذف</button></td>
           </tr>
            `;
  }
  table.innerHTML = temp;

  let delete_all = document.querySelector("#delete_all");
  if (data.length > 0) {
    delete_all.innerHTML = `<input onclick="delete_All_product()" class="all"  type="submit" value=" حذف الكل (${data.length})">`;
  } else {
    delete_all.innerHTML = "";
  }
}

Show_data();

//Delete Item

function delete_item(i) {
  data.splice(i, 1);
  localStorage.product = JSON.stringify(data);
  Show_data();
}

//Delete All

function delete_All_product() {
  data = [];
  localStorage.clear();
}

// Update
function update_item(i) {
  product_name.value = data[i].title;
  price.value = data[i].price;
  taxes.value = data[i].taxes;
  ads.value = data[i].ads;
  discount.value = data[i].discount;
  get_total();
  category.value = data[i].category;
  count.style.display = 'none';
  submit.value = 'تحديث';
  tmp_id = i;

  scroll({
    top: 0,
    behavior: "smooth",
  });

}

// Search

let search_mod = 'product';
function Search(id) {
  if (id === 'category') {
    search_mod = 'category';
    search.placeholder = "ابحث عن طريق الفئه";
  }
  if (id === 'product') {
    search_mod = 'product';
    search.placeholder = " ابحث عن طريق المنتج";
  }

  search.focus();
  search.value = "";
  data.forEach((e, i) => document.querySelector(`#row${i}`).style.display = 'table-row');
}


function searchData(v) {
  data.forEach((e, i) => document.querySelector(`#row${i}`).style.display = 'none');
  for (let i = 0; i < data.length; i++) {
    if (search_mod === 'product') {
      if (data[i].title.toLowerCase().includes(v.toLowerCase())) {
            document.querySelector(`#row${i}`).style.display = 'table-row';
      }
    }
   else {
    if (data[i].category.toLowerCase().includes(v.toLowerCase())) {
          document.querySelector(`#row${i}`).style.display = 'table-row';
    }
  }
}
}
