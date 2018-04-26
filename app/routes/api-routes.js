var pokeData = require('../data/pokemon.js');

module.exports = function(app) {
    app.get('/api/pokepartner', function(req, res){
        res.json(pokeData);
    });

    app.get('/api/pokepartner', function(req, res){
        var newPokemon= req.body;

        for(var i = 0; i < newPokemon.scores.length; i++){
            if(newPokemon.scores[i] == "1 (Strongly Disagree)") {
                newPokemon.score[i] = 1; 
            } else if(newPokemon.scores[i] == "5 (Strongly Agree)"){
                newPokemon.scores[i] = 5;
            }else{
                newPokemon.scores[i] = parseInt(newPokemon.scores[i]);
            }
        }

        var differenceArray = [];

        for(var i =0; i<pokeData.length; i++) {

            var comparedPoke = pokeData[i];
            var totalDifference= 0;

            for(var k = 0; comparedPoke.scores.length; k++){
                var differenceOneScore = Math.abs(comparedPoke.scores[k] - newPokemon.scores[k]);
                totalDifference += differenceOneScore;
            }

            differenceArray[i] = totalDifference;
        }

        var bestPokeNum = differenceArray [0];
        var bestPokeIndex = 0;

        for (var i = 1; i < differenceArray.length; i++){
            if(differenceArray[i] < bestPokeNum){
                bestPokeNum = differenceArray[i];
                bestPokeIndex = i;
            }
        }

        pokeData.push(newPokemon);

        res.json(pokeData[bestPokeIndex]);
    });
};