console.log('page load - entered main.js');

// FUNCTION: Load all Pokemons from data source on startup
function loadPokemonsfromAPI() {
  console.log('entered Load Pokemons function');

  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:5172/pokemons/", true);

  xhr.onloadstart = function(e) {
    document.getElementById("pokemons-div").innerHTML='loading...';
  }

  xhr.onload  = function(e) {
    document.getElementById("pokemons-div").innerHTML="";
    var resp_allPokes = xhr.responseText;
    var json_response = JSON.parse(resp_allPokes);
    var pokemons = json_response["pokemons"];
    if ("pokemon" in getUrlVars()) {
      var filtered_pokemons = [];
      var target = getUrlVars()["pokemon"];
      for (var i = 0; i < pokemons.length; i++) {
        if (pokemons[i]["name"].includes(target)) {
          filtered_pokemons.push(pokemons[i]);
        }
      }
      pokemons = filtered_pokemons;
    }
    updatePokemons(pokemons);
  }

  xhr.onerror = function(e) {
    console.error(xhr.statusText);
  }

  xhr.send(null);
}

// FUNCTION: Add loaded pokemons to homepage
function updatePokemons(pokemons) {
  if (pokemons.length == 0) {
    document.getElementById("pokemons-div").innerHTML = "<p>There are no Pokemons found.";
  }
  for (var i = 0; i < pokemons.length; i++) {
    var badges = "";
    for (var j = 0; j < pokemons[i]["_type"].length; j++) {
      switch (pokemons[i]["_type"][j]) {
        case "Normal":
          badges += '<span class="badge badge-success" style="background-color:#C6C6A7; margin-right: 5px;">'+pokemons[i]["_type"][j]+'</span>';
          break;
        case "Bug":
          badges += '<span class="badge badge-success" style="background-color:#C6D16E; margin-right: 5px;">'+pokemons[i]["_type"][j]+'</span>';
          break;
        case "Dark":
          badges += '<span class="badge badge-success" style="background-color:#A29288; margin-right: 5px;">'+pokemons[i]["_type"][j]+'</span>';
          break;
        case "Dragon":
          badges += '<span class="badge badge-success" style="background-color:#A27DFA; margin-right: 5px;">'+pokemons[i]["_type"][j]+'</span>';
        break;
        case "Electric":
        badges += '<span class="badge badge-success" style="background-color:#FAE078; margin-right: 5px;">'+pokemons[i]["_type"][j]+'</span>';
        break;
        case "Fairy":
        badges += '<span class="badge badge-success" style="background-color:#F4BDC9; margin-right: 5px;">'+pokemons[i]["_type"][j]+'</span>';
        break;
        case "Fighting":
        badges += '<span class="badge badge-success" style="background-color:#D67873; margin-right: 5px;">'+pokemons[i]["_type"][j]+'</span>';
        break;
        case "Fire":
        badges += '<span class="badge badge-success" style="background-color:#F5AC78; margin-right: 5px;">'+pokemons[i]["_type"][j]+'</span>';
        break;
        case "Flying":
        badges += '<span class="badge badge-success" style="background-color:#C6B7F5; margin-right: 5px;">'+pokemons[i]["_type"][j]+'</span>';
        break;
        case "Ghost":
        badges += '<span class="badge badge-success" style="background-color:#A292BC; margin-right: 5px;">'+pokemons[i]["_type"][j]+'</span>';
        break;
        case "Grass":
        badges += '<span class="badge badge-success" style="background-color:#A7DB8D; margin-right: 5px;">'+pokemons[i]["_type"][j]+'</span>';
        break;
        case "Ground":
        badges += '<span class="badge badge-success" style="background-color:#EBD69D; margin-right: 5px;">'+pokemons[i]["_type"][j]+'</span>';
        break;
        case "Ice":
        badges += '<span class="badge badge-success" style="background-color:#BCE6E6; margin-right: 5px;">'+pokemons[i]["_type"][j]+'</span>';
        break;
        case "Poison":
          badges += '<span class="badge badge-success" style="background-color:#C183C1; margin-right: 5px;">'+pokemons[i]["_type"][j]+'</span>';
          break;
        case "Psychic":
          badges += '<span class="badge badge-success" style="background-color:#FA92B2; margin-right: 5px;">'+pokemons[i]["_type"][j]+'</span>';
          break;
        case "Rock":
        badges += '<span class="badge badge-success" style="background-color:#D1C17D;">'+pokemons[i]["_type"][j]+'</span>';
        break;
        case "Steel":
        badges += '<span class="badge badge-success" style="background-color:#D1D1E0; margin-right: 5px;">'+pokemons[i]["_type"][j]+'</span>';
        break;
        case "Water":
        badges += '<span class="badge badge-success" style="background-color:#9DB7F5; margin-right: 5px;">'+pokemons[i]["_type"][j]+'</span>';
        break;
      }
    }
    document.getElementById("pokemons-div").innerHTML += '<div class="col-md-3" style="margin-bottom: 8px;"><div class="card"><img src="'+ pokemons[i]["img"] +'" class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title"><a href="pokemon.html?num='+pokemons[i]["num"]+'" style="color: #333333;">'+ pokemons[i]["name"] +'</a></h5><p class="card-text">'+badges+'</p></div></div></div>';
  }
}

