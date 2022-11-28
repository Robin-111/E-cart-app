// Store the items added to the cart into local-storage with key as cart.

/*
API:- https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products?limit=10&page=1
- Change the page number to implement pagination. (e.g. page=2)
- There are total 4 pages only.
*/

let allPromise = [];
let array = [];


let myarr = JSON.parse(localStorage.getItem("cart")) || [];
function showCart1() {
 
}
showCart1();

for (let i = 1; i <= 4; i++) {
  const url = `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products?limit=10&page=${i}`;
  let promise = fetch(url).then((res) => res.json());
  allPromise.push(promise);
}

let Data = async () => {
  try {
    let data = await Promise.all(allPromise);
    for (let i = 0; i < data.length; i++) {
      let result = data[i].data;
      array.push(...result);
      //   console.log(array);
      // render(array);
    }
  } catch (err) {
    console.log(err);
  }
};

Data();

let i = 1;
let getData = async (i) => {
  const url = `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products?limit=10&page=${i}`;
  let page = await fetch(url);
  page = await page.json();
  render(page.data);
};

getData(1);

let div = (el, index) => {
  let div = document.createElement("div");
  div.setAttribute("class", "item");
  let im = document.createElement("img");
  let t = document.createElement("h3");
  let cat = document.createElement("p");
  let pr = document.createElement("h3");
  let bt = document.createElement("button");
  bt.setAttribute("class", "add_to_cart");
  bt.addEventListener("click", function () {
    let myarr = JSON.parse(localStorage.getItem("cart")) || [];
    myarr.push(el);

    localStorage.setItem("cart", JSON.stringify(myarr));
    let it1 = document.getElementById("cart_count");
  // console.log(it1);
  it1.innerHTML = myarr.length;
 
  });

  im.src = `${el.image}`;
  t.innerText = `${el.title}`;
  cat.innerText = `${el.category}`;
  pr.innerText = `${el.price}`;
  bt.innerText = "Add to Cart";

  div.append(im, t, cat, pr, bt);

  return div;
};

let render = (data) => {
  //   console.log(data);
  let cont = document.getElementById("items");
  cont.innerHTML = null;
  data.forEach((el) => {
    let art = div(el);

    cont.append(art);
  });
};

function prev() {
  if (i > 1) {
    getData(--i);
  } else if (i == 2) {
    getData(i);
  }
}
let next = () => {
  let x = array.length;
  if (i < Math.ceil(x / 10)) {
    getData(++i);
  } else {
    getData(i);
  }
};
