const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const type = urlParams.get('type');
const selectedElement = urlParams.get('selectedElement');

const data = JSON.parse(localStorage.getItem("fileData"));

const nD = data.nD;
const nH = data.nH;
let filteredTimeTable;
let totalPeriods;


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
            for(k = 0; k<matrix[i][j].length; k++){
              str = str +" "+matrix[i][j][k].teacher
            }
            k=0;
            td.innerHTML = str;
            break;
          case 'TEACHERS':
            for(k = 0; k<matrix[i][j].length; k++){
              str = str+" "+matrix[i][j][k].class;
            }
            k=0;
            td.innerHTML = str;
            break;
          case 'COURSES':
            for(k = 0; k<matrix[i][j].length; k++){
              str = str+" "+matrix[i][j][k].teacher+"-"+matrix[i][j][k].class;
            }
            k=0;
            td.innerHTML = str;
          break;
        }
      }else{
        td.innerHTML = "";
      }
    }
  }

  return table;
}



//document.write(JSON.stringify(createTableMatrix(filteredTimeTable, nD, nH)));

//document.write(JSON.stringify(filteredTimeTable));