// FUNCTION: Loads Pokemon Profile
function profileData(){
  console.log("Entered profileData function - loads single pokemon profile");

  var pokeNum = getUrlVars()["num"];

  console.log("pokeNum " + pokeNum);

  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:5172/pokemons/" + pokeNum, true);

  xhr.onload  = function(e) {
    console.log(xhr.responseText);
    var resp_thisPoke = xhr.responseText;
    var thisPoke = JSON.parse(resp_thisPoke);
    updateProfile(thisPoke);
  }

  xhr.onerror = function(e) {
  console.error(xhr.statusText);
  }

  xhr.send(null);
}

// FUNCTION: gets URL parameters
function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value){
    vars[key] = value;
  });
  return vars;
}

// FUNCTION: retreives pokemon image
function getPokemonImg(pokeNum, srcID){
  console.log("Entered getPokemonImg function - loads pokemon image");

  console.log("pokeNum " + pokeNum);
  var thisPoke;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:5172/pokemons/" + pokeNum, true);


  xhr.onload  = function(e) {
    console.log(xhr.responseText);
    var resp_thisPoke = xhr.responseText;
    thisPoke = JSON.parse(resp_thisPoke);
    document.getElementById(srcID).src = thisPoke["img"];
  }

  xhr.onerror = function(e) {
  console.error(xhr.statusText);
  }
  xhr.send(null);
  return thisPoke;
}

