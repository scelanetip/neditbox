
var apiCategories = '/api/pro/template_category',
    apiTemplates = '/api/pro/template',
    editorURL = '/pro/editor/',
    currURL = '',
    global_category_id,
    global_keyword,
    global_page;
var loadFirstTime = true;



function loadCanvas(auxcanvas) {
                        var canvas = auxcanvas;
//                        console.log(canvas)
                        canvas.style.position = "absolute";
                        var ctx = canvas.getContext('2d');

                        var canvas1 = document.createElement('canvas');
                        canvas1.width = canvas.width;
                        canvas1.height = canvas.height;
                        var ctx1 = canvas1.getContext('2d');

                        var canvas2 = document.createElement('canvas');
                        canvas2.width = canvas.width;
                        canvas2.height = canvas.height;
                        var ctx2 = canvas2.getContext('2d');
                        //
                        var op = null;
                        var points = null
                        var img = new Image();

                        img.onload = function() {
                            canvas.width = img.width;
                            canvas.height = img.height;
                            canvas1.width = img.width;
                            canvas1.height = img.height;
                            canvas2.width = img.width;
                            canvas2.height = img.height;
                            op = new Perspective(ctx, img);
                             points = [
                                        [0, 0],
                                        [img.width, 0],
                                        [img.width, img.height],
                                        [0, img.height]
                                       ]
                        // img
                            op.draw(points);
                            prepare_lines(ctx2, points);
                            draw_canvas(ctx, ctx1, ctx2);

                        };
                        img.src = "https://upload.wikimedia.org/wikipedia/commons/d/dc/Flat_Screen.svg";
                        //"{% static 'x/img/pic.jpg' %}";


                        var drag = null;
                        canvas.addEventListener("mousedown", function(event) {
                            event.preventDefault();
                            var p = get_mouse_position(event);
                            for( var i=0; i<4; i++ ) {
                                var x = points[i][0];
                                var y = points[i][1];
                                if( p.x < x + 10 && p.x > x - 10 && p.y < y + 10 && p.y > y - 10 ) {
                                    drag = i;
                                    break;
                                }
                            }
                        }, false);
                        canvas.addEventListener("mousemove", function(event) {
                            event.preventDefault();
                            if(drag == null) { return; }
                            var p = get_mouse_position(event);
                            points[drag][0] = p.x;
                            points[drag][1] = p.y;
                            prepare_lines(ctx2, points, true);
                            draw_canvas(ctx, ctx1, ctx2);
                        }, false);
                        canvas.addEventListener("mouseup", function(event) {
                            event.preventDefault();
                            if(drag == null) { return; }
                            var p = get_mouse_position(event);
                            points[drag][0] = p.x;
                            points[drag][1] = p.y;
                            ctx.clearRect(0, 0, canvas.width, canvas.height);
                            ctx1.clearRect(0, 0, canvas.width, canvas.height);
                    var s = (new Date()).getTime();
                            op.draw(points);
//                    document.getElementById("ms").innerHTML = ( (new Date()).getTime() - s );
                            prepare_lines(ctx2, points);
                            draw_canvas(ctx, ctx1, ctx2);
                            drag = null;
                        }, false);
                        canvas.addEventListener("mouseout", function(event) {
                            event.preventDefault();
                            drag = null;
                        }, false);
                        canvas.addEventListener("mouseenter", function(event) {
                            event.preventDefault();
                            drag = null;
                        }, false);

                    }


                    function prepare_lines(ctx, p, with_line) {
                        ctx.save();
                        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                        //ctx.clearRect(0, 0, 600, 450);
                        //
                        if( with_line == true ) {
                            ctx.beginPath();
                            ctx.moveTo(p[0][0], p[0][1]);
                            for( var i=1; i<4; i++ ) {
                                ctx.lineTo(p[i][0], p[i][1]);
                            }
                            ctx.closePath();
                            ctx.strokeStyle = "red";
                            ctx.stroke();
                        }
                        //
                        ctx.fillStyle = "red";
                        for( var i=0; i<4; i++ ) {
                            ctx.beginPath();
                            ctx.arc(p[i][0], p[i][1], 4, 0, Math.PI*2, true);
                            ctx.fill();
                        }
                        //
                        ctx.restore();
                    }

                    function draw_canvas(ctx, ctx1, ctx2) {
<!--                        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);-->
                        ctx.drawImage(ctx1.canvas, 0, 0);
                        ctx.drawImage(ctx2.canvas, 0, 0);
                    }

                    function get_mouse_position(event) {
                        var rect = event.target.getBoundingClientRect() ;
                        return {
                            x: event.clientX - rect.left,
                            y: event.clientY - rect.top
                        };
                    }



