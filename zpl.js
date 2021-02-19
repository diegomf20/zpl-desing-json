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
    return `^XA
                ${ preCompiler }
            ^XZ`;
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

    return `^FO${x},${y}
            ^AD${ angule },${18*(size-11)},${10*(size-11)}
            ^FD${content}^FS`;
}

function zplBox(objZPL) {
    var x=objZPL.x;
    var y=objZPL.y;
    var w=objZPL.w;
    var h=objZPL.h;
    var border=objZPL.border;

    return `^FO${x},${y}
            ^GB${w},${h},${border}
            ^FS`;
}

function zplLine(objZPL) {
    var x=objZPL.x;
    var y=objZPL.y;
    var w=objZPL.rotate==90 ? 1 : objZPL.w;
    var h=objZPL.rotate==90 ? objZPL.w : 1;
    var border=objZPL.border;

    return `^FO${x},${y}
            ^GB${w},${h},${border}
            ^FS`;
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

    return `^FO${x},${y}
            ^BY${scale},2,${h}
            ^BC${ angule },,,,,A^FD${content}^FS`;
}