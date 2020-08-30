const data = [
  {
    firstName: "John",
    lastName: "Bailey",
    purchasePrice: 1000,
    paymentsMade: 100,
  },
  {
    firstName: "Leonard",
    lastName: "Clark",
    purchasePrice: 1000,
    paymentsMade: 150,
  },
  {
    firstName: "Phil",
    lastName: "Knox",
    purchasePrice: 1000,
    paymentsMade: 200,
  },
  {
    firstName: "Sonia",
    lastName: "Glover",
    purchasePrice: 1000,
    paymentsMade: 250,
  },
  {
    firstName: "Adam",
    lastName: "Mackay",
    purchasePrice: 1000,
    paymentsMade: 350,
  },
  {
    firstName: "Lisa",
    lastName: "Ogden",
    purchasePrice: 1000,
    paymentsMade: 400,
  },
  {
    firstName: "Elizabeth",
    lastName: "Murray",
    purchasePrice: 1000,
    paymentsMade: 500,
  },
  {
    firstName: "Caroline",
    lastName: "Jackson",
    purchasePrice: 1000,
    paymentsMade: 350,
  },
  {
    firstName: "Kylie",
    lastName: "James",
    purchasePrice: 1000,
    paymentsMade: 900,
  },
  {
    firstName: "Harry",
    lastName: "Peake",
    purchasePrice: 1000,
    paymentsMade: 1000,
  },
];

const Excel = require("exceljs");

// need to create a workbook object. Almost everything in ExcelJS is based off of the workbook object.
let workbook = new Excel.Workbook();

let worksheet = workbook.addWorksheet("Debtors");

worksheet.columns = [
  { header: "First Name", key: "firstName" },
  { header: "Last Name", key: "lastName" },
  { header: "Purchase Price", key: "purchasePrice" },
  { header: "Payments Made", key: "paymentsMade" },
  { header: "Amount Remaining", key: "amountRemaining" },
  { header: "% Remaining", key: "percentRemaining" },
];

// force the columns to be at least as long as their header row.
// Have to take this approach because ExcelJS doesn't have an autofit property.
worksheet.columns.forEach((column) => {
  column.width = column.header.length < 12 ? 12 : column.header.length;
});

// Make the header bold.
// Note: in Excel the rows are 1 based, meaning the first row is 1 instead of 0.
worksheet.getRow(1).font = { bold: true };

// Dump all the data into Excel
data.forEach((e, index) => {
  // row 1 is the header.
  const rowIndex = index + 2;

  // By using destructuring we can easily dump all of the data into the row without doing much
  // We can add formulas pretty easily by providing the formula property.
  worksheet.addRow({
    ...e,
    amountRemaining: {
      formula: `=C${rowIndex}-D${rowIndex}`,
    },
    percentRemaining: {
      formula: `=E${rowIndex}/C${rowIndex}`,
    },
  });
});

const totalNumberOfRows = worksheet.rowCount;

// Add the total Rows
worksheet.addRow([
  "",
  "Total",
  {
    formula: `=sum(C2:C${totalNumberOfRows})`,
  },
  {
    formula: `=sum(D2:D${totalNumberOfRows})`,
  },
  {
    formula: `=sum(E2:E${totalNumberOfRows})`,
  },
  {
    formula: `=E${totalNumberOfRows + 1}/C${totalNumberOfRows + 1}`,
  },
]);

// Set the way columns C - F are formatted
const figureColumns = [3, 4, 5, 6];
figureColumns.forEach((i) => {
  worksheet.getColumn(i).numFmt = "$0.00";
  worksheet.getColumn(i).alignment = { horizontal: "center" };
});

// Column F needs to be formatted as a percentage.
worksheet.getColumn(6).numFmt = "0.00%";

// loop through all of the rows and set the outline style.
worksheet.eachRow({ includeEmpty: false }, function (row, rowNumber) {
  worksheet.getCell(`A${rowNumber}`).border = {
    top: { style: "thin" },
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "none" },
  };

  const insideColumns = ["B", "C", "D", "E"];

  insideColumns.forEach((v) => {
    worksheet.getCell(`${v}${rowNumber}`).border = {
      top: { style: "thin" },
      bottom: { style: "thin" },
      left: { style: "none" },
      right: { style: "none" },
    };
  });

  worksheet.getCell(`F${rowNumber}`).border = {
    top: { style: "thin" },
    left: { style: "none" },
    bottom: { style: "thin" },
    right: { style: "thin" },
  };
});

