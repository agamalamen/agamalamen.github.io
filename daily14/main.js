console.log("page load - entered main.js")

var submitButton = document.getElementById("send-button");
submitButton.onmouseup = getFormInfo;

function getFormInfo() {
	var selindex = document.getElementById('select-server-address').selectedIndex;
	var url_base = document.getElementById('select-server-address').options[selindex].value;
	var port_num = document.getElementById('input-port-number').value;
	var action = "GET"; // default
	if (document.getElementById('radio-get').checked){
        	action = "GET";
	} else if (document.getElementById('radio-put').checked) {
        	action = "PUT";
	} else if (document.getElementById('radio-post').checked) {
                action = "POST";
	} else if (document.getElementById('radio-delete').checked) {
                action = "DELETE";
        }


	var key = null;
	if (document.getElementById('checkbox-use-key').checked){
    		key = document.getElementById('input-key').value;
	}

	var message_body = null;
	if (document.getElementById('checkbox-use-message').checked){
    		// get key value
    		message_body = document.getElementById('text-message-body').value;
	}

	makeRequest(url_base, port_num, action, key, message_body);
}

function makeRequest(host, port, action, key, message_body) {
	
	var xhr = new XMLHttpRequest();
	if (key) {
		var link = "http://" + host + ":" + port + "/movies/" + key;
	} else {
		var link = "http://" + host + ":" + port + "/movies/";
	}
	xhr.open(action, link, true);

	xhr.onload = function(e) {
		console.log(xhr.responseText);
		document.getElementById("response-label").innerHTML=xhr.responseText;
	}

	xhr.onerror = function(e) {
		console.error(xhr.statusText);
	}

	xhr.send(message_body);

}


