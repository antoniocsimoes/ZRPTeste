
const searchPokemon = () => {

    let stringSearch = document.querySelector('#name').value;
    let uri = `https://pokeapi.co/api/v2/pokemon/${stringSearch}`
    
    let pokemonCard = document.querySelector('.card');
    let pokemonCardName = document.querySelector('.card-title');
    let pokemonCardImg = document.querySelector('.card-img-top');
    let pokemonAbilitiesLi = document.querySelector('.li');
    let pokemonError = document.querySelector('.msgErro');
    let btnSeach = document.querySelector('#search');
    let btnNewSeach = document.querySelector('#newSearch')

    fetch(uri)
        .then( response => { 
            if(response.status === 200 ) {
                response.json()            
                .then( pokemon => {    
                    btnSeach.setAttribute("disabled", "disabled")
                    btnNewSeach.style.display = 'block';
                    pokemonCard.style.display = 'block';     

                    pokemonCardName.innerHTML = pokemon.name.toUpperCase();
                    let pokemonImgUri = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`
                    pokemonCardImg.setAttribute('src', pokemonImgUri);                    
                    if(pokemon.abilities.length){
                        const pokemonAbilities = pokemon.abilities.map( el => el.ability.name);
                        const pokemonAbilitiesSort = pokemonAbilities.sort( (x, y) => (x < y ? -1 : true));
                        let li = "";
                        pokemonAbilitiesSort.forEach( el => {                            
                            li += `<li>${el}</li>`;
                        });
                        let ul = `<ul style="list-style: none;">${li}</ul>`
                        pokemonAbilitiesLi.innerHTML = ul;
                    }    
                });                      
            } else {                
                pokemonError.style.display = 'block';
                btnSeach.setAttribute("disabled", "disabled")
                btnNewSeach.style.display = 'block';
            }         
        })
        .catch( error => {
            console.log(error.message)
        })
    
}


const newSearchPokemon = () => {
    let btnSeach = document.querySelector('#search');
    let btnNewSeach = document.querySelector('#newSearch')
    let pokemonError = document.querySelector('.msgErro');
    let pokemonCard = document.querySelector('.card');
    let input = document.querySelector('#name')

    btnSeach.removeAttribute("disabled", "disabled")
    btnNewSeach.style.display = 'none';
    pokemonCard.style.display = 'none';
    pokemonError.style.display = 'none';
    input.value = "";



}