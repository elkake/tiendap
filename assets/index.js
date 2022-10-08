const api = 'https://platzi-avo.vercel.app';

const contadorLabel = document.querySelector('.cont');
const appNode = document.querySelector('#app');
const menuButton = document.querySelector('.cart_button');
const modalCart = document.querySelector('.cart_container');
const buttonAdd = document.querySelectorAll('.add_button');
const carrito = document.querySelector('.cart_items');
const total = document.querySelector('.total_number');
const carritoContainer = document.querySelector('.cart_items');

let precioTotal = 0;
let cont = 0;

let obj2 = [];

const toggleCart = () => {
  modalCart.classList.toggle('visible');
  document.body.classList.toggle('no_overflow');
};

menuButton.addEventListener('click', toggleCart);
//delegacion de evento
carritoContainer.addEventListener('click', e => {
  //remueve a traves del di que le di
  carritoContainer.removeChild(
    document.getElementById(e.path[2].attributes[1].value)
  );
  const precioRestar = e.target.attributes[1].value;

  precioTotal -= precioRestar;
  total.textContent = precioTotal.toFixed(2);
  cont--;
  contadorLabel.textContent = cont;
});

appNode.addEventListener('click', e => {
  if (e.target.className === 'add_button') {
    cont++;
    contadorLabel.textContent = '' + cont;
    //filtrar el obj con todos los datos
    const indData = obj2.filter(s => s.id === e.path[2].attributes[1].value);

    precioTotal += indData[0].price;
    total.textContent = precioTotal.toFixed(2);
    // console.log(precioTotal.toFixed(2));

    carrito.append(
      crearCart(indData[0].image, indData[0].name, indData[0].price, cont)
    );
  }
});

const formatPrice = precio => {
  const newPrecio = new window.Intl.NumberFormat('en-EN', {
    style: 'currency',
    currency: 'USD',
  }).format(precio);

  return newPrecio;
};

const crearCart = (image, name, price, id) => {
  const imagen = document.createElement('img');
  imagen.src = api + image;
  imagen.className = 'img';
  //crear titulo
  const contenedorRight = document.createElement('div');
  contenedorRight.className = 'data_container';
  const titulo = document.createElement('h2');
  titulo.textContent = name;
  titulo.className = 'titulo';
  //crear precio
  const precio = document.createElement('div');
  precio.className = 'precio';
  precio.textContent = formatPrice(price);

  //CONTENEDOR PARA CADA item
  const datos = document.createElement('div');
  datos.append(titulo, precio);
  datos.className = 'datos';

  const count = document.createElement('div');
  count.className = 'delete_button';
  count.setAttribute('precio', price);
  count.textContent = 'ELIMINAR';

  contenedorRight.append(datos, count);

  const container = document.createElement('div');
  container.append(imagen, contenedorRight);
  container.className = 'contenedor2';
  container.setAttribute('id', id);
  return container;
};

const crear = (image, name, price, id) => {
  const imagen = document.createElement('img');
  imagen.src = api + image;
  imagen.className = 'img';
  //crear titulo
  const contenedorRight = document.createElement('div');
  contenedorRight.className = 'data_container';
  const titulo = document.createElement('h2');
  titulo.textContent = name;
  titulo.className = 'titulo';
  //crear precio
  const precio = document.createElement('div');
  precio.className = 'precio';
  precio.textContent = formatPrice(price);

  //CONTENEDOR PARA CADA item
  const datos = document.createElement('div');
  datos.append(titulo, precio);
  datos.className = 'datos';

  const count = document.createElement('div');
  count.className = 'add_button';
  count.textContent = 'AÑADIR';

  contenedorRight.append(datos, count);

  const container = document.createElement('div');
  container.append(imagen, contenedorRight);
  container.className = 'contenedor';
  container.setAttribute('id', id);
  return container;
};
fetch(`${api}/api/avo`)
  .then(res => res.json())
  .then(res => {
    obj2 = res.data;
    res.data.forEach(item =>
      appNode.append(crear(item.image, item.name, item.price, item.id))
    );
  });
