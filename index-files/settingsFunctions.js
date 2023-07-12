console.log("Loading settingsFunctions.js ...");
var draggablesX = document.querySelectorAll(".draggableX");
var draggablesY = document.querySelectorAll(".draggableY");

const containerX = document.querySelector('.dragContainerX');
const containersY = document.querySelectorAll('.dragContainerY');
const newSestionBtn = document.querySelector("#newSection");
const newContainerSubmit = document.querySelector("#newContainerSubmit");

var overDraggableGlobal = null;

function addDragstartEvent(draggable, draggables = 1){
    draggable.addEventListener('dragstart', () => {
    if(draggable.getAttribute("draggable") == "false")
      return;
    //if(draggable.classList.contains("show"))
      //draggable.querySelector("ul").classList.remove("show");
    draggable.classList.add('dragging');
    //console.log(draggable);
    if(draggables)
      draggablesX.forEach(element => {
          element.classList.add("draggingOtherElement");
      });
    else
      draggablesY.forEach(element => {
        element.classList.add("draggingOtherElement");
        elementA = element.querySelector("a");
        if(elementA != null)
        elementA.classList.add("trasparentBackground");
    });
    draggable.classList.remove('draggingOtherElement');
    draggable.classList.add("active");
  });
}

function addDragendEvent(draggable, draggables = 1){
  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging');
    overDraggableGlobal.classList.remove("active");
    if(draggables)
    draggablesX.forEach(element => {
      element.classList.remove("draggingOtherElement");
    });
    else
    draggablesY.forEach(element => {
      element.classList.remove("draggingOtherElement");
      elementA = element.querySelector("a");
        if(elementA != null)
        elementA.classList.remove("trasparentBackground");
    });
    draggable.classList.remove("active");
  });
}

function addDragoverXEvent(overDraggable){
    overDraggable.addEventListener("dragover", e => {
    e.preventDefault();
    if(overDraggableGlobal != overDraggable){
      if(overDraggableGlobal!=null)
        overDraggableGlobal.classList.remove("active");
      overDraggableGlobal = overDraggable;
      
    }
    const draggable = document.querySelector('.dragging');
    const box = overDraggable.getBoundingClientRect();
    const offsetTrigger = (box.width)*30/100;
    const offset = e.clientX - box.left - box.width / 2;
    //console.log(overDraggableGlobal);
    if(draggable.classList.contains("draggableY") && overDraggable.classList.contains("draggableX")){

      const a = overDraggable.querySelector("a");
      if(!a.classList.contains("show")){
          const nodeWithShow = overDraggable.parentNode.querySelector(".show");
          if(nodeWithShow != null)
            nodeWithShow.classList.remove("show");
          else{
            let ulNode = overDraggable.querySelector("ul");
            ulNode.insertBefore(draggable, ulNode.querySelector(".newSection"));
            overDraggableGlobal.classList.add("active");
            let headers = ulNode.querySelectorAll(".header");
            setHRNode(headers);
          }
      }
    }else{
      if(offset < -offsetTrigger){
        overDraggable.parentNode.insertBefore(draggable, overDraggable);
      }else if(offset > offsetTrigger ){
        overDraggable.parentNode.insertBefore(draggable, overDraggable.nextSibling);
      }
    }
    //console.log(draggable);
  });
}

function addDragleaveEvent(leftDrag){
  leftDrag.addEventListener("dragleave",()=>{
    let ulNode = leftDrag.querySelector("ul");
    //let headers = ulNode.querySelectorAll(".header:not(.dragging)");
    let headers = ulNode.querySelectorAll(".header");
    setHRNode(headers,true);
  });
}

function addDragenterEvent(enterDrag){
  //enterDrag.addEventListener("dragenter",()=>{
    
  //});
}

