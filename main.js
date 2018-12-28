"use strict";

window.addEventListener("load", function onWindowLoad() {
    // canvas references
    var canvas = document.getElementById("canvas");
    var canvasAnimation = document.getElementById("canvas_animation");
    var context = canvas.getContext("2d");
    const canvasMotion = document.getElementById("canvas_animation");
    const contextMotion = canvasMotion.getContext("2d");
    var leftCanvas = loader.offsetWidth + canvas.offsetLeft;
    var topCanvas = canvas.offsetTop;

    // initial state
    var arr = [];
    var isDown = false;

    // canvas config
    canvas.width = window.innerWidth / 3;
    canvas.height = window.innerHeight;
    canvasAnimation.width = window.innerWidth / 3;
    canvasAnimation.height = window.innerHeight;
    context.lineCap = "round";
    context.lineWidth = 8;
    const INTERVAL = 80;

    drawPath();

    /* event listeners */
    $("#clear").click(function () {
        arr = [];
        context.clearRect(0, 0, canvas.width, canvas.height);
    });

    $("#canvas").mousedown(function () {
        isDown = true;
    });

    $("#canvas").mouseup(function () {
        isDown = false;
    });

    canvas.onmousemove = function drawIfPressed(e) {
        if (isDown) {
            var x = e.clientX - leftCanvas;
            var y = e.clientY - topCanvas;
            var dx = e.movementX;
            var dy = e.movementY;
            arr.push({x, y});

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
                contextMotion.drawImage(document.getElementById("source_image"), x, y, $("#source_image").width(), $("#source_image").height());
                index++
            }

            if (index === arr.length) {
                clearInterval(interval)
            }
        }, INTERVAL);
    })

    function drawFrame() {
        contextMotion.clearRect(0, 0, canvas.width, canvas.height);
    }

    function drawPath() {
        var paletteBlock = document.createElement('div');
        paletteBlock.className = 'button';
        paletteBlock.addEventListener('click', function changeColor(e) {
            context.strokeStyle = e.target.style.backgroundColor;
        });
    }

});

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#source_image')
                .attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}