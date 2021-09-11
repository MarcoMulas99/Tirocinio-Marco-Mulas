const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const type = urlParams.get('type');
const selectedElement = urlParams.get('selectedElement');

const data = JSON.parse(localStorage.getItem("fileData"));

let navElements;
let selectedElementIndex;


const courses = coursesListConstructor(data.COURSES);

for(let i = 0; i<courses.length; i++){
  courses[i].push(0);
}
console.log(courses);

switch (type) {
  case 'CLASSES':
      navElements = data.CLASSES;
    break;
  case 'TEACHERS':
      navElements = data.TEACHERS;
    break;
  case 'COURSES':
      navElements = courses;
  break;
}
if(type === 'COURSES'){
  selectedElementIndex = findWithAttr(navElements, 'name', selectedElement)
}else selectedElementIndex = navElements.indexOf(selectedElement);


setNavLinks();

const nD = data.nD;
const nH = data.nH;


const colors = [
    {backGround: 'rgba(133, 20, 75, 1)', foreGround: 'rgba(255, 255, 255, 1)'},
    {backGround: 'rgba(255, 221, 0, 1)', foreGround: 'rgba(133, 20, 75, 1)'},
    {backGround: 'rgba(127, 219, 255, 1)', foreGround: 'rgba(133, 20, 75, 1)'},
    {backGround: 'rgba(170, 170, 170, 1)', foreGround: 'rgba(0, 0, 0, 1)'},
    {backGround: 'rgba(0, 0, 0, 1)', foreGround: 'rgba(255, 133, 27, 1)'},
    {backGround: 'rgba(255, 133, 27, 1)', foreGround: 'rgba(0, 0, 0, 1)'},
    {backGround: 'rgba(0, 32, 63, 1)', foreGround: 'rgba(57, 204, 204, 1)'},
    {backGround: 'rgba(46, 204, 64, 1)', foreGround: 'rgba(0, 32, 63, 1)'},
    {backGround: 'rgba(255, 255, 255, 1)', foreGround: 'rgba(133, 20, 75, 1)'},
    {backGround: 'rgba(133, 20, 75, 1)', foreGround: 'rgba(1, 255, 111, 1)'},
    {backGround: 'rgba(1, 255, 111, 1)', foreGround: 'rgba(133, 20, 75, 1)'},
    {backGround: 'rgba(133, 20, 75, 1)', foreGround: 'rgba(127, 219, 255, 1)'},
    {backGround: 'rgba(0, 32, 63, 1)', foreGround: 'rgba(46, 204, 64, 1)'},
    {backGround: 'rgba(133, 20, 75, 1)', foreGround: 'rgba(255, 221, 0, 1)'},
    {backGround: 'rgba(17, 17, 17, 1)', foreGround: 'rgba(46, 204, 64, 1)'},
    {backGround: 'rgba(0, 32, 63, 1)', foreGround: 'rgba(255, 133, 27, 1)'},
    {backGround: 'rgba(0, 0, 0, 1)', foreGround: 'rgba(255, 64, 54, 1)'}];

const fontFamily = [
  {fontFamily: 'monospace'},
  {fontFamily: 'Times New Roman'},
  {fontFamily: 'Georgia'},
  {fontFamily: 'Garamond'},
  {fontFamily: 'Tahoma'},
  {fontFamily: 'Trebuchet MS'}
];
let currentFontInUse = fontFamily[0];

let filteredTimeTable;
let totalPeriods;
let totalPeriodsVal;
let freePeriods;
let freePeriodsVal;

let elementsList;

let htmlTable = document.getElementById('tableSpot');
let tableMatrix;
let finalTable;

let colorAssociations;
let fontFamilyAssociations;
let elementH;
let elementVal;

