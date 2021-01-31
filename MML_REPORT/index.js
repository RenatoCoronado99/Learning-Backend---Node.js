const path = require("path");
const fs = require("fs");
const data = fs.readFileSync(
    path.join(__dirname + `/MML_Report_20210128_122421.txt`),
    "utf8"
);
//const array = data.split('---    END');
const array = splitAndRemoveEmptyElements(data, "DSP SFP:;\r\n").filter((el) =>
{
   return !el.includes("Ne is not connected.") && !el.includes("NE response timeout!");
});

let list = [];
for(let i=0; i<array.length; i++)
{
   let prueba = splitAndRemoveEmptyElements(array[i], "\r\n");
   let nodeName = prueba[0];
   list = list.concat(mappingToObjects(prueba, nodeName));
   prueba = prueba.slice(prueba.indexOf("(Number of results = 50)"));
   while(prueba.includes("To be continued..."))
   {
      list = list.concat(mappingToObjects(prueba, nodeName));
      prueba = prueba.slice(prueba.indexOf("To be continued...") + 1);
   }
}

const express = require("express");
const app = express();
const router = express.Router();
router.use(express.static("./public"))
    .use(express.json())
    .use(express.urlencoded({ extended: true }));
app.use(router);
const PORT = 8080;
app.listen(PORT, ()=>
{
   console.log(`Running on port ${PORT}`);
});

app.get("/", (req, res)=>
{
   const data = fs.readFileSync(
       path.join(__dirname + `/MML_Report_20210128_122421.txt`),
       "utf8"
   );
   //const array = data.split('---    END');
   const array = splitAndRemoveEmptyElements(data, "DSP SFP:;\r\n").filter((el) =>
   {
      return !el.includes("Ne is not connected.") && !el.includes("NE response timeout!");
   });

   let list = [];
   for(let i=0; i<array.length; i++)
   {
      let prueba = splitAndRemoveEmptyElements(array[i], "\r\n");
      let nodeName = prueba[0];
      list = list.concat(mappingToObjects(prueba, nodeName));
      prueba = prueba.slice(prueba.indexOf("(Number of results = 50)"));
      while(prueba.includes("To be continued..."))
      {
         list = list.concat(mappingToObjects(prueba, nodeName));
         prueba = prueba.slice(prueba.indexOf("To be continued...") + 1);
      }
   }

   const Excel = require("exceljs");
   let workbook = new Excel.Workbook();
   let worksheet = workbook.addWorksheet("Nodos");
   worksheet.columns = [
      {header: "Nodo", key: "node"},
      { header: "Tx Optical Power dBm", key: "txOpticaldbm"},
      { header: "Tx Optical Power microwatts", key: "txOpticalmw"}
   ];
   worksheet.columns.forEach((column) => {
      column.width = column.header.length < 12 ? 12 : column.header.length;
   });
   worksheet.getRow(1).font = { bold: true };
   list.forEach((el, index, array)=>
   {
      array[index]["TxOpticaldBm"] = parseInt(array[index]['TX optical power(0.01dBm)']) * 0.01;
      array[index]["TxOpticalMw"] = parseInt(array[index]['TX optical power(0.1microwatt)']) * 0.1;
      worksheet.addRow({
         node: el["Nodo"],
         txOpticaldbm: el['TxOpticaldBm'],
         txOpticalmw: el["TxOpticalMw"]
      });
   });
   res.setHeader(
       "Content-Type",
       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
   );
   res.setHeader(
       "Content-Disposition",
       "attachment; filename=" + "nodos.xlsx"
   );

   return workbook.xlsx.write(res).then(function () {
      res.status(200).end();
   });
});

function mappingToObjects(text, nodeName)
{
   let index = text.indexOf("--------------------------------------") + 1;
   const features = text[index].split("  ");
   let objects = [];
   index++;
   while (!text[index].includes("Number of results ="))
   {
      const registro = text[index];
      const file = splitAndRemoveEmptyElements(registro, "  ");
      file.forEach((el, index, array) => {
         array[index] = el.trim();
      });
      const obj = {};
      obj["Nodo"] = nodeName;
      for (let i = 0; i < features.length; i++) {
         obj[features[i]] = file[i];
      }
      objects.push(obj);
      index++;
   }
   return objects.filter((el)=>
   {
      return el['TX optical power(0.01dBm)'] != 'NULL';
   });
}

function splitAndRemoveEmptyElements(data, separator) {
   let args = data.split(separator);
   let filtered = args.filter((el) => {
      return el != null && el != "";
   });
   return filtered;
}

/*let prueba = splitAndRemoveEmptyElements(array[0], "\r\n");
let nodeName = prueba[0];
list = list.concat(mappingToObjects(prueba, nodeName));
prueba = prueba.slice(prueba.indexOf("(Number of results = 50)"));
while(prueba.includes("To be continued..."))
{
   list = list.concat(mappingToObjects(prueba, nodeName));
   prueba = prueba.slice(prueba.indexOf("To be continued...") + 1);
}*/
//Obtener objetos de la cadena de texto pasada
/*let index = prueba.indexOf("--------------------------------------") + 1;
const features = prueba[index].split("  ");
let objects = [];
index++;
while (!prueba[index].includes("Number of results ="))
{
   const registro = prueba[index];
   const file = splitAndRemoveEmptyElements(registro, "  ");
   file.forEach((el, index, array) => {
      array[index] = el.trim();
   });
   const obj = {};
   obj["Nodo"] = prueba[0];
   for (let i = 0; i < features.length; i++) {
      obj[features[i]] = file[i];
   }
   objects.push(obj);
   index++;
}*/
/*var newArray = mappingToObjects(prueba, prueba[0]);
console.log(newArray.length);*/