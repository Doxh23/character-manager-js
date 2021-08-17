(async () => {
     //fetch the API
document.addEventListener("DOMContentLoaded",async function(){
    const response = await fetch(`https://character-database.becode.xyz/characters`);
    const character = await response.json();

/***********************************************got the ID from the URL******************************* */
let queryString = location.search.substring(1)
console.log(queryString)

console.log(queryString)
//*********************************************display information from the character************************************ */
 character.forEach(obj => {
     if (queryString === obj.id){
        let img = document.querySelector("img");
         img.src = `data:image/png;base64, ${obj.image}`;
         document.getElementById("single__name").innerHTML = obj.name;
         document.getElementById("single__preface").innerHTML = obj.shortDescription;
         document.getElementById("single__text").innerHTML = obj.description;
     }

 });
//*******************************************************delete button********************************************** */
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
//******************************************************************update button**************************************************** */
document.getElementById("update").addEventListener("click", () => {
    
window.location.href = `/character-manager-js/pages/manager-character.html?${queryString}`;
}); // à vérifier lors que le JS du manager page est réalisé


//btn delete js


})
//btn update js
 


})();


    