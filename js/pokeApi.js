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
                    <div class="card cartao-pokemon bg-info-subtle border border-warning">
                            <div class="div_imagem">
                                <img src="${pokemon.img}" class="img-pokemon" alt="...">
                            </div>
                            <div class="card-body bg-white rounded-top" style="width: 90%">
                                <h5 class="card-title text-primary">${pokemon.name}</h5>
                                <p class="card-text ${getTextClass(pokemon.types)}">${pokemon.types.join(', ')}</p>
                            
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


    function getTextClass(types) {
        // Mapeia os tipos aos estilos de texto
        const typeStyles = {
          'normal': 'text-secondary',
          'fighting': 'text-danger-emphasis',
          'flying': 'text-primary',
          'poison': 'text-danger-emphasis',
          'ground': 'text-warning-emphasis',
          'rock': 'text-warning',
          'bug': 'text-warning-emphasis',
          'ghost': 'text-secondary',
          'steel': 'text-danger-emphasis',
          'fire': 'text-danger',
          'water': 'text-primary-emphasis',
          'grass': 'text-success',
          'electric': 'text-warning-emphasis',
          'psychic': 'text-secondary-emphasis',
          'ice': 'text-primary',
          'dragon': 'text-danger',
          'dark': 'text-dark',
          'fairy': 'text-light-emphasis'
          // Adicione os tipos restantes conforme necessário
        };
      
        // Inicializa uma classe padrão (por exemplo, 'text-secondary')
        let textClass = 'text-secondary';
      
        // Verifica cada tipo e atribui a classe de estilo correspondente
        for (const type of types) {
          if (type in typeStyles) {
            textClass = typeStyles[type];
            break; // Para a primeira correspondência
          }
        }
      
        return textClass;
      }