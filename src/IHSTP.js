let instanceName;
let instanceDays;
let instanceDailyPeriods;

let subjectsTable = [];
let teachersTable = [];
let classesTable = [];
let classesRequirementsTable = [];
let classTeacherTable = [];



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
const dayOff = document.getElementById('teacherDayOff');
const sameValueforAll = document.getElementById('sameValueforAll');
const minAddDOff = document.getElementById('teacherMinAddDaysOff');
const maxAddDOff = document.getElementById('teacherMaxAddDaysOff');
const addDOffWeight = document.getElementById('teacherAddDaysOffWeight');
const minDPeriods = document.getElementById('teacherMinDailyPeriods');
const maxDPeriods = document.getElementById('teacherMaxDailyPeriods');
const minClassPeriods = document.getElementById('teacherMinClassPeriods');
const maxClassPeriods = document.getElementById('teacherMaxClassPeriods');

const idClasses = document.getElementById('idClasses');
const yearClasses = document.getElementById('yearClasses');
const sectionClasses = document.getElementById('sectionClasses');
const weekHoursClasses = document.getElementById('weekHoursClasses');

const classesListRequirements = document.getElementById('classesListRequirements');
const subjectsListRequirements = document.getElementById('subjectsListRequirements');
const requirementsHours = document.getElementById('requirementsHours');
const classRequirementsId = document.getElementById('classRequirementsId');
const currentHours = document.getElementById('currentHours');
const requirementsTotalHours = document.getElementById('requirementsTotalHours');

const classesListClassTeacher = document.getElementById('ClassTeacherClassList');
const subjectsListClassTeachers = document.getElementById('ClassTeacherSubjectList');
const teachersListClassTeacher = document.getElementById('ClassTeacherTeacherList');
const coTeacherListClassTeachers = document.getElementById('ClassTeacherCoTeacherList');
const classTeachersHours = document.getElementById('ClassTeacherHours');
const classTeacherId = document.getElementById('ClassTeacherId');
const classTeachercurrentHours = document.getElementById('ClassTeachercurrentHours');
const classTeacherTotalHours = document.getElementById('ClassTeacherTotalHours');




/*----------------------------------------------------------------------------*/


function openTabContent(evt, selectedTab) {
  // Declare all variables
  let i, tabcontent, tablinks;
  let tr, td;

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
      currentHours.innerHTML = countClassHours(element.childNodes[0].innerHTML);
      requirementsTotalHours.innerHTML = '/' + classesTable.find(e => e.id === element.childNodes[0].innerHTML).weekHours;
      //console.log(element.childNodes[0].innerHTML);
      break;
    case 'subjects':
      list = subjectsListRequirements.tBodies[0].childNodes;
      lastSelectedSubject = element;
      break;
    case 'classesA':
      list = classesListClassTeacher.tBodies[0].childNodes;
      lastSelectedClass = element;
      classTeachercurrentHours.innerHTML = countClassHours(element.childNodes[0].innerHTML);
      classTeacherTotalHours.innerHTML = '/' + classesTable.find(e => e.id === element.childNodes[0].innerHTML).weekHours;
        //console.log(element.childNodes[0].innerHTML);
      break;
    case 'subjectsA':
      list = subjectsListClassTeachers.tBodies[0].childNodes;
      lastSelectedSubject = element;
      break;
    case 'teachers':
      list = teachersListClassTeacher.tBodies[0].childNodes;
      lastSelectedTeacher = element;
      currentHours.innerHTML = countClassHours(element.childNodes[0].innerHTML);
          //console.log(element.childNodes[0].innerHTML);
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
  if(days.value === 'User-defined') instanceDays = daysCustom.value;
  else instanceDays = days.value;
  instanceDailyPeriods = dailyPeriods.value;
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
            dayOff : dayOff.value,
            //sameValueforAll : sameValueforAll.value,
            minAddDOff : minAddDOff.value,
            maxAddDOff : maxAddDOff.value,
            addDOffWeight : addDOffWeight.value,
            minDPeriods : minDPeriods.value,
            maxDPeriods : maxDPeriods.value,
            minClassPeriods : minClassPeriods.value,
            maxClassPeriods : maxClassPeriods.value
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
      td.innerHTML = dayOff.value;
      tr.appendChild(td);

      // td = document.createElement('TD');
      // td.innerHTML = sameValueforAll.value;
      // tr.appendChild(td);

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
          weekHours: weekHoursClasses.value
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
      tds[3].innerHTML = dayOff.value;
      tds[4].innerHTML = minAddDOff.value;
      tds[5].innerHTML = maxAddDOff.value;
      tds[6].innerHTML = addDOffWeight.value;
      tds[7].innerHTML = minDPeriods.value;
      tds[8].innerHTML = maxDPeriods.value;
      tds[9].innerHTML = minClassPeriods.value;
      tds[10].innerHTML = maxClassPeriods.value;

      teachersTable[lastSelectedRow.rowIndex-1].id = idTechers.value;
      teachersTable[lastSelectedRow.rowIndex-1].name = nameTeachers.value;
      teachersTable[lastSelectedRow.rowIndex-1].surname = surname.value;
      teachersTable[lastSelectedRow.rowIndex-1].dayOff = dayOff.value;
      teachersTable[lastSelectedRow.rowIndex-1].minAddDOff = minAddDOff.value;
      teachersTable[lastSelectedRow.rowIndex-1].maxAddDOff = maxAddDOff.value;
      teachersTable[lastSelectedRow.rowIndex-1].addDOffWeight = addDOffWeight.value;
      teachersTable[lastSelectedRow.rowIndex-1].minDPeriods = minDPeriods.value;
      teachersTable[lastSelectedRow.rowIndex-1].maxDPeriods = maxDPeriods.value;
      teachersTable[lastSelectedRow.rowIndex-1].minClassPeriods = minClassPeriods.value;
      teachersTable[lastSelectedRow.rowIndex-1].maxClassPeriods = maxClassPeriods.value;

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
      tds[1].innerHTML = lastSelectedClass.childNodes[0].innerHTML;
      tds[2].innerHTML = lastSelectedSubject.childNodes[0].innerHTML;
      tds[3].innerHTML = requirementsHours.value;

      classesRequirementsTable[lastSelectedRow.rowIndex-1].id = classRequirementsId.value;
      classesRequirementsTable[lastSelectedRow.rowIndex-1].class = lastSelectedClass.childNodes[0].innerHTML;
      classesRequirementsTable[lastSelectedRow.rowIndex-1].subject = lastSelectedSubject.childNodes[0].innerHTML;
      classesRequirementsTable[lastSelectedRow.rowIndex-1].hours = requirementsHours.value;

    break;
    case 'ClassTeacherTab':

      tds[0].innerHTML = classTeacherId.value;
      tds[1].innerHTML = lastSelectedClass.childNodes[0].innerHTML;
      tds[2].innerHTML = lastSelectedSubject.childNodes[0].innerHTML;
      tds[3].innerHTML = classTeachersHours.value;
      tds[4].innerHTML = lastSelectedTeacher.childNodes[0].innerHTML;
      tds[5].innerHTML = lastSelectedCoTeacher.childNodes[0].innerHTML;

      classTeacherTable[lastSelectedRow.rowIndex-1].id = classTeacherId.value;
      classTeacherTable[lastSelectedRow.rowIndex-1].class = lastSelectedClass.childNodes[0].innerHTML;
      classTeacherTable[lastSelectedRow.rowIndex-1].subject = lastSelectedSubject.childNodes[0].innerHTML;
      classTeacherTable[lastSelectedRow.rowIndex-1].hours = classTeachersHours.value;
      classTeacherTable[lastSelectedRow.rowIndex-1].teacher = lastSelectedTeacher.childNodes[0].innerHTML;
      classTeacherTable[lastSelectedRow.rowIndex-1].coTeacher = lastSelectedCoTeacher.childNodes[0].innerHTML;

      break;
  }


}


