var flag = true;

function getJsonData(){
    var jqXHR = $.ajax({
        url: "items_info.json",
        async: false});
    return $.parseJSON(jqXHR.responseText).fumos;
}

//предподготовка
let fumo_box = document.getElementById("list_goods");
let all_fumo_list = getJsonData();
let submit_btn = document.getElementById("submit_params");
let min_price_tf = document.getElementById("min_price");
let max_price_tf = document.getElementById("max_price");
let games_cb = document.querySelectorAll('.game');

let min_price = 0;
let max_price = 10000;
let possible_games = {};

let static_minmax = function (){
    min_price = 999999;
    max_price = 0;
    for (var i in all_fumo_list.all_fumo_names){
        let cur_fumo = all_fumo_list[all_fumo_list.all_fumo_names[i]];
        max_price = Math.max(max_price, cur_fumo.V1.cost, cur_fumo.V1_5.cost);
        min_price = Math.min(min_price, cur_fumo.V1.cost, cur_fumo.V1_5.cost);
    }
}

let static_games = function (){
    for (var x in all_fumo_list.possible_games){
        possible_games[all_fumo_list.possible_games[x]] = false;
    }
}

//проверка на число
function isNumeric(value) {
    return /^-?\d+$/.test(value);
}

//слушатели чекбоксов
$('.container input').on('click', function() {
    let cb = $(this).attr('value');
    possible_games[cb] = this.checked;
    console.log(cb + ": " + possible_games[cb]);
});

//слушатель фильтра
$('aside button').on('click', function() {
    console.log("Submit clicked");
    update_fumos();
});

//не выбран ни один чекбокс
let all_games_allowed = function (){
    for (var x in possible_games){
        if (possible_games[x]){
            return false;
        }
    }
    return true;
}

//добавляет элементы
let addItem = function (fumo){
    let should_add = false;
    if ((min_price <= fumo.V1.cost && max_price >= fumo.V1.cost) ||
        (min_price <= fumo.V1_5.cost && max_price >= fumo.V1_5.cost)){
        if (all_games_allowed()){
            should_add = true;
        } else {
            for (var x in possible_games){
                console.log(x);
                if (possible_games[x] && fumo.games.includes(x)){
                    console.log(fumo.name + " is in " + x);
                    should_add = true;
                }
            }
        }
    }
    if (should_add){
        let item = document.createElement('div');
        item.className = "good_wrapper";
        item.innerHTML = "<a class=\"good_link\" href=\"item" + fumo.id + ".html\">\n" +
            "                <div class=\"good\">\n" +
            "                    <img src=\"" + fumo.V1.image + "\" alt=\"\">\n" +
            "                    <h3 class=\"item_name\">" + fumo.name + "</h3>\n" +
            "                    <div class=\"price\">" + Math.min(fumo.V1.cost, fumo.V1_5.cost) + "</div>\n" +
            "                </div>\n" +
            "            </a>";
        fumo_box.appendChild(item);
        console.log("added " + fumo.name)
    } else {
        console.log("not added " + fumo.name);
    }
    return should_add;
}

//обновить товары
let update_fumos = function () {
    fumo_box.innerHTML = null;
    if (isNumeric(min_price_tf.value)){
        min_price = parseInt(min_price_tf.value);
    } else if (isNumeric(min_price_tf.placeholder)){
        min_price = parseInt(min_price_tf.placeholder);
    } else {
        console.log("Не знаем минимальной цены");
        min_price = 0;
    }
    console.log("min = " + min_price);
    if (isNumeric(max_price_tf.value)){
        max_price = parseInt(max_price_tf.value);
    } else if (isNumeric(max_price_tf.placeholder)){
        max_price = parseInt(max_price_tf.placeholder);
    } else {
        console.log("Не знаем максимальной цены");
        max_price = 10000;
    }
    console.log("max = " + max_price);
    console.log(possible_games);
    //console.log(games_cb);
    let count = 0;
    for (var i in all_fumo_list.all_fumo_names){
        let cur_fumo = all_fumo_list[all_fumo_list.all_fumo_names[i]];
        if (addItem(cur_fumo)){
            count++;
        }
    }
    if (count === 0){
        let not_found = document.createElement('h3');
        not_found.innerText = "С такими фильтрами товаров не нашлось";
        not_found.style.textAlign = 'center';
        fumo_box.appendChild(not_found);
    }
}

//при запуске страницы 1 раз
if (flag){
    static_minmax();
    static_games();
    min_price_tf.placeholder = min_price;
    max_price_tf.placeholder = max_price;
    for(var i = 0; i < games_cb.length; i++){
        games_cb[i].checked = false;
        console.log(games_cb[i].value + ": " + games_cb[i].checked);
    }
    flag = false;
    update_fumos();
}