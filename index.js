let players = [];
var alone=false;
const numberbutton = document.getElementById("addnumber"); 
const input =  document.getElementById("gamernumber"); 
const gameTable = document.getElementById("gameTable");
var tim = 1;
const gamemod = document.getElementById("selectmod");
cardsOnDesk=12;
var mata;


numberbutton.addEventListener('click', startinit)
selectmod.addEventListener('click', modInit)

function modInit(){
    if (document.getElementById("gyakorlo").checked ){
        document.getElementById("helpers").style.display = "block"; 
        document.getElementById("helperbuttons").style.display = "block";
    }else{
        document.getElementById("helpers").style.display = "none";
        document.getElementById("helperbuttons").style.display = "none";
    }    
}

function startinit(){
 
    text="";
   if(parseInt(input.value)>=1&&parseInt(input.value)<=10){
     for (i = 1; i <= input.value; i++) {
        text += `<input id="name${i}" type="text" cols="30" rows="1" placeholder="Player ${i} ">`
      }

      console.log(text)

      document.getElementById("gombs").innerHTML=text;

      alone = (input.value==1);
   }else{
      document.getElementById("gombs").innerHTML="Nem megfelelő játékosszám, próbáld újra";
   }


    


}


const start = document.getElementById("start");
start.addEventListener('click',initgame)
document.getElementById("plusz3").addEventListener('click',plusz3);
document.getElementById("isSet").addEventListener('click',vanEset);
document.getElementById("whereSet").addEventListener('click',whereSet);


function initgame(){

    

    alone = (input.value==1);
    if(document.getElementById("1m").checked){
        document.getElementById("plusz3").style.display = "inline";        
    }else{
        document.getElementById("plusz3").style.display = "none";
    }

    if(document.getElementById("2m").checked){        
        document.getElementById("automata").style.display = "inline"; 
        mata=true;       
    }else{
        document.getElementById("automata").style.display = "none";   
        mata=false;
    }

    
    if(document.getElementById("3m").checked){        
        document.getElementById("isSet").style.display = "inline";        
    }else{
        document.getElementById("isSet").style.display = "none";   
    }

    if(document.getElementById("4m").checked){
        document.getElementById("whereSet").style.display = "inline";       
    }else{
        document.getElementById("whereSet").style.display = "none";
    }

    shuffled = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27];
    shuffle(shuffled);
     cardsOnDesk = 12;
     players=[];
     current = ""
    cards = []; 
     time=1000;
     timer;
    window.clearInterval(timer);

    document.getElementById(`infopanel`).innerHTML = ``;

    text="";

    for (i = 1; i <= input.value; i++) {
        
        let inputs = document.getElementById(`name${i}`);
        if(inputs.value=="")
        {
            players.push({name:"Player" + i, points:0 , active:false, stepped:false})
            if(alone){
                text +=`<h3 id="Player${i}">Player${i}</h3>   `
            }else{
                text += `<button id="Player${i}">Player${i}</button>   `
            }
            
        }else{
            players.push({name:inputs.value , points:0 , active:false, stepped:false})
            if(alone){
                text += `<h3 id="${inputs.value}">${inputs.value}</h3>   `
            }else{
                text += `<button id="${inputs.value}">${inputs.value}</button>   `
            }
            
        }

    if(!alone){

    var playerButtons = document.getElementById("playerbuttons");
      playerButtons.addEventListener('click',jatekosvalasztas);
        
      document.getElementById("slidecontainer").innerHTML='<input type="range" min="1" max="1000" value="1000" class="slider" id="myRange"></input>'
    }else{
     tim = 1;
     window.clearInterval(timer2);
     timer2 = window.setInterval(myFunction2, 1000);
     
     function  myFunction2 (){
         document.getElementById(`timer`).innerHTML = `Eltelt idő: ${tim}mp`;
         tim++;   
   
     
    }}
    gameTable.addEventListener('click', lepes);

        
      
     

    }
        text += "<br>";      
        document.getElementById("playerbuttons").innerHTML=text;

      draw();    
      document.getElementById("kezdolap").style.display = "none";
      document.getElementById("jateklap").style.display = "inline";   
     



}


const deck = [];

//num: 0->1 ; 1->2 ; 2->3
//color: 0->lila; 1->piros ; 2-> zöld 
//shape: 0->rombusz; 1->hullám; 2->ovális

