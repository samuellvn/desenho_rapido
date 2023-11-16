var lista_de_desenhos=["aircraft carrier","airplane","alarm clock","ambulance","angel",
"animal migration","ant","anvil","apple","arm","asparagus", "axe","backpack","banana",
"bandage","barn","baseball","baseball bat","basket","basketball","bat","bathtub","beach",
"bear", "beard","bed","bee","belt","bench","bicycle","binoculars","bird","birthday cake",
"blackberry","blueberry","book","boomerang", "bottlecap","bowtie","bracelet","brain","bread",
"bridge","broccoli","broom","bucket","bulldozer","bus","bush","butterfly", "cactus","cake",
"calculator","calendar","camel","camera","camouflage","campfire","candle","cannon","canoe",
"car","carrot","castle","cat","ceiling fan","cello","cell phone","chair","chandelier","church",
"circle","clarinet","clock","cloud","coffee cup", "compass","computer","cookie","cooler",
"couch","cow","crab","crayon","crocodile","crown","cruise ship","cup","diamond","dishwasher",
 "diving board","dog","dolphin","donut","door","dragon","dresser","drill","drums","duck",
 "dumbbell","ear", "elbow","elephant","envelope","eraser","eye","eyeglasses","face","fan",
 "feather","fence","finger","fire hydrant","fireplace","firetruck","fish", "flamingo",
 "flashlight","flip flops","floor lamp","flower","flying saucer","foot","fork","frog",
 "frying pan","garden","garden hose", "giraffe","goatee","golf club","grapes","grass",
 "guitar","hamburger","hammer","hand","harp","hat","headphones","hedgehog","helicopter",
 "helmet","hexagon","hockey puck","hockey stick","horse","hospital","hot air balloon",
 "hot dog","hot tub","hourglass","house", "house plant","hurricane","ice cream","jacket",
 "jail","kangaroo","key","keyboard","knee","knife","ladder","lantern","laptop", "leaf","leg",
 "light bulb","lighter","lighthouse","lightning","line","lion","lipstick","lobster","lollipop",
 "mailbox","map","marker","matches","megaphone","mermaid","microphone","microwave","monkey",
 "moon","mosquito","motorbike","mountain","mouse","moustache","mouth", "mug","mushroom","nail",
 "necklace","nose","ocean","octagon","octopus","onion","oven","owl","paintbrush","paint can",
 "palm tree","panda", "pants","paper clip","parachute","parrot","passport","peanut","pear",
 "peas","pencil","penguin","piano","pickup truck","picture frame", "pig","pillow","pineapple",
 "pizza","pliers","police car","pond","pool","popsicle","postcard","potato","power outlet",
 "purse","rabbit", "raccoon","radio","rain","rainbow","rake","remote control","rhinoceros",
 "rifle","river","roller coaster","rollerskates","sailboat", "sandwich","saw","saxophone",
 "school bus","scissors","scorpion","screwdriver","sea turtle","see saw","shark","sheep",
 "shoe","shorts", "shovel","sink","skateboard","skull","skyscraper","sleeping bag",
 "smiley face","snail","snake","snorkel","snowflake","snowman", "soccer ball","sock",
 "speedboat","spider","spoon","spreadsheet","square","squiggle","squirrel","stairs",
 "star","steak","stereo", "stethoscope","stitches","stop sign","stove","strawberry",
 "streetlight","string bean","submarine","suitcase","sun","swan","sweater", "swingset",
 "sword","syringe","table","teapot","teddy-bear","telephone","television","tennis racquet",
 "tent","The Eiffel Tower","The Great Wall of China","The Mona Lisa","tiger","toaster","toe",
 "toilet","tooth","toothbrush","toothpaste","tornado","tractor", "traffic light","train","tree",
 "triangle","trombone","truck","trumpet","tshirt","umbrella","underwear","van","vase","violin",
  "washing machine","watermelon","waterslide","whale","wheel","windmill","wine bottle",
  "wine glass","wristwatch","yoga","zebra","zigzag"];
var random_number=Math.floor((Math.random()*lista_de_desenhos.length)+1);
console.log(lista_de_desenhos[random_number]);
console.log(lista_de_desenhos.length);
var sketch=lista_de_desenhos[random_number];
document.getElementById("sketck").innerHTML="esboço a ser desenhado: "+sketch;
var pontos=0;
var contador_tempo=0;
var checa_tempo="";
var desenha_rascunho="";
var guarda_resposta="";
var canvas;
var classifier;

function update_canvas(){
    background("white");
    random_number=Math.floor((Math.random()*lista_de_desenhos.length)+1);
    console.log(lista_de_desenhos[random_number]);
    console.log(lista_de_desenhos.length);
    sketch=lista_de_desenhos[random_number];
    document.getElementById("sketck").innerHTML="esboço a ser desenhado: "+sketch;
}
function preload(){
    classifier=ml5.imageClassifier("DoodleNet");

}
function setup(){
    canvas=createCanvas(500, 400);
    canvas.center();
    background("white");
    canvas.mouseReleased(classify_canvas);
}
function classify_canvas(){
    classifier.classify(canvas, got_results);
}
function got_results(error, results){
    if(error==true){
        console.error(error);
    } else{
        console.log(results);
        desenha_rascunho=results[0].label;
        document.getElementById("label").innerHTML="seu esboço: "+desenha_rascunho.replace("_", " ");
        document.getElementById("confidence").innerHTML="precisão: "+Math.round(results[0].confidence *100)+"%";
    }
}
function draw(){
    strokeWeight(13);
    stroke(black);
    if(mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
    checa_rascunho();
    if(desenha_rascunho==sketch){
        guarda_resposta="set";
        pontos=pontos+1;
        document.getElementById("ponto").innerHTML="pontos= "+pontos;
    }
}
function checa_rascunho(){
    contador_tempo=contador_tempo+1;
    document.getElementById("tempo").innerHTML="tempo= "+contador_tempo;
    if(contador_tempo>400){
        contador_tempo=0;
        checa_tempo="completed";
    }
    if(checa_tempo=="completed"||guarda_resposta=="set"){
        checa_tempo="";
        guarda_resposta="";
        update_canvas();
    }
}
