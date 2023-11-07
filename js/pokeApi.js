// Obtém dados de 5 Pokémon
fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    .then((response) => response.json())
    .then(async (data) => {
        const arrayDePokemon = [];
        for (const pokemon of data.results) {
            const response = await fetch(pokemon.url);
            const pokemonData = await response.json();

            // Crie um objeto com as informações desejadas do Pokémon
            const pokemonObject = {
                name: pokemonData.name,
                id: pokemonData.id,
                types: pokemonData.types.map((type) => type.type.name),
                abilities: pokemonData.abilities.map((ability) => ability.ability.name),
                img: "./img/pokemons/"+pokemonData.name+".gif", // Use uma URL de imagem apropriada
                height: pokemonData.height,
                weight: pokemonData.weight
            };

            arrayDePokemon.push(pokemonObject);
        }

        // 'arrayDePokemon' agora contém objetos de Pokémon

        // MODO CARDS
        $('#cartoes').on('click', function () {
            $('main').empty(); // Limpa o conteúdo anterior

            arrayDePokemon.forEach(pokemon => {
                $('main').append(`
                    <div class="card cartao-pokemon" style="width: 35%;">
                        <img src="${pokemon.img}" class="img-pokemon" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${pokemon.name}</h5>
                            <p class="card-text ${pokemon.types.join(', ')}">${pokemon.types.join(', ')}</p>
                        
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">ID: ${pokemon.id}</li>
                            <li class="list-group-item">Altura: ${pokemon.height}</li>
                            <li class="list-group-item">Peso: ${pokemon.weight}</li>
                        </ul>
                        </div>
                    </div>
                `);
            });
        });

        // MODO POKEDEX
        $('#pokedex').on('click', function () {
            alert("poke");
        });
    })
    .catch((error) => {
        console.error("Erro ao buscar dados da API:", error);
    });


    
