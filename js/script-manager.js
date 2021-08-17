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
    ////////*************************************if we don't have an id for the character************************ */
    if (typeof find === "undefined") {
        console.log("f")
        document.getElementById("update").addEventListener("click", async () => {
            
            let name = document.getElementById("manager__name").value
            let shortDescription = document.getElementById("manager__preface").value
            let description = document.getElementById("manager__text").children[0].innerHTML
        
            if(confirm(`Do you want to add this character?`)){
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
    //**************************if we got an id for the character */
    if (queryString === find.id){
        let img = document.querySelector("img");
        img.src = `data:image/png;base64, ${find.image}`;
        document.getElementById("manager__name").value = find.name;
        document.getElementById("manager__preface").value = find.shortDescription;
        document.querySelector("#manager__text").children[0].innerHTML = find.description;
        // console.log(document.querySelector("p").value)
        
        document.getElementById("update").addEventListener("click", async () => {
            let name = document.getElementById("manager__name").value
            let shortDescription = document.getElementById("manager__preface").value
            let description = document.getElementById("manager__text").children[0].innerHTML
 //******************************************if we don't have a image******************************************************************* */
            if (image.length ===  0){
                if(confirm(`Do you want to change this character ?`)){
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
                    alert("Your character has been modified in the DB")
                    window.location.href ="/character-manager-js/index.html"
                }  
                else{
                    alert("your character hasn't been modify!")
                }
            }
//***********************************************************if we have an image********************************************************************* */
            else {
                if(confirm(`Do you want to change this character ?`)){
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
                    alert("Your character has been modified in the DB")
                    window.location.href ="/character-manager-js/index.html"
                }
                else {
                    alert("your character hasn't been modify!")
                }
            }      
        })
    }
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
    // Count of charcater for the Name 
    document.getElementById("manager__name").addEventListener("input", () => {
        const a = document.getElementById("manager__name").value;
        console.log(a);

        let b = a.length;
        console.log(b);
    
        const c = document.getElementById("counter__name").innerText = `${b}  on max 20 char.`;

    });
    // Count of charcater for the Preface 
    document.getElementById("manager__preface").addEventListener("input", () => {
        const a = document.getElementById("manager__preface").value;
        console.log(a);

        let b = a.length;
        console.log(b);
    
        const c = document.getElementById("counter__preface").innerText = `${b} + on max 70 char.`;

    });
    // Count of charcater for the Text
    document.getElementById("manager__text").addEventListener("input", () => {
        const a = document.querySelector("p").childNodes[0];
        console.log(a);

        let b = a.length;
        console.log(b);
    
        document.getElementById("counter__text").innerText = `${b}  on max 350 char.`;

    });
 


})();
