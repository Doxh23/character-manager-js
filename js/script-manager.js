(async() => {
let queryString = location.search.substring(1)
let name = document.getElementById("manager__name").value
let preface = document.getElementById("manager__preface").value
let text = document.getElementById("manager__text").value
let id = null

const response = await fetch(`https://character-database.becode.xyz/characters`);
const character = await response.json();

console.log(queryString)
character.forEach(obj => {
    if (queryString === obj.id){
       let img = document.querySelector("img");
        img.src = `data:image/png;base64, ${obj.image}`;
        img.alt = `picture of ${obj.name}`;
        document.getElementById("manager__name").value = obj.name;
        document.getElementById("manager__preface").value = obj.shortDescription;
        document.getElementById("manager__text").value = obj.description;
        await fetch(`https://character-database.becode.xyz/characters/${queryString}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json", 
            body: JSON.stringify({
                description:`${text}`,
                shortDescription:`${preface}`,
                ìd:`${id}`,
                name:`${name}`,
                image:`$`

            })
            },
        });


    }

});



























})();