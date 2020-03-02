/*
----HTML-----

<div class="module-custom-select">
  <div class="field-viewer"><span class="text-viewer"  placeholder="Enter manufacturer name">Workers ▼</span></div>
  <div class="field-selection">
   <div class="select-item">Factory Workers</div>
    <div class="select-item">Transport Enterprise Workers</div>
  </div>
</div> 



var arrows = ['▼','▲'],
    moduleCS = document.querySelector('.module-custom-select'),
    fieldSelect = document.querySelector('.field-selection'),
    textView = document.querySelector('.text-viewer');
moduleCS.addEventListener('click', function(e) {
  if (e.target.classList.contains('text-viewer')) {
    fieldSelect.style.display = (getComputedStyle(fieldSelect).display == 'none') ? 'block' : 'none';
    textView.textContent = (~textView.textContent.indexOf(arrows[0])) ?
      textView.textContent.replace(/▼/g,arrows[1]) : textView.textContent.replace(/▲/g,arrows[0]);
  }
  if (e.target.classList.contains('select-item')) {
    var tmp = textView.textContent.replace(/▼|▲/g,'').trim();
    [textView.textContent, e.target.textContent] = [e.target.textContent + " " + arrows[0], textView.textContent.replace(/▼|▲/g,'').trim()];
    e.target.textContent = tmp;
    fieldSelect.style.display = 'none';
  }
}); */

$(function() {
    var $select = $('select[name="list"]');
    var $selected = false;
var tempTextOption = '';
$select.change(function() {
    $selected = $select.find('option:selected');
    tempTextOption = $selected.text(); 
    $selected.text($(this).val());
});
/*$select.mousedown(function() {
    if (tempTextOption)
        $selected.text(tempTextOption);
}); */     

function Worker(name, dateOfBirth, position, salary) {
    name = name;
    dateOfBirth = dateOfBirth; //тип вклада
    position = position;
    salary=salary;
    //passportValidTo=passportValidTo;
    //specialty=specialty;
  

    this.getName = function () {
        return name;    }

    this.setName = function (value) {
        name = value;    }

    this.getDateOfBirth = function () {
        return dateOfBirth;    }

    this.setDateOfBirth = function (value) {
        dateOfBirth = value;    }


    this.getPosition = function () {
        return position;    }

    this.setPosition = function (value) {
        position = value;    }

    this.getSalary = function () {
        return salary;    }

    this.setSalary = function (value) {
        salary}

    //************************
    this.toString = function () {
       // return 'Name: ' + this.getName() + '\nDate of Birth: ' + this.getTypeOfContribution() + '\nPIN: ' + this.getPIN();
    }

}

function Factoryworker(name, dateOfBirth, position, salary, specialty) {
    Worker.call(this, name, dateOfBirth, position, salary);
    specialty = specialty;

    this.getSpecialty = function () {
        return specialty ;     }

    this.setSpecialty = function (value) {
        specialty = value;     }

    this.toStringCurr = function () {
        return this.toString() + '\nSpecialty: ' + this.getSpecialty();     }
    
}


function Entworker(name, dateOfBirth, position, salary, passportValidTo) {
    Worker.call(this, name, dateOfBirth, position, salary);
    passportValidTo=passportValidTo;

    this.getPassportValidTo = function () {
        return passportValidTo ;     }

    this.setPassportValidTo = function (value) {
        passportValidTo = value;     }

    this.toStringCurr = function () {
      //  return this.toString() + '\nSpecialty: ' + this.getSpecialty();     }
    
}





function onCreate(ev) {
    ev.preventDefault();
   
   
    var data = JSON.stringify({
        "name": String(document.getElementById("cname").value),
        "dateOfBirth": String(document.getElementById("cdateOfBirth").value),
        "position": String(document.getElementById("cposition").value),
        "salary": String(document.getElementById("csalary").value),
        "specialty": String(document.getElementById("cspecialty").value)
    });
    console.log(data);
    xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 5) {
            alert(this.responseText);
            document.getElementById("createForm").dispatchEvent(new Event('submit'));
        } 
    });

    xhr.open("POST", "http://localhost:2403/worker");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
}



