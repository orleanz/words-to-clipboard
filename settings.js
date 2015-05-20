"use strict";

var defaults = 
  [ ['ä', ''], ['ö', ''], ['ü', ''], 
  ['Ä', ''], ['Ö', ''], ['Ü',''], 
  ['ß',''], ['12345', 'password'] ];

var tmp = localStorage.getItem("wordsToClipboard_wordlist");
var words;

if (tmp) {
  words = JSON.parse(tmp);
} else {
  words = defaults;
  localStorage.setItem("wordsToClipboard_wordlist", JSON.stringify(defaults));
}

if (words.length > 0) {
  for (var i = 0; i < words.length; i++) {
    addWord(words[i][0], words[i][1]);
  }
} else {
  alert("word list empty; click reset for default values");
}


document.getElementById("reset").addEventListener("click", function(){
  words = defaults;
  saveWords();
  window.location.reload(true);  
}, false);


document.getElementById("add").addEventListener("click", function(){

  var word = document.getElementById("word").value.trim();
  var synonyme = document.getElementById("synonyme").value.trim();

  if (word == "") {
    alert("Cannot add empty word");
    return;
  }

  document.getElementById("word").value = "";
  document.getElementById("synonyme").value = "";

  addWord(word, synonyme);

  words.push([word, synonyme]);

  saveWords();

}, false);


function saveWords() {
  localStorage.setItem("wordsToClipboard_wordlist", JSON.stringify(words));
}


function addWord(word, synonyme) {

  var span = document.createElement("span");
  if (synonyme) {
    span.textContent = synonyme + ": " + Array(word.length + 1).join("*");    
    span.title = synonyme + ":" + word + "; click to delete";
  } else {
    span.textContent = word;
    span.title = "click to delete";
  }

  span.style.margin = "0.3em";
  span.style.color = 'darkblue';
  span.style.cursor = 'pointer';
  span.style.backgroundColor = "rgb(240,240,240)";
  span.style.padding = "0.3em";
  span.style.whiteSpace = "nowrap";

  span.addEventListener('click', function(ev) {

    var ar = [];
    for (var i = 0; i < words.length; i++) {
      if (words[i][0] != word) {
        console.log("accepting " + words[i]);
        ar.push(words[i]);
      } else {
        console.log("rejecting " + words[i]);
      }
    }
    words = ar;
    saveWords();

    ev.currentTarget.parentNode.removeChild(ev.currentTarget);

  }, false);

  document.getElementById("currentWords").appendChild(span);

}