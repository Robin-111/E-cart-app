let render = () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  console.log(cart);
  let cont = document.getElementById("items");
  cont.innerHTML = null;

  cart.forEach(({ image, title, category, price }, index) => {
    let div = document.createElement("div");
    div.setAttribute("class", "item");
    let im = document.createElement("img");
    let t = document.createElement("h3");
    let cat = document.createElement("p");
    let pr = document.createElement("h3");
    let bt = document.createElement("button");

    im.src = `${image}`;
    t.innerText = `${title}`;
    cat.innerText = `${category}`;
    pr.innerText = `${price}`;
    bt.innerText = "Remove";
    bt.onclick = () => {
       
      removeIt(index);

      
    };

    div.append(im, t, cat, pr, bt);
    cont.append(div);
  });
};

render();

let removeIt = (index) => {
    // let x=document.getElementById("cart_count").innerHTML ; 
    
  let cart = JSON.parse(localStorage.getItem("cart"));
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  document.getElementById("cart_count").innerHTML =cart.length;
  render();
};

function checkout() {
  let nam = document.getElementById("name").value;
  let add = document.getElementById("address").value;

  alert(`${nam} Your order is successfull`);
}
