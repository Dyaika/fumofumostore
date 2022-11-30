let fumoName = document.getElementById('info-for-script').innerText;
let firstRadio = document.getElementById("v1");

function getJsonData(){
    var jqXHR = $.ajax({
        url: "items_info.json",
        async: false});
    return $.parseJSON(jqXHR.responseText).fumos[fumoName];
}
let image = document.getElementById('fumoImage');
let a = document.getElementById('buy');
let year = document.getElementById('year');
let cost = document.querySelector('.price');
let json_data = getJsonData();
//предстартовый выбор
firstRadio.checked = true;
let fumoVer = $(this).attr('data-ver');
let cur_fumo = json_data[fumoVer];
$('.version-choose label').on('click', function() {
    fumoVer = $(this).attr('data-ver');
    cur_fumo = json_data[fumoVer];
    console.log(cur_fumo);
    image.src = cur_fumo.image;
    a.href = cur_fumo.url;
    year.innerText = cur_fumo.year;
    cost.innerHTML = cur_fumo.cost + "¥";
});