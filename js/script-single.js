(async () => {
     //fetch the API
document.addEventListener("DOMContentLoaded",async function(){
    const response = await fetch(`https://character-database.becode.xyz/characters`);
    const character = await response.json();


let queryString = location.search.substring(1)
console.log(queryString)

console.log(queryString)
 character.forEach(obj => {
     if (queryString === obj.id){
        let img = document.querySelector("img");
         img.src = `data:image/png;base64, ${obj.image}`;
         img.alt = `picture of ${obj.name}`;
         document.getElementById("single__name").innerHTML = obj.name;
         document.getElementById("single__preface").innerHTML = obj.shortDescription;
         document.getElementById("single__text").innerHTML = obj.description;
     }

 });

 document.getElementById("delete").addEventListener("click", async () => {

    if(confirm(`Do you want to delete it ?`)){
         await fetch(`https://character-database.becode.xyz/characters/${queryString}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
        }); 
        alert("votre personnage a bien été supprimé")
        window.location.href ="/character-manager-js/index.html"
    }else{
        alert(`This character isn't delete of your API`);
    }
}); 

document.getElementById("update").addEventListener("click", () => {
    let a = document.querySelectorAll("a")[1];
    a.href = `/character-manager-js/pages/manager-character.html?${queryString}`;
    console.log(a.href);
}); // à vérifier lors que le JS du manager page est réalisé


//btn delete js


})
//btn update js
 


})();


    