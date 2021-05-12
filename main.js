
document.getElementById("read-button").addEventListener('click', function() {
		let file = document.getElementById("file-input").files[0];
		read(file);
		});


function read(file){

	let reader = new FileReader();
		reader.addEventListener('load', function(e) {
	   		let text = e.target.result;
	   		dataManagement(JSON.parse(text));
		});
	reader.readAsText(file);

	let body = document.getElementById('body');
	let fileName = document.createElement('P');
	fileName.innerHTML = "Documento selezionato: "+file.name;
	body.appendChild(fileName);
}

function dataManagement(data){

	console.log(data);

	let body = document.getElementById('body');

	let classes = document.getElementById('classes');
	classes.appendChild(createTable(data.CLASSES));

	let teachers = document.getElementById('teachers');
	teachers.appendChild(createTable(data.TEACHERS));

	let courses = document.getElementById('courses');
	courses.appendChild(createTable(data.COURSES));
}





function createTable(list){

	//let body = document.getElementById('body');
	let table = document.createElement('TABLE');
	table.border = '1';

	let tr;
	let td;

	let i = 0
	let maxColumns = 10;

	while(i<list.length){
		
		if(i % maxColumns === 0){
			tr = document.createElement('TR');
			table.appendChild(tr);
		}

		td = document.createElement('TD');

		if(typeof list[i] != "string"){
			td.innerHTML = list[i].name;

		}else{
			td.innerHTML = list[i]
		}

		tr.appendChild(td);
		i++;
	}

	return table;
}


/*let createTable = (orari) => {
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
	myTable.appendChild(table);}
function findElement(ora, array){

	let aux = [];

	for(i=0; i<array.length; i++){
		if(array[i].ora === ora){
			aux.push(array[i]);
		}
	}

	return aux;}*/

