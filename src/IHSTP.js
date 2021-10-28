let instanceName;
let instanceDays;
let instanceDailyPeriods = 6;

let subjectsTable = [];
let teachersTable = [];
let classesTable = [];
let classesRequirementsTable = [];
let classTeacherTable = [];

document.getElementById('InstanceTab').click();

/*----------------------------------------------------------------------------*/

let fileInput;
let currentTab;
let lastSelectedClass;
let lastSelectedSubject;
let lastSelectedTeacher;
let lastSelectedCoTeacher;


const idSubjects = document.getElementById('subjectId');
const nameSubjects = document.getElementById('subjectName');

const idTechers = document.getElementById('teacherId');
const nameTeachers = document.getElementById('teacherName');
const surname = document.getElementById('teacherSurname');
const weekHours = document.getElementById('teacherWeekHours');
const dayOff = document.getElementById('teacherDayOff');
const minAddDOff = document.getElementById('teacherMinAddDaysOff');
const maxAddDOff = document.getElementById('teacherMaxAddDaysOff');
const addDOffWeight = document.getElementById('teacherAddDaysOffWeight');
const minDPeriods = document.getElementById('teacherMinDailyPeriods');
const maxDPeriods = document.getElementById('teacherMaxDailyPeriods');
const minClassPeriods = document.getElementById('teacherMinClassPeriods');
const maxClassPeriods = document.getElementById('teacherMaxClassPeriods');
const hoursDistributionBody = document.getElementById('teachersHoursDistributionBody');
const hoursDistributionHead = document.getElementById('teachersHoursDistributionHead');

const idClasses = document.getElementById('idClasses');
const yearClasses = document.getElementById('yearClasses');
const sectionClasses = document.getElementById('sectionClasses');
const weekHoursClasses = document.getElementById('weekHoursClasses');
const classHoursDistributionBody = document.getElementById('classHoursDistributionBody');

const classesListRequirements = document.getElementById('classesListRequirements');
const subjectsListRequirements = document.getElementById('subjectsListRequirements');
const requirementsHours = document.getElementById('requirementsHours');
const classRequirementsId = document.getElementById('classRequirementsId');
const currentHours = document.getElementById('currentHours');
const requirementsTotalHours = document.getElementById('requirementsTotalHours');
const requirementsHoursDistrBody = document.getElementById('requirementsDistributionBody');

const classesListClassTeacher = document.getElementById('ClassTeacherClassList');
const subjectsListClassTeachers = document.getElementById('ClassTeacherSubjectList');
const teachersListClassTeacher = document.getElementById('ClassTeacherTeacherList');
const coTeacherListClassTeachers = document.getElementById('ClassTeacherCoTeacherList');
const classTeachersHours = document.getElementById('ClassTeacherHours');
const classTeacherId = document.getElementById('ClassTeacherId');
const classTeachercurrentHours = document.getElementById('ClassTeachercurrentHours');
const classTeacherTotalHours = document.getElementById('ClassTeacherTotalHours');
const classTeacherHoursDistrBody = document.getElementById('classTeacherDistributionBody');



/*----------------------------------------------------------------------------*/
function getClassInfo(element){
  for (let i = 0; i<classesTable.length; i++){
    if(classesTable[i].id === element) return classesTable[i];
  }
}

function setValueForAll() {
  tableBody = document.getElementById('teachersTableBody');
  tableBody.innerHTML = '';

  for (let i = 0; i<teachersTable.length; i++){
    teachersTable[i].dayOff = dayOff.value;
    teachersTable[i].minAddDOff = minAddDOff.value;
    teachersTable[i].maxAddDOff = maxAddDOff.value;
    teachersTable[i].addDOffWeight = addDOffWeight.value;
    teachersTable[i].minDPeriods = minDPeriods.value;
    teachersTable[i].maxDPeriods = maxDPeriods.value;
    teachersTable[i].minClassPeriods = minClassPeriods.value;
    teachersTable[i].maxClassPeriods = maxClassPeriods.value;
    teachersTable[i].hourDistribution = getHourDistribution(hoursDistributionBody);
  }


  for(let j = 0; j<teachersTable.length; j++){

    tr = document.createElement('TR');

    tr.setAttribute('onmousedown', 'RowClick(this,false)');

    tableBody.appendChild(tr);

    td = document.createElement('TD');
    td.innerHTML = teachersTable[j].id;
    tr.appendChild(td);

    td = document.createElement('TD');
    td.innerHTML = teachersTable[j].name;
    tr.appendChild(td);

    td = document.createElement('TD');
    td.innerHTML = teachersTable[j].surname;
    tr.appendChild(td);

    td = document.createElement('TD');
    td.innerHTML = teachersTable[j].dayOff;
    tr.appendChild(td);

    td = document.createElement('TD');
    td.innerHTML = teachersTable[j].minAddDOff;
    tr.appendChild(td);

    td = document.createElement('TD');
    td.innerHTML = teachersTable[j].maxAddDOff;
    tr.appendChild(td);

    td = document.createElement('TD');
    td.innerHTML = teachersTable[j].addDOffWeight;
    tr.appendChild(td);

    td = document.createElement('TD');
    td.innerHTML = teachersTable[j].minDPeriods;
    tr.appendChild(td);

    td = document.createElement('TD');
    td.innerHTML = teachersTable[j].maxDPeriods;
    tr.appendChild(td);

    td = document.createElement('TD');
    td.innerHTML = teachersTable[j].minClassPeriods;
    tr.appendChild(td);

    td = document.createElement('TD');
    td.innerHTML = teachersTable[j].maxClassPeriods;
    tr.appendChild(td);

  }
}

function initializeTableDistr(body, head) {
  let tr, td, th;
  console.log(instanceDays);
  body.innerHTML = '';
  head.innerHTML = '';
  console.log(body, head);

  tr = document.createElement('TR');
  th = document.createElement('TH');
  th.innerHTML = 'Period';
  tr.appendChild(th);
  console.log(instanceDays.days);
  for(let i = 0; i<instanceDays.days.length; i++){
    th = document.createElement('TH');

    th.innerHTML = instanceDays.days[i];
    tr.appendChild(th);
  }
  head.appendChild(tr);

  console.log(instanceDailyPeriods);

  for(i = 0; i<instanceDailyPeriods; i++){
    tr = document.createElement('TR');
    body.appendChild(tr);
    for(let j = 0; j<instanceDays.days.length+1; j++){
      if(j === 0) {
        td = document.createElement('TH');
        td.innerHTML = i+1;
      }
      else{
          td = document.createElement('TD');
          td.setAttribute('onmousedown', 'cellClick(this)');
      }
      tr.appendChild(td);
    }
  }
}

function cellClick(element) {
  element.className = element.className == 'selectedCell' ? '' : 'selectedCell';
}

