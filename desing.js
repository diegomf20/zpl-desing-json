
function writeCanvasZpl(id_context,jsonZPL) {
    var canvas = document.getElementById(id_context);
    var ctx = canvas.getContext("2d");
    for (let i = 0; i < jsonZPL.length; i++) {
        const objZPL = jsonZPL[i];
        switch (objZPL.type) {
            case "text":
                canvasText(ctx,objZPL);
                // preCompiler+=zplText(objZPL);
                break;
            case "box":
                canvasBox(ctx,objZPL)
                // preCompiler+=zplBox(objZPL);
                break;
            case "line":
                // preCompiler+=zplLine(objZPL);
                break;
            case "barcode":
                // preCompiler+=zplBarCode(objZPL);
                break;
        
            default:
                break;
        }
    }
}

function canvasText(ctx,objZPL){
    var content=objZPL.content;
    var x=objZPL.x;
    var y=objZPL.y;
    var size=objZPL.size;
    var rotate=objZPL.rotate;
    
    ctx.save();
    ctx.font = `${size}pt Arial`;
    var rWidth = ctx.measureText(content).width;
    var rHeight = ctx.measureText(content).height;
    console.log(rHeight);
    switch (rotate) {
        case 90:
            ctx.translate(x,y);
            ctx.rotate(0.5*Math.PI);
            ctx.fillText(content , 0, 0);
            break;
        case 180:
            ctx.translate(x+rWidth,y);
            ctx.rotate(1.0*Math.PI);
            ctx.fillText(content , 0, 0);
            break;
        case 270:
            ctx.translate(x+size,y+rWidth);
            ctx.rotate(1.5*Math.PI);
            ctx.fillText(content , 0, 0);
            break;
            
        default:
            ctx.fillText(content , x, y+size);
                
            break;
    }
    
    // ctx.fillText(content,x,y);
    ctx.restore();
}

function canvasBox(ctx,objZPL) {
    var x=objZPL.x;
    var y=objZPL.y;
    var w=objZPL.w;
    var h=objZPL.h;
    var border=objZPL.border;


    ctx.beginPath();
    ctx.lineWidth = border;
    // ctx.strokeStyle = "red";
    ctx.rect(x, y, w, h);
    ctx.stroke();
}