function previewFile() {
  var preview = document.querySelector('img[id=imgedit]');
  var file    = document.querySelector('input[type=file]').files[0];
  var reader  = new FileReader();

  reader.addEventListener("load", function () {
    preview.src = reader.result;
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }
}


window.addEventListener("load", event => {
element = document.getElementById('home-section')
element1 = document.getElementById('home-box')
cnt = 0;
var firstime = true;

var startPos = { x: 0, y: 0};

interact(".interactable")

    .draggable({

        restrict: {
            restriction: element,
            elementRect: { top: 0.25, left: 0.25, bottom: 0.75, right: 0.75 }
        }

    })

    .on('dragmove', function (event) {



    if (event.ctrlKey) {

        var target = event.target,
                // keep the dragged position in the data-x/data-y attributes
                x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
                y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        // translate the element
        target.style.webkitTransform =
                target.style.transform =
                'translate(' + x + 'px,' + y + 'px)';

        // update the posiion attributes
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);}
    })
    .on('dragstart', function (event) {

    if (event.ctrlKey ) {
            var interaction = event.interaction;
            var clone;
            var start_zidx = 0;

            if(firstime){

//                var rect = interact.getElementRect(event.target)
//                startPos.x = rect.left - rect.width  / 2;
//                startPos.y = rect.top  - rect.height / 2;
//                console.log(startPos)
//
//                start_zidx = event.target.style.zIndex
//                console.log(start_zidx)

                clone = event.target.cloneNode(true);
                clone.dragOrigin = event.target;

                event.interaction.element = clone;
                event.interaction.dragging = false;


                var div = event.target.parentElement;

                cnt = 1;
                clone.setAttribute("id", "canvas-perspective-"+cnt);
                clone.setAttribute("class", "interactable");
                clone.style.zIndex = cnt;
                clone.style.position = "absolute";


//                // update the posiion attributes
//                clone.setAttribute('data-x', startPos.x );
//                clone.setAttribute('data-y', startPos.y);

                loadCanvas(clone);
                div.appendChild(clone);

                firstime = false;

            }else{
                canvas_name= event.target.id.split("-");

                if(event.target.dragOrigin && canvas_name[2] >= cnt){
                    clone = event.target.cloneNode(true);
                    clone.dragOrigin = event.target;

                    event.interaction.element = clone;
                    event.interaction.dragging = false;

                    var div = event.target.parentElement;


//                    clone.setAttribute('data-x', startPos.x );
//                    clone.setAttribute('data-y', startPos.y);
                    cnt = cnt+1;
                    clone.setAttribute("id", "canvas-perspective-"+cnt);
                    clone.setAttribute("class", "interactable");
                    clone.style.zIndex = cnt;
                    clone.style.position = "absolute";

                    loadCanvas(clone);
                    div.appendChild(clone);

                }
            }


}
    });



});

window.addEventListener("load", event => {
var startPos = {x: 0, y: 0};


// enable draggables to be dropped into this
    interact('.dropzone').dropzone({
  // only accept elements matching this CSS selector
  accept: '.interactable',
  // Require a 75% element overlap for a drop to be possible
  overlap: 0.75,

  // listen for drop related events:
   ondropactivate: function (event) {
    // add active dropzone feedback
    event.target.classList.add('drop-active')
  },
  ondragenter: function (event) {

    var draggableElement = event.relatedTarget
    var dropzoneElement = event.target

    // feedback the possibility of a drop
    dropzoneElement.classList.add('drop-target')
    draggableElement.classList.add('can-drop')


    if (!startPos) {

        var rect = interact.getElementRect(event.target)
        startPos.x = rect.left - rect.width  / 2;
        startPos.y = rect.top  - rect.height / 2;

        }


    // snap to the start position
//    event.interactable.snap({ anchors: [startPos] });

  },
  ondragleave: function (event) {
    // remove the drop feedback style
    event.target.classList.remove('drop-target')
    event.relatedTarget.classList.remove('can-drop')

  },
  ondrop: function (event) {

//     event.relatedTarget.textContent =  startPos.x
     var relatedTarget = event.relatedTarget,
                // keep the dragged position in the data-x/data-y attributes
                x = startPos.x,
                y = startPos.y;
     var img = new Image();
     img.src = "https://upload.wikimedia.org/wikipedia/commons/d/dc/Flat_Screen.svg";


    var startW = img.width ;
    var startH = img.height;
// update the element's style
    relatedTarget.style.width = startW + 'px';
    relatedTarget.style.height = startH + 'px';

        // translate the element
        relatedTarget.style.webkitTransform =
                relatedTarget.style.transform =
                'translate(' + x + 'px,' + y + 'px)';

        // update the posiion attributes
        relatedTarget.setAttribute('data-x', x);
        relatedTarget.setAttribute('data-y', y);
        relatedTarget.style.position = "absolute";
        relatedTarget.style.zIndex = 100;

  },
  ondropdeactivate: function (event) {
    // remove active dropzone feedback
    event.target.classList.remove('drop-active')
    event.target.classList.remove('drop-target')
  }})



});

