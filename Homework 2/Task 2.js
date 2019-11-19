
window.onload = function () {
    var name = "";
    var username = prompt("Please enter username");
    if (/\d/.test(username) == true) {                //проверка на наличие цифры
       
        name = username.split("").reverse("").join("");

    } else {
        for (var i = 0; i <= username.length - 1; i++) {
            if (i % 2) {     // если делится на 2 без остатка => чётная
                name += username[i].toLowerCase();
            } else {
                name += username[i].toUpperCase();
            }

        }   
    }
    document.getElementById("username").innerHTML = name;
}