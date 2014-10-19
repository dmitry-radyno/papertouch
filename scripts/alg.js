/*

var buttons = {};*/

/*window.onload = function(){
  var button = document.getElementById('button');
  var printButton = document.getElementById('print-button');
  var input = document.getElementById('input');


    button.addEventListener('click',function(){
        var buttonID = input.value;
        var buttonShape = findShape(testData);
        buttonShape = createTouchRect(buttonShape);
        console.log('Button shape:' + buttonShape);
        buttons[buttonID] = {
            rect:buttonShape
        }
    });

    printButton.addEventListener('click',function(){
        printImage(testData);
    });
};*/
var buttons = {};
function printImage(image){
    var body = document.body;
    for (var i = 0; i < image.length; i++){
            /*console.log(i + ";" + j);*/
        document.body.innerHTML += '<div class="px" style="top:' + 10 * image[0] + 'px;left:' + 10 * image[1] + 'px"></div>';
    }
}

function createTouchRect(shape){
    var minX = Infinity;
    var maxX = -1;
    var minY = Infinity;
    var maxY = -1;

    for(var i = 0; i<shape.length; i++){
        if(shape[i][0] < minX) {
            minX = shape[i][0];
        }
        if(shape[i][0] > maxX) {
            maxX = shape[i][0]
        }
        if(shape[i][1] < minY) {
            minY = shape[i][1];
        }
        if(shape[i][1] > maxY){
            maxY = shape[i][1];
        }
    }

    var rect = [[minX+10, minY+10], [maxX-10, maxY-10]];
    //var rect = [[minX[0],minY[1]],[minX[0],maxY[1]],[maxX[0],maxY[1]],[maxX[0],minY[1]]];

    return rect;

}





function findShape(data,buttonID){
    var shape=[];
    var image = data;


    var boundaryPixel = findBoundaryPixel(image);
    if (!boundaryPixel) {
        return null;
    }
    var startX = boundaryPixel.white[0];
    var startY = boundaryPixel.white[1];

    var prevX = startX;
    var prevY = startY;
    var curX = boundaryPixel.black[0];
    var curY = boundaryPixel.black[1];
    var iterates = 0;

    while(true){
        /*if (!image[curX] || typeof(image[curY]) === "undefined") {
            return null;
        }*/
        if(image[curX] && image[curX][curY] === 1) {
            shape.push([curX,curY]);
            image[curX][curY]+=1;
        }

        var nexts = chooseNextStep(prevX,prevY,curX,curY,image[curX] ? image[curX][curY] || 0 : 0);
        prevX = curX;
        prevY = curY;
        curX = nexts[0];
        curY = nexts[1];

        if(curX === startX && curY === startY){
            break;
        }
        iterates++;
        if (iterates > 5000) {
            return null;
        }
    }
    //printImage(shape);
    var buttonRect = createTouchRect(shape);
    /*buttons[buttonID] ={
        rect:buttonRect
    };
    buttonMonitoring(buttonID);*/
    return buttonRect;
}