//table manipulation
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
        console.log(trs);
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
          console.log('prova1');
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
        dayOff.value = teachersTable[currenttr.rowIndex-1].dayOff;
        minAddDOff.value = teachersTable[currenttr.rowIndex-1].minAddDOff;
        maxAddDOff.value = teachersTable[currenttr.rowIndex-1].maxAddDOff;
        addDOffWeight.value = teachersTable[currenttr.rowIndex-1].addDOffWeight;
        minDPeriods.value = teachersTable[currenttr.rowIndex-1].minDPeriods;
        maxDPeriods.value = teachersTable[currenttr.rowIndex-1].maxDPeriods;
        minClassPeriods.value = teachersTable[currenttr.rowIndex-1].minClassPeriods;
        maxClassPeriods.value = teachersTable[currenttr.rowIndex-1].maxClassPeriods;
        break;
      case 'ClassesTab':
        idClasses.value = classesTable[currenttr.rowIndex-1].id;
        yearClasses.value = classesTable[currenttr.rowIndex-1].year;
        sectionClasses.value = classesTable[currenttr.rowIndex-1].section;
        weekHoursClasses.value = classesTable[currenttr.rowIndex-1].weekHours;

        break;
      case 'ClassRequirementsTab':
        console.log(classesRequirementsTable);
        classRequirementsId.value = classesRequirementsTable[currenttr.rowIndex-1].id;
        requirementsHours.value = classesRequirementsTable[currenttr.rowIndex-1].hours;

        list = classesListRequirements.tBodies[0].getElementsByTagName('tr');

        for (let i = 0; i < list.length; i++) {
            list[i].className = '';
        }

        lastSelectedClass = findRequirementsListElement(classesRequirementsTable[currenttr.rowIndex-1].class, 'class');
        lastSelectedClass.className = 'selected';

        list = subjectsListRequirements.tBodies[0].getElementsByTagName('tr');

        for (i = 0; i < list.length; i++) {
            list[i].className = '';
        }

        lastSelectedSubject = findRequirementsListElement(classesRequirementsTable[currenttr.rowIndex-1].subject, 'subject');
        lastSelectedSubject.className = 'selected';
        break;
      case 'ClassTeacherTab':
        console.log(classTeacherTable);
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
        lastSelectedCoTeacher.className = 'selected';

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
    console.log(trs);
    for (var i = 0; i < trs.length; i++) {
        trs[i].className = '';
    }
}

function readFile() {

var reader = new FileReader();
  reader.onload = function () {

    extractElements(reader.result);
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
            teachersTable.push(
              {
                id : temp[i][0],
                name : temp[i][1],
                surname : temp[i][2],
                dayOff : temp[i][3],
                //sameValueforAll : sameValueforAll.value,
                minAddDOff : temp[i][4],
                maxAddDOff : temp[i][5],
                addDOffWeight : temp[i][6],
                minDPeriods : temp[i][7],
                maxDPeriods : temp[i][8],
                minClassPeriods : temp[i][9],
                maxClassPeriods : temp[i][10]
              }
            );
            break;
          case 'ClassesTab':
          classesTable.push(
          {
            id: temp[i][0],
            year: temp[i][1],
            section: temp[i][2],
            weekHours: temp[i][3]
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
        td.innerHTML = teachersTable[j].dayOff;
        tr.appendChild(td);

        // td = document.createElement('TD');
        // td.innerHTML = sameValueforAll.value;
        // tr.appendChild(td);

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