window.addEventListener("load", event => {

interact(".interactable")
  .resizable({
    // resize from all edges and corners
    edges: { left: true, right: true, bottom: true, top: true },

    restrict: {
            restriction: element,
            elementRect: { top: 0.25, left: 0.25, bottom: 0.75, right: 0.75 }
        },

    inertia: true
  })
  .on('resizemove', function (event) {

  if (event.shiftKey) {

    var target = event.target
    var x = (parseFloat(target.getAttribute('data-x')) || 0)
    var y = (parseFloat(target.getAttribute('data-y')) || 0)

    // update the element's style
    target.style.width = event.rect.width + 'px'
    target.style.height = event.rect.height + 'px'

    // translate when resizing from top or left edges
    x += event.deltaRect.left
    y += event.deltaRect.top

    target.style.webkitTransform = target.style.transform =
        'translate(' + x + 'px,' + y + 'px)'

    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
//    target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height)
}
  })



});



window.addEventListener("load", function() {
var canvas = document.getElementById("canvas-perspective");
loadCanvas(canvas);}
);

//function loadTemplate(idCategory, keyword, page ) {
//    $(window).scrollTop(0);
//    if (idCategory == undefined) {idCategory = (global_category_id?global_category_id:'');}
//    if (keyword == undefined) {keyword = (global_keyword?global_keyword:'');}
//    if (page == undefined) {page ='';}
//    $('#list-templates').text('');
//    $('#pagination-template').hide();
//    var numberPage = 0;
//    $.ajax({
//        url: apiTemplates+'/'+idCategory+'?keyword='+keyword+'&page='+page,
//        method: 'GET',
//        success: function(response){
//            global_category_id = idCategory;
//            global_keyword = keyword;
//            global_page = global_page;
//            numberPage = response.total_pages;
//
//            var newURL = '/pro/template/';
//            newURL = '/pro/template/'+idCategory;
//
//            if(keyword){
//                newURL = newURL+'?keyword='+keyword
//            }
//
//            if (page=='') {page=1;}
//            newURL = newURL+'?page='+page;
//
//            if (loadFirstTime == false) {
//                if(newURL != currURL){
//                    currURL = newURL;
//                    window.history.pushState({'idCategory':idCategory,'keyword':keyword,'page':page}, "", newURL);
//                }
//            }
//
//            if (response.data.length > 0) {
//                $('#pagination-template').show();
//            } else {
//                $('#list-templates').text('No template found.');
//                return;
//            }
//
//            $('#list-templates').html("");
//            for (var i = 0; i < response.data.length; i++) {
//                $('#list-templates').
//                append('<div class="item-category">'
//                            +'<a href="#" class="wrap-img-item" id= "'+response.data[i].id+'" data-asset_key="'+response.data[i].asset_key+'" data-name="'+response.data[i].name+'" data-description="'+response.data[i].description+'" data-dimension_text="'+response.data[i].dimension_text+'" data-total_filesize="'+response.data[i].total_filesize+'" data-category_name="'+response.data[i].category_name+'" data-keywords="'+response.data[i].keywords+'" data-images="'+response.data[i].images+'">'
//                                +'<img class="lazy" src="../../images/bg-480x318.jpg" data-original="'+response.data[i].thumbs[0]+'">'
//                            +'</a>'
//                            // +'<div class="title-item">'+response.data[i].name+'</div>'
//                        +'</div>');
//            }
//
//            $("img.lazy").lazyload({
//                threshold : 200
//            });
//
//            if (loadFirstTime) {
//                var value_hash = location.hash.split('#')[1];
//                if (value_hash != undefined) {
//                    $('#'+value_hash).trigger('click');
//                }
//            }
//            var setFirstPage = parseInt(page);
//
//            $('#pagination-template').twbsPagination({
//                totalPages: response.total_pages,
//                visiblePages: 4,
//                prev:'<i class="fa fa-angle-left"></i>',
//                next:'<i class="fa fa-angle-right"></i>',
//                first:false,
//                last:false,
//                startPage:setFirstPage,
//                onPageClick: function (event, pageCurrent) {
//                    if(loadFirstTime == true){
//                        loadFirstTime = false;
//                    }else{
//                        loadTemplate(idCategory,keyword, pageCurrent);
//                    }
//                }
//            });
//        },
//        error: function(jqXHR, textStatus, errorThrown) {
//        },
//        complete: function(e) {
//        }
//    });
//}