// The last A cell needs to have some of it's borders removed.
worksheet.getCell(`A${worksheet.rowCount}`).border = {
  top: { style: "thin" },
  left: { style: "none" },
  bottom: { style: "none" },
  right: { style: "thin" },
};

const totalCell = worksheet.getCell(`B${worksheet.rowCount}`);
totalCell.font = { bold: true };
totalCell.alignment = { horizontal: "center" };

// Create a freeze pane, which means we'll always see the header as we scroll around.
worksheet.views = [{ state: "frozen", xSplit: 0, ySplit: 1, activeCell: "B2" }];

// Keep in mind that reading and writing is promise based.
workbook.xlsx.writeFile("Debtors.xlsx").then(() => {
  const express = require("express");
  const app = express();

  app.get("/", (req, res) => {
    res.download("./Debtors.xlsx", (err) => {
      if (err) {
        return;
      } else {
        console.log("Succesfully!");
      }
    });
  });

  app.listen(3000, () => {
    console.log("Server running");
    let fs = require("fs");
    let data = fs.readFileSync("./fmlist.txt", "utf8");
    let alarms = [
      "-SPtext=CELL LOGICAL CHANNEL AVAILABILITY SUPERVISION",
      "-SPtext=UtranCell_ServiceUnavailable",
      "-SPtext=UtranCell_NbapMessageFailure",
      "-SPtext=Heartbeat Failure",
      "-SPtext=Service Unavailable",
    ];
    let filtered = splitAndRemoveEmptyElements(data, "%a").filter((element) => {
      let isIn = false;
      for (var i = 0; i < alarms.length; i++) {
        if (element.includes(alarms[i])) {
          isIn = true;
          break;
        }
      }
      return isIn;
    });
    let elemTry = splitAndRemoveEmptyElements(filtered[0], "\r\n").filter(
      (elem) => {
        return elem != "%A" && elem.includes("-");
      }
    );
    elemTry.forEach((el, index, array) => {
      array[index] = el.replace("-", "");
    });
    let object = {};
    for (var i = 0; i < elemTry.length; i++) {
      let keyvalue = elemTry[i].split("=");
      if (keyvalue.length > 2) {
        let keyValues = elemTry[i].split(",");
        let f = keyValues[keyValues.length - 1].split("=");
        object[f[0]] = f[1];
      } else {
        object[keyvalue[0]] = keyvalue[1];
      }
    }
    let objs = mappingToObjects(filtered);
    objs.forEach((obj, index) => {console.log(`${index + 1} - ${obj.date} - ${obj.time} - ${obj.Station} - ${obj.SPtext}`);});
  });
});

function mappingToObjects(list) {
  let objects = [];
  for (var k = 0; k < list.length; k++) 
  {
    let elemTry = splitAndRemoveEmptyElements(list[k], "\r\n").filter(
      (elem) => {
        return elem != "%A" && elem.includes("-");
      }
    );
    elemTry.forEach((el, index, array) => {
      array[index] = el.replace("-", "");
    });
    let object = {};
    for (var i = 0; i < elemTry.length; i++) {
      let keyvalue = elemTry[i].split("=");
      if (keyvalue.length > 2 && elemTry[i].includes('ObjectOfReference')) {
        let keyValues = elemTry[i].split(",");
        let f = keyValues[keyValues.length - 1].split("=");
        object['Station'] = f[1];
      } else {
        object[keyvalue[0]] = keyvalue[1];
      }
    }
    object = addDateAndTime(object);
    objects.push(object);
  }
  return objects;
}

function addDateAndTime(object)
{
  let eventTime = object.EventTime;
  let year = eventTime.substring(0,4);
  let month = eventTime.substring(4,6);
  let day = eventTime.substring(6,8);
  let hour = eventTime.substring(8,10);
  let minutes = eventTime.substring(10,12);
  let seconds = eventTime.substring(12,14);
  let date = `${day}/${month}/${year}`;
  let time = `${hour}:${minutes}:${seconds}`;
  object['date'] = date;
  object['time'] = time;
  return object;
}

function splitAndRemoveEmptyElements(data, separator) {
  let args = data.split(separator);
  let filtered = args.filter((el) => {
    return el != null && el != "";
  });
  return filtered;
}

/*const express = require('express');
const app = express();

app.get("/", (req, res)=>
{
    res.download('./try.txt', (err)=>
    {
        if(err)
        {
            return 
        }
        else
        {
            console.log("Succesfully!");
        }
    }); 
});

app.listen(3000, ()=>
{
    console.log("Server running");
});*/
