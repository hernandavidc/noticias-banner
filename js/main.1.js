$(document).ready(function() {
    getNoticias();
    picoyplaca();
});

function picoyplaca() {
    var week = {
        "monday": [7, 8],
        "tuesday": [9, 0],
        "wednesday": [1, 2],
        "thursday": [3, 4],
        "friday": [5, 6]
    };
    var saturday = {
        "octubre 26": [1, 2],
        "noviembre 30": [1, 2],
        "noviembre 2": [3, 4],
        "diciembre 7": [3, 4],
        "octubre 5": [5, 6],
        "noviembre 9": [5, 6],
        "diciembre 14": [5, 6],
        "octubre 12": [7, 8],
        "noviembre 16": [7, 8],
        "diciembre 21": [7, 8],
        "octubre 19": [9, 0],
        "noviembre 23": [9, 0],
        "diciembre 28": [9, 0]
    };
    fecha = new Date();
    var meses = new Array("enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre");
    var dias = new Array('sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday');
    var dia = dias[fecha.getDay()];
    $("#fechaSpan").text(meses[fecha.getMonth()] + " " + String(fecha.getDate()) + " de " + String(fecha.getFullYear()));
    if (dia == 'sunday') {
        $(".noSundays").addClass("d-none");
    } else {
        if (dia == 'saturday') {
            var nums = saturday[meses[fecha.getMonth()] + " " + String(fecha.getDate())];
            var horas = "De 9:00 am a 1:00pm";
        } else {
            var nums = week[dia];
            var horas = "De 6:00 am a 8:00pm";
        }
        $(".first").text(nums[0]);
        $(".second").text(nums[1]);
        $("#horas").text(horas);
    }
}

function getNoticias() {
    $.get("https://aquatower.bionix.com.co/index.php/apis/api_controller/getNoticiaTv/37", function(data) {
        //var noticiaInicio = data.data.pop();
        var dataArray = data.data;
        var counter = 0;
        var titleContent = document.getElementById("notice-title");
        var textContent = document.getElementById("notice-content");
        var carouselMultimedia = document.getElementById("myCarousel");
        const stop = parseInt(dataArray.length);
        change();

        setInterval(change, 20000);

        function change() {
            if (counter >= stop) { //counter = 0;
                location.reload();
            }
            titleContent.innerHTML = dataArray[counter].titulo;
            textContent.innerHTML = dataArray[counter].texto;
            imagenes = dataArray[counter].multimedia.filter(multimedia => multimedia.tipoMultimedia_idtipoMultimedia == "1");
            if (imagenes && imagenes != "") {
                //carouselMultimedia.classList.remove("d-none");
                var indicadores = "";
                var slides = "";
                for (var multimediaIter = 0; multimediaIter < imagenes.length; multimediaIter++) {
                    var imageUrl = 'http:////aquatower.bionix.com.co//recursos//uresidencial36//anuncios//anuncio' + dataArray[counter].idanuncio + '//images//' + imagenes[multimediaIter].url;
                    if (multimediaIter != 0) {
                        indicadores += '<li data-target="#myCarousel" data-slide-to="' + multimediaIter + '"></li>';
                        slides += '<div class="item"><div id="slide' + multimediaIter + '" class="fill" style="background-image: url(' + imageUrl + ')"></div></div>';
                    } else {
                        indicadores += '<li data-target="#myCarousel" data-slide-to="' + multimediaIter + ' class="active"></li>';
                        slides += '<div class="item active"><div id="slide' + multimediaIter + '" class="fill" style="background-image: url(' + imageUrl + ')"></div></div>';
                    }
                    carouselMultimedia.innerHTML = '<ol class="carousel-indicators">' + indicadores + '</ol><div class="carousel-inner">' + slides + '</div><a class="left carousel-control" href="#myCarousel" data-slide="prev"><span class="icon-prev"></span></a><a class="right carousel-control" href="#myCarousel" data-slide="next"><span class="icon-next"></span></a>';

                }
                $('.carousel').carousel({
                    interval: 2000, //changes the speed,
                    cycle: true
                })

            } else {
                let imageUrl = 'http://bionix.com.co/admon_signaged/default_banner.jpg';
                carouselMultimedia.innerHTML = '<div class="item active"><div id="slide0" class="fill" style="background-image: url(' + imageUrl + ')"></div></div>';
                //carouselMultimedia.classList.add("d-none");
            }
            counter = counter + 1;
        }
    });
}