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

    var rect = [[minX, minY], [maxX, maxY]];
    //var rect = [[minX[0],minY[1]],[minX[0],maxY[1]],[maxX[0],maxY[1]],[maxX[0],minY[1]]];

    return rect;

}





function findShape(data){
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
    return createTouchRect(shape);
}

function findShapes(data) {
    var subtract = function(data, button) {
            for (var row = button[0][0]; row <= button[1][0]; row++) {
                for (var col = button[0][1]; col <= button[1][1]; col++) {
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
            var minSize = 30;
            return (button[1][0] - button[0][0] > minSize) && (button[1][1] - button[0][1] > minSize);
        };
    var found = true,
        button = null,
        buttons = [];
    while (!isEmpty(data) && !isFilled(data) && found && buttons.length < 4) {
        button = findShape(data);
        if (button) {
            if (isButton(button)) {
                buttons.push(button);
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
                console.log('Boundary pixel white'+[prevX,prevY]+' Boundary pixed dark' + [i,j] );
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

function hitTheButton(x,y){


}



var testData2 = [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,1,1,0,0,0],[0,0,0,1,1,1,0,0,0],[0,0,0,0,1,0,0,0,0],[0,0,0,1,1,0,0,0,0],[0,0,0,0,1,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];
