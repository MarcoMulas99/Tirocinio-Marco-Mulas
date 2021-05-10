let createTable = (orari) => {
	let myTable = document.getElementById('myTable');

	let table = document.createElement('TABLE');
	table.border = '1';

	let tr = document.createElement('TR');
	let td;

	let i;

	for(i = 0; i<=orari.nPeriodi; i++){
		td = document.createElement('TD');
		switch(i){
			case 0:
				td.innerHTML = ""
				break;
			case 1:
				td.innerHTML = "Lunedì"
				break;
			case 2:
				td.innerHTML = "Martedì"
				break;
			case 3:
				td.innerHTML = "Mercoledì"
				break;
		}
		console.log(td.innerHTML);
		tr.appendChild(td);
	}

	table.appendChild(tr);

	for(i = 0; i<orari.nPeriodi; i++){
		tr = document.createElement('TR');
		table.appendChild(tr);

		td = document.createElement('TD');
		td.innerHTML = `${i+1}°`;
		tr.appendChild(td);

		
		let aux;

		aux = findElement(i+1, orari.orario);

		console.log(aux);
		console.log("---------");

		let day;
		let element
		for(j = 0; j<orari.nGiorni; j++){
			day;

			switch(j){
				case 0:
					day="LUN"
					break;
				case 1:
					day="MAR"
					break;
				case 2:
					day="MER"
					break;
			}

			td = document.createElement('TD');

			element = aux.find(element => element.giorno === day);

			if (element!=undefined){
				td.innerHTML = element.materia;
			}else td.innerHTML = "";

			tr.appendChild(td);
		}		
		
	}
	myTable.appendChild(table);

}


function findElement(ora, array){

	let aux = [];

	for(i=0; i<array.length; i++){
		if(array[i].ora === ora){
			aux.push(array[i]);
		}
	}

	return aux;
}

document.getElementById("read-button").addEventListener('click', function() {
		let file = document.getElementById("file-input").files[0];
		let reader = new FileReader();
		let text;
		reader.addEventListener('load', function(e) {
	    		text = e.target.result;
	    		read(text);
		});
		reader.readAsText(file);
		});

function read(text){
	console.log(JSON.parse(text));
	createTable(JSON.parse(text));
}

