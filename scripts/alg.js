

var buttons = {};

window.onload = function(){
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
};

function printImage(image){
    var body = document.body;
    for (var i = 0; i < image.length; i++){
        for(var j = 0; j < image[i].length; j++){
            console.log(i + ";" + j);
            if(image[i][j] === 1) {
                $('body').append('<div style="top:' + 10 * i + 'px;left:' + 10 * j + 'px"></div>');
            }
        }
    }
}

function createTouchRect(shape){
    var minX = shape[0];
    var maxX = shape[0];
    var minY = shape[0];
    var maxY = shape[0];

    for(var i = 0; i<shape.length; i++){
        if(shape[i][0] < minX[0]) {
            minX = shape[i]
        }
        if(shape[i][0] > maxX[0]) {
            maxX = shape[i]
        }
        if(shape[i][1] < minY[1]) {
            minY = shape[i];
        }
        if(shape[i][1] > maxY[1]){
            minY = shape[i];
        }
    }

    var rect = [[minX[0],minY[1]],[minX[0],maxY[1]],[maxX[0],maxY[1]],[maxX[0],minY[1]]];

    return rect;

}





function findShape(data){
    var shape=[];
    var image = data;


    var boundaryPixel = findBoundaryPixel(image);
    var startX = boundaryPixel.white[0];
    var startY = boundaryPixel.white[1];

    var prevX = startX;
    var prevY = startY;
    var curX = boundaryPixel.black[0];
    var curY = boundaryPixel.black[1];

    while(true){
        if(image[curX][curY] === 1) {
            shape.push([curX,curY]);
            console.log('Black pixel' + [curX,curY]);
            image[curX][curY]+=1;
        }

        var nexts = chooseNextStep(prevX,prevY,curX,curY,image[curX][curY]);
        prevX = curX;
        prevY = curY;
        curX = nexts[0];
        curY = nexts[1];

        if(curX === startX && curY === startY){
            break;
        }
    }
    return shape;
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
