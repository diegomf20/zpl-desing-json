$('#addText').click(function () {
    jsonZPL.push({
        "type": "text",
        "content": "{cod_lab}",
        "x": 10,
        "y": 0,
        "size": 16,
        "rotate": 90
    });
    write();
});

$('#addBox').click(function () {
    jsonZPL.push({
        "type": "box",
        "x": 50,
        "y": 50,
        "w": 50,
        "h": 100,
        "border": 1
    });
    write();
});
$('#addLine').click(function () {
    jsonZPL.push({
        "type": "line",
        "x": 100,
        "y": 100,
        "w": 100,
        "rotate": 90,
        "border": 2
    });
    write();
});
$('#addBarcode').click(function () {
    jsonZPL.push({
        "type": "barcode",
        "content": "77382978",
        "x": 150,
        "y": 150,
        "h": 60,
        // 1,2,3 scale
        "scale": 2,
        "rotate": 90
    });
    write();
});

function write() {
    writeCanvasZpl('myCanvas',jsonZPL)
    $('#contenido').html('')
    for (let i = 0; i < jsonZPL.length; i++) {
        const element = jsonZPL[i];
        $('#contenido').append(`<li>N°${i+1} ${element.type} 
                                    <button id="btn-edit" class="edit-${i}">Edit</button>
                                </li>`);
    }
    console.log(compilerZpl(jsonZPL));
}
$('body').on('click',"#btn-edit",function () {
    var index=$(this).attr('class').split('-')[1];
    var data=jsonZPL[index];
    console.log(data.content);
    $('#text-id').val(index);
    $('#text-content').val(data.content);
    $('#text-x').val(data.x);
    $('#text-y').val(data.y);
    $('#text-size').val(data.size);
    $('#text-rotate').val(data.rotate);
})

$('#update').click(function () {
    var index=$('#text-id').val();
    // var data=jsonZPL[index];
    jsonZPL[index].content=$('#text-content').val();
    jsonZPL[index].x=Number($('#text-x').val());
    jsonZPL[index].y=Number($('#text-y').val());
    jsonZPL[index].size=Number($('#text-size').val());
    jsonZPL[index].rotate=Number($('#text-rotate').val());
    write()
    console.log(jsonZPL);
});