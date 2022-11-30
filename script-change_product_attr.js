$(document).ready(function() {

    $('.version-choose label').on('click', function() {
        var fumoVerr = $(this).attr('data-ver');
        let image = document.getElementById('fumoImage');
        let fumoName = document.getElementById('info-for-script').innerText;
        image.src = "images/" + fumoName + fumoVerr + ".jpg";
    });

});