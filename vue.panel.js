var app=new Vue({
    el: '#app',
    data() {
        return {
            jsonZPL: [],
            index_select: -1,
        }
    },
    computed:{
        zpl(){
            writeCanvasZpl('myCanvas',this.jsonZPL)
            return compilerZpl(this.jsonZPL);
        }
    },
    methods: {
        addText(){
            this.jsonZPL.push({
                "type": "text",
                "content": "{cod_lab}",
                "x": 10,
                "y": 0,
                "size": 16,
                "rotate": 90
            });
            // this.write();
        },
        addBox(){
            this.jsonZPL.push({
                "type": "box",
                "x": 50,
                "y": 50,
                "w": 50,
                "h": 100,
                "border": 1
            });
        },
        addLine(){
            this.jsonZPL.push({
                "type": "line",
                "x": 100,
                "y": 100,
                "w": 100,
                "rotate": 90,
                "border": 2
            });
        },
        addBarcode(){
            this.jsonZPL.push({
                "type": "barcode",
                "content": "77382978",
                "x": 150,
                "y": 150,
                "h": 60,
                // 1,2,3 scale
                "scale": 2,
                "rotate": 90
            });
        },
        write(){
            writeCanvasZpl('myCanvas',this.jsonZPL)
        },
        edit(index){
            this.index_select=index
        },
        del(index){
            this.index_select=-1;
            this.jsonZPL.splice(index,1);
        }
    },
})