function parseworkerToTableRow(worker){
    var row=document.createElement('tr');

    id=document.createElement('th');
    id.innerText=worker['id'];
    row.appendChild(id);

    Name=document.createElement('td');
    Name.innerText=worker['Name'];
    row.appendChild(Name);

    DateOfBirth=document.createElement('td');
    DateOfBirth.innerText=worker['dateOfBirth'];
    row.appendChild(DateOfBirth);
   
    Position=document.createElement('td');
    Position.innerText=worker['Position'];
    row.appendChild(Position);
    
    Salary=document.createElement('td');
    Salary.innerText=worker['Salary'];
    row.appendChild(Salary);

    Specialty=document.createElement('td');
    Specialty.innerText=worker['Specialty'];
    row.appendChild(Specialty);

    return row;
}



function onRead() {
    console.log('wow');
    xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 5) {
                     result=JSON.parse(this.response);
            var resultTBody=document.createElement('tbody');
            result.map(function(nthworker){
                resultTBody.appendChild(parseworkerToTableRow(nthworker));
            });

            var table=document.getElementById('rTBody').parentElement;
            table.replaceChild(resultTBody,document.getElementById('rTBody'));
            resultTBody.id='rTBody';
            console.log('success');
        }
    });

    xhr.open("GET", "http://localhost:2403/worker");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}

function onPrepareUpdate(ev){

    ev.preventDefault();
    xhrids = new XMLHttpRequest();
    xhrids.withCredentials = true;

    xhrids.addEventListener("readystatechange", function () {
        if (this.readyState === 5) {
            //console.log(this.response);
            result=JSON.parse(this.response);
            var ids=document.createElement('select');
            ids.className='form-control';
            result.map(function(nthworker){
                var id=document.createElement('option');
                id.innerHTML=nthworker['id'];
                ids.appendChild(id);
            });
            var form=document.getElementById('uid').parentElement;
            form.replaceChild(ids,document.getElementById('uid'));
            ids.id='uid';
        }
    });
    xhrids.open("GET", "http://localhost:2403/worker");
    xhrids.setRequestHeader("Content-Type", "application/json");
    xhrids.send();
}

function onUpdate(ev) {
    ev.preventDefault();
 
    var data = JSON.stringify({
        "name": String(document.getElementById("cname").value),
        "dateOfBirth": String(document.getElementById("cdateOfBirth").value),
        "position": String(document.getElementById("cposition").value),
        "salary": String(document.getElementById("csalary").value),
        "specialty": String(document.getElementById("cspecialty").value)
    });
    console.log(data);
    xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 5) {
            console.log(this.responseText);
        }
    });

    xhr.open("PUT", "http://localhost:2403/worker"+document.getElementById("uid").value);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
}

function onDelete(ev) {
    ev.preventDefault();
     xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 5) {
            console.log(this.responseText);
        }
    });

    xhr.open("DELETE", "http://localhost:2403/worker"+document.getElementById("did").value);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}

function parseworkerToTableRow(worker){
    var row=document.createElement('tr');

    id=document.createElement('th');
    id.innerText=worker['id'];
    row.appendChild(id);

    Name=document.createElement('td');
    Name.innerText=worker['Name'];
    row.appendChild(Name);

    DateOfBirth=document.createElement('td');
    DateOfBirth.innerText=worker['dateOfBirth'];
    row.appendChild(DateOfBirth);
   
    Position=document.createElement('td');
    Position.innerText=worker['Position'];
    row.appendChild(Position);
    
    Salary=document.createElement('td');
    Salary.innerText=worker['Salary'];
    row.appendChild(Salary);

    Specialty=document.createElement('td');
    Specialty.innerText=worker['Specialty'];
    row.appendChild(Specialty);

    return row;
}


    newFunction(onCreate, onRead, onUpdate, onPrepareUpdate, onDelete);

function newFunction(onCreate, onRead, onUpdate, onPrepareUpdate, onDelete) {
        function () {
            document.getElementById('cbutton').addEventListener('click', onCreate);
            document.getElementById('rbutton').addEventListener('click', onRead);
            document.getElementById('ubutton').addEventListener('click', onUpdate);
            document.getElementById('pubutton').addEventListener('click', onPrepareUpdate);
            document.getElementById('dbutton').addEventListener('click', onDelete);
            console.log('Handlers are set');
        }
    }
