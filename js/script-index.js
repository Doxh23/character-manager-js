



(async() => {

   

// console(data.find(names => names.name === "mike"))
let heroes = await fetch(`https://character-database.becode.xyz/characters`)
datas= await heroes.json()  
//document.getElementById("search-bar").addEventListener("keyup", function(e){
//const  searchstring = e.target.value
//let filteredCharacter = datas.filter(data => {
 //   return data.name.includes(searchstring)
//}).name
//console.log(filteredCharacter)



   



//})

datas.forEach(obj => {
    let temp= document.getElementsByTagName("template")[0];
    let target= document.getElementById("target")
    let clon = temp.content.cloneNode(true)
    clon.querySelector("img").src= `data:image/png;base64,${obj.image}`
    clon.querySelector("p").innerHTML= obj.shortDescription
    clon.querySelector("h3").innerHTML= obj.name
    clon.querySelector("a").href = `/character-manager-js/pages/single-character.html#${obj.id}`
    target.appendChild(clon)

})



    
document.getElementById("index-new-btn").addEventListener("click",function(){
window.location.href="/character-manager-js/pages/manager-character.html"
})

})();













