let fumoName = document.getElementById('info-for-script').innerText;
let firstRadio = document.getElementById("v1");
var flag = true;

function getJsonData(){
    var jqXHR = $.ajax({
        url: "items_info.json",
        async: false});
    return $.parseJSON(jqXHR.responseText).fumos[fumoName];
}
//одинаковое для обеих версий
let name = document.getElementById('name');
let short_desc = document.getElementById('short_desc');
let cite = document.getElementById('cite');
let full_desc = document.getElementById('full_desc');
let model_info = document.getElementById('model_info');
let review_box = document.getElementById("reviews");

//разное для двух версий
let image = document.getElementById('fumoImage');
let a = document.getElementById('buy');
let year = document.getElementById('year');
let cost = document.querySelector('.price');
let firstLabel = document.querySelector('.vers-label1');

//предстартовый выбор
let json_data = getJsonData();
firstRadio.checked = true;
let fumoVer = $(firstLabel).attr('data-ver');
let cur_fumo = json_data[fumoVer];
if (flag){
    flag = false;
    //отличающиеся
    image.src = cur_fumo.image;
    a.href = cur_fumo.url;
    year.innerText = cur_fumo.year;
    cost.innerText = cur_fumo.cost;

    //отзывы
    if (json_data.reviews.length === 0){
        let no_revs_elem = document.createElement('div');
        no_revs_elem.innerText = "Отзывов нет.";
        no_revs_elem.style.color = 'white';
        no_revs_elem.style.fontSize = '1.2rem';
        no_revs_elem.style.textAlign = 'center';
        let no_revs_link = document.createElement('a');
        no_revs_link.href = "reviews.html";
        no_revs_link.innerText = " Добавить!";
        no_revs_link.style.textAlign = 'center';
        review_box.appendChild(no_revs_elem);
        no_revs_elem.appendChild(no_revs_link);
    } else {
        for (var i = 0; i < json_data.reviews.length; i++) {
            let review = document.createElement('div');
            review.className = "review";
            let customer_name = document.createElement('div');
            customer_name.className = "customer_name";
            customer_name.innerText = json_data.reviews[i].rev_name;
            let review_text = document.createElement('div');
            review_text.className = "review_text";
            review_text.innerText = json_data.reviews[i].rev_text;
            review.appendChild(customer_name);
            review.appendChild(review_text);
            review_box.appendChild(review);
        }
    }
    //одинаковые
    name.innerText = json_data.name;
    short_desc.innerText = json_data.short_desc;
    cite.innerText = json_data.cite;
    full_desc.innerText = json_data.full_desc;
    model_info.innerText = json_data.model_info;


}
$('.version-choose label').on('click', function() {
    fumoVer = $(this).attr('data-ver');
    cur_fumo = json_data[fumoVer];
    console.log(cur_fumo);
    image.src = cur_fumo.image;
    a.href = cur_fumo.url;
    year.innerText = cur_fumo.year;
    cost.innerText = cur_fumo.cost;
});