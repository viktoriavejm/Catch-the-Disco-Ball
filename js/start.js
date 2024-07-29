let Sekunde20 = document.getElementById('Sekunden1')
let Sekunde40 = document.getElementById('Sekunden2');
let Minute1 = document.getElementById('Sekunden3');

let backGroundMusic = new Audio('./Sounds/back.mp3')

function clicked() {
    backGroundMusic.play()
}

function pause() {
    backGroundMusic.pause()
}

let time;
let Playername;


function Sek2() {
    Sekunde20.style.backgroundColor = '#6c6d6d2c'
    Sekunde40.style.backgroundColor = '#55565678'
    Minute1.style.backgroundColor = '#55565678'

    time = 20;
}

function Sek4() {
    Sekunde40.style.backgroundColor = '#6c6d6d2c'
    Sekunde20.style.backgroundColor = '#55565678'
    Minute1.style.backgroundColor = '#55565678'

    time = 40;
}

function Min() {
    Minute1.style.backgroundColor = '#6c6d6d2c'
    Sekunde20.style.backgroundColor = '#55565678'
    Sekunde40.style.backgroundColor = '#55565678'

    time = 60;
}

function readInfo() {
    localStorage.setItem('Medientechnik_Sammelspiel_Time', time)
    backGroundMusic.pause()
}

function saveInfo() {

    if (document.getElementById('vN').value == '' && document.getElementById('uN').value == '') {
        document.getElementById('output').innerHTML = 'Geben sie einen Namen ein'
        document.getElementById('submit2').style.backgroundColor = 'red'
    }else{
        if (document.getElementById('vN').value == '') {
            Playername = document.getElementById('uN').value;
        document.getElementById('submit2').style.backgroundColor = 'lightgreen'
        document.getElementById('output').innerHTML = 'Eingeloggt!'
    
        }else {
            Playername = document.getElementById('vN').value
        document.getElementById('submit2').style.backgroundColor = 'lightgreen'
        document.getElementById('output').innerHTML = 'Eingeloggt!'
    
        }
    
        localStorage.setItem('Medientechnik_Sammelspiel_Playername', Playername )
    }

   
}

function showList() {
    let Highscore20 = JSON.parse( localStorage['Medientechnik_Sammelspiel_List20'] ?? '[]' );
        
        console.log(Highscore20)

        let html_code =
			`<div class= "header">
				<p class="gridhead1">Name</p>
				<p class="gridhead2">Highscore</p>
			 </div>`;


        for (let i = 0; i < Highscore20.length; i++) {
                html_code +=
				`<div class="highscoreliste">
					<p class="links" >${Highscore20[i].playername}</p>
					<p class="rechts"> ${Highscore20[i].highscore}</p>
				</div>`
			
        } 

        document.getElementById('Sek20').innerHTML = html_code;





        let Highscore40 = JSON.parse( localStorage['Medientechnik_Sammelspiel_List40'] ?? '[]' );
        
        console.log(Highscore40)

        let html_code2 =
			`<div class= "header">
				<p class="gridhead1">Name</p>
				<p class="gridhead2">Highscore</p>
			 </div>`;


        for (let i = 0; i < Highscore40.length; i++) {
                html_code2 +=
				`<div class="highscoreliste">
					<p class="links" >${Highscore40[i].playername}</p>
					<p class="rechts"> ${Highscore40[i].highscore}</p>
				</div>`
			
        } 

        document.getElementById('Sek40').innerHTML = html_code2;




        let Highscore60 = JSON.parse( localStorage['Medientechnik_Sammelspiel_List60'] ?? '[]' );
        
        console.log(Highscore60)

        let html_code3 =
			`<div class= "header">
				<p class="gridhead1">Name</p>
				<p class="gridhead2">Highscore</p>
			 </div>`;


        for (let i = 0; i < Highscore60.length; i++) {
                html_code3 +=
				`<div class="highscoreliste">
					<p class="links" >${Highscore60[i].playername}</p>
					<p class="rechts"> ${Highscore60[i].highscore}</p>
				</div>`
			
        } 

        document.getElementById('Sek60').innerHTML = html_code3;
   }   

   showList()