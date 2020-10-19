console.log('page load - entered main.js');

var submitButton = document.getElementById("bsr-submit-button");
submitButton.onmouseup = getFormInfo;

function getFormInfo() {
  console.log('entered getFormInfo');
  // get all the form details
  // get Name
  var usr_name = document.getElementById('name-text').value;

  //get favourite day
  var fav_day_index = document.getElementById("favDay").selectedIndex;
  var fav_day = document.getElementById('favDay').options[fav_day_index].value;

  // get no touch alcohol
  var no_touch = document.getElementById('notouch-text').value;

  //get fav wine
  var action_wine = "just wine"; //default
  if (document.getElementById('radio-wine-white').checked){
    action_wine = "white";
  }
  else if (document.getElementById('radio-wine-red').checked) {
    action_wine = "red";
  }
  else if (document.getElementById('radio-wine-rose').checked) {
    action_wine = "rose";
  }
  else if (document.getElementById('radio-wine-sparkling').checked) {
    action_wine = "sparkling";
  }

  // get fav brunch cocktail
  var brunch_ctl = "day drinking"; //default
  if (document.getElementById('brunch-bloody-mary').checked){
    brunch_ctl = "Bloody Mary";
  }
  else if (document.getElementById('brunch-mimosa').checked) {
    brunch_ctl = "Mimosa";
  }
  else if (document.getElementById('brunch-screwdriver').checked) {
    brunch_ctl = "Screwdriver";
  }
  else if (document.getElementById('brunch-irish-coffee').checked) {
    brunch_ctl = "Irish Coffee";
  }


  // Log the current form results
  console.log('Name:' + usr_name + ' Favourite Day:' + fav_day + ' No Touch:' + no_touch + ' Fav Wine:' + action_wine + ' Day Drink:' + brunch_ctl);

  //create the drink dictionary
  var drink_dict = {};
  drink_dict['name'] = usr_name;
  drink_dict['favDay'] = fav_day;
  drink_dict['noTouch'] = no_touch;
  drink_dict['favWine'] = action_wine;
  drink_dict['favBrunch'] = brunch_ctl;

  //call displayInfo
  displayInfo(drink_dict);

} //end of getFormInfo


function displayInfo(drink_dict) {
  console.log('entered displayInfo');

  //access the labels
  var drink_top = document.getElementById('drink-top-line');
  drink_top.innerHTML = drink_dict['name'] + " on " + drink_dict['favDay'];

  var drink_body = document.getElementById('drink-body');
  drink_body.innerHTML = drink_dict['name'] + " will not be caught ever drinking " + drink_dict['noTouch'] + ", but " + drink_dict['favWine'] + ", or " + drink_dict['favBrunch'] + " on the other hand? Why not!";

  // update their content - from story_dict

}