function addDragoverYEvent(overDraggable){
    
    overDraggable.addEventListener("dragover", e => {
    e.preventDefault();
    //e.stopPropagation();
    const draggable = document.querySelector('.dragging');
    const box = overDraggable.getBoundingClientRect();
    const offsetTrigger = (box.height)*10/100;
    const offset = e.clientY - box.top - box.height / 2;
    if(overDraggable.classList.contains("draggableY") != draggable.classList.contains("draggableY")){
      
    }else{
      if(offset > offsetTrigger){
        overDraggable.parentNode.insertBefore(draggable, overDraggable);
      }else if(offset < -offsetTrigger){
        overDraggable.parentNode.insertBefore(draggable, overDraggable.nextSibling);
      }
    }
    let headers = overDraggable.parentNode.querySelectorAll(".header");
    setHRNode(headers);
  });
}

function setHRNode(headers, draggingLeft=false){
  headers.forEach(header=>{
    let previousSibling = header.previousSibling;
    if(previousSibling==null || (draggingLeft && previousSibling.classList.contains("dragging") ))
      header.querySelector("hr").style.display = "none";
    else
      header.querySelector("hr").style.display = "block";
  });
}

function addContextmenuEvent(draggable, isDraggableX){

  var parentNode = null;
  $(draggable).on('contextmenu', function(event) {
    if(!isDraggableX){
      parentNode = draggable.parentNode.parentNode;
      $(parentNode).on("hide.bs.dropdown", function (e) {
        //e.stopPropagation();
        e.preventDefault();
      });
    }else if(this.querySelector("a").classList.contains("show"))
        return;

    event.preventDefault();
    if(activePopover != null){
      clearTimeout(timeoutId);
      inputs.forEach(input=>{
        $(input).off("input");
      })    
      $(activePopover).popover('dispose');
    }
  
    if (!$(draggable).data("bs.popover") || !$(draggable).attr('data-popoverAttached')) {
        $(draggable).popover('dispose').popover({
            placement:'right',
            trigger:'manual',
            html:true,
            content:createContextmenu()
        });
        $(draggable).attr('data-popoverAttached', true);
    }
    $(draggable).popover('show');
    activePopover = draggable;
    const popoverBody = document.querySelector(".popover-body");
    console.log(popoverBody);
    popoverBody.classList.add("dropdown-menu-dark");
    inputs = popoverBody.querySelectorAll("input");
  
    const nameNode = activePopover.querySelectorAll("span");
    inputs[0].value = nameNode[0].innerText;
    $(inputs[0]).on("input",function(){
      //console.log(activePopover);
      nameNode[0].innerText = inputs[0].value;
      nameNode[1].innerText = inputs[0].value;

    });
  
    const iconNode = activePopover.querySelectorAll("i");
    inputs[1].value = iconNode[0].classList;
    $(inputs[1]).on("input",function(){
      iconNode[0].classList = inputs[1].value;
      iconNode[1].classList = inputs[1].value;
    });

    const linkNode = activePopover.querySelector("a");
    linkInputIndex = inputs.length-1;
    inputs[linkInputIndex].value = linkNode.href;
    $(inputs[linkInputIndex]).on("input",function(){
      linkNode.href = inputs[linkInputIndex].value;
    });
    

    let checkboxNode = popoverBody.querySelector("input[type=checkbox]");
    let aToggle = draggable.querySelector("a");
    if((!isDraggableX && !draggable.classList.contains("header")) || !aToggle.classList.contains("dropdown-toggle"))
      checkboxNode.checked = true;
    else
      inputs[linkInputIndex].classList.add("disable-link");

    checkboxNode.addEventListener('change',()=>{
      if(checkboxNode.checked){
        if(!isDraggableX){
          draggable.querySelector("hr").style.display = "none";
          draggable.querySelector("h6").style.display = "none";
          draggable.classList.remove("header");
          linkNode.style.display = "block";
        }else{
          aToggle.setAttribute("data-bs-toggle","false");
          aToggle.classList.remove("dropdown-toggle");
        }
        inputs[linkInputIndex].classList.remove("disable-link");
      }
      else{
        if(!isDraggableX){
          if(draggable.previousSibling != null)
            draggable.querySelector("hr").style.display = "block";
          draggable.querySelector("h6").style.display = "block";
          draggable.classList.add("header");
          linkNode.style.display = "none";
        }
        else{
          aToggle.setAttribute("data-bs-toggle","dropdown");
          aToggle.classList.add("dropdown-toggle");
        }
        inputs[linkInputIndex].classList.add("disable-link");
      }
    });
  
    popoverBody.addEventListener('mouseleave',()=>{
      timeoutId = setTimeout(function(){
        $(activePopover).popover('hide');
      }, 600);
    });
    popoverBody.addEventListener('mouseenter',()=>{
      clearTimeout(timeoutId);
    });
    popoverBody.querySelector("#closeBtn").addEventListener('click',()=>{
      clearTimeout(timeoutId);
      $(activePopover).popover('hide');
    });

    popoverBody.querySelector("#deleteBtn").addEventListener("dblclick",()=>{
      if(isDraggableX && draggable.querySelectorAll(".draggableY").length != 0)
        return;
      draggable.remove();
      $(activePopover).popover('hide');
    });
  
    if(!isDraggableX){
      $(activePopover).on("hidden.bs.popover", ()=>{
        $(parentNode).off("hide.bs.dropdown");
      });
    }
  
  });

}

