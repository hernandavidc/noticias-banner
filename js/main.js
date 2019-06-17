$(document).ready(function(){
            $.get( "http://aquatower.bionix.com.co/index.php/apis/api_controller/getNoticiaTv", function( data ) {
                var noticiaInicio = data.data.pop();
                var dataArray = data.data;
                var counter = 0;
                var titleContent = document.getElementById("notice-title");
                var textContent = document.getElementById("notice-content");
                var carouselMultimedia = document.getElementById("myCarousel");
                titleContent.innerHTML = noticiaInicio.titulo;
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
                }

                setInterval(change, 20000);

                function change() {
                    titleContent.innerHTML = dataArray[counter].titulo;
                    textContent.innerHTML = dataArray[counter].texto;
                    imagenes = dataArray[counter].multimedia.filter(multimedia => multimedia.tipoMultimedia_idtipoMultimedia == "1");
                    if(imagenes.multimedia){
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
                        carouselMultimedia.classList.remove( "d-none" );
                        $('.carousel').carousel({
                            interval: 5000, //changes the speed,
                            cycle: true
                        })

                    }
                    else{
                        carouselMultimedia.innerHTML = '';
                        carouselMultimedia.classList.add("d-none");
                    }
                    counter++;
                    if (counter >= dataArray.length) {//counter = 0;
                        location.reload();
                    }
                }
            });
		});