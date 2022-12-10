function getJsonData(){
    var jqXHR = $.ajax({
        url: "items_info.json",
        async: false});
    return $.parseJSON(jqXHR.responseText).fumos;
}
function getBankJsonData(){
    var jqXHR = $.ajax({
        url: "https://www.cbr-xml-daily.ru/daily_json.js",
        async: false});
    return $.parseJSON(jqXHR.responseText).Valute;
}
/*список фум*/
let fumolist_box = document.getElementById("sel_fumotype");
let input_v = document.getElementById("yens_input");
let output_v = document.getElementById("valute_output");
let json_data = getJsonData();
let fumotype = "none";
let fumover = "V1";
let valutetype = document.getElementById("sel_valute").value;
let bank_json = getBankJsonData();

let course = {
    "RUB": 1.0,
    "KZT": 1.0,
    "UAH": 1.0,
    "BYN": 1.0,
    "TRY": 1.0
};

function updateCourse(){
    for (var val_t in course){
        if (val_t === "RUB"){
            course[val_t] = bank_json["JPY"].Value / bank_json["JPY"].Nominal;
        } else {
            course[val_t] = course["RUB"] / (bank_json[val_t].Value / bank_json[val_t].Nominal);
        }
    }
    console.log(course);
}
function isNumeric(value) {
    return /^\d+$/.test(value);
}

function convert(yens, val_type){
    let res = 0;
    if (isNumeric(yens)){
        res = parseInt(yens) * course[val_type];
    }
    return Math.round(res);
}

let addFumolist = function (){
    for (var x in json_data.all_fumo_names){
        let cur_fumo_key = json_data.all_fumo_names[x]

        let cur_elem = document.createElement('option');
        cur_elem.className = "op_fumotype";
        cur_elem.value = cur_fumo_key;
        cur_elem.innerText = json_data[cur_fumo_key].name;
        fumolist_box.appendChild(cur_elem);
    }
}
updateCourse();
addFumolist();
if (document.getElementById("v1_5").checked){
    fumover = "V1_5";
}
//слушатель ввода
$('#yens_input').on('change', function() {
    fumolist_box.value = "none";
});

//слушатель типа валюты
$('#sel_valute option').on('click', function() {
    console.log("cur valute ",this.value);
    valutetype = this.value;
    output_v.placeholder = this.value;
});
//слушатель типа фумо
$('.op_fumotype').on('click', function() {
    console.log("cur fumo ",this.value);
    if (this.value !== "none"){
        input_v.value = json_data[this.value][fumover].cost;
    }
});
//слушатель версии фумо
$('.version-choose input').on('click', function() {
    console.log("cur version ",this.value);
    fumover = this.value;
    if (fumolist_box.value !== "none"){
        input_v.value = json_data[fumolist_box.value][this.value].cost;
    }
});
//слушатель кнопки конвертации
$('.container #yens_to_btn').on('click', function() {
    console.log("convert clicked ", input_v.value, " JPY -> ", valutetype);
    output_v.value = convert(input_v.value, valutetype) + " " + valutetype;

});