function openTabContent(evt, selectedTab) {
  // Declare all variables
  let i, tabcontent, tablinks;
  let tr, td;

  // Controlli per switch delle tab
  switch (evt.currentTarget.id) {
    case 'SubjectsTab':
      if(typeof instanceName === 'undefined') return;
      break;
    case 'TeachersTab':
      if(subjectsTable.length === 0) return;
      break;
    case 'ClassesTab':
      if(teachersTable.length === 0) return;
      break;
    case 'ClassRequirementsTab':
      if(classesTable.length === 0) return;
      break;
    case 'ClassTeacherTab':
      if(classesRequirementsTable.length === 0) return;
      break;
  }


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
    case 'TeachersTab':
      fileInput = document.getElementById("csvTeachers");
      fileInput.addEventListener('change', readFile);
      currentTab = 'TeachersTab';
      break;
    case 'ClassesTab':
      fileInput = document.getElementById('csvClasses');
      fileInput.addEventListener('change', readFile);
      currentTab = 'ClassesTab';
    break;
    case 'ClassRequirementsTab':
    fileInput = document.getElementById('csvClassesRequiremnet');
    fileInput.addEventListener('change', readFile);
    currentTab = 'ClassRequirementsTab';

    document.getElementById('classesListRequirementsTableBody').innerHTML = '';
    document.getElementById('subjectsListRequirementsTableBody').innerHTML = '';

    for(i = 0; i<classesTable.length; i++){
      tr = document.createElement('TR');
      tr.setAttribute('onmousedown', 'selectElement(this, "classes")');
      td = document.createElement('TD');
      td.innerHTML = classesTable[i].id;
      tr.appendChild(td);
      classesListRequirements.tBodies[0].appendChild(tr);
    }

    for(i = 0; i<subjectsTable.length; i++){
      tr = document.createElement('TR');
      tr.setAttribute('onmousedown', 'selectElement(this, "subjects")');
      td = document.createElement('TD');
      td.innerHTML = subjectsTable[i].id;
      tr.appendChild(td);
      subjectsListRequirements.tBodies[0].appendChild(tr);
    }

    break;
    case 'ClassTeacherTab':

    lastSelectedClass = undefined;
    lastSelectedSubject = undefined;

    fileInput = document.getElementById('csvClassTeacher');
    fileInput.addEventListener('change', readFile);
    currentTab = 'ClassTeacherTab';

    document.getElementById('ClassTeacherClassListTableBody').innerHTML = '';
    document.getElementById('ClassTeacherSubjectListTableBody').innerHTML = '';
    document.getElementById('ClassTeacherTeacherListTableBody').innerHTML = '';
    document.getElementById('ClassTeacherCoTeacherListTableBody').innerHTML = '';

    for(i = 0; i<classesTable.length; i++){
      tr = document.createElement('TR');
      tr.setAttribute('onmousedown', 'selectElement(this, "classesA")');
      td = document.createElement('TD');
      td.innerHTML = classesTable[i].id;
      tr.appendChild(td);
      classesListClassTeacher.tBodies[0].appendChild(tr);
    }

    for(i = 0; i<subjectsTable.length; i++){
      tr = document.createElement('TR');
      tr.setAttribute('onmousedown', 'selectElement(this, "subjectsA")');
      td = document.createElement('TD');
      td.innerHTML = subjectsTable[i].id;
      tr.appendChild(td);
      subjectsListClassTeachers.tBodies[0].appendChild(tr);
    }

    for(i = 0; i<teachersTable.length; i++){
      tr = document.createElement('TR');
      tr.setAttribute('onmousedown', 'selectElement(this, "teachers")');
      td = document.createElement('TD');
      td.innerHTML = teachersTable[i].id;
      tr.appendChild(td);
      teachersListClassTeacher.tBodies[0].appendChild(tr);
    }

    for(i = 0; i<teachersTable.length; i++){
      tr = document.createElement('TR');
      tr.setAttribute('onmousedown', 'selectElement(this, "coTeachers")');
      td = document.createElement('TD');
      td.innerHTML = teachersTable[i].id;
      tr.appendChild(td);
      coTeacherListClassTeachers.tBodies[0].appendChild(tr);
    }

    break;
  }


}

function selectElement(element, type){

  let list;
  switch (type) {
    case 'classes':
      list = classesListRequirements.tBodies[0].childNodes;
      lastSelectedClass = element;
      console.log(element);
      if(typeof lastSelectedSubject === 'undefined'){
        classRequirementsId.value = "null_"+element.childNodes[0].innerHTML;
      }else classRequirementsId.value = lastSelectedSubject.childNodes[0].innerHTML+"_"+element.childNodes[0].innerHTML;

      currentHours.innerHTML = countClassHours(element.childNodes[0].innerHTML);
      requirementsTotalHours.innerHTML = '/' + classesTable.find(e => e.id === element.childNodes[0].innerHTML).weekHours;
      setHourDistribution(getClassInfo(lastSelectedClass.childNodes[0].innerHTML).hourDistribution, requirementsHoursDistrBody);

      break;
    case 'subjects':
      list = subjectsListRequirements.tBodies[0].childNodes;
      lastSelectedSubject = element;
      if(typeof lastSelectedClass === 'undefined'){
        classRequirementsId.value = element.childNodes[0].innerHTML+"_null";
      }else classRequirementsId.value = element.childNodes[0].innerHTML+"_"+lastSelectedClass.childNodes[0].innerHTML;
      break;
    case 'classesA':
      list = classesListClassTeacher.tBodies[0].childNodes;
      lastSelectedClass = element;
      if(typeof lastSelectedSubject === 'undefined'){
        classTeacherId.value = "null_"+element.childNodes[0].innerHTML;
      }else classTeacherId.value = lastSelectedSubject.childNodes[0].innerHTML+"_"+element.childNodes[0].innerHTML;
      classTeachercurrentHours.innerHTML = countClassHours(element.childNodes[0].innerHTML);
      classTeacherTotalHours.innerHTML = '/' + classesTable.find(e => e.id === element.childNodes[0].innerHTML).weekHours;
      setHourDistribution(getClassInfo(lastSelectedClass.childNodes[0].innerHTML).hourDistribution, classTeacherHoursDistrBody);
      break;
    case 'subjectsA':
      list = subjectsListClassTeachers.tBodies[0].childNodes;
      lastSelectedSubject = element;
      if(typeof lastSelectedClass === 'undefined'){
        classTeacherId.value = element.childNodes[0].innerHTML+"_null";
      }else classTeacherId.value = element.childNodes[0].innerHTML+"_"+lastSelectedClass.childNodes[0].innerHTML;

      break;
    case 'teachers':
      list = teachersListClassTeacher.tBodies[0].childNodes;
      lastSelectedTeacher = element;
      currentHours.innerHTML = countClassHours(element.childNodes[0].innerHTML);

      break;
    case 'coTeachers':
      list = coTeacherListClassTeachers.tBodies[0].childNodes;
      lastSelectedCoTeacher = element;
      break;

  }

  for (let i = 0; i < list.length; i++) {
      list[i].className = '';
  }

  element.className = element.className == 'selected' ? '' : 'selected';
}

function countClassHours(element){
  let counter = 0;

  switch (currentTab) {
    case 'ClassRequirementsTab':
    for(let i = 0; i<classesRequirementsTable.length; i++){
      if(classesRequirementsTable[i].class === element){
        counter += parseInt(classesRequirementsTable[i].hours);
      }
    }
      break;
    case 'ClassTeacherTab':
    for(let i = 0; i<classTeacherTable.length; i++){
      if(classTeacherTable[i].class === element){
        counter += parseInt(classTeacherTable[i].hours);
      }
    }
    break;
  }

  return counter;
}