switch (type) {
  case 'CLASSES':
    filteredTimeTable = data.TIMETABLE.filter(e => {return e.class === selectedElement});

    tableMatrix = createTableMatrix(filteredTimeTable, nD, nH);

    elementsList = extractTeachersFromMatrix(tableMatrix);
    console.log(elementsList);
    colorAssociations = colorAssociationList(elementsList);
    fontFamilyAssociations = fontFamilyAssociationsList(elementsList);
    finalTable = createTable(tableMatrix, type);
    break;
  case 'TEACHERS':


    filteredTimeTable = data.TIMETABLE.filter(e => {return e.teacher === selectedElement});
    let aux = [];
    for(let i = 0; i<filteredTimeTable.length; i++){
      const element = data.TIMETABLE.find(e => e.class === filteredTimeTable[i].class && e.day===filteredTimeTable[i].day && e.period===filteredTimeTable[i].period && e.teacher!==filteredTimeTable[i].teacher);
      if (typeof element !== "undefined") aux.push(element);
    }
    filteredTimeTable = filteredTimeTable.concat(aux);

    tableMatrix = createTableMatrix(filteredTimeTable, nD, nH);

    elementsList = extractClassesFromMatrix(tableMatrix);
    colorAssociations = colorAssociationList(elementsList);
    fontFamilyAssociations = fontFamilyAssociationsList(elementsList);
    console.log(colorAssociations);

    finalTable = createTable(tableMatrix, type);
    break;
  case 'COURSES':
    filteredTimeTable = [];
    const course = data.COURSES.filter(e => e.name === selectedElement);

    filteredTimeTable = filteredTimeTable.concat(data.TIMETABLE.filter(e => {return e.class === course[0].class}));

    console.log(filteredTimeTable);

    tableMatrix = createTableMatrix(filteredTimeTable, nD, nH);

    elementsList = [selectedElement];
    colorAssociations = colorAssociationList(elementsList);
    fontFamilyAssociations = fontFamilyAssociationsList(elementsList);

    finalTable = createTable(tableMatrix, type);


  break;
}

print(finalTable);

/*******************************************************************************************************************************************************************************************************/

function findWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {

      if(array[i].length-1>1){
        if(array[i][1][attr] === value) return i;
      }else if(array[i][0][attr] === value){
          return i;
      }
    }
    return -1;
}

function setNavLinks() {
  	let navSelectedElementRigth;
    let navSelectedElementLeft;

    if(type === 'COURSES'){
      if(selectedElementIndex === navElements.length-1){
        navSelectedElementRigth = navElements[0][0];
      }else{
        navSelectedElementRigth = navElements[selectedElementIndex+1][0];
      }

      if(selectedElementIndex === 0){
        navSelectedElementLeft = navElements[navElements.length-1][0];
      }else{
        navSelectedElementLeft = navElements[selectedElementIndex-1][0];
      }

      navSelectedElementRigth = navSelectedElementRigth.name;
      navSelectedElementLeft = navSelectedElementLeft.name;
    }else {

      if(selectedElementIndex === navElements.length-1){
        navSelectedElementRigth = navElements[0];
      }else{
        navSelectedElementRigth = navElements[selectedElementIndex+1];
      }

      if(selectedElementIndex === 0){
        navSelectedElementLeft = navElements[navElements.length-1];
      }else{
        navSelectedElementLeft = navElements[selectedElementIndex-1];
      }
    }



    document.getElementById('navIconLeft').href = "./linkedPage.html?"+"type="+type+"&selectedElement="+navSelectedElementLeft;
    document.getElementById('navIconRight').href = "./linkedPage.html?"+"type="+type+"&selectedElement="+navSelectedElementRigth;
}

function conferma(){
  document.getElementById('tableSpot').innerHTML="";

  let color;
  let aux;
  let currentColors = document.getElementById('currentColors').children;
  let fontChoice = document.getElementById('fontSelect');

  for(let i = 0; i<currentColors.length; i++){
    aux = currentColors[i].children;

    for(let j = 0; j<aux.length; j++){
      if(aux[j].nodeName === 'SELECT'){
        color = JSON.parse(aux[j].value);
      }
    }

    colorAssociations[i].color = color;
  }

  console.log(fontChoice.value);
  currentFontInUse = JSON.parse(fontChoice.value);



  print(createTable(tableMatrix, type));
  off();


}