function findShapes(data, existingButtons) {
    var subtract = function(data, button) {
            var x0 = Math.max(button[0][1] - 10, 0),
                x1 = Math.min(button[1][1] + 10, data[0] ? data[0].length : 0),
                y0 = Math.max(button[0][0] - 10, 0),
                y1 = Math.min(button[1][0] + 10, data.length);

            for (var row = y0; row <= y1; row++) {
                for (var col = x0; col <= x1; col++) {
                    if (data[row]) {
                        data[row][col] = 0;
                    }
                }
            }
            return data;
        },
        isFilled = function(data) {
            var filled = 0,
                height = data.length,
                width = data[0] ? data[0].length : 0;
            for (var i = 0; i < height; i++) {
                for (var j = 0; j < width; j++) {
                    filled += data[i][j] ? 1 : 0;
                }
            }
            return filled/(width*height) > 0.3;
        },
        isEmpty = function(data) {
            for (var i = 0; i < data.length; i++) {
                for (var j = 0; j < data[i].length; j++) {
                    if (data[i][j]) {
                        return false;
                    }
                }
            }
            return true;
        },
        isButton = function(button) {
            var minSize = 20;
            return (button[1][0] - button[0][0] > minSize) && (button[1][1] - button[0][1] > minSize);
        },
        getButtonHash = function(data, button) {
            var sum = 0;
            for (var row = button[0][0]; row <= button[1][0]; row++) {
                for (var col = button[0][1]; col <= button[1][1]; col++) {
                    if (data[row]) {
                        sum += data[row][col];
                    }
                }
            }
            return sum;
        },
        cropArea = function(data, coords) {
            var cropedData = [];
            for (var row = coords[0][0], i = 0; row <= coords[1][0]; row++, i++) {
                cropedData[i] = [];
                for (var col = coords[0][1], j = 0; col <= coords[1][1]; col++, j++) {
                    if (data[row]) {
                        cropedData[i][j] = data[row][col] || 0;
                    }
                }
            }
            return cropedData;
        },
        uuid = (function() {
            var index = 1;
            return function() {
                return index++;
            }
        })();
    var found = true,
        button = null,
        buttons = [];

    for (var i = 0; i < existingButtons.length; i++) {
        button = findShape(cropArea(data, existingButtons[i].coords));
        if (button) {
            if (isButton(button)) {
                buttons.push({
                    id: existingButtons[i].id,
                    sum: existingButtons[i].sum,
                    coords: button
                });
            }
            data = subtract(data, button);
        }
    }
    while (!isEmpty(data) && !isFilled(data) && found && buttons.length < 5) {
        button = findShape(data);
        if (button) {
            if (isButton(button)) {
                buttons.push({
                    id: uuid(),
                    sum: getButtonHash(data, button),
                    coords: button
                });
            }
            data = subtract(data, button);
            //log(data);
        } else {
            found = false;
        }
    }
    return buttons;
}

function chooseNextStep(prevX,prevY,curX,curY,direction){
    var isX = curX - prevX;
    var isY = curY - prevY;
    var stepX;
    var stepY;
    if(direction > 0){
        direction = 1;
    }else{
        direction = -1;
    }

    if(isX === 0 && isY === 1) {
        stepX = -1*direction;
        stepY = 0;
    }
    if(isX === 0 && isY === -1 ) {
        stepX = 1*direction;
        stepY = 0;
    }
    if(isX === 1 && isY === 0){
        stepX = 0;
        stepY = 1*direction;
    }
    if(isX === -1 && isY === 0){
        stepX = 0;
        stepY = -1*direction;
    }

    var nextX = curX + stepX;
    var nextY = curY + stepY;
    return [nextX,nextY];
}

function findBoundaryPixel(image){
    var prev, cur;
    var prevX, prevY;
    for(var i = 0; i < image.length; i++){
        for(var j = 0; j< image[i].length; j++){
            cur = image[i][j];
            if(cur === 1 && prev === 0){
                /*console.log('Boundary pixel white'+[prevX,prevY]+' Boundary pixed dark' + [i,j] );*/
                return {
                    white:[prevX,prevY],
                    black:[i,j]
                }
            }
            prev = cur;
            prevX = i;
            prevY = j;
        }
    }
}

function buttonMonitoring(buttonID){
    var button = buttons[buttonID];
    var event = false;
    var rect = button.rect;
    if(!button.monitoring == true) {
        button.interval = setInterval(function () {
            if(hasTouch(rect) && !event){
                alert('Event');
                event = true;
                setTimeout(function(){
                    event = false;
                },500)
            }
        }, 1000);
        buttons[buttonID].monitoring = true;
    }
}

function hasTouch(rect, data){
    var range = 2;
    var trustCount = 3;

    for(var i = rect[0][0]; i < rect[1][0]; i+=5){
        for(var j = rect[0][1]; j < rect[1][1]; j++){
            if(data[i][j] === 1){
                for(var z = i+1; z<i+trustCount; i++ ){
                    console.log('loop1s');
                    var trusted = false;
                    for(var x = j+range; x > j-range; j--){
                        console.log('loop2');
                        if(rect[z][x] === 1){
                            trusted = true;
                        }
                    }
                    if(!trusted){
                        return false;
                    }
                }
            }
            return true;
        }
    }
}




var testData2 = [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,1,1,0,0,0],[0,0,0,1,1,1,0,0,0],[0,0,0,0,1,0,0,0,0],[0,0,0,1,1,0,0,0,0],[0,0,0,0,1,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];