let y = 1;
for (i = 0; i < 3; i++) {
    for (j = 0; j < 3; j++) {
        for (z = 0; z < 3; z++) {
            deck.push({id:y,num:i,color:j,shape:z});
            y++;
        }
    }
}

const images = [];
for ( i= 0 ; i<27 ; i++){
    let img = new Image();
    img.src=`${i+1}.png`;
    images.push(img)
    
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
     
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

var shuffled = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27];
shuffle(shuffled)

console.log(shuffled)

var cardsOnDesk = 12;



function draw()
{let kk=0;
    for (i=0; i<3 ; i++){
        document.getElementById(`row${i}`).innerHTML="";
        for(j=0;j<cardsOnDesk/3;j++){
            document.getElementById(`row${i}`).innerHTML+= `<td><img id="${shuffled[kk]}" src="${shuffled[kk]}.png" width="118" height="180"></img></td>`;
         kk++;
            
        }
    
    }
    clearStyle();
}

draw();
var current = ""
cards = []; 
var time=1000;
var timer;
var timer2;
window.clearInterval(timer);




function jatekosvalasztas(e){
    if (e.target.matches('button')){
        // e.target.style.backgroundColor = "yellow";
       // current =  e.target.id;

        let isActive = false;
        for ( i=0 ;i<players.length; i++) {
           isActive = (isActive || players[i].active);  
        }    

        if(!isActive){
        for ( i=0 ;i<players.length; i++){
        if(players[i].name==e.target.id&&players[i].stepped==false)
        {
            players[i].active=true;
            e.target.style.backgroundColor = '#1c922c';
            current =  e.target.id;

            time=1000;
            
            timer = window.setInterval(myFunction, 10);   
            function myFunction()
        {
           time=time-1;
            document.getElementById("myRange").value = (time);
            
            if (time==0){
                window.clearInterval(timer);

               
               
                cards=[]
                draw();
                for ( i=0 ;i<players.length; i++){
                    if(players[i].name==e.target.id)
                    {players[i].stepped=true;
                    players[i].active=false;
                    players[i].points -=1;
                    e.target.style.backgroundColor= "grey"
                    document.getElementById(`infopanel`).innerHTML = `<li>${current} vesztett 1 pontot, így összesen ${players[i].points} pontja van.</li> <li>${shuffled.length} kártya van még a pakliban.</li>`
                    }}
                
               let tds =  document.querySelectorAll('td')
               for ( i=0; i< tds.length;i++)
               {
                   tds[i].style.backgroundColor = null;
                   
               }

               all=true;
               for ( i=0 ;i<players.length; i++){                
                
            all = (players[i].stepped&&all);
                            
            
            }

            if(all){ 
                for( i=0 ;i<players.length; i++){
                
                players[i].stepped=false;
                players[i].active=false;
                document.getElementById(`${players[i].name}`).style.backgroundColor= "rgb(82, 255, 82)";
                
                }
                
                document.getElementById(`infopanel`).innerHTML += '<li> A kör véget ért. </li>';

            }

            }
        }
       
    } 

        }
    }
    }

      
       
}



var all=true;