// FUNCTION: Update Pokemon Profile
function updateProfile(pokemon) {
  console.log("inside updateProfile function");
  console.log("pokemon passed in: " + pokemon);

  document.title=pokemon["name"];

  var all_evolutions = document.getElementById("all_evols");
  all_evolutions.innerHTML = '<div class="col-md-3"><div class="card"><img src="'+pokemon["img"]+'" class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title"><a id="pname_curr_header" href="#" style="color: #333333;">'+pokemon["name"]+'</a></h5><p class="card-text"></p></div></div></div><!-- col-md-3 --></div>';

  document.getElementById("pname").innerHTML = pokemon["name"];
  document.getElementById("pnum").innerHTML = "<b>Pokemon Number: </b>" + pokemon["num"];
  document.getElementById("ptype").innerHTML = "<b>Type: </b>" + pokemon["_type"];
  document.getElementById("pweaknesses").innerHTML = "<b>Weaknesses: </b>" + pokemon["weaknesses"];
  document.getElementById("pheight").innerHTML = "<b>Height: </b>" + pokemon["height"];
  document.getElementById("pweight").innerHTML = "<b>Weight: </b>" + pokemon["weight"];
  document.getElementById("pcandy").innerHTML = "<b>Candy: </b>" + pokemon["candy"];

  if (pokemon["multipliers"] == null) {
      document.getElementById("pmultipliers").innerHTML = "<b>Multipliers: </b>" + "n/a";

  }
  else {
      document.getElementById("pmultipliers").innerHTML = "<b>Multipliers: </b>" + pokemon["multipliers"];
  }

  //  Print previous Evolution List
  if (pokemon["prev_evolution"] == null) {
      document.getElementById("pprevevol").innerHTML = "<b>Previous Evolution: </b>" + "n/a";
  }
  else {
      console.log("prev_evolution name:" + pokemon["prev_evolution"].length);
      document.getElementById("pprevevol").innerHTML = "<b>Previous Evolution: </b>";
      pokemon["prev_evolution"].reverse();
      for(var i = 0; i < pokemon["prev_evolution"].length; i++) {

        all_evolutions.innerHTML = '<div class="col-md-3"><div class="card"><img id="'+pokemon["prev_evolution"][i]["num"]+'_img" src="" class="card-img-top evolution-img" alt="..."><div class="card-body"><h5 class="card-title"><a id="pname_curr_header" target="_blank" href="pokemon.html?num='+pokemon["prev_evolution"][i]["num"]+'" style="color: #333333;">'+pokemon["prev_evolution"][i]["name"]+'</a></h5><p class="card-text"></p></div></div></div><!-- col-md-3 --></div>' + all_evolutions.innerHTML;
        getPokemonImg(pokemon["prev_evolution"][i]["num"], pokemon["prev_evolution"][i]["num"]+"_img");

        if (i == (pokemon["prev_evolution"].length - 1)){
          document.getElementById("pprevevol").innerHTML += pokemon["prev_evolution"][i]["name"];
        }
        else {
          document.getElementById("pprevevol").innerHTML += pokemon["prev_evolution"][i]["name"] + ", ";
        }
      }
  }

  // Print Next Evolution List
  if (pokemon["next_evolution"] == null) {
    document.getElementById("pnextevol").innerHTML = "<b>Next Evolution: </b>" + "n/a";
  }
  else {
    console.log("next_evolution name:" + pokemon["next_evolution"].length);
    document.getElementById("pnextevol").innerHTML = "<b>Next Evolution: </b>";
    for(var i = 0; i < pokemon["next_evolution"].length; i++) {

      all_evolutions.innerHTML += '<div class="col-md-3"><div class="card"><img id="'+pokemon["next_evolution"][i]["num"]+'_img" src="" class="card-img-top evolution-img" alt="..."><div class="card-body"><h5 class="card-title"><a id="pname_curr_header" target="_blank" href="pokemon.html?num='+pokemon["next_evolution"][i]["num"]+'" style="color: #333333;">'+pokemon["next_evolution"][i]["name"]+'</a></h5><p class="card-text"></p></div></div></div><!-- col-md-3 --></div>';
      getPokemonImg(pokemon["next_evolution"][i]["num"], pokemon["next_evolution"][i]["num"]+"_img");

      if (i == (pokemon["next_evolution"].length - 1)){
        document.getElementById("pnextevol").innerHTML += pokemon["next_evolution"][i]["name"];
      }
      else {
        document.getElementById("pnextevol").innerHTML += pokemon["next_evolution"][i]["name"] + ", ";
      }
    }
  }
} //end of load pokemon function


// FUNCTION: Load Pokemon into each row of the select dropdown
function loadSelectPoke(){
  console.log('Entered Load Select Pokemons Function');

  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:5172/pokemons/", true);


  xhr.onload  = function(e) {
    var resp_allPokes = xhr.responseText;
    var json_response = JSON.parse(resp_allPokes);
    var pokemons = json_response["pokemons"];

    for (var i = 0; i < pokemons.length; i++) {
      document.getElementById("select_pokemon_calc").innerHTML += "<option value='"+ pokemons[i]["num"] + "'>" + pokemons[i]["name"] + "</option>";

    }
  }

  xhr.onerror = function(e) {
    console.error(xhr.statusText);
  }

  xhr.send(null);
}