function saveInstaceData(){

  let name = document.getElementById('InstanceName');
  let days = document.getElementById('InstanceDays');
  let daysCustom = document.getElementById('UserDefinedDays');
  let dailyPeriods = document.getElementById('DailyPeriods');

  instanceName = name.value;
  if(days.value === 'User-defined') instanceDays = {days: daysCustom.value.split(',')};
  else instanceDays = JSON.parse(days.value);
  instanceDailyPeriods = dailyPeriods.value;
  initializeTableDistr(document.getElementById('teachersHoursDistributionBody'), document.getElementById('teachersHoursDistributionHead'));
  initializeTableDistr(document.getElementById('classHoursDistributionBody'), document.getElementById('classHoursDistributionHead'));
  initializeTableDistr(document.getElementById('requirementsDistributionBody'), document.getElementById('requirementsDistributionHead'));
  initializeTableDistr(document.getElementById('classTeacherDistributionBody'), document.getElementById('classTeacherDistributionHead'));

}

function insertNewElement(){

  let tr = document.createElement('TR');
  let td;

  tr.setAttribute('onmousedown', 'RowClick(this,false)');

  let tableBody;

  switch (currentTab) {
    case 'SubjectsTab':

      if(typeof subjectsTable.find(e => e.id === idSubjects.value) !== 'undefined') return;

      tableBody = document.getElementById('subjectsTableBody');


      if(idSubjects.value !== '' && nameSubjects.value !== ''){
        tableBody.appendChild(tr);

        subjectsTable.push(
          {
            id: idSubjects.value,
            name: nameSubjects.value
          }
        );

        td = document.createElement('TD');
        td.innerHTML = idSubjects.value;
        tr.appendChild(td);

        td = document.createElement('TD');
        td.innerHTML = nameSubjects.value;
        tr.appendChild(td);
      }


    break;

    case 'TeachersTab':

      if(typeof teachersTable.find(e => e.id === idTechers.value) !== 'undefined') return;

      tableBody = document.getElementById('teachersTableBody');
      tableBody.appendChild(tr);

      teachersTable.push(
          {
            id : idTechers.value,
            name : nameTeachers.value,
            surname : surname.value,
            weekHours : weekHours.value,
            dayOff : dayOff.value,
            minAddDOff : minAddDOff.value,
            maxAddDOff : maxAddDOff.value,
            addDOffWeight : addDOffWeight.value,
            minDPeriods : minDPeriods.value,
            maxDPeriods : maxDPeriods.value,
            minClassPeriods : minClassPeriods.value,
            maxClassPeriods : maxClassPeriods.value,
            hourDistribution : getHourDistribution(hoursDistributionBody)
          });


      td = document.createElement('TD');
      td.innerHTML = idTechers.value;
      tr.appendChild(td);

      td = document.createElement('TD');
      td.innerHTML = nameTeachers.value;
      tr.appendChild(td);

      td = document.createElement('TD');
      td.innerHTML = surname.value;
      tr.appendChild(td);

      td = document.createElement('TD');
      td.innerHTML = weekHours.value;
      tr.appendChild(td);

      td = document.createElement('TD');
      td.innerHTML = dayOff.value;
      tr.appendChild(td);

      td = document.createElement('TD');
      td.innerHTML = minAddDOff.value;
      tr.appendChild(td);

      td = document.createElement('TD');
      td.innerHTML = maxAddDOff.value;
      tr.appendChild(td);

      td = document.createElement('TD');
      td.innerHTML = addDOffWeight.value;
      tr.appendChild(td);

      td = document.createElement('TD');
      td.innerHTML = minDPeriods.value;
      tr.appendChild(td);

      td = document.createElement('TD');
      td.innerHTML = maxDPeriods.value;
      tr.appendChild(td);

      td = document.createElement('TD');
      td.innerHTML = minClassPeriods.value;
      tr.appendChild(td);

      td = document.createElement('TD');
      td.innerHTML = maxClassPeriods.value;
      tr.appendChild(td);

      console.log(teachersTable);
      break;
      case 'ClassesTab':

      if(typeof classesTable.find(e => e.id === idClasses.value) !== 'undefined') return;

      tableBody = document.getElementById('classesTableBody');
      tableBody.appendChild(tr);


        classesTable.push(
        {
          id: idClasses.value,
          year: yearClasses.value,
          section: sectionClasses.value,
          weekHours: weekHoursClasses.value,
          hourDistribution : getHourDistribution(classHoursDistributionBody)
        }
      );


        td = document.createElement('TD');
        td.innerHTML = idClasses.value;
        tr.appendChild(td);

        td = document.createElement('TD');
        td.innerHTML = yearClasses.value;
        tr.appendChild(td);

        td = document.createElement('TD');
        td.innerHTML = sectionClasses.value;
        tr.appendChild(td);

        td = document.createElement('TD');
        td.innerHTML = weekHoursClasses.value;
        tr.appendChild(td);

        break;
        case 'ClassRequirementsTab':

        console.log(typeof classesRequirementsTable.find(e => e.id === classRequirementsId.value) !== 'undefined');
        if(typeof classesRequirementsTable.find(e => e.id === classRequirementsId.value) !== 'undefined') return;

        if(countClassHours(lastSelectedClass.childNodes[0].innerHTML) + parseInt(requirementsHours.value) > classesTable.find(e => e.id === lastSelectedClass.childNodes[0].innerHTML).weekHours) return;
        tableBody = document.getElementById('classesRequirementsTableBody');

        tableBody.appendChild(tr);

        console.log(lastSelectedClass.childNodes[0].innerHTML);

        classesRequirementsTable.push(
          {
            id: classRequirementsId.value,
            class: lastSelectedClass.childNodes[0].innerHTML,
            subject: lastSelectedSubject.childNodes[0].innerHTML,
            hours: requirementsHours.value
          }
        );

        td = document.createElement('TD');
        td.innerHTML = classRequirementsId.value;
        tr.appendChild(td);

        td = document.createElement('TD');
        td.innerHTML = lastSelectedClass.childNodes[0].innerHTML;
        tr.appendChild(td);

        td = document.createElement('TD');
        td.innerHTML = lastSelectedSubject.childNodes[0].innerHTML;
        tr.appendChild(td);

        td = document.createElement('TD');
        td.innerHTML = requirementsHours.value;
        tr.appendChild(td);

        currentHours.innerHTML = countClassHours(lastSelectedClass.childNodes[0].innerHTML);

          break;
        case 'ClassTeacherTab':

        if(typeof classTeacherTable.find(e => e.id === classTeacherId.value) !== 'undefined') return;

        if(countClassHours(lastSelectedClass.childNodes[0].innerHTML) + parseInt(classTeachersHours.value) > classesTable.find(e => e.id === lastSelectedClass.childNodes[0].innerHTML).weekHours) return;

          tableBody = document.getElementById('ClassTeacherTableBody');

          tableBody.appendChild(tr);

          classTeacherTable.push(
            {
              id: classTeacherId.value,
              class: lastSelectedClass.childNodes[0].innerHTML,
              subject: lastSelectedSubject.childNodes[0].innerHTML,
              teacher: lastSelectedTeacher.childNodes[0].innerHTML,
              coTeacher: lastSelectedCoTeacher.childNodes[0].innerHTML,
              hours: classTeachersHours.value,
            }
          );

          td = document.createElement('TD');
          td.innerHTML = classTeacherId.value;
          tr.appendChild(td);

          td = document.createElement('TD');
          td.innerHTML = lastSelectedClass.childNodes[0].innerHTML;
          tr.appendChild(td);

          td = document.createElement('TD');
          td.innerHTML = lastSelectedSubject.childNodes[0].innerHTML;
          tr.appendChild(td);

          td = document.createElement('TD');
          td.innerHTML = classTeachersHours.value;
          tr.appendChild(td);

          td = document.createElement('TD');
          td.innerHTML = lastSelectedTeacher.childNodes[0].innerHTML;
          tr.appendChild(td);

          td = document.createElement('TD');
          td.innerHTML = lastSelectedCoTeacher.childNodes[0].innerHTML;
          tr.appendChild(td);

          classTeachercurrentHours.innerHTML = countClassHours(lastSelectedClass.childNodes[0].innerHTML);

        break;
      }

  }

