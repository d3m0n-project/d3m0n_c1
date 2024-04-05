const dropZone = document.getElementById('drop_zone');
const addElementButton = document.getElementById('addElement');
const buildButton = document.getElementById('build');
const pseudocodeElement = document.getElementById('pseudocode');
const draggables = [];
dropZone.style.width="240";
dropZone.style.height="320";


const Controls = {
    "Text": {
        "defaultHTML": "<h2 style='width: 50px; height: 25px; '>Text</h2>",
        "doc": "https://github.com/d3m0n-project/d3m0n_os/blob/main/rootfs/usr/share/d3m0n/documentation/Text.md",
        "edit": ["content", "font_size"]
    },
    "Image": {
        "defaultHTML": "<img src='./default.png' style='width: 20px; height: 20px;'>",
        "doc": "https://github.com/d3m0n-project/d3m0n_os/blob/main/rootfs/usr/share/d3m0n/documentation/Image.md",
        "edit": ["src"]
    },
    "Button": {
        "defaultHTML": "<button style='width: 100px; height: 50px;'>Button</button>",
        "doc": "https://github.com/d3m0n-project/d3m0n_os/blob/main/rootfs/usr/share/d3m0n/documentation/Button.md",
        "edit": ["content", "font_size"]
    },
};

function loadEdit(type) {
    var editFields = document.getElementsById("");

    if(!type in Controls) {
        alert("Invalid control type");
        return;
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
    });
    document.addEventListener('mouseup', () => {
        isDragging = false;
        draggables.push({
            element: draggable,
            position: {
                x: draggable.offsetLeft,
                y: draggable.offsetTop
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