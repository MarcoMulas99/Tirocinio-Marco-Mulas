const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const type = urlParams.get('type');
const selectedElement = urlParams.get('selectedElement');

const data = JSON.parse(localStorage.getItem("fileData"));

const nD = data.nD;
const nH = data.nH;
const courses = coursesListConstructor(data.COURSES);
console.log(courses);
let filteredTimeTable;
let totalPeriods;


switch (type) {
  case 'CLASSES':
    filteredTimeTable = data.TIMETABLE.filter(e => {return e.class === selectedElement});
    break;
  case 'TEACHERS':
    filteredTimeTable = data.TIMETABLE.filter(e => {return e.teacher === selectedElement});
    break;
  case 'COURSES'://da aggiunstare è buggato!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  /*
  
  */

    const course = data.COURSES.filter(e => e.name === selectedElement);
    console.log(course);
    filteredTimeTable = data.TIMETABLE.filter(e => {return e.class === course.class && e.teacher === course.teacher});
  break;
}

let htmlTable = document.getElementById('table');
let tableMatrix = createTableMatrix(filteredTimeTable, nD, nH);
let finalTable = createTable(tableMatrix, type);
htmlTable.appendChild(finalTable);

//INFORMAZIONI AGGIUNTIVE
switch (type) {
  case 'CLASSES':
    totalPeriods = document.createElement('P');
    totalPeriods.innerHTML = "Numero di ore settimanali: " + countWeeklyPeriods(tableMatrix);//da cambiare per gli orari comibnati come lab
    htmlTable.appendChild(totalPeriods);
    break;
  case 'TEACHERS':
    totalPeriods = document.createElement('P');
    totalPeriods.innerHTML = "Numero di ore settimanali: " + countWeeklyPeriods(tableMatrix);//da cambiare per gli orari comibnati come lab
    htmlTable.appendChild(totalPeriods);

    freePeriods = document.createElement('P');
    freePeriods.innerHTML = "Numero ore buche: " + countFreePeriods(tableMatrix, nH, nD);
    htmlTable.appendChild(freePeriods);

}

/*******************************************************************************************************************************************************************************************************/

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

function countWeeklyPeriods(matrix){
  let count = 0;
  for (let i = 0; i<matrix.length; i++){
    for (let j = 0; j<matrix[i].length; j++){
      if(matrix[i][j].length!==0) count++;
    }
  }

  return count;
}

function countFreePeriods(matrix, nH, nD){
  let result = 0;
  let count = 0;
  let flag = false;

  for (c = 0; c<nD; c++){
    flag = false;
    count = 0;
    for(r = 0; r<nH; r++){
      if(matrix[r][c].length !== 0){
        flag = true;
        result += count;
        count = 0;
        //console.log(result);
      }
      if(flag && matrix[r][c].length === 0){
        count++;
      }
    }
  }
  return result;
}

function createTableMatrix(timeTable, nD, nH) {
  let matrix = [];

  for(var i=0; i<nH; i++) {
    let row = new Array(nD);
    for(var j=0; j<nD; j++){
      row[j] = []
    }

    matrix[i] = row;
  }



  timeTable.forEach(item => {
    matrix[item.period-1][item.day-1].push(item);
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
      let str = "";
      if(matrix[i][j].length !== 0){
        switch (type) {
          case 'CLASSES':
            td.innerHTML = findCourse(matrix[i][j]);
            break;
          case 'TEACHERS':
            td.innerHTML = findCourse(matrix[i][j]);
            break;
          case 'COURSES':
            td.innerHTML = findCourse(matrix[i][j]);
          break;
        }
      }else{
        td.innerHTML = "";
      }
    }
  }

  return table;
}

function findCourse(period){
  let aux = courses.filter(e => e.length === period.length);
  let result = "";
  let count = 0;

  if(typeof aux !== "undefined"){
    for(let i = 0; i<aux.length; i++){
      count=0;
      for(let j = 0; j<period.length; j++){
        if(typeof aux[i].find(e => e.class === period[j].class && e.teacher === period[j].teacher) !== "undefined") count++;
        else break;
        if(count === period.length) result = aux[i][0].name;
      }
    }
  }

  return  result;
 }


//document.write(JSON.stringify(createTableMatrix(filteredTimeTable, nD, nH)));

//document.write(JSON.stringify(filteredTimeTable));
