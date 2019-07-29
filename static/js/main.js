
var apiCategories = '/api/pro/template_category',
    apiTemplates = '/api/pro/template',
    editorURL = '/pro/editor/',
    currURL = '',
    global_category_id,
    global_keyword,
    global_page;
var loadFirstTime = true;




window.addEventListener("load", event => {
element = document.getElementById('home-section')
element1 = document.getElementById('home-box')

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


});

window.addEventListener("load", event => {
var startPos = {x: 0, y: 0};


// enable draggables to be dropped into this
    interact('.dropzone').dropzone({
  // only accept elements matching this CSS selector
  accept: '#yes-drop',
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
// update the element's style
    relatedTarget.style.width = 217.35 + 'px';
    relatedTarget.style.height = 100 + 'px';

        // translate the element
        relatedTarget.style.webkitTransform =
                relatedTarget.style.transform =
                'translate(' + x + 'px,' + y + 'px)';

        // update the posiion attributes
        relatedTarget.setAttribute('data-x', x);
        relatedTarget.setAttribute('data-y', y);

  },
  ondropdeactivate: function (event) {
    // remove active dropzone feedback
    event.target.classList.remove('drop-active')
    event.target.classList.remove('drop-target')
  }})



});

window.addEventListener("load", event => {

interact(".resizable")
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
    target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height)}
  })



});

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






