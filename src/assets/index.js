const api = 'https://platzi-avo.vercel.app';

const contadorLabel = document.querySelector('.cont');
const appNode = document.querySelector('#app');
const menuButton = document.querySelector('.cart_button');
const modalCart = document.querySelector('.cart_container');
const carrito = document.querySelector('.cart_items');
const total = document.querySelector('.total_number');
const carritoContainer = document.querySelector('.cart_items');
const contenedorCart = document.querySelector('.cart_container-items');

//contiene el precio total del cart
let precioTotal = 0;
//cuenta cuantos productos hay en cart y da el id
let cont = 0;

//almacena los objetos que se añaden al cart
let almacen = [];

//visible el cart
const toggleCart = () => {
  modalCart.classList.toggle('visible');
  document.body.classList.toggle('no_overflow');
};

menuButton.addEventListener('click', toggleCart);

//-------------------Cart------------------
contenedorCart.addEventListener('click', e => {
  if (e.target.className === 'cart_buy-button') {
    if (total.innerHTML === '') {
      alert('No tienes nada en el carrito :C');
    } else {
      modalCart.classList.toggle('visible');

      alert('Lo siento amigo, pero estas paltas son mías ahora >:D');
      carritoContainer.textContent = '';
      cont = 0;
      precioTotal = 0;
      total.textContent = '';
      contadorLabel.textContent = '0';
    }
  }

  if (e.target.className === 'fa-solid fa-trash') {
    //remueve a traves del id que le di
    carritoContainer.removeChild(
      document.getElementById(e.path[3].attributes[1].value)
    );
    const precioRestar = e.target.attributes[0].value;

    precioTotal -= precioRestar;
    total.textContent = `$${precioTotal.toFixed(2)}`;
    cont--;
    contadorLabel.textContent = cont;
  }
});

//--------------Productos-------------------
appNode.addEventListener('click', e => {
  if (e.target.className === 'fa-solid fa-cart-plus') {
    cont++;
    contadorLabel.textContent = '' + cont;
    //filtrar el obj con todos los datos
    const indData = almacen.filter(s => s.id === e.path[3].attributes[1].value);

    precioTotal += indData[0].price;
    total.textContent = `$${precioTotal.toFixed(2)}`;
    // console.log(precioTotal.toFixed(2));

    carrito.append(
      crearCart(indData[0].image, indData[0].name, indData[0].price, cont)
    );
  }
});

//Le da el formato $ al precio
const formatPrice = precio => {
  const newPrecio = new window.Intl.NumberFormat('en-EN', {
    style: 'currency',
    currency: 'USD',
  }).format(precio);

  return newPrecio;
};

//Crea elementos del cart
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

  const ico = document.createElement('i');
  ico.setAttribute('precio', price);
  ico.className = 'fa-solid fa-trash';
  count.append(ico);

  contenedorRight.append(datos, count);

  const container = document.createElement('div');
  container.append(imagen, contenedorRight);
  container.className = 'contenedor2';
  container.setAttribute('id', id);
  return container;
};

//Crea elementos del contenedor princiapl
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
  const ico = document.createElement('i');
  ico.className = 'fa-solid fa-cart-plus';
  count.append(ico);

  contenedorRight.append(datos, count);

  const container = document.createElement('div');
  container.append(imagen, contenedorRight);
  container.className = 'contenedor';
  container.setAttribute('id', id);
  return container;
};

//Llamada a la api
fetch(`${api}/api/avo`)
  .then(res => res.json())
  .then(res => {
    almacen = res.data;
    res.data.forEach(item =>
      appNode.append(crear(item.image, item.name, item.price, item.id))
    );
  });
