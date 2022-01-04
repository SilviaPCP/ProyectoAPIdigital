window.onload = () => {
    const app = document.getElementById("root");
    const container = document.createElement("div");
    container.setAttribute("class", "container");
    app.appendChild(container);
  
    // Aqui debemos agregar nuestro fetch
    
    fetch('http://localhost:3032/api/products/')
      .then(function(response){
        return response.json();
      })

      .catch(function(error){
         alert(error);
      })

      .then(function(productos){
        let data = productos.data;
        alert(data);

      data.forEach((product) => {
        const card = document.createElement("div");
        card.setAttribute("class", "card");
  
        const h1 = document.createElement("h1");
        h1.textContent = product.product_name;
  
        const p = document.createElement("p");
        p.textContent = `Precio: ${product.price}`;
  
        const duracion = document.createElement("p");
        p.textContent = `descuento: ${product.discount}`;
  
        container.appendChild(card);
         card.appendChild(h1);
         card.appendChild(p);
         card.appendChild(p);
         
         // if (movie.genre !== null) {
        //  const genero = document.createElement("p");
        //  genero.textContent = `Genero: ${movie.genre.name}`;
        // card.appendChild(genero);
       // }
       //card.appendChild(duracion);
  
        // const favoritas = document.createElement("p");
        // favoritas.innerHTML = this.favoritas(product.product_id);
        // card.appendChild(favoritas)
      });
    })
  };
    