function getHourDistribution(table){
  let aux = table.childNodes;
  let temp;
  let result = '';

  for(let i = 0; i<aux.length; i++){
    temp = aux[i].childNodes;
    for(let j = 0; j<temp.length; j++){
      if(j!==0){
        if(temp[j].classList.contains('selectedCell')) result = result.concat('1');
        else result = result.concat('0');
      }
    }
  }

  console.log(result);
  return result;
}

function setHourDistribution(str, table){
  let distr = Array.from(str);
  let count = 0;
  let aux = table.childNodes;
  let temp;

  for(let i = 0; i<aux.length; i++){
    temp = aux[i].childNodes;
    for(let j = 0; j<temp.length; j++){
      if(j!==0){
        temp[j].className = '';
        if(distr[count] === '1') temp[j].classList.add('selectedCell');
        count++;
      }
    }
  }
}

function deleteElement(){
  let trs;

  switch (currentTab) {
    case 'SubjectsTab':
      trs = document.getElementById('subjectsTable').tBodies[0].getElementsByClassName('selected');
      for(let i = trs.length-1; i>=0; i--){
        subjectsTable.splice(trs[i].rowIndex-1,1);
        trs[i].remove();
      }
      break;
    case 'TeachersTab':
      trs = document.getElementById('teachersTable').tBodies[0].getElementsByClassName('selected');
      for(let i = trs.length-1; i>=0; i--){
        teachersTable.splice(trs[i].rowIndex-1,1);
        trs[i].remove();
      }
      break;
    case 'ClassesTab':
      trs = document.getElementById('classesTable').tBodies[0].getElementsByClassName('selected');
      for(let i = trs.length-1; i>=0; i--){
        classesTable.splice(trs[i].rowIndex-1,1);
        trs[i].remove();
      }
      break;
    case 'ClassRequirementsTab':
      trs = document.getElementById('classesRequirementsTable').tBodies[0].getElementsByClassName('selected');
      for(let i = trs.length-1; i>=0; i--){
        classesRequirementsTable.splice(trs[i].rowIndex-1,1);
        trs[i].remove();
      }
    break;
    case 'ClassTeacherTab':
      trs = document.getElementById('ClassTeacherTable').tBodies[0].getElementsByClassName('selected');
      for(let i = trs.length-1; i>=0; i--){
        classTeacherTable.splice(trs[i].rowIndex-1,1);
        trs[i].remove();
      }
      break;
  }


}

function updateElement(){

  if(typeof lastSelectedRow === 'undefined') return;

  let tds = lastSelectedRow.childNodes;

  switch (currentTab) {
    case 'SubjectsTab':

      tds[0].innerHTML = idSubjects.value;
      tds[1].innerHTML = nameSubjects.value;

      subjectsTable[lastSelectedRow.rowIndex-1].id = idSubjects.value;
      subjectsTable[lastSelectedRow.rowIndex-1].name = nameSubjects.value;

      console.log(subjectsTable);
      break;
    case 'TeachersTab':

      tds[0].innerHTML = idTechers.value;
      tds[1].innerHTML = nameTeachers.value;
      tds[2].innerHTML = surname.value;
      tds[3].innerHTML = weekHours.value;
      tds[4].innerHTML = dayOff.value;
      tds[5].innerHTML = minAddDOff.value;
      tds[6].innerHTML = maxAddDOff.value;
      tds[7].innerHTML = addDOffWeight.value;
      tds[8].innerHTML = minDPeriods.value;
      tds[9].innerHTML = maxDPeriods.value;
      tds[10].innerHTML = minClassPeriods.value;
      tds[11].innerHTML = maxClassPeriods.value;

      teachersTable[lastSelectedRow.rowIndex-1].id = idTechers.value;
      teachersTable[lastSelectedRow.rowIndex-1].name = nameTeachers.value;
      teachersTable[lastSelectedRow.rowIndex-1].surname = surname.value;
      teachersTable[lastSelectedRow.rowIndex-1].weekHours = weekHours.value;
      teachersTable[lastSelectedRow.rowIndex-1].dayOff = dayOff.value;
      teachersTable[lastSelectedRow.rowIndex-1].minAddDOff = minAddDOff.value;
      teachersTable[lastSelectedRow.rowIndex-1].maxAddDOff = maxAddDOff.value;
      teachersTable[lastSelectedRow.rowIndex-1].addDOffWeight = addDOffWeight.value;
      teachersTable[lastSelectedRow.rowIndex-1].minDPeriods = minDPeriods.value;
      teachersTable[lastSelectedRow.rowIndex-1].maxDPeriods = maxDPeriods.value;
      teachersTable[lastSelectedRow.rowIndex-1].minClassPeriods = minClassPeriods.value;
      teachersTable[lastSelectedRow.rowIndex-1].maxClassPeriods = maxClassPeriods.value;
      teachersTable[lastSelectedRow.rowIndex-1].hourDistribution = getHourDistribution(hoursDistributionBody);

      console.log(teachersTable);
      break;
    case 'ClassesTab':

      tds[0].innerHTML = idClasses.value;
      tds[1].innerHTML = yearClasses.value;
      tds[2].innerHTML = sectionClasses.value;
      tds[3].innerHTML = weekHoursClasses.value;

      classesTable[lastSelectedRow.rowIndex-1].id = idClasses.value;
      classesTable[lastSelectedRow.rowIndex-1].year = yearClasses.value;
      classesTable[lastSelectedRow.rowIndex-1].section = sectionClasses.value;
      classesTable[lastSelectedRow.rowIndex-1].weekHours = weekHoursClasses.value;
      break;
    case 'ClassRequirementsTab':

      tds[0].innerHTML = classRequirementsId.value;
      if(typeof lastSelectedClass !== 'undefined')tds[1].innerHTML = lastSelectedClass.childNodes[0].innerHTML;
      if(typeof lastSelectedSubject !== 'undefined')tds[2].innerHTML = lastSelectedSubject.childNodes[0].innerHTML;
      tds[3].innerHTML = requirementsHours.value;

      classesRequirementsTable[lastSelectedRow.rowIndex-1].id = classRequirementsId.value;
      if(typeof lastSelectedClass !== 'undefined')classesRequirementsTable[lastSelectedRow.rowIndex-1].class = lastSelectedClass.childNodes[0].innerHTML;
      if(typeof lastSelectedSubject !== 'undefined')classesRequirementsTable[lastSelectedRow.rowIndex-1].subject = lastSelectedSubject.childNodes[0].innerHTML;
      classesRequirementsTable[lastSelectedRow.rowIndex-1].hours = requirementsHours.value;

      currentHours.innerHTML = countClassHours(lastSelectedClass.childNodes[0].innerHTML);
      requirementsTotalHours.innerHTML = '/' + classesTable.find(e => e.id === lastSelectedClass.childNodes[0].innerHTML).weekHours;

      getClassInfo(lastSelectedClass.childNodes[0].innerHTML).hourDistribution = getHourDistribution(requirementsHoursDistrBody);
    break;
    case 'ClassTeacherTab':

      tds[0].innerHTML = classTeacherId.value;
      if(typeof lastSelectedClass !== 'undefined')tds[1].innerHTML = lastSelectedClass.childNodes[0].innerHTML;
      tds[2].innerHTML = lastSelectedSubject.childNodes[0].innerHTML;
      tds[3].innerHTML = classTeachersHours.value;
      tds[4].innerHTML = lastSelectedTeacher.childNodes[0].innerHTML;
      if(typeof lastSelectedCoTeacher !== 'undefined')tds[5].innerHTML = lastSelectedCoTeacher.childNodes[0].innerHTML;

      classTeacherTable[lastSelectedRow.rowIndex-1].id = classTeacherId.value;
      if(typeof lastSelectedClass !== 'undefined')classTeacherTable[lastSelectedRow.rowIndex-1].class = lastSelectedClass.childNodes[0].innerHTML;
      classTeacherTable[lastSelectedRow.rowIndex-1].subject = lastSelectedSubject.childNodes[0].innerHTML;
      classTeacherTable[lastSelectedRow.rowIndex-1].hours = classTeachersHours.value;
      classTeacherTable[lastSelectedRow.rowIndex-1].teacher = lastSelectedTeacher.childNodes[0].innerHTML;
      if(typeof lastSelectedCoTeacher !== 'undefined')classTeacherTable[lastSelectedRow.rowIndex-1].coTeacher = lastSelectedCoTeacher.childNodes[0].innerHTML;

      classTeachercurrentHours.innerHTML = countClassHours(lastSelectedClass.childNodes[0].innerHTML);
      classTeacherTotalHours.innerHTML = '/' + classesTable.find(e => e.id === lastSelectedClass.childNodes[0].innerHTML).weekHours;

      getClassInfo(lastSelectedClass.childNodes[0].innerHTML).hourDistribution = getHourDistribution(classTeacherHoursDistrBody);

      break;
  }


}