// FUNCTION: get data from selected pokemon
function selectedPoke() {
  console.log("Entered selectedPoke function");

  var thisPokeNum = document.getElementById("select_pokemon_calc").value;
  var cp = document.getElementById("cp_input_box").value;

  console.log('thisPokeNum ' + thisPokeNum);

  var errors = 0;
  if (thisPokeNum == 0) {
    document.getElementById("poke_alert").setAttribute("style", "");
    errors++;
  } else {
    document.getElementById("poke_alert").setAttribute("style", "display: none;");
  }

  if (cp == "" || cp <= 0 || cp === parseInt(cp, 10)) {
    document.getElementById("cp_alert").setAttribute("style", "");
    errors++;
  } else {
    document.getElementById("poke_alert").setAttribute("style", "display: none;");
  }

  if (errors > 0) {
    return;
  }


  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:5172/pokemons/" + thisPokeNum, true);


  xhr.onload  = function(e) {
    console.log(xhr.responseText);
    var resp_thisPoke = xhr.responseText;
    pokemon = JSON.parse(resp_thisPoke);
    document.getElementById("old_poke").innerHTML = '<div class="card"><img src="'+pokemon["img"]+'" class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title"><a id="pname_curr_header" target="_blank" href="pokemon.html?num='+pokemon["num"]+'" style="color: #333333;">'+pokemon["name"]+'</a></h5><p class="card-text">CP: '+Math.floor(cp)+'</p></div></div></div>';
    if (pokemon["next_evolution"] != null) {
      calculateCP(pokemon["next_evolution"][0]["num"], pokemon["next_evolution"][0]["name"], pokemon["multipliers"], cp);
    } else {
      document.getElementById("next_evol").innerHTML='<div class="card"><div class="card-body"><img src="images/pokemonal_ball.png" class="card-img-top" /><p>This Pokemon does not have an evolution.</p></div></div>'
    }
  }

  xhr.onerror = function(e) {
  console.error(xhr.statusText);
  }
  xhr.send(null);
}


// FUNCTION: Calculate next evolution CP
function calculateCP(num, name, multipliers, cp) {
  var average_multipliers = 0;
  for (var i = 0; i < multipliers.length; i++) {
    average_multipliers += multipliers[i];
  }
  average_multipliers = average_multipliers / multipliers.length;
  var new_cp = cp * average_multipliers;
  document.getElementById("next_evol").innerHTML= '<div class="card"><img id="'+ num +'_evol_img" src="" class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title"><a id="pname_curr_header" target="_blank" href="pokemon.html?num='+num+'" style="color: #333333;">'+name+'</a></h5><p class="card-text">CP: '+Math.floor(new_cp)+'</p></div></div></div>';
  getPokemonImg(num, num + '_evol_img');
}

// FUNCTION: calculates strategy
function calculateStrategy() {
  var pokeNum = document.getElementById("select_pokemon_calc").value;

  if (pokeNum == 0) {
    document.getElementById("poke_alert").setAttribute("style", "");
    return;
  } else {
    document.getElementById("poke_alert").setAttribute("style", "display: none;");
  }

  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:5172/pokemons/" + pokeNum, true);

  xhr.onload  = function(e) {
    var resp_thisPoke = xhr.responseText;
    pokemon = JSON.parse(resp_thisPoke);
    var strategyType = getUrlVars()["strategy"];
    if (strategyType == "offensive") {
      document.getElementById("opponent_poke").innerHTML = '<h5 class="card-title">Fighting Against</h5><div class="card"><img src="'+pokemon["img"]+'" class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title"><a id="pname_curr_header" target="_blank" href="pokemon.html?num='+pokemon["num"]+'" style="color: #333333;">'+pokemon["name"]+'</a></h5><ul><li>Type: '+ pokemon["_type"] +'</li><li>Weaknesses: '+ pokemon["weaknesses"] +'</li></ul></div></div></div>';
      getOffensiveStrategyPokemons(pokemon["weaknesses"]);
    } else if (strategyType == "defensive") {
      notEffectiveAgainst = [];
      for (i = 0; i < pokemon["_type"].length; i++) {
        for(j = 0; j < isWeakAgainstDict[pokemon["_type"][i]].length; j++) {
          if (!notEffectiveAgainst.includes(isWeakAgainstDict[pokemon["_type"][i]][j])) {
            notEffectiveAgainst.push(isWeakAgainstDict[pokemon["_type"][i]][j]);
          }
        }
      }
      document.getElementById("opponent_poke").innerHTML = '<h5 class="card-title">Fighting Against</h5><div class="card"><img src="'+pokemon["img"]+'" class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title"><a id="pname_curr_header" target="_blank" href="pokemon.html?num='+pokemon["num"]+'" style="color: #333333;">'+pokemon["name"]+'</a></h5><ul><li>Type: '+ pokemon["_type"] +'</li><li>Ineffective against: '+ notEffectiveAgainst +'</li></ul></div></div></div>';
      getDefensiveStrategyPokemons(pokemon["_type"]);
    }
  }

  xhr.onerror = function(e) {
  console.error(xhr.statusText);
  }

  xhr.send(null);
}

