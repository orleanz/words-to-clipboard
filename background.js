var WordsToClipboardDictionary = {};

var parent = chrome.contextMenus.create({
    "title": "words2clipboard",
    "contexts": ["all"]
  });

var defaults = 
  [ ['ä', ''], ['ö', ''], ['ü', ''], 
  ['Ä', ''], ['Ö', ''], ['Ü',''], 
  ['ß',''], ['12345', 'password'] ];

var words;

var tmp = localStorage.getItem("wordsToClipboard_wordlist");

if (tmp) {
  words = JSON.parse(tmp);
} else {
  words = defaults;
}

for (var i = 0; i < words.length; i++) {

  var w = words[i][0]; // word
  var s = words[i][1]; // synonyme

  var id = chrome.contextMenus.create(
    {"title": s != "" ? s + ":" +  Array(w.length + 1).join("*") : w, 
    "parentId": parent, 
    "contexts": ["all"]
  });

  WordsToClipboardDictionary[id] = words[i][0];

}


///////////////////////////////////////////////////////////////////////////

chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.create({
        'url': chrome.extension.getURL('settings.html')
    }, function(tab) {

    });
});

chrome.contextMenus.onClicked.addListener(function(args) {

  var id = args.menuItemId;

  if (WordsToClipboardDictionary[id]) {

    var tmp = document.createElement("input");
    tmp.type = "text";
    tmp.value = WordsToClipboardDictionary[id];
    document.activeElement.appendChild(tmp);

    tmp.select();
    document.execCommand('copy');

    document.activeElement.removeChild(tmp)

  } else {

    console.log("not found entry for id: " + id);
  
  }

});



