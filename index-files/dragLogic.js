console.log("Loading dragLogic.js ...");
const popoverContent = createContextmenu();

function createContextmenu(){
  var ulNode = document.createElement("ul");
  ulNode.classList = "dropdown-menu-dark dropdown-menu-lg-end contextmenu";
  
  let iNode = document.createElement("i");
  iNode.classList = "fa-solid fa-xmark";
  iNode.id = "closeBtn";
  ulNode.appendChild(iNode);

  h6Node = "<li><h6 class='dropdown-header'><i class='fa-solid fa-screwdriver-wrench me-1'></i>Settings</h6></li>";
  hrNode = "<li><hr class='dropdown-divider'></li>";

  ulNode.innerHTML+=h6Node;
  ulNode.innerHTML+=hrNode;


  let inputGroup ="<div class='input-group mb-3'>";
	inputGroup+=       "<div class='input-group-text bg-dark'>";
  inputGroup+=           "<input class='form-check-input mt-0 dropdown-item' type='checkbox' value='1'>";
  inputGroup+=        "</div>";
  inputGroup+=      "<input type='text' class='form-control dropdown-item bg-dark'>";
  inputGroup+=    "</div>";
  inputNames = ["Name","Icon","Link"]; // Item/Container
  for(let i=0;i<inputNames.length;++i){
    let liNode = document.createElement("li");
    labelNode = document.createElement("label");
    labelNode.innerText=inputNames[i];
    liNode.appendChild(labelNode);
    let divNode = document.createElement("div");
    if(i == inputNames.length-1){
      divNode.innerHTML = inputGroup;
    }
    else{
      let inputNode = document.createElement("input");
      inputNode.setAttribute("type","text");
      inputNode.classList = "dropdown-item bg-dark";
      divNode.appendChild(inputNode);
    }
    liNode.appendChild(divNode);
    ulNode.appendChild(liNode);
  };

  deleteNode = "<li class='mt-3'><button id='deleteBtn' class='dropdown-item bg-dark text-center'><i class='fa-solid fa-trash mx-1'></i>Double click to Delete</button></li>";
  ulNode.innerHTML+=deleteNode;
  
  return ulNode;
}

    /*
$('.popover').on('mouseleave', function(event) {
    $(activePopover).popover('hide');
});*/
    /*
draggablesX.forEach(draggableX => {
  const draggableBtn = draggableX.querySelector("a");
  draggableBtn.addEventListener("click", function(){
    if(this.classList.contains("show")){
      draggablesX.forEach(draggableX => {
        draggableX.setAttribute("draggable", false);
      });
    }
    else{
      draggablesX.forEach(draggableX => {
        draggableX.setAttribute("draggable", true);
      });
    }
  });
})*/

var activePopover = null;
var inputs = null;
var timeoutId;
$( document ).ready(function() {
  draggablesX.forEach(draggable => {
    draggable.setAttribute("draggable","true");
    addEventsToContainer(draggable);
  })
  
  draggablesY.forEach(draggable => {
    draggable.setAttribute("draggable","true");
    addDragstartEvent(draggable, 0);
    addDragoverYEvent(draggable);
    addDragendEvent(draggable, 0);
    addContextmenuEvent(draggable, 0);
  })
});
console.log("dragLogic.js have been loaded.");
settingsLoaded = true;

