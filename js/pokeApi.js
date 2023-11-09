

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
                img: "./img/pokemons/" + pokemonData.name + ".gif", // Use uma URL de imagem apropriada
                height: pokemonData.height,
                weight: pokemonData.weight
            };

            arrayDePokemon.push(pokemonObject);
        }

        // 'arrayDePokemon' agora contém objetos de Pokémon

        function menuMostra() {
            const pokemonsSelecionados = [];

            for (let i = 0; i < 4; i++) {
                let intervalo;
                let pokemon;

                do {
                    // Gere um número aleatório entre 50 e 140 para selecionar um Pokémon.
                    intervalo = Math.floor(Math.random() * (151 - 1 + 1) + 1);
                    // Obtenha o Pokémon com base no número gerado.
                    pokemon = arrayDePokemon[intervalo-1];
                } while (pokemonsSelecionados.includes(pokemon));

                // Adicione o Pokémon selecionado à lista de Pokémon selecionados.
                pokemonsSelecionados.push(pokemon);

                // Adicione o Pokémon ao elemento "inicio" no seu HTML.
                $('#inicio').append(`
                <div class="elemento${i+1}">
                    <div class="treinador${i+1}">
                        <img src="img/treinador${i+1}.png" class="treinador" alt="logo do site PokeInfos">
                    <p class="frase-treinador">Eu escolho você <span class="nomes ${getTextClass(pokemon.types)}">${pokemon.name}</span>!</p>
                    </div>
                    <img src="${pokemon.img}" class="img-pokemon" alt="...">
                </div>
            `);
            }
        }
        menuMostra()


        $(".logo").on("click", function () {
            $("main").empty();
            $("main").append(`<div id="inicio"></div>`);
            menuMostra();
        });


        // MODO CARDS
        $('#cartoes').on('click', function () {
            $('main').empty(); // Limpa o conteúdo anterior

            arrayDePokemon.forEach(pokemon => {
                $('main').append(`
                    <div class="card cartao-pokemon bg-info-subtle border border-warning">
                            <div class="div-imagem">
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
            $('main').html(`<div class="pokedex">
            <div class="pokemon">
                <h1>Pokedex</h1>
                <div class="borda">
                    <div class="luzes">
                        <div class="luz1"></div>
                        <div class="luz2"></div>
                    </div>
                    <div class="tela">
                        <div class="pokeimgem"></div>
                        <p class="texto-id">
                            ID:<span class="numero">0</spanclass=>
                        </p>
                    </div>
                    <div class="luz"></div>
                </div>
                <div class="nome-botoes">
                    <div class="nome">
                    
                    </div>
                    <div>
                        <button id="anterior"><</button>
                        <button id="posterior">></button>
                    </div>
                </div>
            </div>
            <div class="informacao">
                <h2>Ataques:</h2>
                <div class="ataques">
                </div>
                <h3>Tipo:</h3>
                <div class="tipo">
                </div>
            </div>
        </div>`)
            intervalo = Math.floor(Math.random() * (151 - 1 + 1) + 1);
            pokemon = arrayDePokemon[intervalo-1];
            $('.pokeimgem').html(`
                </div>
                <img src="${pokemon.img}" class="img-pokemon" alt="...">
            </div>
        `);
            $('.numero').html(`${pokemon.id}`)
            $('.nome').html(`${pokemon.name}`)
            $('.ataques').html(`${pokemon.abilities}`)
            $('.tipo').html(`${pokemon.types}`)
            $('.tipo').addClass(`${getTextClass(pokemon.types)}`)
            
            $('#anterior').on('click', function () {
                const idAtual = parseInt($('.numero').text()); // Obtém o ID atual convertendo para número
                const novoIndice = (idAtual === 1) ? arrayDePokemon.length - 1 : idAtual - 2;
                atualizarPokemon(novoIndice);
              });
              
              $('#posterior').on('click', function () {
                const idAtual = parseInt($('.numero').text()); // Obtém o ID atual convertendo para número
                const novoIndice = (idAtual === arrayDePokemon.length) ? 0 : idAtual;
                atualizarPokemon(novoIndice);
              });
              
              function atualizarPokemon(novoIndice) {
                const novoPokemon = arrayDePokemon[novoIndice];
              
                $('.pokeimgem').html(`
                  <div>
                    <img src="${novoPokemon.img}" class="img-pokemon" alt="...">
                  </div>
                `);
                $('.numero').html(`${novoPokemon.id}`);
                $('.nome').html(`${novoPokemon.name}`);
                $('.ataques').html(`<ul>${novoPokemon.abilities.map(ataque => `<li>${ataque}</li>`).join('')}</ul>`);
                $('.tipo').html(`${novoPokemon.types}`);
                $('.tipo').attr('class', 'tipo').addClass(`${getTextClass(novoPokemon.types)}`);
              }
              



        });
    })
    .catch((error) => {
        console.error("Erro ao buscar dados da API:", error);
    });


function getTextClass(types) {
    // Mapeia os tipos aos estilos de texto
    const typeStyles = {
        'normal': 'text-body',
        'fighting': 'text-danger-emphasis',
        'flying': 'text-primary',
        'poison': 'text-danger-emphasis',
        'ground': 'text-warning-emphasis',
        'rock': 'text-warning',
        'bug': 'text-warning-emphasis',
        'ghost': 'text-light-emphasis',
        'steel': 'text-danger-emphasis',
        'fire': 'text-danger',
        'water': 'text-primary-emphasis',
        'grass': 'text-success-emphasis',
        'electric': 'text-warning-emphasis',
        'psychic': 'text-body-secondary',
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



