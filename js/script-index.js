(async() => {

// Fetch API :
let heroes = await fetch(`https://character-database.becode.xyz/characters`)
datas= await heroes.json()  

//document.getElementById("search-bar").addEventListener("keyup", function(e){
//const  searchstring = e.target.value
//let filteredCharacter = datas.filter(data => {
 //   return data.name.includes(searchstring)
//}).name
//console.log(filteredCharacter)
//})

// Clone, use and fill of the template and 
datas.forEach(obj => {
    let temp= document.getElementsByTagName("template")[0];
    let target= document.getElementById("target");
    let clone = temp.content.cloneNode(true);

    clone.querySelector("img").src= `data:image/png;base64,${obj.image}`;
    clone.querySelector("p").innerHTML= obj.shortDescription;
    clone.querySelector("h3").innerHTML= obj.name;
    clone.querySelector("a").href = `/character-manager-js/pages/single-character.html?${obj.id}`;

    target.appendChild(clone)
});

// Switch to the Single Character page    
document.getElementById("index-new-btn").addEventListener("click",function(){
window.location.href="/character-manager-js/pages/manager-character.html"
});

})();













