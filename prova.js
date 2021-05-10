let list = [];
list.push([1,2,3]);
list.push([4,5,6]);
list.push([7,8,9]);

let createTable = () => {
	let myTable = document.getElementById('myTable');

	let table = document.createElement('TABLE');
	table.border = '1';

	for(let i = 0; i<list.length; i++){
		let tr = document.createElement('TR');
		table.appendChild(tr);
		for(let j = 0; j<list[i].length; j++){
			let td = document.createElement('TD');
			td.innerHTML = list[i][j];
			td.colSpan = '2';
			//console.log(td.colSpan);
			tr.appendChild(td);
		}
	}
	myTable.appendChild(table);

}


document.getElementById("read-button").addEventListener('click', function() {
		let file = document.getElementById("file-input").files[0];
		let reader = new FileReader();
		let text;
		reader.addEventListener('load', function(e) {
	    		text = e.target.result;
	    		read(text);
		});
		reader.readAsText(file);
		});


//var prova=1;
function read(text){
	console.log(JSON.parse(text));
	document.write(text);
	//prova = 5;
}
//read("caio");
//console.log(prova);


createTable();