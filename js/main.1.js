$(document).ready(function(){
    getNoticias();
    picoyplaca();
});
function picoyplaca() {
    var week = {
        "monday": [5,6],
        "tuesday": [7,8],
        "wednesday": [9,0],
        "thursday":[1,2],
        "friday":[3,4]
    };
    var saturday = {
        "julio 13": [1,2],
        "agosto 17": [1,2],
        "septiembre 21": [1,2],
        "agosto 24":[3,4],
        "septiembre 28":[3,4],
        "julio 27":[5,6],
        "agosto 31":[5,6],
        "agosto 3":[7,8],
        "septiembre 7":[7,8],
        "septiembre 14":[9,0],
        "julio 6":[9,0],
        "agosto 10":[9,0]
    };
    fecha=new Date();
    var meses = new Array ("enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre");
    var dias = new Array('sunday','monday','tuesday','wednesday','thursday','friday','saturday');
    var dia = dias[fecha.getDay()];
    if(dia == 'saturday'){ 
        var nums = saturday[meses[fecha.getMonth()]+" "+String(fecha.getDate())];
        var horas = "De 9:00 am a 1:00pm";
    }
    else{
        var nums = week[dia];
        var horas = "De 6:00 am a 8:00pm";
    }
    $(".first").text(nums[0]);
    $(".second").text(nums[1]);
    $("#horas").text(horas);
    console.log(nums);
}

function getNoticias() {
$.get( "http://aquatower.bionix.com.co/index.php/apis/api_controller/getNoticiaTv/37", function( data ) {
        //var noticiaInicio = data.data.pop();
        var dataArray = data.data;
        var counter = 0;
        var titleContent = document.getElementById("notice-title");
        var textContent = document.getElementById("notice-content");
        var carouselMultimedia = document.getElementById("myCarousel");
        /* titleContent.innerHTML = noticiaInicio.titulo;
        textContent.innerHTML = noticiaInicio.texto;
        var imagenes = noticiaInicio.multimedia.filter(multimedia => multimedia.tipoMultimedia_idtipoMultimedia == "1");
        if(imagenes){
            var indicadores = "";
            var slides = "";
            for(var multimediaIter =0; multimediaIter < imagenes.length; multimediaIter++){
                var imageUrl = 'http:////aquatower.bionix.com.co//recursos//uresidencial36//anuncios//anuncio'+noticiaInicio.idanuncio+'//images//'+imagenes[multimediaIter].url;
                if(multimediaIter != 0){
                    indicadores += '<li data-target="#myCarousel" data-slide-to="'+multimediaIter+'"></li>';
                    slides += '<div class="item"><div id="slide'+multimediaIter+'" class="fill" style="background-image: url('+imageUrl+')"></div></div>';
                }else{
                    indicadores += '<li data-target="#myCarousel" data-slide-to="'+multimediaIter+' class="active""></li>';
                    slides += '<div class="item active"><div id="slide'+multimediaIter+'" class="fill" style="background-image: url('+imageUrl+')"></div></div>';
                }
                carouselMultimedia.innerHTML = '<ol class="carousel-indicators">'+indicadores+'</ol><div class="carousel-inner">'+slides+'</div><a class="left carousel-control" href="#myCarousel" data-slide="prev"><span class="icon-prev"></span></a><a class="right carousel-control" href="#myCarousel" data-slide="next"><span class="icon-next"></span></a>';
                
            }
            carouselMultimedia.classList.remove( "d-none" );
            $('.carousel').carousel({
                interval: 5000, //changes the speed,
                cycle: true
            })

        }
        else{
            carouselMultimedia.innerHTML = '';
            carouselMultimedia.classList.add("d-none");
        } */
        const stop = parseInt(dataArray.length);
        change();

        setInterval(change, 9000);

        function change() {
            if (counter >= stop) {//counter = 0;
                location.reload();
            }
            titleContent.innerHTML = dataArray[counter].titulo;
            textContent.innerHTML = dataArray[counter].texto;
            imagenes = dataArray[counter].multimedia.filter(multimedia => multimedia.tipoMultimedia_idtipoMultimedia == "1");
            if(imagenes){
                carouselMultimedia.classList.remove( "d-none" );
                var indicadores = "";
                var slides = "";
                for(var multimediaIter =0; multimediaIter < imagenes.length; multimediaIter++){
                    var imageUrl = 'http:////aquatower.bionix.com.co//recursos//uresidencial36//anuncios//anuncio'+dataArray[counter].idanuncio+'//images//'+imagenes[multimediaIter].url;
                    if(multimediaIter != 0){
                        indicadores += '<li data-target="#myCarousel" data-slide-to="'+multimediaIter+'"></li>';
                        slides += '<div class="item"><div id="slide'+multimediaIter+'" class="fill" style="background-image: url('+imageUrl+')"></div></div>';
                    }else{
                        indicadores += '<li data-target="#myCarousel" data-slide-to="'+multimediaIter+' class="active"></li>';
                        slides += '<div class="item active"><div id="slide'+multimediaIter+'" class="fill" style="background-image: url('+imageUrl+')"></div></div>';
                    }
                    carouselMultimedia.innerHTML = '<ol class="carousel-indicators">'+indicadores+'</ol><div class="carousel-inner">'+slides+'</div><a class="left carousel-control" href="#myCarousel" data-slide="prev"><span class="icon-prev"></span></a><a class="right carousel-control" href="#myCarousel" data-slide="next"><span class="icon-next"></span></a>';
                    
                }
                $('.carousel').carousel({
                    interval: 2000, //changes the speed,
                    cycle: true
                })

            }
            else{
                carouselMultimedia.innerHTML = '';
                carouselMultimedia.classList.add("d-none");
            }
            counter=counter+1;
        }
    });
}