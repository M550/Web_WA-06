var oSelect = document.getElementById('menu1');
var Handler = function (ev){
    
    switch (ev.target.value){
        case '1':{
            key1();
            break;
        }
        case '2':{
            key2();
            break;
        }
    };
  
};

oSelect.addEventListener('change',Handler);

var key1=function(){
    var oForm =document.getElementById('idForm');
    oForm.innerHTML='';
    oNameLable=document.createElement('lable');
    oNameLable.innerHTML='Name';
    oName=document.createElement('input');
    oName.setAttribute('type','text');
    oName.setAttribute('class','text');
    oName.id='name';
    oForm.appendChild(oNameLable);
    oForm.appendChild(oName);

}
var key2=function(){
    var oForm =document.getElementById('idForm');
    oForm.innerHTML='';

}

key1();



/*function pr() {
    if (menu1.value == "1") {
        rez.value = "Factory Workers";
    } else {
        if (menu1.value == "2") {
            rez.value = "Transport Enterprise Workers";
        }
    }
}*/

/*
function Worker(name, dateOfBirth, position, salary) {
    this.name = name;
    this.dateOfBirth = dateOfBirth; //тип вклада
    this.position = position;
    this.salary=salary;
    //passportValidTo=passportValidTo;
    //specialty=specialty;
  
    Worker.prototype.getName = function () {
        return this.name;    }

    Worker.prototype.setName = function (value) {
        this.name = value;    }

     Worker.prototype.getDateOfBirth = function () {
        return dateOfBirth;    }

    Worker.prototype.setDateOfBirth = function (value) {
        dateOfBirth = value;    }

    Worker.prototype.getPosition = function () {
        return position;    }

     Worker.prototype.setPosition = function (value) {
        position = value;    }

    Worker.prototype.getSalary = function () {
        return salary;    }

    Worker.prototype.setSalary = function (value) {
        salary}
    }



function Factoryworker(name, dateOfBirth, position, salary, specialty) {
    Worker.call(this, name, dateOfBirth, position, salary);
    this.specialty = specialty;

    /*this.getSpecialty = function () {
        return specialty ;     }

    this.setSpecialty = function (value) {
     specialty = value;     }
}
Factoryworker.prototype=Object.create(Worker.prototype);
Factoryworker.prototype.constructor=Factoryworker;

function Entworker(name, dateOfBirth, position, salary, passportValidTo) {
    Worker.call(this, name, dateOfBirth, position, salary);
    this.passportValidTo=passportValidTo;

   /* this.getPassportValidTo = function () {
        return passportValidTo ;     }

    this.setPassportValidTo = function (value) {
       passportValidTo = value;     }
  }
  Entworker.prototype=Object.create(Worker.prototype);
  Entworker.prototype.constructor=Entworker;


  
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

function onPrepareDelete(ev){
    ev.preventDefault();
    xhrids = new XMLHttpRequest();
    xhrids.withCredentials = true;
  
    xhrids.addEventListener("readystatechange", function () {
        if (this.readyState === 5) {
            
            result=JSON.parse(this.response);
            var ids=document.createElement('select');
            ids.className='form-control';
            result.map(function(nthCPU){
                var id=document.createElement('option');
                id.innerHTML=nthCPU['id'];
                ids.appendChild(id);
            });
            var form=document.getElementById('did').parentElement;
            form.replaceChild(ids,document.getElementById('did'));
            ids.id='did';
        }
    });
    xhrids.open("GET", "http://localhost:2403/worker");
    xhrids.setRequestHeader("Content-Type", "application/json");
    xhrids.send();
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

    function () {
  
        document.getElementById('cbutton').addEventListener(
            'click', onCreate
        );
        document.getElementById('rbutton').addEventListener(
            'click', onRead
        );
        document.getElementById('ubutton').addEventListener(
            'click', onUpdate
        );
        document.getElementById('pubutton').addEventListener(
            'click', onPrepareUpdate
        );
        document.getElementById('dbutton').addEventListener(
            'click', onDelete
        );
        console.log('Handlers are set')
    }*/