// FUNCTION: get matching opponenets to the selected pokemon for offensive strategy
function getOffensiveStrategyPokemons(weaknesses) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:5172/pokemons/", true);

  xhr.onload  = function(e) {
    var resp_pokemons = xhr.responseText;
    pokemons = JSON.parse(resp_pokemons)["pokemons"];
    
    var opponentPokemons = [];
    for (var i = 0; i < pokemons.length; i++) {
      if (pokemons[i]) {
        for (j = 0; j < weaknesses.length; j++) {
          if ((pokemons[i]["_type"]).includes(weaknesses[j])) {
            opponentPokemons.push(pokemons[i]);
            break;
          }
        }
      }
    }

    var recommendedPokemon = opponentPokemons[0];
    document.getElementById("recommended_poke").innerHTML = '<h5 class="card-title">Recommended Pokemon</h5><div class="card"><img src="'+recommendedPokemon["img"]+'" class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title"><a id="pname_curr_header" target="_blank" href="pokemon.html?num='+recommendedPokemon["num"]+'" style="color: #333333;">'+recommendedPokemon["name"]+'</a></h5><ul><li>Type: '+ recommendedPokemon["_type"] +'</li><li>Weaknesses: '+ recommendedPokemon["weaknesses"] +'</li></ul></div></div></div>';
    
    for (m = 1; m < opponentPokemons.length; m++) {
      modifiedNum = opponentPokemons[m]["num"];
      while(modifiedNum.charAt(0) == "0") {
        modifiedNum = modifiedNum.substring(1, modifiedNum.length);
      }
      document.getElementById("alternate_pokemons").innerHTML+= '<div class="col-md-3" style="margin-bottom: 10px;"><div class="card"><img src="'+opponentPokemons[m]["img"]+'" class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title"><a id="pname_curr_header" target="_blank" href="pokemon.html?num='+opponentPokemons[m]["num"]+'" style="color: #333333;">'+opponentPokemons[m]["name"]+'</a></h5><button class="btn btn-primary" onclick="changeRecommendedPokemon('+ modifiedNum +')">Compare</button></div></div></div></div>';
    }

  }

  xhr.onerror = function(e) {
  console.error(xhr.statusText);
  }

  xhr.send(null);
}

// FUNCTION: switches the recommended pokemon using compare button
function changeRecommendedPokemon(num) {
  console.log(num);
  num = String(num);
  if (num.length == 1) {
    num = '00'+num;
  } else if (num.length == 2) {
    num = '0'+num;
  }
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:5172/pokemons/" + num, true);

  xhr.onload  = function(e) {
    var resp_thisPoke = xhr.responseText;
    recommendedPokemon = JSON.parse(resp_thisPoke);
    console.log(recommendedPokemon);
    var strategy = getUrlVars()["strategy"];
    if (strategy == "offensive") {
      document.getElementById("recommended_poke").innerHTML = '<h5 class="card-title">Recommended Pokemon</h5><div class="card"><img src="'+recommendedPokemon["img"]+'" class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title"><a id="pname_curr_header" target="_blank" href="pokemon.html?num='+recommendedPokemon["num"]+'" style="color: #333333;">'+recommendedPokemon["name"]+'</a></h5><ul><li>Type: '+ recommendedPokemon["_type"] +'</li><li>Weaknesses: '+ recommendedPokemon["weaknesses"] +'</li></ul></div></div></div>';
    } else if (strategy == "defensive") {
      notEffectiveAgainst = [];
      for (i = 0; i < recommendedPokemon["_type"].length; i++) {
        for(j = 0; j < isWeakAgainstDict[recommendedPokemon["_type"][i]].length; j++) {
          if (!notEffectiveAgainst.includes(isWeakAgainstDict[recommendedPokemon["_type"][i]][j])) {
            notEffectiveAgainst.push(isWeakAgainstDict[recommendedPokemon["_type"][i]][j]);
          }
        }
      }
      document.getElementById("recommended_poke").innerHTML = '<h5 class="card-title">Recommended Pokemon</h5><div class="card"><img src="'+recommendedPokemon["img"]+'" class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title"><a id="pname_curr_header" target="_blank" href="pokemon.html?num='+recommendedPokemon["num"]+'" style="color: #333333;">'+recommendedPokemon["name"]+'</a></h5><ul><li>Type: '+ recommendedPokemon["_type"] +'</li><li>Ineffective against: '+ notEffectiveAgainst +'</li></ul></div></div></div>';
    }
  }

  xhr.onerror = function(e) {
  console.error(xhr.statusText);
  }

  xhr.send(null);
}

