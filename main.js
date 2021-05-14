document.getElementById("read-button").addEventListener('click', function() {
		let file = document.getElementById("file-input").files[0];
		read(file);
		});


function read(file){

	let reader = new FileReader();
		reader.addEventListener('load', function(e) {
	   		let text = e.target.result;
	   		dataManagement(JSON.parse(text));
	   		localStorage.setItem("fileData", text);
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
	classes.appendChild(createTable(data.CLASSES, "CLASSES"));

	let teachers = document.getElementById('teachers');
	teachers.appendChild(createTable(data.TEACHERS, "TEACHERS"));

	let courses = document.getElementById('courses');
	courses.appendChild(createTable(data.COURSES, "COURSES"));



}





function createTable(list, elementsType){

	//let body = document.getElementById('body');
	let table = document.createElement('TABLE');
	table.border = '1';

	let tr;
	let td;
	let a;

	let maxColumns = 10;

	for (var i = 0; i < list.length; i++) {
		if(i % maxColumns === 0){
			tr = document.createElement('TR');
			table.appendChild(tr);
		}

		td = document.createElement('TD');
		a = document.createElement('A');






		if(typeof list[i] != "string"){
			a.innerHTML = list[i].name;

		}else{
			a.innerHTML = list[i]
		}

		a.href = "./linkedPage.html?"+"type="+elementsType+"&selectedElement="+a.innerHTML;

		td.appendChild(a);
		tr.appendChild(td);
	}

	return table;
}
