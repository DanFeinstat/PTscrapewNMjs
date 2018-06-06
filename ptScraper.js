var Nightmare = require("nightmare"),
  nightmare = Nightmare({ show: true });
// nightmare is a simple wrapper for PhantomJS for testing, web automation and scraping

nightmare
  .goto("https://www.google.com")
  .wait(2000)
  //   .click(`#lst-ib`)
  .type(`body`, `identity coffee sacramento`)
  .wait(500)
  .type("body", "\u000d") // press enter
  .wait(2000)
  .evaluate(function() {
    tofD = [
      "6 AM",
      "7 AM",
      "8 AM",
      "9 AM",
      "10 AM",
      "11 AM",
      "12 PM",
      "1 PM",
      "2 PM",
      "3 PM",
      "4 PM",
      "5 PM",
      "6 PM",
      "7 PM",
      "8 PM",
      "9 PM",
      "10 PM",
      "11 PM",
    ];
    popTimesExtractedData = [];
    function treasureHunt(time) {
      let spans = document.querySelectorAll(`span`);
      let ptKeyEl;
      let treasureChest;
      let treasure;
      let lootBag = [];
      for (i = 0; i < spans.length; i++) {
        if (spans[i].innerHTML === time) {
          ptKeyEl = spans[i];
          treasureChest = ptKeyEl.parentNode;
          treasure = treasureChest.nextElementSibling;
          let item = {};
          item[`time`] = ptKeyEl.innerHTML;
          item[`text`] = treasure.innerHTML;
          if (treasure.innerHTML === "Usually not busy") {
            item[`value`] = 1;
          } else if (treasure.innerHTML === "Usually not too busy") {
            item[`value`] = 2;
          } else if (treasure.innerHTML === "Usually a little busy") {
            item[`value`] = 3;
          } else if (treasure.innerHTML === "Usually as busy as it gets") {
            item[`value`] = 4;
          } else {
            item[`value`] = 0;
          }
          lootBag.push(item);
        }
      }
      return lootBag;
    }
    for (let i = 0; i < tofD.length; i++) {
      popTimesExtractedData.push(treasureHunt(tofD[i]));
    }
    return popTimesExtractedData;
    // pass the stories array forward to use as you'd like
  })
  .end()
  .then(function(result) {
    console.log(result);
  })
  .catch(function(error) {
    console.error("Search failed:", error);
  });
