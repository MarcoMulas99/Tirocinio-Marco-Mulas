let instanceName;
let instanceDays;
let instanceDailyPeriods;

let subjectsTable = [];


/*----------------------------------------------------------------------------*/

let fileInput;
let currentTab;


/*----------------------------------------------------------------------------*/


function openTabContent(evt, selectedTab) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(selectedTab).style.display = "block";
  evt.currentTarget.className += " active";
  console.log(evt.currentTarget.id);
  switch (evt.currentTarget.id) {
    case 'SubjectsTab':
      fileInput = document.getElementById("csvSubject");
      fileInput.addEventListener('change', readFile);
      currentTab = 'SubjectsTab';
      break;
    default:

  }
}

function saveInstaceData(){

  let name = document.getElementById('InstanceName');
  let days = document.getElementById('InstanceDays');
  let daysCustom = document.getElementById('UserDefinedDays');
  let dailyPeriods = document.getElementById('DailyPeriods');

  instanceName = name.value;
  if(days.value === 'User-defined') instanceDays = daysCustom.value;
  else instanceDays = days.value;
  instanceDailyPeriods = dailyPeriods.value;
}

function insertNewSubject(){
  const tableBody = document.getElementById('subjectsTableBody');
  const id = document.getElementById('subjectId');
  const name = document.getElementById('subjectName');

  if(id.value !== '' && name.value !== ''){
    subjectsTable.push(
      {
        id: id.value,
        name: name.value
      }
    );

    let tr = document.createElement('TR');
    let td = document.createElement('TD');

    tr.setAttribute('onmousedown', 'RowClick(this,false)');

    tableBody.appendChild(tr);

    td.innerHTML = id.value;
    tr.appendChild(td);

    td = document.createElement('TD');
    td.innerHTML = name.value;
    tr.appendChild(td);
  }

  console.log(subjectsTable);
}

function deleteSubjects(){
  let trs = document.getElementById('subjectsTable').tBodies[0].getElementsByClassName('selected');

  for(let i = trs.length-1; i>=0; i--){
    subjectsTable.splice(trs[i].rowIndex-1,1);
    trs[i].remove();
  }
}

function updateSubject(){
  const id = document.getElementById('subjectId');
  const name = document.getElementById('subjectName');

  if(lastSelectedRow === 'undefined') return;
  if(id.value === '' || name.value === '') return;

  let tds = lastSelectedRow.childNodes;

  tds[0].innerHTML = id.value;
  tds[1].innerHTML = name.value;

  subjectsTable[lastSelectedRow.rowIndex-1].id = id.value;
  subjectsTable[lastSelectedRow.rowIndex-1].name = name.value;
}


//table manipulation
let lastSelectedRow;
let trs = document.getElementById('subjectsTable').tBodies[0].getElementsByTagName('tr');

document.onselectstart = function() {
    return false;
}

function RowClick(currenttr, lock) {
    if (window.event.ctrlKey) {
        toggleRow(currenttr);
    }

    if (window.event.button === 0) {
        if (!window.event.ctrlKey && !window.event.shiftKey) {
            clearAll();
            toggleRow(currenttr);
        }

        if (window.event.shiftKey) {
            selectRowsBetweenIndexes([lastSelectedRow.rowIndex, currenttr.rowIndex])
        }
    }

    const id = document.getElementById('subjectId');
    const name = document.getElementById('subjectName');

    console.log(currenttr.rowIndex);
    id.value = subjectsTable[currenttr.rowIndex-1].id;
    name.value = subjectsTable[currenttr.rowIndex-1].name;

}

function toggleRow(row) {
    row.className = row.className == 'selected' ? '' : 'selected';
    lastSelectedRow = row;
}

function selectRowsBetweenIndexes(indexes) {
    indexes.sort(function(a, b) {
        return a - b;
    });

    for (var i = indexes[0]; i <= indexes[1]; i++) {
        trs[i-1].className = 'selected';
    }
}

function clearAll() {
    for (var i = 0; i < trs.length; i++) {
        trs[i].className = '';
    }
}

function readFile() {
  //console.log(typeof fileInput);

  var reader = new FileReader();
  reader.onload = function () {
    //fileContent = reader.result;
    //console.log(fileContent.split('\n'));

    switch (currentTab) {
      case 'SubjectsTab':
          extractSubject(reader.result);
        break;

    }

    //var encodedUri = encodeURI(fileContent);
    //window.open(encodedUri);
      //document.getElementById('out').innerHTML = reader.result;
  };
  // start reading the file. When it is done, calls the onload event defined above.
  reader.readAsBinaryString(fileInput.files[0]);
}


function exportToCsv(filename, rows) {
    var processRow = function (row) {
        var finalVal = '';
        for (var j = 0; j < row.length; j++) {//DA CAMBIARE iterare per gli elemetni di un oggetto
            var innerValue = row[j] === null ? '' : row[j].toString();
            if (row[j] instanceof Date) {
                innerValue = row[j].toLocaleString();
            };
            var result = innerValue.replace(/"/g, '""');
            if (result.search(/("|,|\n)/g) >= 0)
                result = '"' + result + '"';
            if (j > 0)
                finalVal += ',';
            finalVal += result;
        }
        return finalVal + '\n';
    };

    var csvFile = '';
    for (var i = 0; i < rows.length; i++) {
        csvFile += processRow(rows[i]);
    }

    var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, filename);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}

function extractSubject(content){
  let temp = content.split('\n');

  for(let i = 0; i<temp.length; i++){
    temp[i] = temp[i].split(',');
  }

  for(i = 0; i<temp.length; i++){
    if(temp[i].length>1){
      subjectsTable.push(
        {
          id: temp[i][0],
          name: temp[i][1]
        }
      );
    }
  }

  const tableBody = document.getElementById('subjectsTableBody');

  for(i = 0; i<subjectsTable.length; i++){

    let tr = document.createElement('TR');
    let td = document.createElement('TD');

    tr.setAttribute('onmousedown', 'RowClick(this,false)');

    tableBody.appendChild(tr);

    td.innerHTML = subjectsTable[i].id;
    tr.appendChild(td);

    td = document.createElement('TD');
    td.innerHTML = subjectsTable[i].name;
    tr.appendChild(td);

  }
}


function toRows(listOfObjects){
  let temp = [];
  let result = [];
  for (let i = 0; i<listOfObjects.length; i++){
    for(const [key, value] of Object.entries(listOfObjects[i])){
      temp.push(value);
    }
    result.push(temp);
    temp = [];
  }

  return result;
}
