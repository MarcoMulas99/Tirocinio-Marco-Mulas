document.getElementById("read-button").addEventListener('click', function() {
		let file = document.getElementById("file-input").files[0];
		read(file);
		//document.getElementById('read-button').disabled = true;
		document.getElementById('classes').innerHTML = "";
		document.getElementById('teachers').innerHTML = "";
		document.getElementById('courses').innerHTML = "";
		document.getElementById('info').innerHTML = "";
		});


function read(file){

	let reader = new FileReader();

		reader.addEventListener('load', function(e) {
	   		let text = e.target.result;
				let parsedText = JSON.parse(text);
	   		dataManagement(parsedText);
	   		localStorage.setItem("fileData", text);

				let info = document.getElementById('info');

				let fileName = document.createElement('P');
				fileName.innerHTML = "Documento selezionato: "+file.name;
				info.appendChild(fileName);

				let numDays = document.createElement('P');
				numDays.innerHTML = "Numero di Giorni: "+parsedText.nD;
				info.appendChild(numDays);

				let numPeriods = document.createElement('P');
				numPeriods.innerHTML = "Numero di periodi: "+parsedText.nH;
				info.appendChild(numPeriods);

				let numClasses = document.createElement('P');
				numClasses.innerHTML = "Numero di classi: "+ parsedText.CLASSES.length;
				info.appendChild(numClasses);

				let numTeachers = document.createElement('P');
				numTeachers.innerHTML = "Numero di insegnanti: "+ parsedText.TEACHERS.length;
				info.appendChild(numTeachers);

				let numCourses = document.createElement('P');
				numCourses.innerHTML = "Numero di corsi: "+ parsedText.COURSES.length;
				info.appendChild(numCourses);
		});
	reader.readAsText(file);
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
