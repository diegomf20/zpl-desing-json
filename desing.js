
function writeCanvasZpl(id_context,jsonZPL) {
    var canvas = document.getElementById(id_context);
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

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
                canvasLine(ctx,objZPL)
                // preCompiler+=zplLine(objZPL);
                break;
            case "barcode":
                canvasBarcode(ctx,objZPL)
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
    ctx.font = `${size}pt Verdana`;
    var rWidth = ctx.measureText(content).width;
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
            ctx.translate(x,y+size);
            ctx.fillText(content , 0, 0);
                
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
    console.log(w);

    ctx.beginPath();
    ctx.lineWidth = border;
    // ctx.strokeStyle = "red";
    ctx.rect(x, y, w, h);
    ctx.stroke();
}

function canvasLine(ctx,objZPL) {
    var x=objZPL.x;
    var y=objZPL.y;
    var border=objZPL.border;
    var w=objZPL.rotate==90 ? 0 : objZPL.w;
    var h=objZPL.rotate==90 ? objZPL.w : 0;
    ctx.beginPath();
    ctx.lineWidth = border;
    // ctx.strokeStyle = "red";
    ctx.rect(x, y, w, h);
    ctx.stroke();

}


function canvasBarcode(ctx,objZPL) {
    var content=objZPL.content;
    var x=objZPL.x;
    var y=objZPL.y;
    var h=objZPL.h;
    var scale=objZPL.scale;
    var rotate=objZPL.rotate;
    
    JsBarcode("#barcode", content,{
        format: "CODE128",
        lineColor: "#000",
        width: scale,
        height: h,
        margin: 0
        // displayValue: false
    });
    barcode=document.getElementById("barcode");

    ctx.save();
    switch (rotate) {
        case 90:
            ctx.translate(x+h,y);
            ctx.rotate(0.5*Math.PI);
            break;
        case 180:
            ctx.translate(x+rWidth,y);
            ctx.rotate(1.0*Math.PI);
            break;
        case 270:
            ctx.translate(x+size,y+rWidth);
            ctx.rotate(1.5*Math.PI);
            break;
            
        default:
            ctx.translate(x,y);
            break;
    }
    ctx.drawImage(barcode,0,0);
    // ctx.fillText(content,x,y);
    ctx.restore();

}