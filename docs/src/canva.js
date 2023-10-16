function resize()
{
	// resize window if it's too wide or too tall
	let box = document.getElementById('window');
	let width = box.offsetWidth;
	let height = box.offsetHeight;
	document.getElementById("dimentions").innerHTML = width+"x"+height;
	// width: 480px;
	// height: 640px;
	if(width > 480)
	{
		document.getElementById('window').style.width = "480px";
	}
	if(height > 640)
	{
		document.getElementById('window').style.height = "640px";
	}
	if(width < 48)
	{
		document.getElementById('window').style.width = "48px";
	}
	if(height < 64)
	{
		document.getElementById('window').style.height = "64px";
	}
}

function allowDrop(ev) {
	//allow elements to be droped
	ev.preventDefault();
	ev.dataTransfer.dropEffect = "move";
}

function drag(ev) {
	//start dragging elements
	id = ev.target.id;
}

function add_item(type, id, randomname, name, width, height, color, top, left, backcolor, fontsize)
{
	// add items to list
	gui_items.push(type+";"+id+";"+randomname+";"+name+";"+width+";"+height+";"+color+";"+top+";"+left+";"+backcolor+";"+fontsize);
}

var rand;
function set_elem(ev, type) {
	const collection = document.getElementsByClassName("draggable_div");
	for (let i = 0; i < collection.length; i++) {
		dragElement(collection[i]);
		getDivPosition(rand);
	}
	if(!selected_elem == "")
	{
		document.getElementById(selected_elem).style.border = "0px solid #257AFD"; 
	}
	selected_elem=ev.target.id.slice(0, -1);
	document.getElementById(selected_elem).style.border = "3px solid #257AFD"; 
	// selected_elem=ev.target.id;
	console.log(selected_elem);
	set_bar();
}

function drop(ev, type) {
	// on element dropped
	ev.preventDefault();
	
	const alphabet = "abcdefghijklmnopqrstuvwxyz"
	const randomCharacter = alphabet[Math.floor(Math.random() * alphabet.length)]+alphabet[Math.floor(Math.random() * alphabet.length)]+alphabet[Math.floor(Math.random() * alphabet.length)]+alphabet[Math.floor(Math.random() * alphabet.length)]+alphabet[Math.floor(Math.random() * alphabet.length)]+alphabet[Math.floor(Math.random() * alphabet.length)]+alphabet[Math.floor(Math.random() * alphabet.length)]+alphabet[Math.floor(Math.random() * alphabet.length)];

	rand = Math.random().toString().substr(2, 8);
	new_element(rand, id, randomCharacter);
}


function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "_header")) {
      /* if present, the header is where you move the DIV from:*/
      document.getElementById(elmnt.id + "_header").onmousedown = dragMouseDown;
    } else {
      /* otherwise, move the DIV from anywhere inside the DIV:*/
      elmnt.onmousedown = dragMouseDown;
    }
  
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
        
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
       }	  
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "_header")) {
      /* if present, the header is where you move the DIV from:*/
      document.getElementById(elmnt.id + "_header").onmousedown = dragMouseDown;
    } else {
      /* otherwise, move the DIV from anywhere inside the DIV:*/
      elmnt.onmousedown = dragMouseDown;
    }
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
    
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
        elmnt.style.top = (getDivPosition(elmnt.id) - pos2) + "px";
      elmnt.style.left = (getDivPosition2(elmnt.id) - pos1) + "px";
      
      //cant go less than window
      if((parseInt(Number(getDivPosition(elmnt.id))) - pos2) <= parseInt(Number(getDivPosition("id2"))))
      {
          elmnt.style.top = parseInt(Number(getDivPosition("id2"))) + "px";
      }
      if((parseInt(Number(getDivPosition2(elmnt.id))) - pos1) <= parseInt(Number(getDivPosition2("id2"))))
      {
          elmnt.style.left = parseInt(Number(getDivPosition2("id2"))) + "px";
      }
      
      if((parseInt(Number(getDivPosition(elmnt.id))) - pos2) >= parseInt(Number(getDivPosition("id2")))+document.getElementById("id2").offsetHeight-elmnt.offsetHeight-25)
      {
          elmnt.style.top = parseInt(Number(getDivPosition("id2")))+document.getElementById("id2").offsetHeight-elmnt.offsetHeight-25 + "px";
      }
      if((parseInt(Number(getDivPosition2(elmnt.id))) - pos1) >= getDivPosition2("id2")+document.getElementById("id2").offsetWidth-elmnt.offsetWidth)
      {
          elmnt.style.left = parseInt(Number(getDivPosition2("id2")))+document.getElementById("id2").offsetWidth-elmnt.offsetWidth + "px";
      }
      
      
      // console.log(getDivPosition(elmnt.id) - pos2);
      // console.log("X: "+((getDivPosition(elmnt.id) - pos2) - getDivPosition("id2"))+" Y: "+ ((getDivPosition2(elmnt.id) - pos1) - getDivPosition2("id2")));
      let temp1=(getDivPosition2(elmnt.id) - getDivPosition2("id2")).toString().split('.');
      let temp2=(getDivPosition(elmnt.id) - getDivPosition("id2")).toString().split('.');
      // alert(temp1);
      // alert(temp2);
      for (var i = 0; i < gui_items.length; i++) {
          if(gui_items[i].contains(elmnt.id))
          {
              var temp=gui_items[i];
              var temp5=temp.split(';');
              gui_items.splice(i,1);
              // text=""+elmnt.textContent;
              add_item(temp5[0], elmnt.id, temp5[2], temp5[3], elmnt.offsetWidth, elmnt.offsetHeight, document.getElementById(elmnt.id+5).style.color, temp1[0], temp2[0], document.getElementById(elmnt.id+5).style.backgroundColor);
              // console.log(gui_items);
          }
      }
      // console.log(elmnt.marginLeft - pos1);
    }
  
    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    }
    // document.querySelector('.tooltip').classList.remove('active');
  }
  function getDivPosition(name)
  {
      var rect = document.getElementById(name).getBoundingClientRect();
      var x = document.getElementById(name).clientX - rect.left; //x position within the element.
      var y = document.getElementById(name).clientY - rect.top;  //y position within the element.
      // console.log("Left? : " + x + " ; Top? : " + y + ".");
      // console.log("Left? : " + rect.top);
      result=rect.top.toString().split(".")[0];
      return(parseInt(Number(result)));
  }
  function getDivPosition2(name)
  {
      var rect = document.getElementById(name).getBoundingClientRect();
      var x = document.getElementById(name).clientX - rect.left; //x position within the element.
      var y = document.getElementById(name).clientY - rect.top;  //y position within the element.
      // console.log("Left? : " + x + " ; Top? : " + y + ".");
      // console.log("Left? : " + rect.top);
      result=rect.left.toString().split(".")[0];
      return(parseInt(Number(result)));
  }