function compilerZpl(jsonZPL) {
    var preCompiler="";
    for (let i = 0; i < jsonZPL.length; i++) {
        const objZPL = jsonZPL[i];
        switch (objZPL.type) {
            case "text":
                preCompiler+=zplText(objZPL);
                break;
            case "box":
                preCompiler+=zplBox(objZPL);
                break;
            case "line":
                preCompiler+=zplLine(objZPL);
                break;
            case "barcode":
                preCompiler+=zplBarCode(objZPL);
                break;
        
            default:
                break;
        }
    }
    return `^XA\n${ preCompiler }^XZ`;
}

function zplText(objZPL) {
    var x=objZPL.x;
    var y=objZPL.y;
    var size=objZPL.size;
    var rotate=objZPL.rotate;
    var angule="";
    switch (rotate) {
        case 0:
            angule='N';
            break;
        case 90:
            angule='R';
            break;
        case 180:
            angule='I';
            break;
        case 270:
            angule='B';
            break;
    
        default:
            angule='N'
            break;
    }


    var content=objZPL.content;

    return `^FO${x},${y}\n^AD${ angule },${size}\n^FD${content}^FS\n`;
}

function zplBox(objZPL) {
    var x=objZPL.x;
    var y=objZPL.y;
    var w=objZPL.w;
    var h=objZPL.h;
    var border=objZPL.border;
    
    return `^FO${x},${y}\n^GB${w},${h},${border}^FS\n`;
}

function zplLine(objZPL) {
    var x=objZPL.x;
    var y=objZPL.y;
    var border=objZPL.border;
    var w=objZPL.rotate==90 ? 0 : objZPL.w;
    var h=objZPL.rotate==90 ? objZPL.w : 0;

    return `^FO${x},${y}\n^GB${w},${h},${border}^FS\n`;
}
function zplBarCode(objZPL) {
    var content=objZPL.content;
    var x=objZPL.x;
    var y=objZPL.y;
    var h=objZPL.h;
    var scale=objZPL.scale;
    var rotate=objZPL.rotate;
    var angule="";
    switch (rotate) {
        case 0:
            angule='N';
            break;
        case 90:
            angule='R';
            break;
        case 180:
            angule='I';
            break;
        case 270:
            angule='B';
            break;
    
        default:
            angule='N'
            break;
    }

    return `^FO${x},${y}\n^BY${scale},2,${h}\n^BC${ angule },,,,,A^FD${content}^FS\n`;
}