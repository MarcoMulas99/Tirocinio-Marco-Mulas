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
				const coursesList = coursesListConstructor(parsedText.COURSES);

	   		dataManagement(parsedText, coursesList);

	   		localStorage.setItem("fileData", text);


				let aux;
				let info = document.getElementById('info');


				aux = document.createElement('P');
				aux.innerHTML = 'Documento selezionato: ';
				aux.style.fontWeight = 'bold';
				let fileName = document.createElement('P');
				fileName.innerHTML = file.name;
				aux.style.display = 'inline';
				fileName.style.display = 'inline';
				info.appendChild(aux);
				info.appendChild(fileName);

				info.appendChild(document.createElement('br'));

				aux = document.createElement('P');
				aux.innerHTML = 'Numero giorni: ';
				aux.style.fontWeight = 'bold';
				let numDays = document.createElement('P');
				numDays.innerHTML = parsedText.nD;
				aux.style.display = 'inline';
				numDays.style.display = 'inline';
				info.appendChild(aux);
				info.appendChild(numDays);

				info.appendChild(document.createElement('br'));

				aux = document.createElement('P');
				aux.innerHTML = 'Numero periodi: ';
				aux.style.fontWeight = 'bold';
				let numPeriods = document.createElement('P');
				numPeriods.innerHTML = parsedText.nH;
				aux.style.display = 'inline';
				numPeriods.style.display = 'inline';
				info.appendChild(aux);
				info.appendChild(numPeriods);

				info.appendChild(document.createElement('br'));

				aux = document.createElement('P');
				aux.innerHTML = 'Numero classi: ';
				aux.style.fontWeight = 'bold';
				let numClasses = document.createElement('P');
				numClasses.innerHTML = parsedText.CLASSES.length;
				aux.style.display = 'inline';
				numClasses.style.display = 'inline';
				info.appendChild(aux);
				info.appendChild(numClasses);

				info.appendChild(document.createElement('br'));

				aux = document.createElement('P');
				aux.innerHTML = 'Numero insegnanti: ';
				aux.style.fontWeight = 'bold';
				let numTeachers = document.createElement('P');
				numTeachers.innerHTML = parsedText.TEACHERS.length;
				aux.style.display = 'inline';
				numTeachers.style.display = 'inline';
				info.appendChild(aux);
				info.appendChild(numTeachers);

				info.appendChild(document.createElement('br'));

				aux = document.createElement('P');
				aux.innerHTML = 'Numero corsi: ';
				aux.style.fontWeight = 'bold';
				let numCourses = document.createElement('P');
				numCourses.innerHTML = coursesList.length;
				aux.style.display = 'inline';
				numCourses.style.display = 'inline';
				info.appendChild(aux);
				info.appendChild(numCourses);
		});
	reader.readAsText(file);
}

function dataManagement(data, coursesList){

	console.log(data);

	let body = document.getElementById('body');

	let classes = document.getElementById('classes');
	classes.appendChild(createTable(data.CLASSES, "CLASSES"));

	let teachers = document.getElementById('teachers');
	teachers.appendChild(createTable(data.TEACHERS, "TEACHERS"));

	let courses = document.getElementById('courses');
	courses.appendChild(createTable(coursesList, 'COURSES'));



}

function coursesListConstructor(coursesList){
  let list = [];
  for(let i = 0; i<coursesList.length; i++){
    let occurence = list.find(e => e[0].name === coursesList[i].name);
    if(typeof occurence === "undefined") list.push([coursesList[i]]);
    else {
      occurence.push(coursesList[i]);
    }
  }
  return list;
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

		if(elementsType === 'COURSES'){

			a.innerHTML = list[i][0].name;

		}else if(typeof list[i] != "string"){

			a.innerHTML = list[i].name;

		}else{
			a.innerHTML = list[i]
		}

		a.href = "./linkedPage.html?"+"type="+elementsType+"&selectedElement="+a.innerHTML;

		td.appendChild(a);
		td.classList.add('mainSelection');
		tr.appendChild(td);
	}

	return table;
}
