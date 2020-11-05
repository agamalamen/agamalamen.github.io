console.log('page load - entered main.js');

//loadPokemonsfromAPI();

// FUNCTION: Load all Pokemons from data source on startup
function loadPokemonsfromAPI() {
  console.log('entered Load Pokemons function');

  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:5172/pokemons/", true);
  // xhr.setRequestHeader('X-PINGOTHER', 'pingpong');
  // xhr.setRequestHeader('Content-Type', 'application/xml');

  xhr.onloadstart = function(e) {
    document.getElementById("pokemons-div").innerHTML='loading...';
  }

  xhr.onload  = function(e) {
    document.getElementById("pokemons-div").innerHTML="";
    var resp_allPokes = xhr.responseText;
    var json_response = JSON.parse(resp_allPokes);
    var pokemons = json_response["pokemons"];
    updatePokemons(pokemons);
  }

  xhr.onerror = function(e) {
    console.error(xhr.statusText);
  }

  xhr.send(null);
}

function updatePokemons(pokemons) {
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
    console.log(pokemons[i]["_type"]);
  }
}

// FUNCTION: Search Pokemon Profile
function profileData(){
  console.log("Entered profileData function - loads single pokemon profile");

  var pokeNum = getUrlVars()["num"];

  console.log("pokeNum " + pokeNum);

  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:5172/pokemons/" + pokeNum, true);

  //xhr.onloadstart = function(e) {
    //document.getElementById("pokemons-div").innerHTML='loading...';
  //}

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

// FUNCTION: Helper Function
function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value){
    vars[key] = value;
  });
  return vars;
}

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
      document.getElementById("next_evol").innerHTML='<div class="card"><div class="card-body"><img src="https://lh3.googleusercontent.com/proxy/WpF2DbO12QFm-U4YhLLTu6NdoKYIzo-8pYEqKvUS9nnDXuHPouTPVPNFRDHjwBF9-Wljds1KD3r0d3a628l61fLU0Ic4pPv2wKbOcta9Irj2vd4LEXTIvDepW45rZNJB" class="card-img-top" /><p>This Pokemon does not have an evolution.</p></div></div>'
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