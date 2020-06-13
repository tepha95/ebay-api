var welcome = document.getElementById('welcome');
var arr = [];
var comments = [];

info();
getArticle();

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

function getArticle() {
    var xhr = new XMLHttpRequest();
    arr = [];
    comments = [];
    var damelotodo = document.getElementById("damelotodo");
    var commentarios = document.getElementById("commentarios");
    damelotodo.innerHTML = "";
    commentarios.innerHTML = "";

    xhr.onreadystatechange = function () {
        if (xhr.status === 200 && xhr.readyState === 4) {
            var data = JSON.parse(xhr.responseText);
            Object.keys(data.data).forEach(function (key) {
                arr.push(data.data[key]);
            });

            Object.keys(data.comments).forEach(function (key) {
                comments.push(data.comments[key]);
            });

            console.log(arr);
            console.log(comments);

            for (var x in arr) {
                //Creación de elementos
                var div = document.createElement("div");
                var img = document.createElement("img");
                var div2 = document.createElement("div");
                var h3 = document.createElement("h3");
                var h4 = document.createElement("h4");
                var h6 = document.createElement("h6");
                var p = document.createElement("p");
                var textarea = document.createElement("textarea");
                var button = document.createElement("button");

                div.setAttribute("class", "card mt-4");
                img.setAttribute("class", "card-img-top img-fluid");
                div2.setAttribute("class", "card-body");
                h3.setAttribute("class", "card-title");
                p.setAttribute("class", "card-text");
                button.setAttribute("class", "btn btn-success");
                button.setAttribute("onclick", "comment(" + arr[x].posts_id + ")");
                textarea.setAttribute("class", "form-control");
                textarea.setAttribute("id", "comments_descripcion");
                textarea.setAttribute("placeholder", "Here your comment. . .");
                textarea.setAttribute("style", "resize:none; height:131px;");

                img.src = arr[x].posts_image;
                h3.textContent = arr[x].posts_title;
                h4.textContent = "$" + arr[x].posts_price;
                h6.textContent = "Quantity: " + arr[x].posts_quantity;
                p.textContent = arr[x].posts_description;
                button.textContent = "Comment";

                //Appendchild a los elementos
                div2.appendChild(h3);
                div2.appendChild(h4);
                div2.appendChild(h6);
                div2.appendChild(p);
                div2.appendChild(textarea);
                div2.appendChild(button);

                div.appendChild(img);
                div.appendChild(div2);
                damelotodo.appendChild(div);
            }

            for (var x in comments) {

                var p = document.createElement("p");
                var small = document.createElement("small");
                var hr = document.createElement("hr");

                var date = new Date(comments[x].comments_created_at);

                var dd = date.getDate();
                var mm = date.getMonth() + 1;

                var yyyy = date.getFullYear();
                if (dd < 10) {
                    dd = '0' + dd;
                }
                if (mm < 10) {
                    mm = '0' + mm;
                }
                var today = dd + '/' + mm + '/' + yyyy;
                small.setAttribute("class", "text-muted");
                p.textContent = comments[x].comments_descripcion;
                small.textContent = "Posted by " + comments[x].id_users + " on " + today;

                commentarios.appendChild(p);
                commentarios.appendChild(small);
                commentarios.appendChild(hr);
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
    var url = new URL(window.location.href);
    var posts_id = url.searchParams.get("posts_id");
    console.log(posts_id);
    xhr.open("GET", "GetArticle?posts_id=" + posts_id, true);
    xhr.send();
}

function editPost(posts_id) {
    var xhr = new XMLHttpRequest();
    var posts_title = document.getElementById('posts_title');
    var posts_price = document.getElementById('posts_price');
    var posts_quantity = document.getElementById('posts_quantity');
    var posts_description = document.getElementById('posts_description');

    xhr.onreadystatechange = function () {
        if (xhr.status === 200 && xhr.readyState === 4) {
            var data = JSON.parse(xhr.responseText);
            alert(data.message);
            getArticle();
        } else if (xhr.readyState === 4) {
            var data = JSON.parse(xhr.responseText);
            alert(data.message);
        }
    }
    var params = "posts_id=" + posts_id + "&posts_title=" + posts_title.value + "&posts_price=" + posts_price.value + "&posts_quantity=" + posts_quantity.value + "&posts_description=" + posts_description.value;
    xhr.open("POST", "EditArticle", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(params);
}

function comment(posts_id) {
    var xhr = new XMLHttpRequest();

    var comments_descripcion = document.getElementById('comments_descripcion');

    xhr.onreadystatechange = function () {
        if (xhr.status === 200 && xhr.readyState === 4) {
            var data = JSON.parse(xhr.responseText);
            alert(data.message);
            getArticle();
        } else if (xhr.readyState === 4) {
            var data = JSON.parse(xhr.responseText);
            alert(data.message);
        }
    }
    var params = "posts_id=" + posts_id + "&comments_descripcion=" + comments_descripcion.value + "&comments_main=true&comments_refer_id=''";
    xhr.open("POST", "Comment", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(params);
}