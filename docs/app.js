const dropZone = document.getElementById('drop_zone');
const addElementButton = document.getElementById('addElement');
const buildButton = document.getElementById('build');
const layoutElement = document.getElementById('layout');
const draggables = [];
dropZone.style.width="240";
dropZone.style.height="320";
var currentID = "";
var idCounter=0;
var globalArgs = ["color", "bg_color", "visible", "enabled", "width", "height", "margin_top",  "margin_left", "margin_right", "margin_bottom"]

var iconsList = new Map();
iconsList.set("default", "https://d3m0n-project.github.io/d3m0n_c1/assets/logo_dark.png");

function add_iconsList(name, url) { iconsList.set(name, url); }

const Controls = {
    "TextBox": {
        "defaultHTML": "<input controltype='TextBox' style='width: 100%; height: 100%; '>TextBox</input>",
        "doc": "https://github.com/d3m0n-project/d3m0n_os/blob/main/rootfs/usr/share/d3m0n/documentation/TextBox.md",
        "edit": ["content", "font_size", "bold", "type", "text_align"],
        "defaultWidth": 50,
        "defaultHeight": 25
    },
    "ProgressBar": {
        "defaultHTML": "<progress controltype='ProgressBar' max='100' value='0'></progress>",
        "doc": "https://github.com/d3m0n-project/d3m0n_os/blob/main/rootfs/usr/share/d3m0n/documentation/ProgressBar.md",
        "edit": ["min", "value", "max"],
        "defaultWidth": 50,
        "defaultHeight": 25
    },
    "CheckBox": {
        "defaultHTML": "<input controltype='CheckBox' type='checkbox'></input>",
        "doc": "https://github.com/d3m0n-project/d3m0n_os/blob/main/rootfs/usr/share/d3m0n/documentation/CheckBox.md",
        "edit": ["text_align", "font_size", "checked", "content"],
        "defaultWidth": 50,
        "defaultHeight": 25
    },
    "RawHtml": {
        "defaultHTML": "",
        "doc": "https://github.com/d3m0n-project/d3m0n_os/blob/main/rootfs/usr/share/d3m0n/documentation/RawHtml.md",
        "edit": ["HTML"],
        "defaultWidth": 50,
        "defaultHeight": 50
    },
    "WebView": {
        "defaultHTML": "",
        "doc": "https://github.com/d3m0n-project/d3m0n_os/blob/main/rootfs/usr/share/d3m0n/documentation/WebView.md",
        "edit": ["url"],
        "defaultWidth": 50,
        "defaultHeight": 50
    },
    "Rect": {
        "defaultHTML": "",
        "doc": "https://github.com/d3m0n-project/d3m0n_os/blob/main/rootfs/usr/share/d3m0n/documentation/Rect.md",
        "edit": ["scroll"],
        "defaultWidth": 50,
        "defaultHeight": 50
    },
    "Switch": {
        "defaultHTML": "<input controltype='Switch' type='checkbox'>Switch</input>",
        "doc": "https://github.com/d3m0n-project/d3m0n_os/blob/main/rootfs/usr/share/d3m0n/documentation/Rect.md",
        "edit": ["text_align", "font_size", "checked", "content"],
        "defaultWidth": 50,
        "defaultHeight": 50
    },   
    "RadioButton": {
        "defaultHTML": "<input type='checkbox' controltype='RadioButton' style='border-radius: 50%;'>RadioButton</input>",
        "doc": "https://github.com/d3m0n-project/d3m0n_os/blob/main/rootfs/usr/share/d3m0n/documentation/ProgressBar.md",
        "edit": ["text_align", "font_size", "checked", "content"],
        "defaultWidth": 50,
        "defaultHeight": 25
    },
    "ListView": {
        "defaultHTML": "<h2 controltype='ListView'  style='color: red; width: 100%; height: 100%; '>soon...</h2>",
        "doc": "https://github.com/d3m0n-project/d3m0n_os/blob/main/rootfs/usr/share/d3m0n/documentation/Text.md",
        "edit": [],
        "defaultWidth": 50,
        "defaultHeight": 25
    },
    "Text": {
        "defaultHTML": "<h2 controltype='Text' style='font-size: 16px; margin: 0px; font-weight: normal; width: 100% height: 100%; '>Text</h2>",
        "doc": "https://github.com/d3m0n-project/d3m0n_os/blob/main/rootfs/usr/share/d3m0n/documentation/Text.md",
        "edit": ["content", "font_size", "bold", "text_align"],
        "defaultWidth": 50,
        "defaultHeight": 25
    },
    "Image": {
        "defaultHTML": "<img controltype='Image'  src='https://d3m0n-project.github.io/d3m0n_c1/assets/logo_dark.png' style='-webkit-user-drag: none; width: 100%; height: 100%;'>",
        "doc": "https://github.com/d3m0n-project/d3m0n_os/blob/main/rootfs/usr/share/d3m0n/documentation/Image.md",
        "edit": ["src", "mode"],
        "defaultWidth": 50,
        "defaultHeight": 50
    },
    "Button": {
        "defaultHTML": "<button controltype='Button' style='width: 100%; height: 100%;'>Button</button>",
        "doc": "https://github.com/d3m0n-project/d3m0n_os/blob/main/rootfs/usr/share/d3m0n/documentation/Button.md",
        "edit": ["content", "font_size"],
        "defaultWidth": 50,
        "defaultHeight": 25
    },
    "RoundButton": {
        "defaultHTML": "<button controltype='RoundButton' style='width: 100%; height: 100%;'>RoundButton</button>",
        "doc": "https://github.com/d3m0n-project/d3m0n_os/blob/main/rootfs/usr/share/d3m0n/documentation/RoundButton.md",
        "edit": ["content", "font_size", "text_align", "image", "radius"],
        "defaultWidth": 50,
        "defaultHeight": 25
    },
    "Vscroll": {
        "defaultHTML": "",
        "doc": "https://github.com/d3m0n-project/d3m0n_os/blob/main/rootfs/usr/share/d3m0n/documentation/Vscroll.md",
        "edit": ["bar"],
        "defaultWidth": 50,
        "defaultHeight": 25
    },
    "Hscroll": {
        "defaultHTML": "",
        "doc": "https://github.com/d3m0n-project/d3m0n_os/blob/main/rootfs/usr/share/d3m0n/documentation/Hscroll.md",
        "edit": ["bar"],
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
    document.getElementById("edit-location-x").value = parseInt(element.style.left);
    document.getElementById("edit-location-y").value = parseInt(element.style.top);
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
	var editFields = document.getElementById("customEdit");
	for(i=0; i < editFields.children.length; i++) {
        editFields.children[i].style.display = "none"
    }
		
}

function editSrc(value) {
    if(iconsList.has(value)) {
        document.getElementById(currentID).children[0].src = iconsList.get(value);
    } else {
        document.getElementById(currentID).children[0].src = value;
    }
}
function loadEdit(type) {
    var editFields = document.getElementById("customEdit");
	hideCustomEdits();
	
	
    if(!type in Controls) {
        alert("Invalid control type");
        return;
    }
	
	for(i=0; i<Controls[type]["edit"].length; i++) {
        var element = Controls[type]["edit"][i];
        if(element != undefined) { 
            try {
                document.getElementById("customEdit-"+element).style.display = "block";
            } catch(e) {
                console.log("customEdit-"+element+" is not defined");
            }
            
            // console.log(element);
        }
    }

    // displays GeneralAttributes

    // parent="ControlName";
}

function setThemeIcon(path) {
    document.getElementById("edit-src").value = path;
    document.getElementById('iconSelector').style.display = 'none';
    // https://api.github.com/repos/d3m0n-project/d3m0n_os/contents/rootfs/usr/share/d3m0n/themes/default_dark/icons
    editSrc(path);
    
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

        loadEdit(type);
        document.getElementById('generalAttributes').style.display = 'block';

        // name, width&height
        document.getElementById("edit-name").value = draggable.id;
        document.getElementById("edit-width").value = parseInt(draggable.style.width);
        document.getElementById("edit-height").value = parseInt(draggable.style.height);

        // locations (x, y)
        document.getElementById("edit-location-x").value = parseInt(draggable.style.left);
        document.getElementById("edit-location-y").value = parseInt(draggable.style.top);

        // back & fore colors
        document.getElementById("edit-color").value = rgbToHex(window.getComputedStyle(draggable).color);
        document.getElementById("edit-bg_color").value = rgbToHex(window.getComputedStyle(draggable).background);

        // try custom edit types
        
        // src
        try { 
            let key = getKeyByValue(iconsList, draggable.children[0].src);
            if(key == null) { document.getElementById("edit-src").value = draggable.children[0].src; } else { document.getElementById("edit-src").value = key; }  
        } catch(e) {}
        // content
        try { 
            document.getElementById("edit-content").value = draggable.children[0].innerHTML;
        } catch(e) {}
        // font-size
        try { 
            document.getElementById("edit-font_size").value = parseInt(draggable.children[0].style.fontSize);
        } catch(e) {}
        // bold
        try { 
            document.getElementById("edit-font_size").checked = (draggable.children[0].style.fontWeight == "bold")?true:false;
        } catch(e) {}
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
        // draggables.push({
        //     "id": idCounter++,
        //     element: draggable,
        //     position: {
        //         x: draggable.style.left,
        //         y: draggable.style.top
        //     }
        // });
    });

    return draggable;
}
buildButton.addEventListener('click', () => {
    var layout = generateLayout(draggables);
    console.log(layout);
    downloadfile("app.layout", layout);
    // layoutElement.textContent = generateLayout(draggables);
});
function generateLayout(draggables) {
    var layout = `# d3m0n studio generated app
# https://d3m0n-project.github.io/d3m0n_c1/studio.html

Window:
    name="My App";
    bg_color="`+ rgbToHex(window.getComputedStyle(dropZone).background) + `";
    width="100%";
    height="100%";
    topbar="true";
    
`;


    var elements = document.getElementById('drop_zone').children;

    for(i=0; i<elements.length; i++) {
        elements[i].click();

        console.log(elements[i]);
        type = elements[i].children[0].getAttribute("controltype");
        // add custom args
        if(type != null) {
            layout+=type+":\n";
            Controls[type]["edit"].forEach(edit => {
                console.log('edit-'+edit);
                value = document.getElementById('edit-'+edit).value;
                if(value == null || value=="" || value==undefined) { value = document.getElementById('edit-'+edit).checked?"true":"false"; }
                layout+="   "+edit+"=\""+value+"\";\n";
            });
        }
        // add global args
        for(j=0; j<globalArgs.length; j++){ 
            console.log(globalArgs[j]);
            if(document.getElementById('edit-'+globalArgs[j]).value == "on" || document.getElementById('edit-'+globalArgs[j]).value == "off")
            {
                layout+="   "+globalArgs[j]+"=\""+document.getElementById('edit-'+globalArgs[j]).checked+";\n";
            } else {
                layout+="   "+globalArgs[j]+"=\""+document.getElementById('edit-'+globalArgs[j]).value+";\n";
            }
        }
        // add location
        layout+="   location=\""+document.getElementById('edit-location-x').value+", "+document.getElementById('edit-location-y').value+";\n";
        
        layout+="\n";
        
    }
    // let layout = 'Building the layout:\n';
    // draggables.forEach((draggable, index) => {
    //     layout += `Element ${draggable.id}:\n`;
    //     layout += `- Type: Draggable\n`;
    //     layout += `- Size: ${draggable.element.offsetWidth}x${draggable.element.offsetHeight}\n`;
    //     layout += `- Position: (${draggable.position.x}, ${draggable.position.y})\n\n`;
    // });
    return layout;
}

