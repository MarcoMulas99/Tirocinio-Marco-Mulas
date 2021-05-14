const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const type = urlParams.get('type');
const selectedElement = urlParams.get('selectedElement');

const data = JSON.parse(localStorage.getItem("fileData"));

const nD = data.nD;
const nH = data.nH;
let filteredTimeTable;


switch (type) {
  case 'CLASSES':
    filteredTimeTable = data.TIMETABLE.filter(e => {return e.class === selectedElement});
    break;
  case 'TEACHERS':
    filteredTimeTable = data.TIMETABLE.filter(e => {return e.teacher === selectedElement});
    break;
  case 'COURSES':
    const course = data.COURSES.find(e => e.name === selectedElement);
    filteredTimeTable = data.TIMETABLE.filter(e => {return e.class === course.class && e.teacher === course.teacher});
  break;
}


function createTableMatrix(timeTable, nD, nH) {
  let matrix = [];
  for(var i=0; i<nH; i++) {
    matrix[i] = new Array(nD);
  }

  timeTable.forEach(item => {
    matrix[item.period-1][item.day-1]=item;
  });

  return matrix;
}

function createTable(matrix, type){

  let table = document.createElement('TABLE');
	table.border = '1';
  let tr;
	let td;

  tr = document.createElement('TR');
  table.appendChild(tr);

  for(let i = 0; i<=6; i++){
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
      case 4:
        td.innerHTML = "Giovedì"
        break;
      case 5:
        td.innerHTML = "Venerdì"
        break;
      case 6:
        td.innerHTML = "Sabato"
        break;
		}
		//console.log(td.innerHTML);
		tr.appendChild(td);
  }

  console.log(matrix);

  for (i = 0; i<matrix.length; i++){
    tr = document.createElement('TR');

    td = document.createElement('TD');
    td.innerHTML = i+1;

    tr.appendChild(td);

    table.appendChild(tr);

    for(j = 0; j<matrix[i].length; j++){
      td = document.createElement('TD');
      tr.appendChild(td);
      if(typeof matrix[i][j] !== 'undefined'){
        switch (type) {
          case 'CLASSES':
            td.innerHTML = matrix[i][j].teacher;
            break;
          case 'TEACHERS':
            td.innerHTML = matrix[i][j].class;
            break;
          case 'COURSES':
            td.innerHTML = matrix[i][j].teacher+"-"+matrix[i][j].class;
          break;
        }
      }else{
        td.innerHTML = "";
      }
    }
  }
  return table;
}

let body = document.getElementById('body');
body.appendChild(createTable(createTableMatrix(filteredTimeTable, nD, nH), type));

//document.write(JSON.stringify(createTableMatrix(filteredTimeTable, nD, nH)));

//document.write(JSON.stringify(filteredTimeTable));