function print(finalTable){

  switch (type) {
    case 'CLASSES':

      elementH = document.createElement('P');
      elementH.innerHTML = 'Class: ';
      elementH.classList.add('infoHeader', 'verticalSpace');
      elementVal = document.createElement('P');
      elementVal.innerHTML = selectedElement;
      elementVal.classList.add('infoContent');
      elementH.appendChild(elementVal);


      totalPeriods = document.createElement('P');
      totalPeriods.innerHTML = "Total periods: ";
      totalPeriods.classList.add('infoHeader');
      totalPeriodsVal = document.createElement('P');
      totalPeriodsVal.innerHTML = countWeeklyPeriods(tableMatrix);
      totalPeriodsVal.classList.add('infoContent');
      totalPeriods.appendChild(totalPeriodsVal);

      htmlTable.appendChild(elementH);
      htmlTable.appendChild(totalPeriods);
      htmlTable.appendChild(document.createElement('br'));
      break;
    case 'TEACHERS':

      elementH = document.createElement('P');
      elementH.innerHTML = 'Teacher: ';
      elementH.classList.add('infoHeader', 'verticalSpace');
      elementVal = document.createElement('P');
      elementVal.innerHTML = selectedElement;
      elementVal.classList.add('infoContent');
      elementH.appendChild(elementVal);

      totalPeriods = document.createElement('P');
      totalPeriods.innerHTML = "Total periods: ";
      totalPeriods.classList.add('infoHeader');
      totalPeriodsVal = document.createElement('P');
      totalPeriodsVal.innerHTML = countWeeklyPeriods(tableMatrix)+'   ';
      totalPeriodsVal.classList.add('infoContent');
      totalPeriods.appendChild(totalPeriodsVal);

      freePeriods = document.createElement('P');
      freePeriods.innerHTML = "Free periods: ";
      freePeriods.classList.add('infoHeader');
      freePeriodsVal = document.createElement('P');
      freePeriodsVal.innerHTML =  countFreePeriods(tableMatrix, nH, nD);
      freePeriodsVal.classList.add('infoContent');
      freePeriods.appendChild(freePeriodsVal);

      htmlTable.appendChild(elementH);
      htmlTable.appendChild(totalPeriods);
      htmlTable.appendChild(freePeriods);
      htmlTable.appendChild(document.createElement('br'));

      break;
    case 'COURSES':
    elementH = document.createElement('P');
    elementH.innerHTML = 'Course: ';
    elementH.classList.add('infoHeader', 'verticalSpace');
    elementVal = document.createElement('P');
    elementVal.innerHTML = selectedElement;
    elementVal.classList.add('infoContent');
    elementH.appendChild(elementVal);
    htmlTable.appendChild(elementH);
    htmlTable.appendChild(document.createElement('br'));
    break;
  }

  htmlTable.appendChild(finalTable);
  changeTableDimensions(finalTable);
  let horizontalInfo;
  let info2;

  switch (type) {
    case 'CLASSES':


      horizontalInfo = chartsInfo(type, elementsList, tableMatrix, 'horizontal');
      verticalInfo = chartsInfo(type, elementsList, tableMatrix, 'vertical');
      console.log(verticalInfo);

      for(let i = 0; i<verticalInfo.length; i++){
        let canvas = document.createElement('canvas');

        canvas.classList.add('prova');

        canvas.width = 70;
        canvas.height = finalTable.getBoundingClientRect().height-15;

        htmlTable.appendChild(canvas);

        let ctx = canvas.getContext('2d');

        let l = [];

        for (let j = 0; j<nH; j++){
          l.push(j+1+'° ora');
        }


        let myChart = new Chart(ctx, {
          type: 'bar',
          data: {
              labels: l,
              datasets: [{
                  label: verticalInfo[i].teacher,
                  data: verticalInfo[i].periods,
                  backgroundColor: [
                      findColor(verticalInfo[i].teacher).backGround
                  ],
                  borderColor: [
                      findColor(verticalInfo[i].teacher).backGround
                  ],
                  borderWidth: 1
              }]
          },
          options: {
              indexAxis: 'y',
              maintainAspectRatio: true,
              responsive: false,
              scales: {
                  x: {

                      grid:{
                        display: false
                      },
                      max: nD,
                      min: 0,
                      beginAtZero: true,
                      ticks: {
                        display: false,
                        stepSize: 1
                      }
                  },
                  y: {
                    grid:{
                      display: false
                    },
                    ticks: {
                      display: false,
                      stepSize: 1
                    }
                  },
              },
              plugins: {
                legend: {
                 display: false
                }
              }

          }
      });


      }

      for(let i = 0; i<horizontalInfo.length; i++){
        let canvas = document.createElement('canvas');
        canvas.classList.add('verticalSpace');
        canvas.width = finalTable.getBoundingClientRect().width;
        canvas.height = 70;

        htmlTable.appendChild(canvas);
        canvas.removeAttribute("style");

        let ctx = canvas.getContext('2d');

        let myChart = new Chart(ctx, {
          type: 'bar',
          data: {
              labels: ['LUN', 'MAR', 'MER', 'GIO', 'VEN', 'SAB'],
              datasets: [{
                  label: horizontalInfo[i].teacher,
                  data: horizontalInfo[i].days,
                  backgroundColor: [
                      findColor(horizontalInfo[i].teacher).backGround
                  ],
                  borderColor: [
                      findColor(horizontalInfo[i].teacher).backGround
                  ],
                  borderWidth: 1
              }]
          },
          options: {
              maintainAspectRatio: false,
              responsive: false,
              scales: {
                  y: {
                      grid:{
                        display: false
                      },
                      max: nH,
                      min: 0,
                      beginAtZero: true,
                      ticks: {
                        display: false,
                        stepSize: 1
                      }
                  },
                  x: {
                    grid:{
                      display: false

                    },
                    ticks: {
                      display: false,
                      stepSize: 1
                    }
                  },
              },
              plugins: {
                legend: {
                 display: false
                }
              }
          }
      });


      }



      break;
    case 'TEACHERS':


      verticalInfo = chartsInfo(type, elementsList, tableMatrix, 'vertical');
      horizontalInfo = chartsInfo(type, elementsList, tableMatrix, 'horizontal');
      for(let i = 0; i<verticalInfo.length; i++){
        let canvas = document.createElement('canvas');
        canvas.classList.add('prova');


        canvas.width = 70;
        canvas.height = finalTable.getBoundingClientRect().height-15;


        htmlTable.appendChild(canvas);

        let ctx = canvas.getContext('2d');

        let l = [];

        for (let j = 0; j<nH; j++){
          l.push(j+1+'° ora');
        }


        let myChart = new Chart(ctx, {
          type: 'bar',
          data: {
              labels: l,
              datasets: [{
                  label: verticalInfo[i].class,
                  data: verticalInfo[i].periods,
                  backgroundColor: [
                      findColor(verticalInfo[i].class).backGround
                  ],
                  borderColor: [
                      findColor(verticalInfo[i].class).backGround
                  ],
                  borderWidth: 1
              }]
          },
          options: {
              indexAxis: 'y',
              maintainAspectRatio: true,
              responsive: false,
              scales: {
                  x: {
                      grid:{
                        display: false
                      },
                      max: nD,
                      min: 0,
                      beginAtZero: true,
                      ticks: {
                        display: false,
                        stepSize: 1
                      }
                  },
                  y: {
                    grid:{
                      display: false
                    },
                    ticks: {
                      display: false,
                      stepSize: 1
                    }
                  },
              },
              plugins: {
                legend: {
                 display: false
                }
              }

          }
      });


      }

      for(let i = 0; i<horizontalInfo.length; i++){
        let canvas = document.createElement('canvas');
        canvas.classList.add('verticalSpace');
        canvas.width = finalTable.getBoundingClientRect().width;
        canvas.height = 70;


        htmlTable.appendChild(canvas);
        canvas.removeAttribute("style");

        let ctx = canvas.getContext('2d');

        let myChart = new Chart(ctx, {
          type: 'bar',
          data: {
              labels: ['LUN', 'MAR', 'MER', 'GIO', 'VEN', 'SAB'],
              datasets: [{
                  label: horizontalInfo[i].class,
                  data: horizontalInfo[i].days,
                  backgroundColor: [
                      findColor(horizontalInfo[i].class).backGround
                  ],
                  borderColor: [
                      findColor(horizontalInfo[i].class).backGround
                  ],
                  borderWidth: 1
              }]
          },
          options: {
              maintainAspectRatio: false,
              responsive: false,
              scales: {
                  y: {
                      grid:{
                        display: false
                      },
                      max: nH,
                      min: 0,
                      beginAtZero: true,
                      ticks: {
                        display: false,
                        stepSize: 1
                      }
                  },
                  x: {
                    grid:{
                      display: false
                    },
                    ticks: {
                      display: false,
                      stepSize: 1
                    }
                  },
              },
              plugins: {
                legend: {
                 display: false
                }
              }
          }
      });


      }
  }
}

