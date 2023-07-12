const linksLoadedEvent = new Event("linksLoaded");
//console.log("Loading...");
var containersData;
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (xmlhttp.readyState == XMLHttpRequest.DONE) {
    if (xmlhttp.status == 200) {
      containersData = JSON.parse(xmlhttp.responseText);
      const nabarContainer = document.querySelector("#nabarContainer");
      //console.log(xmlhttp.responseText);
      containersData.forEach(container=>{
        let containerNode = createNewContainer(
          container["idContainer"],
          container["name"],
          container["icon"],
          container["link"],
          container["dropdown"]
        );
        containerNode.setAttribute("draggable","false");
        isFirst = true; 
        container["items"].forEach(item=>{
          itemNode = createNewItem(
            item["name"],
            item["link"],
            item["icon"],
            item["header"],
            item["idItem"],
            true,
            isFirst
          );
          itemNode.setAttribute("draggable","false");
          containerNode.querySelector("ul").appendChild(itemNode);
          if(isFirst) isFirst=false;
        });
        nabarContainer.appendChild(containerNode);
      });
      nabarContainer.classList.remove("hidden");
      //console.log(containersData);
      //console.log("Content loaded succesfully!");
      //document.dispatchEvent(linksLoadedEvent);
      var settingsLoaded = false;
      document.querySelector("#settingsBtn").addEventListener("click",(e)=>{
        if(!settingsLoaded){
          e.preventDefault();
          console.log("Settings enabled.");
          console.log("Containers data:");
          console.log(containersData);
          console.log("");
          addScript("index-files/settingsFunctions.js");
          settingsLoaded = true;
        }
      });
      
    }
    else if (xmlhttp.status == 400)
      console.log('There was an error 400');
    else 
      console.log('something else other than 200 was returned: '+xmlhttp.status);
  }
};
xmlhttp.open("GET", "index-files/getData.php", true);
xmlhttp.send();

function createNewContainer(idContainer, name, icon, link, isDropdown = true){
  let li = document.createElement('li');
  li.id = "c"+idContainer;
  li.classList.add('nav-item');
  li.classList.add('dropdown');
  li.classList.add('mx-1');
  li.classList.add('draggableX');
  li.setAttribute("draggable", "true");
    
  let a = document.createElement('a');
  a.setAttribute("target", "_BLANK");
  a.setAttribute("href", link);
  a.setAttribute("data-bs-auto-close", "outside");
  a.classList.add('nav-link');
  a.classList.add('showPopover');
  
  let i = document.createElement("i");
  i.classList = icon;
  a.appendChild(i);
  let span = document.createElement("span");
  span.classList.add("mx-1")
  span.appendChild(document.createTextNode(name));
  a.appendChild(span);
  
  let ul = document.createElement('ul');
    
  ul.classList.add("dropdown-menu");
  ul.classList.add("dropdown-menu-dark");
  ul.classList.add("dragContainerY");

  if(isDropdown == 1){
    a.setAttribute("data-bs-toggle", "dropdown");
    a.classList.add('dropdown-toggle');
  }
  else{
    a.setAttribute("data-bs-toggle", "false");
  }
  li.appendChild(a);
  li.appendChild(ul);
  return li;
}
  
function createNewItem(title, href=null, icon = "", isHeader = false, idItem=null, isDraggable = true, first=false, customClasses=null){
  let li = document.createElement('li');
  li.id = "i"+idItem;
  if(customClasses!=null){
    customClasses.forEach(c => {
      li.classList.add(c);
    });
  } 

  if(isDraggable){
    li.classList.add("draggableY");
    li.setAttribute("draggable", "true");
  }

    let hr = document.createElement("hr");
    hr.classList = "dropdown-divider";
  if(first)
    hr.style.display = "none";
  
 

  li.appendChild(hr);
  let h6 = document.createElement('h6');
  h6.classList.add('dropdown-header');
  let i = document.createElement('i');
  if(icon != null){
    icon = icon.trim();
    i.classList = icon;
  }
  h6.appendChild(i);
  let span = document.createElement("span");
  span.classList = "mx-1";
  span.appendChild(document.createTextNode(title));
  h6.appendChild(span);
  
  li.appendChild(h6);
    //return li;
  
  
  let a = document.createElement('a');
  a.classList.add('dropdown-item');
  a.setAttribute("target", "_BLANK");
  if(href != null){
    a.setAttribute("href", href);
  }
  
  let iA = document.createElement('i');
  if(icon != null){
    icon = icon.trim();
    iA.classList = icon;
  }
  a.appendChild(iA);
  let spanA = document.createElement("span");
  spanA.classList = "mx-1";
  spanA.appendChild(document.createTextNode(title));
  a.appendChild(spanA);
  
  li.appendChild(a);
  if(isHeader != 1){
    h6.style.display = "none";
    hr.style.display = "none";
  }
  else{
    a.style.display = "none";
    li.classList.add("header");
  }
  return li;
}



function addScript(src) {
  var s = document.createElement( 'script' );
  s.setAttribute( 'src', src );
  document.body.appendChild( s );
}
/*
document.addEventListener("linksLoaded",()=>{
  console.log("Loading scripts ...");
  addScript("index_files/settingsFunctions.js");
  addScript("index_files/dragLogic.js");
  console.log("Scripts loaded!");
});*/