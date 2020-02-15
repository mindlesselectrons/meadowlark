var fortuneCookies = ["Conquer your fears or they will conquer you.",
                      "Rivers need springs.",
                      "Do not fear what you don't know.",
                      "You will have a pleasant surprise.",
                      "Whenever possible, keep it simple.",
                      "Apples!"];

exports.getFortune = function() {
  var idx = Math.floor(Math.random() * fortuneCookies.length);return fortuneCookies[idx];
};

//The important thing to note here is the use of the global variable exports.
//If you wantsomething to be visible outside of the module, you have to add it to exports.
