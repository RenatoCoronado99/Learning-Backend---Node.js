let _stationsRepository = null;
class StationsController {
  constructor({ StationsRepository }) {
    _stationsRepository = StationsRepository;
  }
  index(req, res) {
    let alarms = [
      "-SPtext=CELL LOGICAL CHANNEL AVAILABILITY SUPERVISION",
      "-SPtext=UtranCell_ServiceUnavailable",
      "-SPtext=UtranCell_NbapMessageFailure",
      "-SPtext=Heartbeat Failure",
      "-SPtext=Service Unavailable",
    ];
    const data = _stationsRepository.getAll(alarms);

    const Excel = require("exceljs");
    let workbook = new Excel.Workbook();
    let worksheet = workbook.addWorksheet("Estado Estaciones");
    worksheet.columns = [
      { header: "Estación", key: "station" },
      { header: "Fecha Alarma", key: "date" },
      { header: "Hora Alarma", key: "time" },
      { header: "Alarma", key: "alarm" },
    ];
    worksheet.columns.forEach((column) => {
      column.width = column.header.length < 12 ? 12 : column.header.length;
    });
    worksheet.getRow(1).font = { bold: true };
    data.forEach((e, index) => {
      worksheet.addRow({
        station: e.Station,
        date: e.Date,
        time: e.Time,
        alarm: e.SPtext,
      });
    });
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=" + "estaciones.xlsx"
    );

    return workbook.xlsx.write(res).then(function () {
      res.status(200).end();
    });
  }
}
module.exports = StationsController;
