(async () => {
    //fetch the API
    const response = await fetch(`https://character-database.becode.xyz/characters?id`);
    const character = await response.json();
    console.log(character);

    //show the key in the different tag
    let img = document.querySelector("img");
    img.src = `data:image/png;base64, ${character[0].image}`;
    img.alt = `picture of ${character[0].name}`;
    document.getElementById("single__name").innerHTML = character[0].name;
    document.getElementById("single__preface").innerHTML = character[0].shortDescription;
    document.getElementById("single__text").innerHTML = character[0].description;

    //btn update js
    document.getElementById("update").addEventListener("click", () => {
        let a = document.querySelector("a");
        a.href = `pages/manager-character.html#${character[0].id}`;
        console.log(a.href);
    }); // à vérifier lors que le JS du manager page est réalisé

    //btn delete js
    document.getElementById("delete").addEventListener("click", async () => {

            if(confirm(`Do you want to delete it ?`)){
                let fetch = fetch(`https://character-database.becode.xyz/characters/${character.id}`, {
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/json",
                    },
                }); 
                console.log(fetch);
            }else{
                alert(`This character isn't delete of your API`);
            }
    });
})();