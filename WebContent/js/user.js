var welcome = document.getElementById('welcome');
var arr = [];

info();
getPosts(); 

function info() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.status === 200 && xhr.readyState === 4) {
      var data = JSON.parse(xhr.responseText);
      welcome.innerText = data.message;
    } else if (xhr.status === 401 && xhr.readyState === 4) {
      var data = JSON.parse(xhr.responseText);
      alert(data.message);
      window.location.href = 'index.html';
    } else if (xhr.readyState === 4) {
      var data = JSON.parse(xhr.responseText);
      alert(data.message);
      window.location.href = 'index.html';
    }
  }
  xhr.open("GET", "Info", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send();
}

function update() {
  window.location.href = 'Update.html';
}

function Delete() {

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.status === 200 && xhr.readyState === 4) {
      var data = JSON.parse(xhr.responseText);
      alert(data.message);
      window.location.href = 'index.html';
    }
  }
  xhr.open("GET", "Delete", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send();
}

function logout() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.status === 200 && xhr.readyState === 4) {
      var data = JSON.parse(xhr.responseText);
      alert(data.message);
      window.location.href = 'index.html';
    }
  }
  xhr.open("GET", "Logout", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send();
}

function getPosts(){
  var xhr = new XMLHttpRequest();
  var arr = [];
  var damelotodo = document.getElementById("damelotodo");
  var aca = document.getElementById("aca");
  damelotodo.innerHTML = "";
  aca.innerHTML = "";

  xhr.onreadystatechange = function () {
    if (xhr.status === 200 && xhr.readyState === 4) {
      var data = JSON.parse(xhr.responseText);
      Object.keys(data.data).forEach(function (key) {
        arr.push(data.data[key]);
      });

      console.log(arr);

      for(var x in arr){
        //Creación de elementos
        var div = document.createElement("div");
        var div2 = document.createElement("div");
        var div3 = document.createElement("div");
        var a = document.createElement("a");
        var a2 = document.createElement("a");
        var img = document.createElement("img");
        var h4 = document.createElement("h4");
        var h5 = document.createElement("h5");
        var p = document.createElement("p");

        //Asignacion de atributos

        //Div
        div.setAttribute("class", "col-lg-4 col-md-6 mb-4");
        div2.setAttribute("class", "card h-100");
        div3.setAttribute("class", "card-body");

        //a, img
        a.setAttribute("href", "#");
        img.setAttribute("class", "card-img-top");
        //img.setAttribute("style", "height: 169px; width:253px");
        img.src = arr[x].posts_image;
        a2.setAttribute("href", "#");
        a2.textContent = arr[x].posts_title;

        img.setAttribute("onclick", "verImagen('../"+arr[x].posts_image+"', '"+arr[x].posts_image+"')");
        img.setAttribute("data-target", "#ModalImagen");
        img.setAttribute("data-toggle", "modal");


        //h4, h5 y p
        h4.setAttribute("class", "card-title");
        p.setAttribute("class", "card-text")
        h5.textContent = arr[x].posts_price;
        p.textContent = arr[x].posts_description;
        //Appendchild a los elementos

        h4.appendChild(a2);
        div3.appendChild(h4);
        div3.appendChild(h5);
        div3.appendChild(p);
        a.appendChild(img);
        div2.appendChild(a);
        div2.appendChild(div3);
        div.appendChild(div2);
        damelotodo.appendChild(div);
      }
    } else if (xhr.status === 401 && xhr.readyState === 4) {
      var data = JSON.parse(xhr.responseText);
      alert(data.message);
      window.location.href = 'index.html';
    } else if (xhr.readyState === 4) {
      var data = JSON.parse(xhr.responseText);
      alert(data.message);
      window.location.href = 'index.html';
    }
  }
  xhr.open("GET", "GetPosts", true);
  xhr.send();
}