function importLayout()
{
	//import file
	var input = document.createElement('input');
	input.type = 'file';
	
	input.onchange = e => { 
		var files = e.target.files;
		var file = files[0];           
		var reader = new FileReader();
		// read file
		reader.onload = function(event) 
		{
			dropZone.innerHTML="";
			
			layout=event.target.result;
            
            // parse layout to delete new lines
            layout=layout.replaceAll(";\n", ";");
            layout=layout.replaceAll(";\r\n", ";");
            layout=layout.replaceAll(":\n", ":");
            layout=layout.replaceAll(":\r\n", ":");

            // console.log(layout);

            lines = layout.split("\n");

            for(i=0; i<lines.length; i++)
            {
                if (lines[i].startsWith('#') || lines[i].trim() == "")
                    continue;

                

                let controlName = lines[i].split(':')[0];
                var controlArgs = lines[i].split(':')[1].split(';');

                console.log(controlName+" new control "+controlArgs);

                currentID = "drop_zone";

                // add new elements
                if(controlName != "Window") {
                    if(controlName == undefined) {
                        alert("Invalid Control type ("+controlName+")");
                        continue;
                    }
                    // creates a new element
                    var newControl = createDraggableElement(controlName);
                    
                    currentID = newControl.id;
                }
    
                for(j=0; j<controlArgs.length-1;  j++)
                {
                    var controlArgName = controlArgs[j].split('=')[0].trim().trimStart('"').trimEnd('"');
                    var controlArgValue = controlArgs[j].split('=')[1].trim();
                    controlArgValue = controlArgValue.replaceAll('"', "");
                    
                    console.log(controlArgName+" => "+controlArgValue);
                    
                    switch(controlArgName) { 
                        case "content":
                            editChild("innerHTML", controlArgValue, "", 0, false);
                            break;
                        case "font_size":
                            editChild("style", controlArgValue+"px", "fontSize", 0, false);
                            break;
                        case "color":
                            editChild("style", controlArgValue, "color", 0, false);
                            break;
                        case "bg_color":
                            edit("style", controlArgValue, "background", 0, false);
                            break;
                        case "location":
                            if(controlArgValue.includes(",")) {
                                x=controlArgValue.split(",")[0].replaceAll(" ", "");
                                y=controlArgValue.split(",")[1].replaceAll(" ", "");
                                edit("left", x+"px", "", 0, false);
                                edit("top", y+"px", "", 0, false);
                            } else {
                                var event = new Event('change');
                                Object.defineProperty(event, 'target', { value: document.getElementById("edit-location"), enumerable: true });
                                document.getElementById("edit-location").selected = controlArgValue;
                                locationChange(event);
                            }
                            
                            break;
                        case "height":
                            if(controlArgValue.includes("%")) {
                                controlArgValue = parseFloat(controlArgValue.replace("%", ""))/100*320;
                            }
                            edit("style", controlArgValue+"px", "height", 0, false);
                            break;
                        case "width":
                            if(controlArgValue.includes("%")) {
                                controlArgValue = parseFloat(controlArgValue.replace("%", ""))/100*240;
                            }
                            edit("style", controlArgValue+"px", "width", 0, false);
                            break;
                    }

                    // document.getElementById(controlId)[]
                    // if(controlArgValue.trimStart('"').trimEnd('"') == "true" || controlArgValue.trimStart('"').trimEnd('"') == "false") {
                    //     alert("checkbox detected "+controlArgValue);
                    // }
                }
                // console.log(lines[i]);
            }
            


            // console.log(layout);
		}
		reader.readAsText(file)
	}
	
	
	input.click();
}

function debug(x, y) {
    // document.body.innerHTML += "<div style='z-index: 9999; width: 5px; height: 5px; background: red; top: "+y+"px; left: "+x+"px; display: flex; position: absolute;'></div>"
}

function rgbToHex(rgb) {
    // This function converts an RGB color format to Hex color format
    var rgbArray = rgb.match(/\d+/g); // Extract numerical values from the RGB(A) format
    to_return = "#" + rgbArray.map(function(bit) {
      bit = parseInt(bit).toString(16); // Convert each number to hexadecimal
      return bit.length === 1 ? "0" + bit : bit; // Add a leading zero if necessary
    }).join('');
    if(to_return.length > 7) {
        to_return.slice(0, -4);
    }
    return to_return;
}

function getKeyByValue(map, searchValue) {
  for (let [key, value] of map.entries()) {
      if (value === searchValue) {
          return key;
      }
  }
  return null; // Return null if the value is not found in the map
}
function downloadfile(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}