function addSettingsMenu(){
      a.classList.add('dropdown-toggle');
      a.setAttribute("role", "button");
      a.setAttribute("data-bs-auto-close", "outside");
      a.setAttribute("data-bs-toggle", "dropdown");
}

/*function addContainerSettings(nameVal,id){
    let li = document.createElement("li");
    li.classList.add("containerSettings");
  
    let form = document.createElement("form");
    //form.classList.add("dropdown-item");
    form.classList.add("flex-column");
    form.appendChild(createInput("text","name",nameVal, "Name"));
    form.appendChild(createInput("text","icon","", "Icon"));
    form.appendChild(createInput("url","href","", "HREF"));
    form.appendChild(createInput("checkbox","dropdown","", "Dropdown", id));
  
    li.appendChild(form);
    return li;
  }*/
  
  
  var tmp = 0;
  draggablesX.forEach(draggable => {
    let name = draggable.innerText;
    //let containerSettings = addContainerSettings(name,tmp++);
    let ul = draggable.querySelector("ul");
    if(ul != null){
      //ul.prepend(containerSettings);
      let liSettings = createNewItem("Create Item", null, "fa-solid fa-plus", false, null, false, false, ["newSection"]);
      liSettings.addEventListener("click",function(e){
        e.preventDefault();
        let newItemNode = createNewItem("New Item", null,"");
        addDragstartEvent(newItemNode, 0);
        addDragoverYEvent(newItemNode);
        addDragendEvent(newItemNode, 0);
        addContextmenuEvent(newItemNode, 0);
        ul.insertBefore(newItemNode, liSettings);
      });
      ul.appendChild(liSettings);
    }
    //console.log(ul);
    let input = draggable.querySelector("input");
    
    if(input != null)
      draggable.addEventListener("input",function(){
        console.log(draggable.querySelector("a"));
        draggable.querySelector("a span").innerText = input.value;
      });


      draggable.addEventListener("contextmenu",e => {
        e.preventDefault();
       // addSettingsMenu(draggable);
      })
  });

  

  function createNewContainerBtn(){
    let btn = createNewContainer(null,"Create Container", "fa-solid fa-plus", "", false);
    btn.setAttribute("draggable","false");
    btn.id = "newContainerBtn";
    btn.classList.add("newSection");

    navbarContainer = document.querySelector("#nabarContainer");
    btn.addEventListener("click",(e)=>{
      e.preventDefault();
      newC = createNewContainer(null,"New Container", "", "", true);
      
      let liSettings = createNewItem("Create Item", null, "fa-solid fa-plus", false, null,false, false, ["newSection"]);
      liSettings.addEventListener("click",function(e){
        e.preventDefault();
        let newItemNode = createNewItem("New Item", null,"");
        addDragstartEvent(newItemNode, 0);
        addDragoverYEvent(newItemNode);
        addDragendEvent(newItemNode, 0);
        addContextmenuEvent(newItemNode, 0);
        newC.querySelector("ul").insertBefore(newItemNode, liSettings);
      });
      newC.querySelector("ul").appendChild(liSettings);
      navbarContainer.insertBefore(newC, btn);
      addEventsToContainer(newC);
      draggablesX = document.querySelectorAll(".draggableX");
    });
    navbarContainer.appendChild(btn);
  }
  createNewContainerBtn();

  function addEventsToContainer(container){
    addContainerClickEvent(container);
    addDragstartEvent(container, 1);
    addDragenterEvent(container);
    addDragoverXEvent(container);
    addDragleaveEvent(container);
    addDragendEvent(container, 1);
    addContextmenuEvent(container, 1);
  }


