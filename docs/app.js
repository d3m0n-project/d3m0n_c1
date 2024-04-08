const dropZone = document.getElementById('drop_zone');
const addElementButton = document.getElementById('addElement');
const buildButton = document.getElementById('build');
const pseudocodeElement = document.getElementById('pseudocode');
const draggables = [];
dropZone.style.width="240";
dropZone.style.height="320";
var currentID = "";


const Controls = {
    "Text": {
        "defaultHTML": "<h2 style='width: 50px; height: 25px; '>Text</h2>",
        "doc": "https://github.com/d3m0n-project/d3m0n_os/blob/main/rootfs/usr/share/d3m0n/documentation/Text.md",
        "edit": ["content", "font_size"],
        "defaultWidth": 50,
        "defaultHeight": 25
    },
    "Image": {
        "defaultHTML": "<img src='./default.png' style='width: 20px; height: 20px;'>",
        "doc": "https://github.com/d3m0n-project/d3m0n_os/blob/main/rootfs/usr/share/d3m0n/documentation/Image.md",
        "edit": ["src"],
        "defaultWidth": 50,
        "defaultHeight": 50
    },
    "Button": {
        "defaultHTML": "<button style='width: 100px; height: 50px;'>Button</button>",
        "doc": "https://github.com/d3m0n-project/d3m0n_os/blob/main/rootfs/usr/share/d3m0n/documentation/Button.md",
        "edit": ["content", "font_size"],
        "defaultWidth": 50,
        "defaultHeight": 25
    },
};

function editChild(property, value, subProperty="", increase=0, pixel=false) {
    var element = document.getElementById(currentID).children[0];
    if (element) {
        if(increase > 0) {
            if(subProperty!=""){ 
                element[property][subProperty] += value;
            } else {
                element[property] += value;
            }
        }
        else if(increase < 0) {
            if(subProperty!=""){ 
                element[property][subProperty] -= value;
            } else {
                element[property] -= value;
            }
        }
        else if(increase == 0){
            if(subProperty!=""){ 
                element[property][subProperty] = value;
            } else {
                element[property] = value;
            }
        }
    } else {
        console.error("Element with ID '" + elementId + "' not found.");
    }
}