function on() {
  document.getElementById("overlay").style.display = "block";
  fontOption();
  printColorsInUse();
  console.log(colorAssociations);
}

function off() {
  document.getElementById('tableSpot').innerHTML="";
  print(createTable(tableMatrix, type));

  document.getElementById("overlay").style.display = "none";
  document.getElementById('currentColors').innerHTML = '';
  document.getElementById('font').innerHTML = '';
}

function fontOption(){
  fontDiv = document.getElementById('font');

  fontDiv.appendChild(printFontOptions());
}

function printFontOptions(){
  let select;
  let option;
  select = document.createElement('select');
  select.id = 'fontSelect'
  select.classList.add('fontSelect');
  select.setAttribute("onchange", "selectFont(this)")

  for(let i = 0; i<fontFamily.length; i++){
    option = document.createElement('option');

    option.style.fontFamily = fontFamily[i];
    option.value = JSON.stringify(fontFamily[i]);
    option.innerHTML = fontFamily[i].fontFamily;

    if(currentFontInUse.fontFamily === fontFamily[i].fontFamily){
      option.selected = 'selected';
    }
    select.appendChild(option);
  }

  return select;
}

function printColorsInUse(){
  scrollView = document.getElementById('currentColors');
  let line;
  let info;

  for(let i = 0; i<colorAssociations.length; i++){
    line = document.createElement('div');
    info = document.createElement('p');


    info.innerHTML = colorAssociations[i].element;
    line.classList.add('colorOptions');


    let temp = printAllColors(colorAssociations[i].color);
    temp.style.backgroundColor = colorAssociations[i].color.backGround;
    temp.style.color = colorAssociations[i].color.foreGround;

    line.appendChild(temp);
    console.log(JSON.parse(temp.value));
    scrollView.appendChild(line);
    line.appendChild(info);
  }
}

