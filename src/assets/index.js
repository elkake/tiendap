


const api = "https://platzi-avo.vercel.app";

const appNode = document.querySelector("#app");

const formatPrice = (precio) => {
  
  const newPrecio=new window.Intl.NumberFormat("en-EN",{
    style:"currency",
    currency:"USD",
  }).format(precio);
  
  
  return newPrecio;
};

window
  .fetch(`${api}/api/avo`)
  .then((res) => res.json())
  .then((res) => {
    const todosLosItems = document.createDocumentFragment();
    //res.data es un array
    res.data.forEach((item) => {
      //crear imagen
      const imagen = document.createElement("img");
      imagen.src = api + item.image;
      imagen.className = "img";
      //crear titulo
      const titulo = document.createElement("h2");
      titulo.textContent = item.name;
      titulo.className = "titulo";
      //crear precio
      const precio = document.createElement("div");
      precio.className = "precio";
      precio.textContent = formatPrice(item.price);

      //CONTENEDOR PARA CADA item
      const datos = document.createElement("div");
      datos.append(titulo, precio);
      datos.className = "datos";

      const container = document.createElement("div");
      container.append(imagen, datos);
      container.className = "contenedor";

      todosLosItems.appendChild(container);
    });

    appNode.append(todosLosItems);
  });

// const url = "https://platzi-avo.vercel.app/api/avo";

// //web api
// async function fetchData() {
//   const response = await fetch(url),
//   data = await response.json(),
//   allItems = [];

//   data.data.forEach((item) => {
//     // create image
//     const image = document.createElement("img");
//     // create title
//     const title = document.createElement("h2");
//     // create price
//     const price = document.createElement("div");

//     const container = document.createElement("div");
//     container.append(image, title, price);

//     allItems.push(container);
//   });

//   document.body.append(...allItems)
// }

// fetchData();
