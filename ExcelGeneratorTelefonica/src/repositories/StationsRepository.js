class StationsRepository {
  connectFtp() {
    return new Promise((resolve) => {
      console.log("File downloaded");
      resolve();
    });
  }
  getAll(alarms) {
    this.connectFtp();
    let path = require("path");
    let fs = require("fs");
    let data = fs.readFileSync(
      path.join(__dirname + `/../../fmlist.txt`),
      "utf8"
    );
    let filtered = this.splitAndRemoveEmptyElements(data, "%a").filter(
      (element) => {
        let isIn = false;
        for (var i = 0; i < alarms.length; i++) {
          if (element.includes(alarms[i])) {
            isIn = true;
            break;
          }
        }
        return isIn;
      }
    );
    let objs = this.mappingToObjects(filtered);
    return objs;
  }

  mappingToObjects(list) {
    let objects = [];
    for (var k = 0; k < list.length; k++) {
      let elemTry = this.splitAndRemoveEmptyElements(list[k], "\r\n").filter(
        (elem) => {
          return elem != "%A" && (elem.includes("-") || elem.includes("BCCH"));
        }
      );
      elemTry.forEach((el, index, array) => 
      {
        array[index] = el.replace("-", "");
      });
      let object = {};
      for (var i = 0; i < elemTry.length; i++) {
        let keyvalue = elemTry[i].split("=");
        if(elemTry[i].includes("BCCH"))
        {
          object["Station"] = elemTry[i].split(" ")[0].replace(":", "");
        }
        else if (keyvalue.length > 2 && elemTry[i].includes("ObjectOfReference")) {
          let keyValues = elemTry[i].split(",");
          let f = keyValues[keyValues.length - 1].split("=");
          object["Station"] = f[1];
        } else {
          object[keyvalue[0]] = keyvalue[1];
        }
      }
      object = this.addDateAndTime(object);
      objects.push(object);
    }
    return objects;
  }

  addDateAndTime(object) {
    let eventTime = object.EventTime;
    let year = eventTime.substring(0, 4);
    let month = eventTime.substring(4, 6);
    let day = eventTime.substring(6, 8);
    let hour = eventTime.substring(8, 10);
    let minutes = eventTime.substring(10, 12);
    let seconds = eventTime.substring(12, 14);
    let date = `${day}/${month}/${year}`;
    let time = `${hour}:${minutes}:${seconds}`;
    object["Date"] = date;
    object["Time"] = time;
    return object;
  }

  splitAndRemoveEmptyElements(data, separator) {
    let args = data.split(separator);
    let filtered = args.filter((el) => {
      return el != null && el != "";
    });
    return filtered;
  }
}
module.exports = StationsRepository;
