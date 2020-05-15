var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  let validPins = []
  let unvalidPins = []

  function pinChecker(pin) {
    let pingString = pin.toString().split("");

    if (pingString.length != 4) {
      return false
    }

    if ((pingString[0] == pingString[1] && pingString[1] == pingString[2]) || (pingString[1] == pingString[2] && pingString[2] == pingString[3])) {
      return false
    }

    if ((parseInt(pingString[0]) + 1) === (parseInt(pingString[1])) && (parseInt(pingString[1]) + 1) === (parseInt(pingString[2]))) {
      return false
    }

    if ((parseInt(pingString[1]) + 1) === (parseInt(pingString[2])) && (parseInt(pingString[2]) + 1) === (parseInt(pingString[3]))) {
      return false
    }

    return true;
  }

  function pinGenerator() {
    let pin = [];
    let unvalidPin = []
    for (let i = 0; i <= 9999; i++) {
      if (i < 10) {
        if (pinChecker("000" + i) == true) {
          pin.push("000" + i);
        } else {
          unvalidPin.push("000" + i);
        }
      } else if (i < 100) {
        if (pinChecker("00" + i) == true) {
          pin.push("00" + i);
        } else {
          unvalidPin.push("00" + i);
        }
      } else if (i < 1000) {
        if (pinChecker("0" + i) == true) {
          pin.push("0" + i);
        } else {
          unvalidPin.push("0" + i);
        }
      } else {
        if (pinChecker(i) == true) {
          pin.push(i);
        } else {
          unvalidPin.push(i);
        }
      }
    }
    return {
      validPins: pin,
      unvalidPins: unvalidPin
    };
  }

  validPins = pinGenerator().validPins;
  let validPinsCount = validPins.length;

  unvalidPins = pinGenerator().unvalidPins;
  let unvalidPinsCount = unvalidPins.length;


  res.send({
    validPinsCount: validPinsCount,
    validPins: pinGenerator().validPins,
    unvalidPinsCount: unvalidPinsCount,
    unvalidPins: pinGenerator().unvalidPins,
  });
});

module.exports = router;