let lastSelectedRow;
let trs;

document.onselectstart = function() {
    return false;
}

function RowClick(currenttr, lock) {

    switch (currentTab) {
      case 'SubjectsTab':
        trs = document.getElementById('subjectsTable').tBodies[0].getElementsByTagName('tr');
        break;
      case 'TeachersTab':
        trs = document.getElementById('teachersTable').tBodies[0].getElementsByTagName('tr');
        break;
      case 'ClassesTab':
        trs = document.getElementById('classesTable').tBodies[0].getElementsByTagName('tr');
        break;
      case 'ClassRequirementsTab':
        trs = document.getElementById('classesRequirementsTable').tBodies[0].getElementsByTagName('tr');
        break;
      case 'ClassTeacherTab':
      trs = document.getElementById('ClassTeacherTable').tBodies[0].getElementsByTagName('tr');
      break;
    }


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


    switch (currentTab) {
      case 'SubjectsTab':

        idSubjects.value = subjectsTable[currenttr.rowIndex-1].id;
        nameSubjects.value = subjectsTable[currenttr.rowIndex-1].name;
        break;
      case 'TeachersTab':

        idTechers.value = teachersTable[currenttr.rowIndex-1].id;
        nameTeachers.value = teachersTable[currenttr.rowIndex-1].name;
        surname.value = teachersTable[currenttr.rowIndex-1].surname;
        weekHours.value = teachersTable[currenttr.rowIndex-1].weekHours;
        dayOff.value = teachersTable[currenttr.rowIndex-1].dayOff;
        minAddDOff.value = teachersTable[currenttr.rowIndex-1].minAddDOff;
        maxAddDOff.value = teachersTable[currenttr.rowIndex-1].maxAddDOff;
        addDOffWeight.value = teachersTable[currenttr.rowIndex-1].addDOffWeight;
        minDPeriods.value = teachersTable[currenttr.rowIndex-1].minDPeriods;
        maxDPeriods.value = teachersTable[currenttr.rowIndex-1].maxDPeriods;
        minClassPeriods.value = teachersTable[currenttr.rowIndex-1].minClassPeriods;
        maxClassPeriods.value = teachersTable[currenttr.rowIndex-1].maxClassPeriods;
        console.log(teachersTable[currenttr.rowIndex-1].hourDistribution);
        setHourDistribution(teachersTable[currenttr.rowIndex-1].hourDistribution, hoursDistributionBody);
        break;
      case 'ClassesTab':
        idClasses.value = classesTable[currenttr.rowIndex-1].id;
        yearClasses.value = classesTable[currenttr.rowIndex-1].year;
        sectionClasses.value = classesTable[currenttr.rowIndex-1].section;
        weekHoursClasses.value = classesTable[currenttr.rowIndex-1].weekHours;
        setHourDistribution(classesTable[currenttr.rowIndex-1].hourDistribution, classHoursDistributionBody);
        break;
      case 'ClassRequirementsTab':

        classRequirementsId.value = classesRequirementsTable[currenttr.rowIndex-1].id;
        requirementsHours.value = classesRequirementsTable[currenttr.rowIndex-1].hours;

        list = classesListRequirements.tBodies[0].getElementsByTagName('tr');

        for (let i = 0; i < list.length; i++) {
            list[i].className = '';
        }

        lastSelectedClass = findRequirementsListElement(classesRequirementsTable[currenttr.rowIndex-1].class, 'class');
        if(typeof lastSelectedClass !== 'undefined') lastSelectedClass.className = 'selected';

        list = subjectsListRequirements.tBodies[0].getElementsByTagName('tr');

        for (i = 0; i < list.length; i++) {
            list[i].className = '';
        }

        lastSelectedSubject = findRequirementsListElement(classesRequirementsTable[currenttr.rowIndex-1].subject, 'subject');
        if(typeof lastSelectedSubject !== 'undefined')lastSelectedSubject.className = 'selected';

        setHourDistribution(getClassInfo(classesRequirementsTable[currenttr.rowIndex-1].class).hourDistribution, requirementsHoursDistrBody);
        break;
      case 'ClassTeacherTab':

        classTeacherId.value = classTeacherTable[currenttr.rowIndex-1].id;
        classTeachersHours.value = classTeacherTable[currenttr.rowIndex-1].hours;

        list = classesListClassTeacher.tBodies[0].getElementsByTagName('tr');

        for (let i = 0; i < list.length; i++) {
            list[i].className = '';
        }

        lastSelectedClass = findRequirementsListElement(classTeacherTable[currenttr.rowIndex-1].class, 'classesA');
        lastSelectedClass.className = 'selected';

        list = subjectsListClassTeachers.tBodies[0].getElementsByTagName('tr');

        for (i = 0; i < list.length; i++) {
            list[i].className = '';
        }

        lastSelectedSubject = findRequirementsListElement(classTeacherTable[currenttr.rowIndex-1].subject, 'subjectsA');
        lastSelectedSubject.className = 'selected';

        list = teachersListClassTeacher.tBodies[0].getElementsByTagName('tr');

        for (i = 0; i < list.length; i++) {
            list[i].className = '';
        }

        lastSelectedTeacher = findRequirementsListElement(classTeacherTable[currenttr.rowIndex-1].teacher, 'teachers');
        lastSelectedTeacher.className = 'selected';

        list = coTeacherListClassTeachers.tBodies[0].getElementsByTagName('tr');

        for (i = 0; i < list.length; i++) {
            list[i].className = '';
        }

        lastSelectedCoTeacher = findRequirementsListElement(classTeacherTable[currenttr.rowIndex-1].coTeacher, 'coTeachers');
        if(typeof lastSelectedCoTeacher !== 'undefined')lastSelectedCoTeacher.className = 'selected';

        setHourDistribution(getClassInfo(classesRequirementsTable[currenttr.rowIndex-1].class).hourDistribution, classTeacherHoursDistrBody);
      break;
    }

}

