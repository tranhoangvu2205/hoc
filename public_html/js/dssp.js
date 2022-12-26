function logout() {
    localStorage.removeItem('userlogin');
    localStorage.removeItem('cart');
    location.href = '../index.html';
}

function showProductList() {
    var productArr = [];
    if (localStorage.getItem('product') == null) {
        return false;
    }
    productArr = JSON.parse(localStorage.getItem('product'));
    var tr = '<tr><th>STT</th><th>Id</th><th>Hãng</th><th>Hình ảnh</th><th>Tên sản phẩm</th><th>Giá</th><th>Xóa</th><th>Sửa</th></tr>';
    for (var i = 0; i < productArr.length; i++) {
        tr += '<tr><td>' + (i + 1) + '</td><td>' + productArr[i].productId + '</td><td>' + productArr[i].brand + '</td><td><img src = "./../' + productArr[i].img + '" alt = "alt" style = "width: 100px; height: 100px"/></td><td>' + productArr[i].name + '</td><td>' + productArr[i].price + '</td><td><button class="" onClick="deletesp(\'' + productArr[i].productId + '\')">&times;</button></td><td><button id ="" onClick="edit(\'' + productArr[i].productId + '\')">Sửa</button></td></tr>';

    }
    document.getElementById('productlist').innerHTML = tr;

}


function deletesp(productdelete) {
    var productArr = JSON.parse(localStorage.getItem('product'));
    for (var i = 0; i < productArr.length; i++) {

        if (productArr[i].productId == productdelete) {
            if (confirm('Bạn có muốn xóa sản phẩm này?')) {
                productArr.splice(i, 1);
            }
        }
    }
    localStorage.setItem('product', JSON.stringify(productArr));
    showProductList();
}

function addProduct() {
    var productArr = JSON.parse(localStorage.getItem('product'));
    var productId = document.getElementById('productid');
    var productname = document.getElementById('productname');
    var brand = document.getElementById('brand');
    var price = document.getElementById('productprice');
    if (!productId.value || !brand.value || !productname.value || !price.value) {
        alert('Bạn chưa nhập đủ thông tin sản phẩm', 'warning');
        return false;
    }
    if (isNaN(Number(productId.value))) {
        alert('Id không hợp lệ', 'warning');
        return false;
    }
    if (isNaN(Number(price.value))) {
        alert('Giá không hợp lệ', 'warning');
        return false;
    }

    var producttemp = { productId: productId.value, brand: brand.value, img: 'img/temp.jpeg', name: productname.value, price: price.value };
    productArr.push(producttemp);
    localStorage.setItem('product', JSON.stringify(productArr));
    showProductList(0);
    alert('Thêm sản phẩm thành công', 'success');
}

function edit(key) {

    var productArr = JSON.parse(localStorage.getItem('product'));
    for (var i = 0; i < productArr.length; i++) {
        if (productArr[i].productId == key) {
            document.getElementById('index').value = key;
            document.getElementById('productadd').style.display = 'none';
            document.getElementById('change').style.display = 'inline-block';
        }
    }
    localStorage.setItem('product', JSON.stringify(productArr));
    showProductList(0);
}


function editProduct(id) {
    document.getElementById('change').style.display = 'none';
    var productArr = JSON.parse(localStorage.getItem('product'));
    var vitri;

    for (var i = 0; i < productArr.length; i++) {

        if (productArr[i].productId == id) {
            productArr[i].brand = document.getElementById('brand').value;
            productArr[i].name = document.getElementById('productname').value;
            productArr[i].price = document.getElementById('productprice').value;
        }
    }
    localStorage.setItem('product', JSON.stringify(productArr));
    showProductList(vitri);

}

function showchangeproductbox(id) {
    var productArr = JSON.parse(localStorage.getItem('product'));
    for (var i = 0; i < productArr.length; i++) {
        if (productArr[i].productId == id) {
            document.getElementById('brand').value = productArr[i].brand;
            document.getElementById('productname').value = productArr[i].name;
            document.getElementById('productprice').value = productArr[i].price;

            document.getElementById('save').setAttribute('onClick', 'editProduct(' + productArr[i].productId + ')');
        }
    }
    document.getElementById('productadd').style.display = 'inline-block';
    document.getElementById('change').style.display = 'none';
}

document.getElementById("files").onchange = function() {
    var reader = new FileReader();

    reader.onload = function(e) {
        // nhận dữ liệu đã tải và hiển thị hình thu nhỏ
        document.getElementById("image").src = e.target.result;
    };

    // đọc tệp hình ảnh dưới dạng dữ liệu URL .
    reader.readAsDataURL(this.files[0]);
};
//user/
function showUserList() {
    if (localStorage.getItem('user') === null) {
        return false;
    }
    var userArray = JSON.parse(localStorage.getItem('user'));
    var tr = '<tr><th>STT</th><th>HỌ TÊN KH</th><th>TÊN ĐĂNG NHẬP</th><th>NGÀY ĐĂNG KÝ</th><th>Xóa</th></tr>';
    for (var i = 1; i < userArray.length; i++) {
        tr += '<tr><td>' + i + '</td><td>' + userArray[i].fullname + '</td><td>' + userArray[i].username + '</td><td>' + userArray[i].datesignup + '</td><td><button class="delete" onclick="deleteuser(\'' + userArray[i].username + '\')">&times;</button></td></tr>';
    }
    document.getElementById('userlist').innerHTML = tr;
}

function deleteuser(usernamedelete) {
    var userArray = JSON.parse(localStorage.getItem('user'));
    for (var i = 0; i < userArray.length; i++) {
        if (userArray[i].username == usernamedelete) {
            if (confirm('Bạn có muốn xóa tài khoản này?')) {
                userArray.splice(i, 1);
            }
        }
    }
    localStorage.setItem('user', JSON.stringify(userArray));
    showUserList();
}