function createInput(type, name, value = "", label = "", id = ""){
    let spanNode = document.createElement("span");
    spanNode.classList.add("d-flex");
    spanNode.classList.add("justify-content-between");
    spanNode.classList.add("align-items-center");
    
    let inputNode = document.createElement("input");
    inputNode.setAttribute("type", type);
    inputNode.setAttribute("name", name);
    inputNode.value = value;
    
    if(label.length !=0){
      let labelId = name+id;
      inputNode.setAttribute("id", labelId);
      let labelNode = document.createElement("label");
      labelNode.setAttribute("for", labelId);
      labelNode.innerText = label;
      spanNode.appendChild(labelNode);
    }
    spanNode.appendChild(inputNode);
    return spanNode;
  }

function addContainerClickEvent(draggableX){  
  const draggableBtn = draggableX.querySelector("a");
  draggableBtn.addEventListener("click", function(){
    $(activePopover).popover('hide');
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
}
// SAVE TO DATABASE ON CLICK
document.querySelector("#saveBtn").addEventListener("click",(e) => {
  e.preventDefault();
  var containers = [];
  var containerOrder = 0;
  document.querySelectorAll(".draggableX:not(.newSection)").forEach(containerNode =>{
    let idContainer = containerNode.id.substring(1);
    if(idContainer=="null") idContainer=null;
    itemsNode = containerNode.querySelectorAll(".draggableY");
    var items = [];
    let itemOrder = 0;
    itemsNode.forEach(itemNode=>{
      let idItem = itemNode.id.substring(1);
      if(idItem=="null") idItem=null;
      let item={
        "idItem":idItem,
        "idContainer":idContainer,
        "name":itemNode.querySelector("span").innerText,
        "icon":itemNode.querySelector("i").classList.toString(),
        "header":(itemNode.classList.contains("header"))?"1":"0",
        "link":itemNode.querySelector("a").href,
        "itemOrder":itemOrder
      };
      if(item["link"].length==0) item["link"]=null;
      if(item["icon"].length==0) item["icon"]=null;
      items.push(item);
      ++itemOrder;
    });
    console.log("IMPORTANT:\n");
    console.log(containerNode.querySelector("a").classList.contains("dropdown-toggle"));
    let container = {
      "idContainer":idContainer,
      "name":containerNode.querySelector("span").innerText,
      "icon":containerNode.querySelector("i").classList.toString(),
      "dropdown":(containerNode.querySelector("a").classList.contains("dropdown-toggle")) ? "1" : "0",
      "link":containerNode.querySelector("a").href,
      "containerOrder":containerOrder,
      "items":items 
    };

    containers.push(container);
    ++containerOrder;
  });

  let newData = prepareData(containersData,containers);
  console.log(newData);
  $.ajax({
    url: "index-files/setData.php",
    type: "POST",
    //dataType: "json",
    data: { data: JSON.stringify(newData) },
    success: function(response,status, xhr ) {
      console.log("Success:\n");
      console.log(response);

    },
    error: function( xhr, status, error ) {
      console.log("Error:\n");
      console.log(error);
    }
  });

  /*
  containers.forEach(c=>{
    //console.log(c["idContainer"]);
    containersData.forEach(oc=>{
      if(c["idContainer"] == oc["idContainer"])
        console.log(oc["name"]+" => " + c["name"]);
    });
  });
*/
});

function prepareData(oldData,newData){
  var oldContainers=[];
  var newContainers=[];
  var oldItems=[];
  var newItems=[];
  oldData.forEach(data=>{
    data["items"].forEach(item=>{
      oldItems.push(item);
    });
    oldContainers.push(extractContainer(data));
  });
  //console.log(oldContainers);
  //console.log(oldItems);

  newData.forEach(data=>{
    data["items"].forEach(item=>{
      newItems.push(item);
    });
    newContainers.push(extractContainer(data));
  });
  //console.log(newContainers);
  //console.log(newItems);

/* CONTAINERS */
  var containersToInsert=[];
  var containersToUpdate=[];
  newContainers.forEach(newContainer=>{
    if(newContainer["idContainer"]==null){
    console.log(newContainer["idContainer"]);
      containersToInsert.push(newContainer);
    }
    else{
      oldContainers.every(oldContainer=>{
        if(newContainer["idContainer"]==oldContainer["idContainer"]){
          if(!equalContainers(newContainer,oldContainer))
            containersToUpdate.push(newContainer);
          return false;
        } return true;
      });
    }
  });
  var containersToDelete=[];
  oldContainers.forEach(oldContainer=>{
    let isExist=false;
    newContainers.every(newContainer=>{
      if(oldContainer["idContainer"]==newContainer["idContainer"]){
        isExist=true;
        return false;
      }
        return true;
    });
    if(!isExist)
      containersToDelete.push(oldContainer["idContainer"]);
  });
/* ITEMS */
  var itemsToInsert=[];
  var itemsToUpdate=[];
  newItems.forEach(newItem=>{
    if(newItem["idItem"]==null){
      itemsToInsert.push(newItem);
    }
    else{
      oldItems.every(oldItem=>{
        if(newItem["idItem"]==oldItem["idItem"]){
          if(!equalItems(newItem,oldItem))
          itemsToUpdate.push(newItem);
          return false;
        } return true;
      });
    }
  });
  var itemsToDelete=[];
  oldItems.forEach(oldItem=>{
    let isExist=false;
    newItems.every(newItem=>{
      if(oldItem["idItem"]==newItem["idItem"]){
        isExist=true;
        return false;
      }
        return true;
    });
    if(!isExist)
    itemsToDelete.push(oldItem["idItem"]);
  });
  return {
    insert: {containers: containersToInsert, items: itemsToInsert},
    update: {containers: containersToUpdate, items: itemsToUpdate},
    delete: {containers: containersToDelete, items: itemsToDelete}
  };

}

function extractContainer(data){
  return {
    idContainer:data["idContainer"],
    name:data["name"],
    icon:data["icon"],
    dropdown:data["dropdown"],
    link:data["link"],
    containerOrder:data["containerOrder"]
  };
}

function equalItems(item1,item2){
  if(item1["name"] != item2["name"]) return false;
  if(item1["icon"] != item2["icon"]) return false;
  if(item1["header"] != item2["header"]) return false;
  if(item1["link"] != item2["link"]) return false;
  if(item1["itemOrder"] != item2["itemOrder"]) return false;
  return true;
}
function equalContainers(container1,container2){
  if(container1["name"] != container2["name"]) return false;
  if(container1["icon"] != container2["icon"]) return false;
  if(container1["dropdown"] != container2["dropdown"]) return false;
  if(container1["link"] != container2["link"]) return false;
  if(container1["containerOrder"] != container2["containerOrder"]) return false;
  return true;
}

  console.log("settingsFunctions.js have been loaded.");

  addScript("index-files/dragLogic.js");

  /*
function containersToDelete(oldContainers, newContainers){
  oldContainers.forEach(oldC=>{
    let isContainerDeleted = true;
    newContainers.every(newC=>{
      if(oldC["idContainer"] == newC["idContainer"]){
        oldC["items"].forEach(oldItem=>{
            let isItemDeleted = true;
            newC["items"].every(newItem=>{
              if(oldItem["idItem"] == newItem["idItem"]){
                if(!compareItems(newItemData,oldItemData))
                  itemsToUpdate.push(newItemData);
                isItemDeleted = false;
                return false;
              }
              return true;
            });
            if(isItemDeleted){
              itemsToDelete.push(oldItemData["idItem"]);
            }
          
        });
        if(!compareContainers(newContainerData,oldContainerData)){
          let tmpContainer = newContainerData;
          delete tmpContainer['items'];
          containersToUpdate.push(tmpContainer);
        }
        isContainerDeleted = false;
        return false;
      }
      return true;
    });
    if(isContainerDeleted){
      containersToDelete.push(oldContainerData["idContainer"]);
    }
  });
}*/

  /*    
    if(newContainerData["idContainer"]==null){
        let tmpContainer = newContainerData;
        delete tmpContainer['items'];
        containersToInsert.push(tmpContainer);
        return false;
        
        
        if(newItemData["idItem"]==null){
              itemsToInsert.push(newItemData);
              return false;
            }
        
        */

            //function prepareData(){

  
              /*
              console.log(containersData);
              console.log(newContainersData);
              var containersToDelete=[];
              var itemsToDelete=[];
            
              var containersToInsert=[];
              var itemsToInsert=[];
            
              var containersToUpdate=[];
              var itemsToUpdate=[];
            
              containersData.forEach(oldContainerData=>{
                let isContainerDeleted = true;
                newContainersData.every(newContainerData=>{
                  if(oldContainerData["idContainer"] == newContainerData["idContainer"]){
                    oldContainerData["items"].forEach(oldItemData=>{
                      let isItemDeleted = true;
                      newContainerData["items"].every(newItemData=>{
                        if(oldItemData["idItem"] == newItemData["idItem"]){
                          if(!equalItems(oldItemData,newItemData)){
                            console.log("not same",oldItemData,newItemData);
                            itemsToUpdate.push(newItemData);
                          }
                          isItemDeleted = false;
                          return false;
                        }
                        return true;
                      });
                      if(isItemDeleted){
                        itemsToDelete.push(oldItemData["idItem"]);
                      }
                    });
                    if(!equalContainers(oldContainerData,newContainerData)){
                      console.log("not same",oldContainerData["idContainer"],newContainerData["idContainer"]);
                      let tmpContainer = newContainerData;
                      delete tmpContainer['items'];
                      console.log(tmpContainer);
                      containersToUpdate.push(tmpContainer);
                    }
                    isContainerDeleted = false;
                    return false;
                  }
                  return true;
                });
                if(isContainerDeleted){
                  containersToDelete.push(oldContainerData["idContainer"]);
                }
              });
            
            
            
            
            
              console.log("____________");
              console.log("containersToDelete", containersToDelete.length);
              console.log(containersToDelete);
              console.log("itemsToDelete",itemsToDelete.length);
              console.log(itemsToDelete);
            
              console.log("containersToInsert",containersToInsert.length);
              console.log(containersToInsert);
              console.log("itemsToInsert",itemsToInsert.length);
              console.log(itemsToInsert);
            
              console.log("containersToUpdate",containersToUpdate.length);
              console.log(containersToUpdate);
              console.log("itemsToUpdate",itemsToUpdate.length);
              console.log(itemsToUpdate);
              */
         //   }