function findRequirementsListElement(id, type){
  let list;
  switch (type) {
    case 'class':
      list = classesListRequirements.tBodies[0].getElementsByTagName('tr');
      for(let i = 0; i<list.length; i++){
        if(list[i].childNodes[0].innerHTML === id) return list[i];
      }
      break;
    case 'subject':
      list = subjectsListRequirements.tBodies[0].getElementsByTagName('tr');
      for(let i = 0; i<list.length; i++){
        if(id === list[i].childNodes[0].innerHTML) {
          return list[i];}
      }
    break;
    case 'classesA':
    list = classesListClassTeacher.tBodies[0].getElementsByTagName('tr');
    for(let i = 0; i<list.length; i++){
      if(id === list[i].childNodes[0].innerHTML) {
        return list[i];}
    }
      break;
    case 'subjectsA':
      list = subjectsListClassTeachers.tBodies[0].getElementsByTagName('tr');
      for(let i = 0; i<list.length; i++){
        if(id === list[i].childNodes[0].innerHTML) {
          return list[i];}
      }
    break;
    case 'teachers':
      list = teachersListClassTeacher.tBodies[0].getElementsByTagName('tr');
      for(let i = 0; i<list.length; i++){
        if(id === list[i].childNodes[0].innerHTML) {
          return list[i];}
      }
      break;
    case 'coTeachers':
      list = coTeacherListClassTeachers.tBodies[0].getElementsByTagName('tr');
      for(let i = 0; i<list.length; i++){
        if(id === list[i].childNodes[0].innerHTML) {
          return list[i];}
      }
      break;

  }
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

let reader = new FileReader();
  reader.onload = function () {

    extractElements(reader.result);
  };
  reader.readAsBinaryString(fileInput.files[0]);
}

function exportToCsv(filename, rows) {
    var processRow = function (row) {
        var finalVal = '';
        for (var j = 0; j < row.length; j++) {
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

function exportInstance(){


  if(classesRequirementsTable.length === 0){
    alert('Attenzione, prima di esportare l\'istanza devi inserire tutti i dati');
    return;
  }


  let aux = '';
  let file = 'PARTIZIONI = {};\n\n';
  let temp;

  console.log(classesRequirementsTable);

  //restrizioni
  file+='R = {\n'
  for(let i = 0; i<classesRequirementsTable.length; i++){
    aux = '';
    aux += '\t<'+'"'+classesRequirementsTable[i].id+'"'+', '+'{'+classesRequirementsTable[i].class+'}'+', '+'{'+classesRequirementsTable[i].subject+'}'+', '+classesRequirementsTable[i].hours;
    if(i===classesRequirementsTable.length-1)aux+='>\n';
    else aux+='>,\n';
    file+=aux;
  }
  file+='};\n\n'

  //ALIAS
  file+='ALIAS = {\n};\n\n'

  file+='L = {\n};\n\n'

  file+='B = {\n};\n\n'

  file+='O = {\n};\n\n'

  //numero giorni di lezione
  file+='nD = '+instanceDays.days.length+';\n'
  //numero di periodi giornalieri
  file+='nH = '+instanceDailyPeriods+';\n'
  //eta
  file+='eta = 1;\n\n'
  //tau
  file+='tau = [\n'
  for(i = 0; i<teachersTable.length; i++){
    aux = '';
    //if(teachersTable[i].addDOffWeight === 0) teachersTable[i].addDOffWeight = 1;
    aux += '\t['+teachersTable[i].dayOff+','+teachersTable[i].minAddDOff+','+teachersTable[i].maxAddDOff+','+teachersTable[i].addDOffWeight;
    if(i===teachersTable.length-1)aux+=']\n';
    else aux+='],\n';
    file+=aux;
  }
  file+='];\n\n';

  file+='alfamin = [\n'
  for(i = 0; i<teachersTable.length; i++){
    aux = '\t[';
    for(let j = 0; j<instanceDays.days.length; j++){
      if(j===instanceDays.days.length-1)aux += teachersTable[i].minDPeriods+'';
      else aux += teachersTable[i].minDPeriods+',';
    }
    if(i===teachersTable.length-1) aux+=']\n';
    else aux+='],\n';
    file+=aux;
  }
  file+='];\n\n';

  file+='alfamax = [\n'
  for(i = 0; i<teachersTable.length; i++){
    aux = '\t[';
    for(j = 0; j<instanceDays.days.length; j++){
      if(j===instanceDays.days.length-1)aux += teachersTable[i].maxDPeriods+'';
      else aux += teachersTable[i].maxDPeriods+',';
    }
    if(i===teachersTable.length-1) aux+=']\n';
    else aux+='],\n';
    file+=aux;
  }
  file+='];\n\n';

  file+='rhomin = [\n'
  for(i = 0; i<classesTable.length; i++){
    aux = '\t[';
    for(j = 0; j<teachersTable.length; j++){
      if(j===teachersTable.length-1)aux += teachersTable[j].minClassPeriods+'';
      else aux += teachersTable[i].minClassPeriods+',';
    }
    if(i===classesTable.length-1) aux+=']\n';
    else aux+='],\n';
    file+=aux;
  }
  file+='];\n\n';

  file+='rhomax = [\n'
  for(i = 0; i<classesTable.length; i++){
    aux = '\t[';
    for(j = 0; j<teachersTable.length; j++){
      if(j===teachersTable.length-1)aux += teachersTable[j].maxClassPeriods+'';
      else aux += teachersTable[i].maxClassPeriods+',';
    }
    if(i===classesTable.length-1) aux+=']\n';
    else aux+='],\n';
    file+=aux;
  }
  file+='];\n\n';

  file+='beta = [\n';
  for(i = 0; i<classesTable.length; i++){
    file+='[\n'
    aux = '\t[';
    temp = Array.from(classesTable[i].hourDistribution);
    for(j = 0; j<temp.length; j++){
      if(j===temp.length-1)aux += temp[j]+']';
      else if((j+1)%instanceDailyPeriods === 0) aux+=temp[j]+'],\n\t['
      else aux += temp[j]+',';
    }
    file+=aux;
    if(i===classesTable.length-1)file+='\n]\n';
    else file+='\n],\n';
  }
  file+='];\n\n'

  file+='delta = [\n';
  for(i = 0; i<classesTable.length; i++){
    file+='[\n'
    aux = '\t[';
    temp = Array.from(classesTable[i].hourDistribution);
    for(j = 0; j<temp.length; j++){
      if(j===temp.length-1)aux += temp[j]+']';
      else if((j+1)%instanceDailyPeriods === 0) aux+=temp[j]+'],\n\t['
      else aux += temp[j]+',';
    }
    file+=aux;
    if(i===classesTable.length-1)file+='\n]\n';
    else file+='\n],\n';
  }
  file+='];\n\n'



  let blob = new Blob([file], { type: 'text/plain;charset=utf-8;' });
  if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, instanceName+'.OPL.dat');
  } else {
      let link = document.createElement("a");
      if (link.download !== undefined) { // feature detection
          // Browsers that support HTML5 download attribute
          let url = URL.createObjectURL(blob);
          link.setAttribute("href", url);
          link.setAttribute("download", instanceName+'.OPL.dat');
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
      }
  }

  exportInstanceAt();
  exportInstancePreass();
  exportInstanceWeights();
}

function exportInstanceAt(){

  let file = '';

  file+='gamma = [\n';
  for(i = 0; i<teachersTable.length; i++){
    file+='[\n'
    aux = '\t[';
    temp = Array.from(teachersTable[i].hourDistribution);
    for(j = 0; j<temp.length; j++){
      if(j===temp.length-1)aux += temp[j]+']';
      else if((j+1)%instanceDailyPeriods === 0) aux+=temp[j]+'],\n\t['
      else aux += temp[j]+',';
    }
    file+=aux;
    if(i===teachersTable.length-1)file+='\n]\n';
    else file+='\n],\n';
  }
  file+='];\n\n'


  let blob = new Blob([file], { type: 'text/plain;charset=utf-8;' });
  if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, instanceName+'_aT.OPL.dat');
  } else {
      let link = document.createElement("a");
      if (link.download !== undefined) { // feature detection
          // Browsers that support HTML5 download attribute
          let url = URL.createObjectURL(blob);
          link.setAttribute("href", url);
          link.setAttribute("download", instanceName+'_aT.OPL.dat');
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
      }
  }
}

