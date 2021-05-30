const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const type = urlParams.get('type');
const selectedElement = urlParams.get('selectedElement');

const data = JSON.parse(localStorage.getItem("fileData"));

const nD = data.nD;
const nH = data.nH;
const courses = coursesListConstructor(data.COURSES);


//console.log(courses);
let filteredTimeTable;
let totalPeriods;


switch (type) {
  case 'CLASSES':
    filteredTimeTable = data.TIMETABLE.filter(e => {return e.class === selectedElement});
    break;
  case 'TEACHERS':
    filteredTimeTable = data.TIMETABLE.filter(e => {return e.teacher === selectedElement});
    let aux = [];
    for(let i = 0; i<filteredTimeTable.length; i++){
      const element = data.TIMETABLE.find(e => e.class === filteredTimeTable[i].class && e.day===filteredTimeTable[i].day && e.period===filteredTimeTable[i].period && e.teacher!==filteredTimeTable[i].teacher);
      if (typeof element !== "undefined") aux.push(element);
    }
    filteredTimeTable = filteredTimeTable.concat(aux);
    //console.log(filteredTimeTable);
    break;
  case 'COURSES':
    filteredTimeTable = [];
    const course = data.COURSES.filter(e => e.name === selectedElement);

    filteredTimeTable = filteredTimeTable.concat(data.TIMETABLE.filter(e => {return e.class === course[0].class}));


  break;
}

let htmlTable = document.getElementById('table');
let tableMatrix = createTableMatrix(filteredTimeTable, nD, nH);
let finalTable = createTable(tableMatrix, type);
htmlTable.appendChild(finalTable);


let info;
//INFORMAZIONI AGGIUNTIVE
switch (type) {
  case 'CLASSES':
    totalPeriods = document.createElement('P');
    totalPeriods.innerHTML = "Numero di ore settimanali: " + countWeeklyPeriods(tableMatrix);
    htmlTable.appendChild(totalPeriods);

    info = chartsInfo(type, extractTeachersFromMatrix(tableMatrix), tableMatrix);

    for(let i = 0; i<info.length; i++){
      let canvas = document.createElement('canvas');
      //canvas.id = i;
      //canvas.width = 200;
      //canvas.height = 500;
      //canvas.style.width  = '1px';
      //canvas.style.height = '1px';

      htmlTable.appendChild(canvas);
      canvas.removeAttribute("style");

      let ctx = canvas.getContext('2d');

      let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['LUN', 'MAR', 'MER', 'GIO', 'VEN', 'SAB'],
            datasets: [{
                label: 'Ore '+info[i].teacher,
                data: info[i].days,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {

            title: {/////////////
                display: true,
                text: 'TESTaffafafafafafafafafafafafafafafafafaf'
            },
            maintainAspectRatio: false,
            responsive: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                      stepSize: 1
                    }
                }
            },
            legend: {///////////
             display: false
            }
        }
    });


    }

    break;
  case 'TEACHERS':
    totalPeriods = document.createElement('P');
    totalPeriods.innerHTML = "Numero di ore settimanali: " + countWeeklyPeriods(tableMatrix);
    htmlTable.appendChild(totalPeriods);

    freePeriods = document.createElement('P');
    freePeriods.innerHTML = "Numero ore buche: " + countFreePeriods(tableMatrix, nH, nD);
    htmlTable.appendChild(freePeriods);

    info = chartsInfo(type, extractClassesFromMatrix(tableMatrix), tableMatrix);

    for(let i = 0; i<info.length; i++){
      let canvas = document.createElement('canvas');
      //canvas.id = i;
      //canvas.width = 200;
      canvas.height = 200;
      //canvas.style.width  = '1px';
      //canvas.style.height = '1px';

      htmlTable.appendChild(canvas);
      canvas.removeAttribute("style");

      let ctx = canvas.getContext('2d');

      let l = [];

      for (let j = 0; j<nH; j++){
        l.push(j+1);
      }


      let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: l,
            datasets: [{
                label: info[i].class,
                data: info[i].periods,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            title: {/////////////
                display: true,
                text: 'TESTaffafafafafafafafafafafafafafafafafaf'
            },
            maintainAspectRatio: false,
            responsive: false,
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                      stepSize: 1
                    }
                }
            },
            legend: {///////////
             display: false
            }
        }
    });


    }
}










/*******************************************************************************************************************************************************************************************************/

function chartsInfo(type, chartOwners, matrix){
  let info = [];

  switch (type) {
    case 'CLASSES':
      for(let i = 0; i<chartOwners.length; i++){
        info.push({teacher:chartOwners[i], days:new Array(nD).fill(0)});
      }
      for(let i = 0; i<matrix.length; i++){
        for(let j = 0; j<matrix[i].length; j++){
          for(let k = 0; k<matrix[i][j].length; k++){
              if(matrix[i][j].length>0)info.find(e => e.teacher === matrix[i][j][k].teacher).days[j]++;
          }
        }
      }
      break;
    case 'TEACHERS':
      for(let i = 0; i<chartOwners.length; i++){
        info.push({class:chartOwners[i], periods:new Array(nH).fill(0)});
      }
      for(let i = 0; i<matrix.length; i++){
        for(let j = 0; j<matrix[i].length; j++){
          if(matrix[i][j].length>0)info.find(e => e.class === matrix[i][j][0].class).periods[matrix[i][j][0].period-1]++;
        }
      }
    break;
  }
  return info;
}

function extractClassesFromMatrix(matrix){
  let c = [];

  for(let i = 0; i<matrix.length; i++){
    for(let j = 0; j<matrix[i].length; j++){
      for(let k = 0; k<matrix[i][j].length; k++){
        if (!c.includes(matrix[i][j][k].class))c.push(matrix[i][j][k].class);
      }
    }
  }

  return c;
}

function extractTeachersFromMatrix(matrix){
  let t = [];

  for(let i = 0; i<matrix.length; i++){
    for(let j = 0; j<matrix[i].length; j++){
      for(let k = 0; k<matrix[i][j].length; k++){
        if (!t.includes(matrix[i][j][k].teacher))t.push(matrix[i][j][k].teacher);
      }
    }
  }

  return t;
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

  console.log(matrix);
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
            const aux = findCourse(matrix[i][j]);
            if(aux !== selectedElement) td.innerHTML = "";
             else td.innerHTML = aux;
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
  let aux;
  let result = "";
  let count = 0;

  if(period.length !== 0) aux = courses.filter(e => e.length === period.length);
  else return "";

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

  let classes = [];
  let teachers = [];
  aux = "undefined";

  if(result === ""){
    for(let k = 0; k<period.length; k++){
      aux = classes.find(e => e === period[k].class);
      if(typeof aux === "undefined") classes.push(period[k].class);
      aux = teachers.find(e => e === period[k].teacher);
      if(typeof aux === "undefined") teachers.push(period[k].teacher);
    }
    result = classes[0];
    for (let i = 1; i<classes.length; i++){
      result = result.concat('_', classes[i]);
    }
    for (let i = 0; i<teachers.length; i++){
      result = result.concat('_', teachers[i]);
    }
  }

  return  result;
 }


//document.write(JSON.stringify(createTableMatrix(filteredTimeTable, nD, nH)));

//document.write(JSON.stringify(filteredTimeTable));