function lepes(e){
    if(alone){
        stepAlone (e);
    }else{
    
    for ( x=0; x<players.length;x++){

        if(players[x].active){
            if (e.target.matches('img')){
        if(cards.length<3){
            pickCards(e);

            if(cards.length==3){
            window.clearInterval(timer);
            time=0;
            if(isSet(cards))
            { 
                console.log("set")

                takeOut();


                for ( i=0 ;i<players.length; i++){
                    if(players[i].name==current){
                        players[i].points+=1;
                        document.getElementById(`infopanel`).innerHTML = `<li>${current} szerzett 1 pontot, így összesen ${players[i].points} pontja van.</li><li>${shuffled.length} kártya van még a pakliban.</li>`;
                    }
                     
                    {players[i].stepped=false;
                    players[i].active=false;
                    document.getElementById(`${players[i].name}`).style.backgroundColor= "rgb(82, 255, 82)";
                   
                    }}                
                                
                       
                        console.log(shuffled);
                        
                        if(!setInDeck()){
                            if(cardsOnDesk<shuffled.length){
                                cardsOnDesk+=3;
                            }else{
                                gameOver();
                            }
                        }
                        draw();
                        


                

            }else{
                all=true;
              for ( i=0 ;i<players.length; i++){
                  
                if(players[i].name==current)
                {players[i].stepped=true;
                players[i].active=false;
                players[i].points-=1;
                document.getElementById(`infopanel`).innerHTML = `<li>${current} vesztett 1 pontot, így összesen ${players[i].points} pontja van.</li> <li>${shuffled.length} kártya van még a pakliban.</li>`;
                document.getElementById(`${players[i].name}`).style.backgroundColor= "grey";

                }
            all = (players[i].stepped&&all);
            }
                
            
            }

            if(all){ 
                for( i=0 ;i<players.length; i++){
                
                players[i].stepped=false;
                players[i].active=false;
                document.getElementById(`${players[i].name}`).style.backgroundColor= "rgb(82, 255, 82)";
                
                }
                
                document.getElementById(`infopanel`).innerHTML += '<li> A kör véget ért. </li>';

            }
            current = "";  
            cards = [];
           
            
            
            clearStyle()

           
        }
        }
       
    }
        }

    }
   
    

}}

function isSet(cards){

if(((deck[cards[0]-1].num==deck[cards[1]-1].num&&deck[cards[1]-1].num==deck[cards[2]-1].num)||(deck[cards[0]-1].num!=deck[cards[1]-1].num&&deck[cards[1]-1].num!=deck[cards[2]-1].num&&deck[cards[0]-1].num!=deck[cards[2]-1].num))&&
            ((deck[cards[0]-1].color==deck[cards[1]-1].color&&deck[cards[1]-1].color==deck[cards[2]-1].color)||(deck[cards[0]-1].color!=deck[cards[1]-1].color&&deck[cards[1]-1].color!=deck[cards[2]-1].color&&deck[cards[0]-1].color!=deck[cards[2]-1].color))&&
            ((deck[cards[0]-1].shape==deck[cards[1]-1].shape&&deck[cards[1]-1].shape==deck[cards[2]-1].shape)||(deck[cards[0]-1].shape!=deck[cards[1]-1].shape&&deck[cards[1]-1].shape!=deck[cards[2]-1].shape&&deck[cards[0]-1].shape!=deck[cards[2]-1].shape))
            
            )
            {
                    return true;
            }
         return false;

}


function setInDeck(){
if(cardsOnDesk>=3){
   for(i=0; i<cardsOnDesk;i++){
    for(j=0; j<cardsOnDesk;j++){
        for(k=0; k<cardsOnDesk;k++){

            if (isSet([shuffled[i],shuffled[j],shuffled[k]])&&i!=j&&j!=k&&i!=k){
                return true;
            }
            
        }
    }
        
    }
} 
return false;
}



function gameOver(){
   
    document.getElementById(`infopanel`).innerHTML = '<h1> Játék vége </h1>';
    window.clearInterval(timer2);

    if(!alone){
       players.sort(compare);

    for (i=0; i<players.length;i++)
    {
        document.getElementById(`infopanel`).innerHTML += `<li>${i+1}.helyezett: ${players[i].name} ${players[i].points} ponttal</li>`;
    } 
    }else{
        document.getElementById(`infopanel`).innerHTML += `<h2> ${players[0].name} ${players[0].points} pontot, ${tim-1} mp alatt ért el.</li>`;
        tim=1;
    }

    document.getElementById("timer").innerHTML="";

    


    document.getElementById("playerbuttons").innerHTML=`<button id="newGame1">Új kör ugyanígy</button>   <button id="newGame2">Új játék</button>`

    start1 = document.getElementById("newGame1");
    start1.addEventListener('click',newGame1)

    start2 = document.getElementById("newGame2");
    start2.addEventListener('click',newGame2)    
     alone=false; 
    
}


function newGame1(){

initgame();
    
}

function newGame2(){

    document.getElementById("playerbuttons").innerHTML="";
    document.getElementById("gombs").innerHTML="";
    document.getElementById("kezdolap").style.display = "inline";
    document.getElementById("jateklap").style.display = "none";
    document.getElementById("1m").checked=false;
    document.getElementById("2m").checked=true;
    document.getElementById("3m").checked=false;
    document.getElementById("4m").checked=false;

}


function compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const bandA = parseInt(a.points);
    const bandB = parseInt(b.points);
  
    let comparison = 0;
    if (bandA > bandB) {
      comparison = -1;
    } else if (bandA < bandB) {
      comparison = 1;
    }
    return comparison;
  }
  

  function takeOut(){
    for ( i=0; i<cards.length;i++){
        for(j = 0; j<shuffled.length;j++){
            if(cards[i]==shuffled[j]){
             shuffled.splice(j,1);
              }
        }
    }
   if (cardsOnDesk>12){
       cardsOnDesk-=3;
   }
    if(shuffled.length<cardsOnDesk){
                 cardsOnDesk=shuffled.length;
             }

            if(mata){
                automat();
            }
  }

  function pickCards(e){
    let z=false;
    for(i=0;i<cards.length;i++){
        z = (z||cards[i]==e.target.id)

    }
    if(!z){
        cards.push(e.target.id);
       console.log(cards);
       e.target.parentElement.style.backgroundColor = "rgb(32, 178, 44)";
    }else{
        for(i=0;i<cards.length;i++){
        if(cards[i]==e.target.id){
            e.target.parentElement.style.backgroundColor = null;
        cards.splice(i,1);
        console.log(cards);
        }
        
    }
        
    }

  }
 

  function stepAlone (e){
    if (e.target.matches('img')){
    if(cards.length<3){
        pickCards(e);
        if (cards.length==3){
            if(isSet(cards)){
            takeOut();
           
            draw();
            cards=[];
            players[0].points+=1;
            document.getElementById(`infopanel`).innerHTML = `<li>${current} szerzett 1 pontot, így összesen ${players[0].points} pontja van.</li><li>${shuffled.length} kártya van még a pakliban.</li>`;
            clearStyle();
            if(!setInDeck()&&cardsOnDesk==shuffled.length)
            {
                gameOver();
            }
            
            }else{
            clearStyle();
            cards=[];
            players[0].points-=1;
            document.getElementById(`infopanel`).innerHTML = `<li>${current} vesztett 1 pontot, így összesen ${players[0].points} pontja van.</li><li>${shuffled.length} kártya van még a pakliban.</li>`;
        }
            
        }}

    
        
    }





  }

  function clearStyle(){
    let tds =  document.querySelectorAll('td')
    for ( i=0; i< tds.length;i++)
    {
        tds[i].style.backgroundColor = null;
        
    }
  }

  function plusz3(){
     
      if(cardsOnDesk<shuffled.length){
        cardsOnDesk=cardsOnDesk+3;
      
      }else{
        document.getElementById(`infopanel`).innerHTML = `<li>Nem lehetséges több lapot kitenni</li>`
      }
      cards=[];
      draw();
  }

  function vanEset(){
      if(setInDeck()){
        document.getElementById(`infopanel`).innerHTML = `<li>Van Set az asztalon</li>`;
      }else{
        document.getElementById(`infopanel`).innerHTML = `<li>Nincs Set az asztalon</li>`;
      }
  }

  function whereSet(){
    if(!setInDeck){
        document.getElementById(`infopanel`).innerHTML = `<li>Nincs Set az asztalon</li>`;
      }else if(cardsOnDesk>=3){
          for(xy=0; xy<cardsOnDesk;xy++){
            for(yx=0; yx<cardsOnDesk;yx++){
                for(xx=0; xx<cardsOnDesk;xx++){
        
                    if (isSet([shuffled[xy],shuffled[yx],shuffled[xx]])&&xy!=yx&&yx!=xx&&xy!=xx){
                        clearStyle();
                        console.log(`${shuffled[xy]} ${shuffled[yx]} ${shuffled[xx]}`);
                        document.getElementById(`${shuffled[xy]}`).parentElement.style.backgroundColor = "rgb(82, 255, 82)";
                        document.getElementById(`${shuffled[yx]}`).parentElement.style.backgroundColor = "rgb(82, 255, 82)";
                        document.getElementById(`${shuffled[xx]}`).parentElement.style.backgroundColor = "rgb(82, 255, 82)";
                       
                        return true;
                    }
                    
                }
            }
        }
      }else{
          return false;
      }       
   
  }

  
  function automat(){
      while(!setInDeck()&&!(shuffled.length==cardsOnDesk)){
          plusz3();
      }
  }