function edit(property, value, subProperty="", increase=0, pixel=false) {
    var element = document.getElementById(currentID);
    if (element) {
        if(increase > 0) {
            if(subProperty!=""){ 
                element[property][subProperty] += value;
            } else {
                element[property] += value;
            }
        }
        else if(increase < 0) {
            if(subProperty!=""){ 
                element[property][subProperty] -= value;
            } else {
                element[property] -= value;
            }
        }
        else if(increase == 0){
            if(subProperty!=""){ 
                element[property][subProperty] = value;
            } else {
                element[property] = value;
            }
        }
    } else {
        console.error("Element with ID '" + elementId + "' not found.");
    }
}
function locationChange(e) {
    var element = document.getElementById(currentID);
    switch(e.target.value) {
        case "top":
            element.style.top = "0px";
            element.style.left = 240/2-parseInt(element.style.width)/2+"px";
            break;
        case "top_left":
            element.style.top = "0px";
            element.style.left = "0px";
            break;
        case "top_right":
            element.style.top = "0px";
            element.style.left = 240-parseInt(element.style.width)+"px";
            break;
        case "center":
            element.style.top = 320/2-parseInt(element.style.height)/2+"px";
            element.style.left = 240/2-parseInt(element.style.width)/2+"px";
            break;
        case "left":
            element.style.top = 320/2-parseInt(element.style.height)/2+"px";
            element.style.left = "0px";
            break;
        case "right":
            element.style.top = 320/2-parseInt(element.style.height)/2+"px";
            element.style.left = 240-parseInt(element.style.width)+"px";
            break;
        case "bottom":
            element.style.top = 320-parseInt(element.style.height)+"px";
            element.style.left = 240/2-parseInt(element.style.width)/2+"px";
            break;
        case "bottom_left":
            element.style.top = 320-parseInt(element.style.height)+"px";
            element.style.left = "0px";
            break;
        case "bottom_right":
            element.style.top = 320-parseInt(element.style.height)+"px";
            element.style.left = 240-parseInt(element.style.width)+"px";
            break;
    }
}
// x
function setPercentMode(e) {
    var inputElem = document.getElementById(e.target.id.replace("-percent", ""));

    if(e.target.checked) {
        inputElem.value = Math.round(inputElem.value/240*100);
    }
    else {
        inputElem.value = Math.round(inputElem.value/100*240);
    }
}
// y
function setPercentMode2(e) {
    var inputElem = document.getElementById(e.target.id.replace("-percent", ""));

    if(e.target.checked) {
        inputElem.value = Math.round(inputElem.value/320*100);
    }
    else {
        inputElem.value = Math.round(inputElem.value/100*320);
    }
}
function hideCustomEdits() {
	var editFields = document.getElementsById("customEdit");
	for(i=0; i < editFields.children.length) {
		
}
function loadEdit(type) {
    var editFields = document.getElementsById("customEdit");
	
	
	
    if(!type in Controls) {
        alert("Invalid control type");
        return;
    }
	
	
	switch(type) {
		case "Text":
			
			break;
	}

    // displays GeneralAttributes

// name="ControlName";
// visible="[true/false]";
// enabled="[true/false]";

// parent="ControlName";

// margin_top="10";
// margin_left="20";
// margin_right="5";
// margin_bottom="25";

// location="x, y";
// location="[top/top_left/top_right/bottom/bottom_left/bottom_right/left/right/center]";

// color="white";
// color="255, 255, 255";

// bg_color="black";
// bg_color="0, 0, 0";

// width="20";
// width="10%";

// height="10";
// width="5%";
}

function createDraggableElement(type) {
    const draggable = document.createElement('div');
    draggable.classList.add('draggable');
    draggable.style.padding = "0px";

    draggable.style.top = "0px";
    draggable.style.left = "0px";

    let r = (Math.random() + 1).toString(36).substring(7);
    draggable.id = type+"_"+r;
    draggable.style.width = Controls[type]["defaultWidth"]+"px";
    draggable.style.height = Controls[type]["defaultHeight"]+"px";

    if(!type in Controls) {
        alert("Invalid Control type!");
        return;
    }
    
    // adds correct style class
    draggable.classList.add('Control_'+type);


    draggable.innerHTML += Controls[type]["defaultHTML"];

    dropZone.appendChild(draggable); 
    let isDragging = false;
    let startX, startY;

    draggable.addEventListener('mousedown', (event) => {
        isDragging = true;
        startX = event.clientX;
        startY = event.clientY;
        currentID = draggable.id;

        document.getElementById("edit-name").value = draggable.id;
        document.getElementById("edit-width").value = parseInt(draggable.style.width);
        document.getElementById("edit-height").value = parseInt(draggable.style.height);

        document.getElementById("edit-location-x").value = parseInt(draggable.style.left);
        document.getElementById("edit-location-y").value = parseInt(draggable.style.top);

        document.getElementById("edit-color").value = rgbToHex(window.getComputedStyle(draggable).color);
        document.getElementById("edit-bg_color").value = rgbToHex(window.getComputedStyle(draggable).background);
    });
    document.addEventListener('mousemove', (event) => {
        if (!isDragging) return;
        // var rect = drop_zone.getBoundingClientRect();
        // console.log(rect.top, rect.right, rect.bottom, rect.left);
        const dx = event.clientX;// - startX;
        const dy = event.clientY;// - startY;
        const rect = dropZone.getBoundingClientRect();
        var draggable_x = dx - rect.x;
        var draggable_y = dy - rect.y;
        var draggable_width = draggable.offsetWidth;
        var draggable_height = draggable.clientHeight;
        draggable.style.left = draggable_x + 'px';
        draggable.style.top = draggable_y + 'px';
        startX = event.clientX;
        startY = event.clientY;


        // manage window size
        if(draggable_x < 0) {
            draggable.style.left = '0px';
        }
        if(draggable_x > 240 - draggable_width) {
            draggable.style.left = 240 - draggable_width + 'px';
        }
        if(draggable_y < 0) {
            draggable.style.top = '0px';
        }
        if(draggable_y > 320 - draggable_height) {
            draggable.style.top = 320 - draggable_height + 'px';
        }

        // edit x, y of element
        document.getElementById("edit-location-x").value = parseInt(draggable.style.left);
        document.getElementById("edit-location-y").value = parseInt(draggable.style.top);
    });
    document.addEventListener('mouseup', () => {
        isDragging = false;
        draggables.push({
            element: draggable,
            position: {
                x: draggable.style.left,
                y: draggable.style.top
            }
        });
    });
}
buildButton.addEventListener('click', () => {
    pseudocodeElement.textContent = generatePseudocode(draggables);
});
function generatePseudocode(draggables) {
    let pseudocode = 'Building the layout:\n';
    draggables.forEach((draggable, index) => {
        pseudocode += `Element ${index + 1}:\n`;
        pseudocode += `- Type: Draggable\n`;
        pseudocode += `- Size: ${draggable.element.offsetWidth}x${draggable.element.offsetHeight}\n`;
        pseudocode += `- Position: (${draggable.position.x}, ${draggable.position.y})\n\n`;
    });
    return pseudocode;
}
function debug(x, y) {
    // document.body.innerHTML += "<div style='z-index: 9999; width: 5px; height: 5px; background: red; top: "+y+"px; left: "+x+"px; display: flex; position: absolute;'></div>"
}

function rgbToHex(rgb) {
    // This function converts an RGB color format to Hex color format
    var rgbArray = rgb.match(/\d+/g); // Extract numerical values from the RGB(A) format
    return "#" + rgbArray.map(function(bit) {
      bit = parseInt(bit).toString(16); // Convert each number to hexadecimal
      return bit.length === 1 ? "0" + bit : bit; // Add a leading zero if necessary
    }).join('');
  }
  