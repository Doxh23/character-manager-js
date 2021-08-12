(async () => {
    const response = await fetch('https://character-database.becode.xyz/characters');
    const character = await response.json();
    console.log(character);
    
})();