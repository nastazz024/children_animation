
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#source_image')
                .attr('src', e.target.result);
            $('#target_image')
                .attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

window.addEventListener("load", function onWindowLoad() {
    var width = window.innerWidth / 3;
    var height = window.innerHeight;
    console.log(width)

    generatePalette(document.getElementById("palette"));

    var canvas = document.getElementById("canvas");
    var canvas_animation = document.getElementById("canvas_animation");
    var context = canvas.getContext("2d");
    var context_animation = canvas.getContext("2d");

    canvas.width = width;
    canvas.height = height;
    canvas_animation.width = width;
    canvas_animation.height = height;
    var leftcanvas;
    var topcanvas;
    var arr = [];

    leftcanvas = loader.offsetWidth + canvas.offsetLeft;
    topcanvas = canvas.offsetTop;
    var start = document.elementFromPoint(leftcanvas, topcanvas);
    // переменные для рисования
    context.lineCap = "round";
    context.lineWidth = 8;

    $("#clear").click(function () {
        arr = [];
        context.clearRect(0, 0, canvas.width, canvas.height);
    });

    var is_down = false;

    $("#canvas").mousedown(function () {
        is_down = true;
        console.log(is_down);
    });

    $("#canvas").mouseup(function () {
        is_down = false;
        console.log(is_down);
    });



    // На любое движение мыши по canvas будет выполнятся эта функция

    canvas.onmousemove = function drawIfPressed(e) {
        if (is_down) {
            // в "e"  попадает экземпляр MouseEvent
            var x = e.clientX - leftcanvas;
            var y = e.clientY - topcanvas;
            var dx = e.movementX;
            var dy = e.movementY;
            arr.push({ x, y });

            if (e.buttons > 0) {
                context.beginPath();
                context.moveTo(x, y);
                context.lineTo(x - dx, y - dy);
                context.strokeStyle = 'yellow';
                context.stroke();
                context.closePath();
            }
        }
    };
    canvas_motion = document.getElementById("canvas_animation");
    context_motion = canvas_motion.getContext("2d");


    document.getElementById("start").addEventListener("input", function () {
        document.getElementById("source_image").style.width = this.value + '%';
    });


    $("#btn_animation").click(function animation_img() {


        let index = 0;
        var interval = setInterval(function () {
            if (index <= arr.length) {

                drawFrame();

                var elem = document.getElementById('source_image');
                var x = arr[index].x - 60;
                var y = arr[index].y - 80;
                elem.style.left = x + 'px';
                elem.style.top = y + 'px';
                context_motion.drawImage(document.getElementById("source_image"), x, y, $("#source_image").width(), $("#source_image").height());
                index++

            }
            if (index === arr.length) {
                clearInterval(interval)
            }
        }, 80);


    })


    function drawFrame() {
        // Очистить холст
        context_motion.clearRect(0, 0, canvas.width, canvas.height);
    }

    function generatePalette(palette) {
        var paletteBlock = document.createElement('div');
        paletteBlock.className = 'button';
        paletteBlock.addEventListener('click', function changeColor(e) {
            context.strokeStyle = e.target.style.backgroundColor;
        });

    }
});