// FUNCTION: get matching opponenets to the selected pokemon for defensive strategy
function getDefensiveStrategyPokemons(p_type) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:5172/pokemons/", true);

  xhr.onload  = function(e) {
    var resp_pokemons = xhr.responseText;
    pokemons = JSON.parse(resp_pokemons)["pokemons"];
    console.log(p_type);
    var opponentPokemons = new Set();
    for (var i = 0; i < pokemons.length; i++) {
      for (var j = 0; j < pokemons[i]["_type"].length; j++) {
        for (var m = 0; m < p_type.length; m++) {
          if (isWeakAgainstDict[p_type[m]].includes(pokemons[i]["_type"][j])) {
            opponentPokemons.add(pokemons[i]);
          }
        }
      }
    }

    var recommendedIt = opponentPokemons.values();
    var firstPokemon = (recommendedIt.next()).value;
    notEffectiveAgainst = [];
      for (i = 0; i < firstPokemon["_type"].length; i++) {
        for(j = 0; j < isWeakAgainstDict[firstPokemon["_type"][i]].length; j++) {
          if (!notEffectiveAgainst.includes(isWeakAgainstDict[firstPokemon["_type"][i]][j])) {
            notEffectiveAgainst.push(isWeakAgainstDict[firstPokemon["_type"][i]][j]);
          }
        }
      }
    document.getElementById("recommended_poke").innerHTML = '<h5 class="card-title">Recommended Pokemon</h5><div class="card"><img src="'+firstPokemon["img"]+'" class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title"><a id="pname_curr_header" target="_blank" href="pokemon.html?num='+firstPokemon["num"]+'" style="color: #333333;">'+firstPokemon["name"]+'</a></h5><ul><li>Type: '+ firstPokemon["_type"] +'</li><li>Ineffective against: '+ notEffectiveAgainst +'</li></ul></div></div></div>';

    for (let alternatePokemon of recommendedIt) {
      console.log(alternatePokemon["name"]);
      modifiedNum = alternatePokemon["num"];
      while(modifiedNum.charAt(0) == "0") {
        modifiedNum = modifiedNum.substring(1, modifiedNum.length);
      }

      document.getElementById("alternate_pokemons").innerHTML+= '<div class="col-md-3" style="margin-bottom: 10px;"><div class="card"><img src="'+alternatePokemon["img"]+'" class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title"><a id="pname_curr_header" target="_blank" href="pokemon.html?num='+alternatePokemon["num"]+'" style="color: #333333;">'+alternatePokemon["name"]+'</a></h5><button class="btn btn-primary" onclick="changeRecommendedPokemon('+ modifiedNum +')">Compare</button></div></div></div></div>';
    }
  }

  xhr.onerror = function(e) {
  console.error(xhr.statusText);
  }

  xhr.send(null);
}

//DATA SOURCE: dictionary for defensive strategy
var isWeakAgainstDict = {
	"Normal": ["Rock", "Ghost", "Steel"],
	"Fighting": ["Flying", "Poison", "Bug", "Psychic", "Ghost"],
	"Flying": ["Rock", "Steel", "Electric"],
	"Poison": ["Poison", "Ground", "Rock", "Ghost"],
	"Ground": ["Bug", "Grass"],
	"Rock": ["Fighting", "Ground", "Steel"],
	"Bug": ["Fighting", "Flying", "Poison", "Ghost", "Steel", "Fire", "Fairy"],
	"Ghost": ["Dark"],
	"Steel": ["Steel", "Fire", "Water", "Electric"],
	"Fire": ["Rock", "Fire", "Water", "Dragon"],
	"Water": ["Water", "Grass", "Dragon"],
	"Grass": ["Flying", "Poison", "Bug", "Steel", "Fire", "Grass"],
	"Electric": ["Ground", "Grass", "Electric"],
	"Psychic": ["Steel", "Psychic", "Dark"],
	"Ice": ["Steel", "Fire", "Water", "Ice"],
	"Dragon": ["Steel"],
	"Fairy": ["Poison", "Steel", "Fire"],
	"Dark": ["Fighting", "Dark", "Fairy"]
};