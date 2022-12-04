function getJsonData(){
    var jqXHR = $.ajax({
        url: "items_info.json",
        async: false});
    return $.parseJSON(jqXHR.responseText).fumos;
}

/*для формы, список фум*/
let fumolist_box = document.getElementById("sel_fumotype");
let review_box = document.getElementById("reviews");
let json_data = getJsonData();
let addFumolist = function (){
    for (x in json_data.all_fumo_names){
        let cur_fumo_key = json_data.all_fumo_names[x]

        let cur_elem = document.createElement('option');
        cur_elem.className = "op_fumotype";
        cur_elem.value = cur_fumo_key;
        cur_elem.innerText = json_data[cur_fumo_key].name;
        fumolist_box.appendChild(cur_elem);
    }
}
let addReviews = function (){
    for (x in json_data.all_fumo_names) {
        let cur_reviews = json_data[json_data.all_fumo_names[x]].reviews;
        for(review in cur_reviews){
            let cur_review = document.createElement('div');
            cur_review.className = "review_wrapper";
            let for_in_html = "<div class=\"review\">\n" +
            "<div class=\"username\"><b>"+ cur_reviews[review].rev_name +"</b></div>\n" +
            "<div class=\"review_text\">" + cur_reviews[review].rev_text + "</div>\n" +
            "<ul class=\"photos\">\n";
            for (var rev_image in cur_reviews[review].rev_images){
                for_in_html += "<li><img src=\""+ cur_reviews[review].rev_images[rev_image] +"\" alt=\"\"></li>\n";
            }
            for_in_html += "</ul>\n" +
                "</div>";
            cur_review.innerHTML = for_in_html;
            review_box.appendChild(cur_review);
        }
    }
}

/*

<div class="review_wrapper">
            <div class="review">
                <div class="username"><b>Dyaika</b></div>
                <div class="review_text">Еще не брал</div>
                <ul class="photos">
                    <li><img src="images/reimuV1.jpg" alt=""></li>
                    <li><img src="images/reimuV1_5.jpg" alt=""></li>
                </ul>
            </div>
        </div>

 */
addFumolist();
addReviews()