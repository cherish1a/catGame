const cat = document.getElementById("cat");

let backImage = "";
let frontImage = "";

let dominantColor = {
    r: 200,
    g: 200,
    b: 200
};

document
.getElementById("backUpload")
.addEventListener("change", e => {

    const file = e.target.files[0];

    if(!file) return;

    backImage = URL.createObjectURL(file);

    cat.src = backImage;

    const img = new Image();

    img.onload = () => {
        dominantColor = getDominantColor(img);
    };

    img.src = backImage;
});

document
.getElementById("frontUpload")
.addEventListener("change", e => {

    const file = e.target.files[0];

    if(!file) return;

    frontImage = URL.createObjectURL(file);
});

function getDominantColor(img){

    const canvas =
        document.createElement("canvas");

    const ctx =
        canvas.getContext("2d");

    canvas.width = 100;
    canvas.height = 100;

    ctx.drawImage(img,0,0,100,100);

    const data =
        ctx.getImageData(0,0,100,100).data;

    let r = 0;
    let g = 0;
    let b = 0;
    let count = 0;

    for(let i=0;i<data.length;i+=4){

        r += data[i];
        g += data[i+1];
        b += data[i+2];

        count++;
    }

    return {
        r:Math.floor(r/count),
        g:Math.floor(g/count),
        b:Math.floor(b/count)
    };
}

function getNoColor(base){

    const roll = Math.random();

    let factor;

    if(roll < 0.7){

        factor = 1.0;

    }else if(roll < 0.9){

        factor = 1.3;

    }else{

        factor = 0.7;
    }

    return `rgb(
        ${Math.min(255,Math.floor(base.r*factor))},
        ${Math.min(255,Math.floor(base.g*factor))},
        ${Math.min(255,Math.floor(base.b*factor))}
    )`;
}

function spawnNo(x,y){

    const no =
        document.createElement("div");

    no.className = "no";

    no.textContent = "ノ";

    no.style.left = x + "px";
    no.style.top = y + "px";

    no.style.color =
        getNoColor(dominantColor);

    const size =
        20 + Math.random()*80;

    no.style.fontSize =
        size + "px";

    const rotate =
        Math.random()*360;

    const flipX =
        Math.random()<0.5 ? -1 : 1;

    const flipY =
        Math.random()<0.5 ? -1 : 1;

    no.style.transform =
        `rotate(${rotate}deg)
         scale(${flipX},${flipY})`;

    document.body.appendChild(no);

    setTimeout(() => {

        no.remove();

    },1000);
}

cat.addEventListener("click", e => {

    if(!backImage) return;

    const count =
        3 + Math.floor(Math.random()*6);

    for(let i=0;i<count;i++){

        spawnNo(
            e.pageX + (Math.random()-0.5)*120,
            e.pageY + (Math.random()-0.5)*120
        );
    }

    if(frontImage && Math.random() < 0.2){

        cat.src = frontImage;

        setTimeout(() => {

            cat.src = backImage;

        },800);
    }
});
