//alive 2-3
//dead 3

const convas = document .getElementById('canvas');
const ctx = convas.getContext('2d');

let matrix = Array(60).fill(null).map(() => Array(80).fill(0));


const red = '#ff0000';
const gray = '#555555';

let isDown = false;
document.addEventListener('mousedown', ()=>{isDown = true});
document.addEventListener('mouseup', ()=>{isDown = false});
convas.addEventListener('mousemove', (e)=>{
    console.log(isDown)
    if(!isDown)return;
    const j = Math.floor(e.offsetX/10);
    const i  = Math.floor(e.offsetY/10);
    drawDot(i, j ,true)
    matrix[i][j] = 1
})


function drawDot(i, j, isAlive){
    const Xpx = j*10;
    const Ypx = i*10;
    ctx.fillStyle = isAlive ? red : gray;
    ctx.shadowColor = isAlive ? red : gray;
    ctx.shadowBlur = isAlive ? 3 : 0;
    ctx.beginPath();
    ctx.arc(5+Xpx, 5+Ypx, 2, 0, Math.PI*2);
    ctx.fill();

}

function draw(matrix){
    matrix.forEach((line, i)=>{
        line.forEach((el, j)=>{
            drawDot(i, j, el);
        })
    })
}

function getNextStep(matrix){
    return matrix.map((line,i)=>{
        return line.map((el,j) =>{
            let neigtbours = 0;
            for(let y = i - 1 ; y<= i + 1 ; y+=1){
                for(let x = j - 1 ; x <= j + 1 ; x+=1){
                    neigtbours+=matrix[y]?.[x]
                }
            }
            neigtbours-=el;
            return el?neigtbours===2||neigtbours===3:neigtbours===3
        })
    })
}

setInterval(()=>{
    draw(matrix)
    matrix = getNextStep(matrix)
}, 1000/5)

function clearMatrix(){
    ctx.clearRect(0, 0, convas.width, convas.height)
    for (let i = 0; i < matrix.length; i++) {
        matrix[i].fill(0)
        isDown = false
    }
    draw(matrix);
}

