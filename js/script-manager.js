// uplaod another/new picture for the character
let image ="";
function imageUploaded(){
    let file= document.querySelector("input[type=file]")[`files`][0];
    let reader = new FileReader();
    
    reader.onload = function(){
        image = reader.result.replace("data:", "").replace(/^.+,/,"");
         document.getElementById("importid").src =  `data:image/jpeg;base64,${image}`;
    }
    reader.readAsDataURL(file);
}


(async() => {
    let queryString = location.search.substring(1)

    const response = await fetch(`https://character-database.becode.xyz/characters`);
    const character = await response.json()
    let find = character.find(el => el.id === queryString)

    //**************POST + DELETE **********************************/
    if (typeof find === "undefined") {
        console.log("f")
        document.getElementById("update").addEventListener("click", async () => {
            
            let name = document.getElementById("manager__name").value
            let shortDescription = document.getElementById("manager__preface").value
            let description = document.getElementById("manager__text").value
        
            if(confirm(`Do you want to save this character?`)){
                await fetch(`https://character-database.becode.xyz/characters/${queryString}`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json", },
                    body: JSON.stringify({
                        name,
                        description,
                        shortDescription,                   
                        image : `${image}`
                        })  
                    }) 
                alert(`Your character is added to the DB`);
                window.location.href ="/character-manager-js/index.html"
            }
            else{
                alert(`This character isn't add to the DB`)
            }
        }); 
    }

    //************************PUT + DELETE *************************************/





if (queryString === find.id){
        let img = document.querySelector("img");
     img.src = `data:image/png;base64, ${find.image}`;
        img.alt = `picture of ${find.name}`;

        document.getElementById("manager__name").value = find.name;
        document.getElementById("manager__preface").value = find.shortDescription;
        document.getElementById("manager__text").value = find.description;
        
        document.getElementById("update").addEventListener("click", async () => {
            let name = document.getElementById("manager__name").value
            let shortDescription = document.getElementById("manager__preface").value
            let description = document.getElementById("manager__text").value
            if (image.length ===  0){
        await fetch(`https://character-database.becode.xyz/characters/${queryString}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json", },
                body: JSON.stringify({
                    name,
                    description,
                    shortDescription,                   
                    image : `${find.image}`
                 })
                 
             });
            } 
        else {
                await fetch(`https://character-database.becode.xyz/characters/${queryString}`, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json", },
                    body: JSON.stringify({
                        name,
                        description,
                        shortDescription,                   
                        image
                     })
                     
                 }) 
            }
        
            })
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

    

        }







 


})();