function printAllColors(currentColor){

  let select;
  let option;
  select = document.createElement('select');
  select.setAttribute("onchange", "selectColor(this)")
  select.classList.add('colorSelect');

  for(let i = 0; i<colors.length; i++){
    option = document.createElement('option');

    option.style.backgroundColor = colors[i].backGround;
    option.style.color = colors[i].foreGround;
    option.value = JSON.stringify(colors[i]);
    option.innerHTML = 'Aa';

    if(currentColor.backGround === colors[i].backGround && currentColor.foreGround === colors[i].foreGround){
      option.selected = 'selected';
    }

    select.appendChild(option);
  }

  return select;
}

function selectColor(selectedObject){
  console.log(selectedObject.value);

  let val = JSON.parse(selectedObject.value);

  selectedObject.style.backgroundColor = val.backGround;
  selectedObject.style.color = val.foreGround;
}

function selectFont(selectedObject){

  let val = JSON.parse(selectedObject.value);
  console.log(val);
  selectedObject.style.fontFamily = val.fontFamily;
}

function changeTableDimensions(table){
  let rows = table.children;
  let rowCells;
  let divs;

  const totWidth = window.innerWidth/2;
  const totHeight = window.innerHeight/4;

  const tdWidth = totWidth/6;
  const tdHeight = totHeight/6;




  for(let i = 0; i<rows.length; i++){
    rowCells = rows[i].children;
    rows[i].style.width = totWidth + 'px';
    for(let j = 0; j<rowCells.length; j++){
      if(rowCells[j].nodeName === 'TD'){
        rowCells[j].style.minWidth = tdWidth+'px';
        rowCells[j].style.height = tdHeight+'px';
        divs = rowCells[j].children;
        for(let k = 0; k<divs.length; k++){
          divs[k].style.height = tdHeight/divs.length+'px';

        }
      }
    }
  }
}

function colorAssociationList(list){
  let temp = [];
  for(let i = 0; i<list.length; i++){
    temp.push(
      {
        element: list[i],
        color: colors[i]
      }
    );
  }

  return temp;
}

function fontFamilyAssociationsList(list){
  let temp = [];

  for(let i = 0; i<list.length; i++){
    temp.push(
      {
        element: list[i],
        fontFamily: fontFamily[0]
      }
    );
  }

  return temp;
}