function exportInstancePreass(){
  let file = 'P = {\n\t};';

  let blob = new Blob([file], { type: 'text/plain;charset=utf-8;' });
  if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, instanceName+'_preass.OPL.dat');
  } else {
      let link = document.createElement("a");
      if (link.download !== undefined) { // feature detection
          // Browsers that support HTML5 download attribute
          let url = URL.createObjectURL(blob);
          link.setAttribute("href", url);
          link.setAttribute("download", instanceName+'_preass.OPL.dat');
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
      }
  }
}

function exportInstanceWeights(){
  let file = '//	1	2	3	4	5	6	7	8	9	10	11	12	13	14	15	16	17	18	19\n'+
   'omega = [\n'+
	 '\t[0	0	0	1	0 	0      	0 	0 	0 	0      	0   	0 	10  	3	0      	0      	0 	0 	0],\n'+
   '\t[100000 // C01 - ex HC01 CLASSES AND TEACHERS MUST HAVE ALL REQUIRED LESSONS\n'+
	 '\t100000 // C02 - ex HC02 A CLASS MUST FOLLOW ALL REQUIRED LESSONS\n'+
	 '\t100000 // C03 - ex HC03 A CLASS CAN BE TAUGHT ONLY WHEN IT IS AVAILABLE\n'+
	 '\t100000 // C04 - ex HC04 A TEACHER CAN TEACH ONLY WHEN HE IS AVAILABLE\n'+
	 '\t100000 // C05 - ex HC05 NO SPLIT MULTIPLE PERIOD LESSONS\n'+
	 '\t100000 // C06 - ex HC06 DAY OFF FOR ANY TEACHER\n'+
	 '\t100000 // C07 - ex HC07 CO-TEACHING TYPE 1  - LESSONS TAUGHT BY TWO TEACHERS SIMULTANEOUSLY\n'+
	 '\t100000 // C08 - ex HC08 BLOCK - LESSONS TAUGHT TO TWO CLASSES SIMULTANEOUSLY WITH INDEPENDENT TEACHERS\n'+
	 '\t100000 // C09 - ex HC09 PREASSIGNMENT - LESSONS FOR A PAIR CLASS/TEACHER PREASSIGNED AT DAY/HOUR SPECIFIED\n'+
	 '\t100000	// C10 - ex HC10 EQUAL INACTIVITY PERIODS FOR ANY TEACHER\n'+
	 '\t100    // C11 - ex SC01 HOLES FOR TEACHERS\n'+
	 '\t0      // C12 - ex SC02 LIMIT MULTIPLE LESSONS\n'+
	 '\t10     // C13 - ex SC03 GOOD WEEKLY HORIZONTAL DISTRIBUTION\n'+
	 '\t3      // C14 - ex SC04 GOOD DAILY VERTICAL DISTRIBUTION\n'+
	 '\t100000 // C15 - ex SC05 UNDERLOAD/OVERLOAD FOR TEACHERS: no few/many lessons in a single day\n'+
	 '\t100000 // C16 - ex SC06 UNDERLOAD/OVERLOAD FOR CLASS/TEACHERS: no too few/many lessons in a single day\n'+
	 '\t1      // C17 - ex SC07 OVERLOAD2 FOR CLASSES: no many multiple lessons in a single day\n'+
	 '\t1000   // C18 - ex SC08 OVERLOAD3 FOR TEACHERS: avoid two overloaded consecutive days for teachers\n'+
	 '\t0      // C19 - ex SC09 MULTIPLE PERIOD RESPECT\n'+
   '\t]\n'+
   '];\n'


  let blob = new Blob([file], { type: 'text/plain;charset=utf-8;' });
  if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, instanceName+'_weights.OPL.dat');
  } else {
      let link = document.createElement("a");
      if (link.download !== undefined) { // feature detection
          // Browsers that support HTML5 download attribute
          let url = URL.createObjectURL(blob);
          link.setAttribute("href", url);
          link.setAttribute("download", instanceName+'_weights.OPL.dat');
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
      }
  }
}

