let l = 150;
let mapaCacos = [];
let idCacos = [];
let cacosImg = [];
let raivaImg;
let end = false;

////
idCacos = [
  [3, 0, 6],
  [1, 4, 7],
  [2, 5, 8],
];

function preload() {
  for (let i = 0; i < 9; i++) {
    cacosImg[i] = loadImage("imagens/cacos/frag" + i + ".png");
  }
  raivaImg = loadImage("imagens/raiva.png");
}

function setup() {
  createCanvas(800, 600);
  textAlign(CENTER, CENTER);

  ////let zero = [Math.floor(random() * 3), Math.floor(random() * 3)];
  let zero = [0, 1]; ////
  //console.log(zero);

  for (let i = 0; i < 3; i++) {
    mapaCacos[i] = [];
    ////idCacos[i] = [null, null, null]; // PREENCHE A LINHA PROVISORIAMENTE
    for (let j = 0; j < 3; j++) {
      if (i == zero[0] && j == zero[1]) {
        mapaCacos[i][j] = 0;
        ////idCacos[i][j] = 0;
      } else {
        mapaCacos[i][j] = 1;
        let rand;
        ////
        /*
        do {
          //rand = floor(random(1, 9));
          rand = 1 + Math.floor(Math.random() * 8); // RANDOM NATIVO COM INTERVALO DE 1 A 9
        } while (acharId(i, rand));
        idCacos[i][j] = rand;
        */
      }
    }
  }

  //console.log(idCacos);
}

function draw() {
  background(0, 0, 30);

  noStroke();
  fill(255, 5, 142);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (mapaCacos[i][j] == 1) {
        //square(width / 2 + (i - 1.5) * l, height / 2 + (j - 1.5) * l, l);
        let index = idCacos[i][j];
        image(
          cacosImg[index],
          width / 2 + (i - 1.5) * l,
          height / 2 + (j - 1.5) * l,
          l,
          l
        );
        //text(index, width / 2 + (i - 1.5) * l, height / 2 + (j - 1.5) * l);
      }
    }
  }

  if (end) {
    image(raivaImg, 10, height / 2 - 150, 300, 300);
    fill(255, 5, 142);
    textSize(25);
    /*
    text(
      "PARABÉNS, VOCÊ CONSEGUIU! \n MAS UM PEDAÇO DO VASO SE PERDEU... \n QUE DROGAAA!!!",
      width / 2,
      height / 2 + 220
    );
    */
    document.getElementById(
      "fimdejogo"
    ).innerHTML = `<p id="parabens" class="pixelify-sans-text">PARABÉNS, VOCÊ CONSEGUIU! MAS UM PEDAÇO DO VASO SE PERDEU... QUE DROGAAA!!!</p>
    <a class="pixelify-sans-text" href="">CONTINUAR</a>`;
    noLoop();
  } else {
    acenderCelula();
  }
}

// FUNÇÃO QUE VERIFICA SE ALGUM ID DE 0 A 9 JÁ FOI UTILIZADO NAS CÉLULAS JÁ PREENCHIDAS
function acharId(a, num) {
  for (let i = 0; i < a + 1; i++) {
    for (let j = 0; j < 3; j++) {
      if (idCacos[i][j] == num) return true;
    }
  }
  return false;
}

// FUNÇÃO QUE VERIFICA SE ALGUMA CÉLULA ADJACENTE TEM O ZERO
function procurarZero(x, y) {
  let cel = null;
  if (x > 0) {
    if (mapaCacos[x - 1][y] == 0) cel = [x - 1, y];
  }
  if (x < 2) {
    if (mapaCacos[x + 1][y] == 0) cel = [x + 1, y];
  }
  if (y > 0) {
    if (mapaCacos[x][y - 1] == 0) cel = [x, y - 1];
  }
  if (y < 2) {
    if (mapaCacos[x][y + 1] == 0) cel = [x, y + 1];
  }
  return cel;
}

// FUNÇÃO QUE VERIFICA SE O JOGO TERMINOU
function verificarFimDeJogo() {
  //console.log("-----");
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let index = j + i * 3;
      //console.log(index, idCacos[j][i]);

      if (idCacos[j][i] != index) return false;
    }
  }
  end = true;
  return true;
}

function converterMouseParaCoordMatriz() {
  let x = Math.floor((mouseX - (width / 2 - 1.5 * l)) / l);
  let y = Math.floor((mouseY - (height / 2 - 1.5 * l)) / l);

  return [x, y];
}

function acenderCelula() {
  if (
    mouseX >= width / 2 - 1.5 * l &&
    mouseX <= width / 2 + 1.5 * l &&
    mouseY >= height / 2 - 1.5 * l &&
    mouseY <= height / 2 + 1.5 * l
  ) {
    let coordMatriz = converterMouseParaCoordMatriz();
    let x = coordMatriz[0];
    let y = coordMatriz[1];

    noFill();
    stroke(255);
    strokeWeight(2);
    rect(width / 2 + (x - 1.5) * l, height / 2 + (y - 1.5) * l, l, l);
  }
}

function mouseClicked() {
  if (!end)
    if (
      mouseX >= width / 2 - 1.5 * l &&
      mouseX <= width / 2 + 1.5 * l &&
      mouseY >= height / 2 - 1.5 * l &&
      mouseY <= height / 2 + 1.5 * l
    ) {
      let coordMatriz = converterMouseParaCoordMatriz();
      let x = coordMatriz[0];
      let y = coordMatriz[1];

      if (mapaCacos[x][y] == 1) {
        let cel = procurarZero(x, y);
        if (cel != null) {
          mapaCacos[x][y] = 0;
          mapaCacos[cel[0]][cel[1]] = 1;

          let temp = idCacos[x][y];
          idCacos[x][y] = 0;
          idCacos[cel[0]][cel[1]] = temp;

          verificarFimDeJogo();
          //redraw();
        }
      }
    }
}
