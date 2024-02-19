
document.addEventListener('DOMContentLoaded', function(){
// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
	var smr1, smr2, smr3, smr4, champ1, champ2, champ3, champ4, slots, favo = ["","",""], tipo = ["","",""];
	
	/*ToDo list:
	-reorder favs
	-Change region
	*/

  // Use default values
  chrome.storage.sync.get({
	smr1: true,
	smr2: true,
	smr3: true,
	smr4: true,
	champ1: true,
	champ2: true,
	champ3: true,
	champ4: true,
	slots: 0,
	favo: ["","",""],
    tipo: [0,0,0]
}, function(items) {
	smr1 = items.smr1;
	smr2 = items.smr2;
	smr3 = items.smr3;
	smr4 = items.smr4;
	champ1 = items.champ1;
	champ2 = items.champ2;
	champ3 = items.champ3;
	champ4 = items.champ4;
	slots = items.slots;
	//alert( "ja tem " + slots);
	for(let c=0;c<slots;c++){
		favo[c] = items.favo[c];
		tipo[c] = items.tipo[c];
		}

	
	for(let a = 0; a<slots; a++){  //mostra o favoritos (se existirem)
	let aux = a + 1;
	let aux3 = 'fav'+aux;
	document.getElementById(aux3+'b').innerHTML = favo[a];
	document.getElementById(aux3).classList.toggle('hidden');
	}
	botoesApagar(slots);
	botoesFav(slots);
});

// Get the input field
var input = document.getElementById("texto");

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("btnSmnr").click();
  }
});

function openBuilds (palavra){ //open champion's builds sites

	let site1 = 'https://br.op.gg/champion/';
	let site2 = 'https://www.leagueofgraphs.com/pt/champions/builds/';
	let site3 = 'https://lolalytics.com/lol/';
	let site4 = 'https://u.gg/lol/champions/';

	var linkArray = []; //all links
	linkArray[0] = site1+palavra;
	linkArray[1] = site2+palavra;
	linkArray[2] = site3+palavra+'/build';
	linkArray[3] = site4+palavra+'/build';

    // will open each link in the current window

	if(champ1 === true){
	chrome.tabs.create({
	url: linkArray[0]
	});
	}if (champ2 === true){
	chrome.tabs.create({
	url: linkArray[1]
	});
	}if (champ3 === true){
	chrome.tabs.create({
	url: linkArray[2]
	});
	}if (champ4 === true){
	chrome.tabs.create({
	url: linkArray[3]
	});
	}
}

function openPlayer(palavra){ //open player's profile sites

	//open summoner (player) information sites
	let site1 = 'https://br.op.gg/summoner/userName=';
	let site2 = 'https://www.leagueofgraphs.com/pt/summoner/br/';
	let site3 = 'https://xdx.gg/br/';
	let site4 = 'https://u.gg/lol/profile/br1/';

	var linkArray = []; //all links
	linkArray[0] = site1+palavra;
	linkArray[1] = site2+palavra;
	linkArray[2] = site3+palavra;
	linkArray[3] = site4+palavra+'/overview';

    // will open each link in the current window

	if(smr1 === true){
	chrome.tabs.create({
	url: linkArray[0]
	});
	}if (smr2 === true){
	chrome.tabs.create({
	url: linkArray[1]
	});
	}if (smr3 === true){
	chrome.tabs.create({
	url: linkArray[2]
	});
	}if (smr4 === true){
	chrome.tabs.create({
	url: linkArray[3]
	});
	}

}

function salvarFavorito(words,EhChamp, numero){ //salvar os dois array no chrome storage
	
	chrome.storage.sync.set({ 
		favo: words,
		tipo: EhChamp,
		slots: numero
		}, function(){ //função de debbug
		/*let frase = "lista de favoritos atualizada: ";
		for(i=0;i<numero;i++){
			frase = frase + words[i]+", ";
		}
		alert(frase);*/
		}
	)
	
	botoesApagar(numero); //Listening do novo botão de apagar
	botoesFav(numero); //Listening do novo botão de favorito
	window.location.reload();
}


document.querySelector('#btnChamp').addEventListener('click',function(){ //Clicar no botao Builds

	let aux1 = document.querySelector('#texto').value;
	if (aux1 != "" && aux1[0] != ' ' && aux1.length < 17){

	let aux2 = aux1.split('').filter(e => e.trim().length).join('');// tira espaços
	let vocabulo = aux2.toLowerCase(); //transforma tudo em lowercase

	openBuilds(vocabulo); //chama função que abre os links

	if (document.getElementById('favoritar').checked === true ){
	if (slots < 10){

		//alert("tentou favoritar champion: " + vocabulo);
		favo[slots] = vocabulo;
		tipo[slots] = 1;
		slots++;

		salvarFavorito(favo,tipo, slots); //chamar funcao q salva
	}else {
		alert("Você já possui o maximo de "+slots+" favoritos!");
	}
	}
}else alert("Entrada inválida!")})

document.querySelector('#btnSmnr').addEventListener('click',function(){ //Clicar no botao Player
	let palavra = document.querySelector("#texto").value;
	if (palavra != "" && palavra[0] != ' ' && palavra.length < 17){

	openPlayer(palavra); //chama a função q abre os links

	if (document.getElementById('favoritar').checked === true){
		if (slots < 10){

		//alert("tentou favoritar jogador "+palavra+" depois do "+ slots+"º slot");
		favo[slots] = palavra;
		tipo[slots] = 2;
		slots++;

		salvarFavorito(favo,tipo, slots);
	}else {
		alert("Você já possui o maximo de "+slots+" favoritos!");
	}
	}
}else alert("Entrada inválida!")})

document.querySelector('#btnOpt').addEventListener('click', function() { //clicar botao opt
  if (chrome.runtime.openOptionsPage) {
	chrome.runtime.openOptionsPage();
  } else {
	window.open(chrome.runtime.getURL('options.html'));
  }
});

function botoesApagar (slots){//botões de apagar fav
	for(let b=0; b < slots; b++){ //laço pra deixar os listener rodando
	let aux5 = b+1;
	let aux = "del" + aux5;
	//alert("entrou no laco com "+ aux);
	document.getElementById(aux).addEventListener('click', function() { //ação após clique

		for (let x = b;x < slots;x++){ //realoca os favoritos
			favo[x] = favo[x+1];
			tipo[x] = tipo[x+1];
		}

		//alert("tentando esconder fav"+aux5);
		document.getElementById('fav'+aux5).classList.toggle('hidden');
		window.location.reload();

		slots = slots-1;
		salvarFavorito(favo,tipo,slots);

	});
	};
}

function botoesFav (slots){//botões fav
	for(let b=0; b < slots; b++){ //laço pra deixar os listener rodando
	let aux5 = b+1;
	let aux = "fav" + aux5 + "b";
	//alert("entrou no laco com "+ aux);
	document.getElementById(aux).addEventListener('click', function() { //ação após clique

	if (tipo[b] == 1){
		openBuilds(document.getElementById(aux).innerText);
	} else {
		openPlayer(document.getElementById(aux).innerText);
	}

	});
	};
}



} )

