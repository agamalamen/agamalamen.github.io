
var submitButton = document.getElementById('bsr-submit-button');
submitButton.onmouseup = getFormInfo;

function getFormInfo(){
    var name = document.getElementById("word-text").value;
    makeNetworkCallToAgeApi(name);

}

function makeNetworkCallToAgeApi(original_word){
    var xhr = new XMLHttpRequest();
    
    var url = "https://api.datamuse.com/words?sl=" + original_word;
    xhr.open("GET", url, true);

    xhr.onload = function(e) { 
      
        var response_words = xhr.responseText;
        var json_response = JSON.parse(response_words);
        var matching_word = json_response[1]["word"];
        updateMatchingWord(original_word, matching_word);

    }

    xhr.onerror = function(e) {
        console.error(xhr.statusText);
    }

    xhr.send(null)

}

function updateMatchingWord(original_word, matching_word) {
    var textOne = document.getElementById("response-one");
    textOne.innerHTML="A word that sounds like " + original_word + " is " + matching_word;
    makeNetworkCallToDictionary(matching_word);
}

function makeNetworkCallToDictionary(word) {
    var xhr = new XMLHttpRequest();
    var url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word;
    xhr.open("GET", url, true);

    xhr.onload = function(e) {
        updateWordDefinition(word, xhr);
    }

    xhr.send(null);
}

function updateWordDefinition(word, definitionRequest) {

    var json_definition = JSON.parse(definitionRequest.responseText);
    if (definitionRequest.status == 200) {
        var definition = json_definition[0]["meanings"][0]["definitions"][0]["definition"];
    } else {
        var definition = null;
    }
    var textTwo = document.getElementById("response-two");
    if (definition) {
        textTwo.innerHTML="the definition of " + word + ": " + definition;
    } else {
        textTwo.innerHTML="No definition found for " + word;
    }
}