function chartsInfo(type, chartOwners, matrix, distrType){
  let info = [];

  switch (type) {
    case 'CLASSES':
      for(let i = 0; i<chartOwners.length; i++){
        if(distrType==='horizontal'){
          info.push({teacher:chartOwners[i], days:new Array(nD).fill(0)});
        }else{
          info.push({teacher:chartOwners[i], periods:new Array(nH).fill(0)});
        }
      }
      for(let i = 0; i<matrix.length; i++){
        for(let j = 0; j<matrix[i].length; j++){
          for(let k = 0; k<matrix[i][j].length; k++){
            if(distrType==='horizontal'){
              if(matrix[i][j].length>0)info.find(e => e.teacher === matrix[i][j][k].teacher).days[j]++;
            }else{
              if(matrix[i][j].length>0)info.find(e => e.teacher === matrix[i][j][k].teacher).periods[matrix[i][j][k].period-1]++;
            }
          }
        }
      }
      break;
    case 'TEACHERS':
      for(let i = 0; i<chartOwners.length; i++){
        if(distrType === 'vertical'){
          info.push({class:chartOwners[i], periods:new Array(nH).fill(0)});
        }
        else{
          info.push({class:chartOwners[i], days:new Array(nD).fill(0)});
        }
      }
      for(let i = 0; i<matrix.length; i++){
        for(let j = 0; j<matrix[i].length; j++){
          for(let k = 0; k<matrix[i][j].length; k++){
            if(matrix[i][j][k].teacher === selectedElement){
              if(distrType === 'vertical'){
                info.find(e => e.class === matrix[i][j][k].class).periods[matrix[i][j][k].period-1]++;
              }else{
                if(matrix[i][j].length>0)info.find(e => e.class === matrix[i][j][k].class).days[j]++;
              }
            }
          }
        }
      }
    break;
  }
  console.log(info);
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
  table.id = 'timeTable';
  table.classList.add('verticalSpace');

  let tr;
	let td;
  let th;
  let temp;

  table.classList.add('prova');

  tr = document.createElement('TR');
  table.appendChild(tr);

  for(let i = 0; i<=6; i++){
    th = document.createElement('TH');
    switch(i){
			case 0:
				th.innerHTML = ""
				break;
			case 1:
				th.innerHTML = "Monday"
				break;
			case 2:
				th.innerHTML = "Tusday"
				break;
			case 3:
				th.innerHTML = "Wednesday"
				break;
      case 4:
        th.innerHTML = "Thursday"
        break;
      case 5:
        th.innerHTML = "Friday"
        break;
      case 6:
        th.innerHTML = "Saturday"
        break;
		}

		tr.appendChild(th);
  }



  for (i = 0; i<matrix.length; i++){
    tr = document.createElement('TR');

    table.appendChild(tr);

    th = document.createElement('TH');
    th.innerHTML = i+1;
    tr.appendChild(th);

    for(j = 0; j<matrix[i].length; j++){
      td = document.createElement('TD');
      tr.appendChild(td);
      let str = "";
      if(matrix[i][j].length !== 0){
        switch (type) {
          case 'CLASSES':

            for(let k = 0; k<matrix[i][j].length; k++){
              temp = document.createElement('div');
              temp.innerHTML = matrix[i][j][k].teacher;
              temp.style.color = findColor(matrix[i][j][k].teacher).foreGround;
              temp.style.backgroundColor = findColor(matrix[i][j][k].teacher).backGround;
              temp.style.fontFamily = currentFontInUse.fontFamily;
              temp.classList.add('inTable');
              td.appendChild(temp);
            }
            break;
          case 'TEACHERS':
            for(let k = 0; k<matrix[i][j].length; k++){
              if(matrix[i][j][k].teacher === selectedElement){
                temp = document.createElement('div');
                temp.innerHTML = matrix[i][j][k].class;
                temp.style.color = findColor(matrix[i][j][k].class).foreGround;
                temp.style.backgroundColor = findColor(matrix[i][j][k].class).backGround;
                temp.style.fontFamily = currentFontInUse.fontFamily;
                temp.classList.add('inTable');
                td.appendChild(temp);
              }
            }
            break;
          case 'COURSES':
            const aux = findCourse(matrix[i][j]);
            temp = document.createElement('div');
            if(aux !== selectedElement) temp.innerHTML = "";
             else {
               temp.innerHTML = aux;
               temp.style.color = findColor(aux).foreGround;
               temp.style.backgroundColor = findColor(aux).backGround;
               temp.style.fontFamily = currentFontInUse.fontFamily;
               temp.classList.add('inTable');
             }
              td.appendChild(temp);
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
  let result = "";
  let count = 0;


let temp;
let aux = false;

  if(typeof courses !== "undefined"){
    for(let i = 0; i<courses.length; i++){
      if(aux) break;
      aux = false;
      count=0;
      for(let j = 0; j<period.length; j++){
        if(typeof courses[i].find(e => e.class === period[j].class && e.teacher === period[j].teacher) !== "undefined") count++;
        else break;
        if(count === period.length) {
          if(courses[i][courses[i].length-1]<courses[i][0].duration){
            courses[i][courses[i].length-1]++;
            result = courses[i][0].name;
            aux = true;
            break;
          }
        }
      }
    }
  }

  return  result;
 }

function findColor(element){
  for (let i = 0; i<colorAssociations.length; i++){
    if (element === colorAssociations [i].element) {
      return colorAssociations[i].color;
    }
  }
}

function findFontFamily(element){
  for (let i = 0; i<fontFamilyAssociations.length; i++){
    if (element === fontFamilyAssociations[i].element) {
      return fontFamilyAssociations[i].fontFamily;
    }
  }
}
