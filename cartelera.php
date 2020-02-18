<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>Aqua noticias</title>
    <link rel="stylesheet" href="css/bootstrap.min.css" />
    <link rel="stylesheet" href="css/fontawesome/css/all.css" />
    <link rel="stylesheet" href="css/style.css" />
    <script src="js/jquery.js"></script>
</head>

<body>

    <!-- Navigation -->
    <nav class="navbar navbar-inverse" role="navigation">
        <div style="padding: 0px 25px;">
            <div class="row">
                <div class="col-sm-8" style="display:inline-block  !important;width:44%  !important;">
                    <h4 style="padding-top:10px;">Señores residentes</h4>
                </div>
                <div class="col-dm-3 col-sm-2" style="padding-top:8px;display:inline-block;width:24%  !important;">
                    <p class="picoyplaca-title"><span class="noSundays">Pico y Placa - </span><span id="fechaSpan"></span></p>
                    <p id="horas" class="picoyplaca-title"></p>
                </div>
                <div class="col-dm-1 col-sm-2 noSundays" style="display:inline-block;width:30%  !important;">
                    <div id="plate" style="max-width: 180px;">
                        <div id="number">
                            <span class="first"></span> y <span class="second"></span>
                        </div>
                        <p id="picoyplaca-city">- Bucaramanga -</p>
                    </div>
                </div>
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container -->
    </nav>
    <div id="regularArticle">
        <!-- Header Carousel -->
        <header id="myCarousel" class="carousel slide">

        </header>

        <!-- Page Content -->
        <div class="container">

            <!-- Marketing Icons Section -->
            <div class="row">
                <div class="col-lg-12">
                    <h1 class="page-header" id="article-title"></h1>
                    <p id="article-content">

                    </p>
                    <!-- 
                    <div id="article-extra" class="alert alert-info" role="alert">
                        Esta noticia contiene material extra via: 
                    </div> -->
                </div>
            </div>
            <!-- /.row -->
        </div>
    </div>

    <div id="fullScreenArticle" class="d-none">

    </div>

    <script>
    </script>
    <!-- ================================================== -->
    <!-- Bootstrap JavaScript library: -->
    <script src="js/bootstrap.min.js"></script>
    <script>
        $(document).ready(function() {
            getArticles();
            picoyplaca();
        });

        function picoyplaca() {
            $.get(<?php echo '"https://admon.bionix.com.co/index.php/apis/api_controller/getPicoPlaca?idResidencia='.htmlspecialchars($_GET["res"]).'"'; ?>, function(data) {
                if (!data['display']) {
                    $(".noSundays").addClass("d-none");
                } else {
                    $(".noSundays").removeClass("d-none");
                    let nums = data['digito']
                    const timeString12hrStart = new Date('1970-01-01T' + data['horaInicio'] + 'Z').toLocaleTimeString({}, {
                        timeZone: 'UTC',
                        hour12: true,
                        hour: 'numeric',
                        minute: 'numeric'
                    });
                    const timeString12hrEnd = new Date('1970-01-01T' + data['horaFin'] + 'Z').toLocaleTimeString({}, {
                        timeZone: 'UTC',
                        hour12: true,
                        hour: 'numeric',
                        minute: 'numeric'
                    });

                    let horas = "De " + timeString12hrStart + " a " + timeString12hrEnd;

                    fecha = new Date();
                    var meses = new Array("enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre");
                    var dias = new Array('sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday');
                    var dia = dias[fecha.getDay()];

                    $("#fechaSpan").text(meses[fecha.getMonth()] + " " + String(fecha.getDate()) + " de " + String(fecha.getFullYear()));
                    $(".first").text(nums[0]);
                    $(".second").text(nums[1]);
                    $("#horas").text(horas);
                }
            });
        }

        function regularArticle(article) {

            titleContent.innerHTML = article.titulo;
            textContent.innerHTML = article.texto;
            imagenes = article.multimedia.filter(multimedia => multimedia.tipoMultimedia_idtipoMultimedia == "1");
            if (imagenes && imagenes != "") {
                //carouselMultimedia.classList.remove("d-none");
                let indicadores = "";
                let slides = "";
                for (let multimediaIter = 0; multimediaIter < imagenes.length; multimediaIter++) {
                    let imageUrl = <?php echo '"https:////admon.bionix.com.co//recursos//uresidencial'.htmlspecialchars($_GET["res"]).'//anuncios//anuncio"'; ?> + article.idanuncio + '//images//' + imagenes[multimediaIter].url;
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
        }

        function fullScreenArticle(article) {
            console.log(article);
            imagenes = article.multimedia.filter(multimedia => multimedia.tipoMultimedia_idtipoMultimedia == "1");
            let imageUrl = <?php echo '"https:////admon.bionix.com.co//recursos//uresidencial'.htmlspecialchars($_GET["res"]).'//anuncios//anuncio"'; ?> + article.idanuncio + '//images//' + imagenes[0].url;
            fullScreenContent.innerHTML = '<img src="' + imageUrl + '">';
        }

        const titleContent = document.getElementById("article-title");
        const textContent = document.getElementById("article-content");
        const carouselMultimedia = document.getElementById("myCarousel");
        const fullScreenContent = document.getElementById("fullScreenArticle");

        function getArticles() {
            $.get(<?php echo '"https://admon.bionix.com.co/index.php/apis/api_controller/getNoticiaTv/'.htmlspecialchars($_GET["res"]).'"'; ?>, function(data) {
                //var noticiaInicio = data.data.pop();
                var data = data.data;
                data.push("The end")
                var interval = 20000;
                var itemsProcessed = 0;

                data.forEach(function(article, index) {
                    setTimeout(function() {
                        itemsProcessed++;
                        if (itemsProcessed === data.length) {
                            getArticles();
                        } else {
                            if (article.fullscreen == '1') {
                                //console.log("tiene fullscreen");
                                $("#fullScreenArticle").removeClass("d-none");
                                $("#regularArticle").addClass("d-none");
                                fullScreenArticle(article);
                            } else {
                                //console.log("no tiene fullscreen");
                                $("#regularArticle").removeClass("d-none");
                                $("#fullScreenArticle").addClass("d-none");
                                regularArticle(article);
                            }
                        }
                    }, index * interval);
                });
            });
        }
    </script>
</body>

</html>