function extractElements(content){
  let tableBody;
  let tr;
  let td;
  let temp = content.split('\n');



  for(let i = 0; i<temp.length; i++){
    temp[i] = temp[i].split(',');
  }


  switch (currentTab) {
    case 'SubjectsTab':
      subjectsTable = [];
      tableBody = document.getElementById('subjectsTableBody');
      tableBody.innerHTML = '';
      break;
    case 'TeachersTab':
      teachersTable = [];
      tableBody = document.getElementById('teachersTableBody');
      tableBody.innerHTML = '';
      break;
    case 'ClassesTab':
      classesTable = [];
      tableBody = document.getElementById('classesTableBody');
      tableBody.innerHTML = '';
      break;
    case 'ClassRequirementsTab':
      classesRequirementsTable = [];
      tableBody = document.getElementById('classesRequirementsTableBody');
      tableBody.innerHTML = '';
      break;
    case 'ClassTeacherTab':
      classTeacherTable = [];
      tableBody = document.getElementById('ClassTeacherTableBody');
      tableBody.innerHTML = '';
      break;
    }

  for(i = 0; i<temp.length; i++){
    if(temp[i].length>1){

      switch (currentTab) {
        case 'SubjectsTab':
          subjectsTable.push(
            {
              id: temp[i][0],
              name: temp[i][1]
            }
          );
          break;
          case 'TeachersTab':
            if(temp[i][6] <= 0) temp[i][6] = 1;
            teachersTable.push(
              {
                id : temp[i][0],
                name : temp[i][1],
                surname : temp[i][2],
                dayOff : temp[i][3],
                weekHours : temp[i][11],
                minAddDOff : temp[i][4],
                maxAddDOff : temp[i][5],
                addDOffWeight : temp[i][6],
                minDPeriods : temp[i][7],
                maxDPeriods : temp[i][8],
                minClassPeriods : temp[i][9],
                maxClassPeriods : temp[i][10],
                hourDistribution: temp[i][12]
              }
            );
            break;
          case 'ClassesTab':
          classesTable.push(
          {
            id: temp[i][0],
            year: temp[i][1],
            section: temp[i][2],
            weekHours: temp[i][3],
            hourDistribution: temp[i][4]
            }
          );
            break;
          case 'ClassRequirementsTab':
          classesRequirementsTable.push(
            {
              id: temp[i][0],
              class: temp[i][1],
              subject: temp[i][2],
              hours: temp[i][3]
            }
          );
            break;
          case 'ClassTeacherTab':
          classTeacherTable.push(
            {
              id: temp[i][0],
              class: temp[i][1],
              subject: temp[i][2],
              teacher: temp[i][3],
              coTeacher: temp[i][4],
              hours: temp[i][5],
            }
          );
            break;
        }
    }
  }

  switch (currentTab) {
    case 'SubjectsTab':
    tableBody = document.getElementById('subjectsTableBody');

    for(let j = 0; j<subjectsTable.length; j++){

      tr = document.createElement('TR');

      tr.setAttribute('onmousedown', 'RowClick(this,false)');

      tableBody.appendChild(tr);

      td = document.createElement('TD');
      td.innerHTML = subjectsTable[j].id;
      tr.appendChild(td);

      td = document.createElement('TD');
      td.innerHTML = subjectsTable[j].name;
      tr.appendChild(td);

    }
      break;
      case 'TeachersTab':
      tableBody = document.getElementById('teachersTableBody');

      console.log(teachersTable);

      for(let j = 0; j<teachersTable.length; j++){

        tr = document.createElement('TR');

        tr.setAttribute('onmousedown', 'RowClick(this,false)');

        tableBody.appendChild(tr);

        td = document.createElement('TD');
        td.innerHTML = teachersTable[j].id;
        tr.appendChild(td);

        td = document.createElement('TD');
        td.innerHTML = teachersTable[j].name;
        tr.appendChild(td);

        td = document.createElement('TD');
        td.innerHTML = teachersTable[j].surname;
        tr.appendChild(td);

        td = document.createElement('TD');
        td.innerHTML = teachersTable[j].weekHours;
        tr.appendChild(td);

        td = document.createElement('TD');
        td.innerHTML = teachersTable[j].dayOff;
        tr.appendChild(td);

        td = document.createElement('TD');
        td.innerHTML = teachersTable[j].minAddDOff;
        tr.appendChild(td);

        td = document.createElement('TD');
        td.innerHTML = teachersTable[j].maxAddDOff;
        tr.appendChild(td);

        td = document.createElement('TD');
        td.innerHTML = teachersTable[j].addDOffWeight;
        tr.appendChild(td);

        td = document.createElement('TD');
        td.innerHTML = teachersTable[j].minDPeriods;
        tr.appendChild(td);

        td = document.createElement('TD');
        td.innerHTML = teachersTable[j].maxDPeriods;
        tr.appendChild(td);

        td = document.createElement('TD');
        td.innerHTML = teachersTable[j].minClassPeriods;
        tr.appendChild(td);

        td = document.createElement('TD');
        td.innerHTML = teachersTable[j].maxClassPeriods;
        tr.appendChild(td);

      }
        break;

      case 'ClassesTab':
      tableBody = document.getElementById('classesTableBody');

      for(let j = 0; j<classesTable.length; j++){

        tr = document.createElement('TR');

        tr.setAttribute('onmousedown', 'RowClick(this,false)');

        tableBody.appendChild(tr);


        td = document.createElement('TD');
        td.innerHTML = classesTable[j].id;
        tr.appendChild(td);

        td = document.createElement('TD');
        td.innerHTML = classesTable[j].year;
        tr.appendChild(td);

        td = document.createElement('TD');
        td.innerHTML = classesTable[j].section;
        tr.appendChild(td);

        td = document.createElement('TD');
        td.innerHTML = classesTable[j].weekHours;
        tr.appendChild(td);

      }
        break;
      case 'ClassRequirementsTab':
        tableBody = document.getElementById('classesRequirementsTableBody');

        for(let j = 0; j<classesRequirementsTable.length; j++){

          tr = document.createElement('TR');

          tr.setAttribute('onmousedown', 'RowClick(this,false)');

          tableBody.appendChild(tr);


          td = document.createElement('TD');
          td.innerHTML = classesRequirementsTable[j].id;
          tr.appendChild(td);

          td = document.createElement('TD');
          td.innerHTML = classesRequirementsTable[j].class;
          tr.appendChild(td);

          td = document.createElement('TD');
          td.innerHTML = classesRequirementsTable[j].subject;
          tr.appendChild(td);

          td = document.createElement('TD');
          td.innerHTML = classesRequirementsTable[j].hours;
          tr.appendChild(td);

        }
        break;
      case 'ClassTeacherTab':
      tableBody = document.getElementById('ClassTeacherTableBody');

      for(let j = 0; j<classTeacherTable.length; j++){

        tr = document.createElement('TR');

        tr.setAttribute('onmousedown', 'RowClick(this,false)');

        tableBody.appendChild(tr);


        td = document.createElement('TD');
        td.innerHTML = classTeacherTable[j].id;
        tr.appendChild(td);

        td = document.createElement('TD');
        td.innerHTML = classTeacherTable[j].class;
        tr.appendChild(td);

        td = document.createElement('TD');
        td.innerHTML = classTeacherTable[j].subject;
        tr.appendChild(td);

        td = document.createElement('TD');
        td.innerHTML = classTeacherTable[j].hours;
        tr.appendChild(td);

        td = document.createElement('TD');
        td.innerHTML = classTeacherTable[j].teacher;
        tr.appendChild(td);

        td = document.createElement('TD');
        td.innerHTML = classTeacherTable[j].coTeacher;
        tr.appendChild(td);

      }
        break;
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
