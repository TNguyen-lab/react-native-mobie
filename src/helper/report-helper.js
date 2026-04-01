import { REPORT_TYPE } from "../ultis/constant";
import * as _dateHelper from "../helper/date-helper";
import * as _parseHelper from "../helper/parse-helper";
export const selectMultiVehicle = (reportType) => {
  var reportMultiVehicle = [
    REPORT_TYPE.Power,
    REPORT_TYPE.DriveTime,
    REPORT_TYPE.RunTime,
    REPORT_TYPE.OverSpeed,
    REPORT_TYPE.Stop,
    REPORT_TYPE.Total,
    REPORT_TYPE.TotalByVehicle,
    REPORT_TYPE.AirCondi,
    REPORT_TYPE.Door,
    REPORT_TYPE.FuelCurrent,
    REPORT_TYPE.FuelPerform,
    REPORT_TYPE.FuelThef,
    REPORT_TYPE.FuelRefill,
    REPORT_TYPE.BenHistory,
  ];
  if (reportMultiVehicle.indexOf(reportType) >= 0) return true;
  else return false;
};
export const generateColumn = (reportType) => {
  switch (reportType) {
    case REPORT_TYPE.Total:
      return columnTotal;
    case REPORT_TYPE.Power:
      return columnPower;
    case REPORT_TYPE.Stop:
      return columnStop;
    case REPORT_TYPE.RouteReport:
      return columnRoute;
    case REPORT_TYPE.Speed:
      return columnSpeed;
    case REPORT_TYPE.OverSpeed:
      return columnOverSpeed;
    case REPORT_TYPE.DriveTime:
      return columnDriveTime;
    case REPORT_TYPE.TotalByVehicle:
      return columnTotalByVehicle;
    case REPORT_TYPE.Door:
      return columnDoor;
    case REPORT_TYPE.BenHistory:
      return columnBenHistory;
    case REPORT_TYPE.AirCondi:
      return columnAirCondi;
    case REPORT_TYPE.FuelCurrent:
      return columnFuelCurrent;
    case REPORT_TYPE.FuelRefill:
      return columnFuelRefill;
    case REPORT_TYPE.FuelPerform:
      return columnFuelPerform;
    case REPORT_TYPE.TempCurrent:
      return columnTempCurrent;
    case REPORT_TYPE.TempHistory:
      return columnTempHistory;
    case REPORT_TYPE.WeightCurrent:
      return columnWeightCurrent;
    case REPORT_TYPE.WeightHistory:
      return columnWeightHistory;
  }
};
const columnTotal = [
  // {
  //   title: "TT",
  //   dataIndex: "id",
  //   width: "50",
  //   key: "id",
  //   render: (_, record, index) => {
  //     return <span>{index + 1}</span>;
  //   },
  // },
  {
    title: "Ngày",
    dataIndex: "reportDate",
    key: "reportDate",
    align: "center",
    render: (_) => {
      return <span>{_dateHelper.parseDate(_)}</span>;
    },
  },
  {
    title: "Biển kiểm soát",
    dataIndex: "plate",
    key: "plate",
  },
  {
    title: "Bắt đầu",
    dataIndex: "startDriveTime",
    key: "startDriveTime",
    align: "center",
    render: (_) => {
      return <span>{_dateHelper.parseTime(_)}</span>;
    },
  },
  {
    title: "Kết thúc",
    dataIndex: "endDriveTime",
    key: "endDriveTime",
    align: "center",
    render: (_) => {
      return <span>{_dateHelper.parseTime(_)}</span>;
    },
  },
  {
    title: "Quãng đường (km)",
    dataIndex: "totalDis",
    key: "totalDis",
    align: "center",
    render: (_) => {
      return <span>{_parseHelper.formatDis(_)}</span>;
    },
  },
  {
    title: "Thời gian dừng đỗ",
    dataIndex: "stopTime",
    key: "stopTime",
    align: "center",
    render: (_) => {
      return <span>{_dateHelper.parseHoursAndMinutes(_)}</span>;
    },
  },
  {
    title: "Thời gian bật máy",
    dataIndex: "powerTime",
    key: "powerTime",
    align: "center",
    render: (_) => {
      return <span>{_dateHelper.parseHoursAndMinutes(_)}</span>;
    },
  },
  {
    title: "Vượt tốc độ (lần)",
    dataIndex: "overSpeedCount",
    key: "overSpeedCount",
    align: "center",
  },
  {
    title: "Thời gian bật điều hòa",
    dataIndex: "airCondiTime",
    key: "airCondiTime",
    align: "center",
    render: (_) => {
      return <span>{_dateHelper.parseHoursAndMinutes(_)}</span>;
    },
  },
  {
    title: "Tiêu thụ nhiên liệu",
    dataIndex: "fuelRefill",
    key: "fuelRefill",
    align: "center",
  },
  {
    title: "Tiếp nhiên liệu",
    dataIndex: "fuelTheft",
    key: "fuelTheft",
    align: "center",
  },
];
const columnPower = [
  // {
  //   title: "TT",
  //   dataIndex: "id",
  //   width: "30px",
  //   key: "id",
  //   align: "center",
  //   render: (_, record, index) => {
  //     return <span>{index + 1}</span>;
  //   },
  // },
  {
    title: "Biển số xe",
    dataIndex: "plate",
    key: "plate",
    align: "center",
    width: "100px",
  },
  {
    title: "Thời điểm bật",
    dataIndex: "start",
    key: "start",
    align: "center",
    render: (_) => {
      return <span>{_dateHelper.parseDatetime(_)}</span>;
    },
  },
  {
    title: "Tọa độ bật",
    dataIndex: "startCoor",
    key: "startCoor",
    align: "center",
  },
  {
    title: "Vị trí bật",
    dataIndex: "startLoc",
    key: "startLoc",
    align: "center",
  },
  {
    title: "Thời điểm tắt",
    dataIndex: "end",
    key: "end",
    align: "center",
    render: (_) => {
      return <span>{_dateHelper.parseDatetime(_)}</span>;
    },
  },
  {
    title: "Tọa độ tắt",
    dataIndex: "endCoor",
    key: "endCoor",
    align: "center",
  },
  {
    title: "Vị trí tắt",
    dataIndex: "endLoc",
    key: "endLoc",
    align: "center",
  },
  {
    title: "Tổng thời gian",
    dataIndex: "totalTime",
    key: "totalTime",
    align: "center",
    render: (_) => {
      return <span>{_dateHelper.parseHoursAndMinutes(_)}</span>;
    },
  },
  {
    title: "Tổng quãng đường",
    dataIndex: "totalDis",
    key: "totalDis",
    align: "center",
    render: (_) => {
      return <span>{_parseHelper.formatDis(_)}</span>;
    },
  },
];
const columnStop = [
  // {
  //   title: "TT",
  //   dataIndex: "id",
  //   width: "30px",
  //   key: "id",
  //   align: "center",
  //   render: (_, record, index) => {
  //     return <span>{index + 1}</span>;
  //   },
  // },
  {
    title: "Biển số xe",
    dataIndex: "plate",
    key: "plate",
    align: "center",
    width: "100px",
  },
  {
    title: "Họ tên lái xe",
    dataIndex: "driverName",
    key: "driverName",
    align: "center",
  },
  {
    title: "Số GPLX",
    dataIndex: "driverNo",
    key: "driverNo",
    align: "center",
  },
  {
    title: "Loại hình hoạt động",
    dataIndex: "businessType",
    key: "businessType",
    align: "center",
  },
  {
    title: "Thời điểm dừng đỗ",
    dataIndex: "start",
    key: "start",
    align: "center",
    render: (text, record) => <span>{_dateHelper.parseDatetime(text)}</span>,
  },
  {
    title: "Thời gian dừng đỗ (phút)",
    dataIndex: "totalTime",
    key: "totalTime",
    align: "center",
    render: (text, record) => (
      <span>{_dateHelper.parseHoursAndMinutes(text)}</span>
    ),
  },
  {
    title: "Tọa độ dừng đỗ",
    dataIndex: "coor",
    key: "coor",
    align: "center",
    render: (text, record) => <span>{text}</span>,
  },
  {
    title: "Địa điểm dừng đỗ",
    dataIndex: "loc",
    key: "loc",
    align: "center",
    render: (text, record) => (
      <span>
        {record.lat},{record.lng}
      </span>
    ),
  },
];
const columnRoute = [
  // {
  //   title: "TT",
  //   dataIndex: "id",
  //   width: "30px",
  //   key: "id",
  //   align: "center",
  //   render: (_, record, index) => {
  //     return <span>{index + 1}</span>;
  //   },
  // },
  {
    title: "Thời điểm",
    dataIndex: "time",
    key: "time",
    align: "center",
    render: (text, record) => <span>{_dateHelper.parseDatetime(text)}</span>,
  },
  {
    title: "Vận tốc",
    dataIndex: "vel",
    key: "vel",
    align: "center",
  },
  {
    title: "Quãng đường",
    dataIndex: "dis",
    key: "dis",
    align: "center",
  },

  {
    title: "Tọa độ",
    dataIndex: "coor",
    key: "coor",
    align: "center",
  },
  {
    title: "Địa điểm dừng đỗ",
    dataIndex: "loc",
    key: "loc",
    align: "center",
  },
];
const columnSpeed = [
  // {
  //   title: "TT",
  //   dataIndex: "id",
  //   width: "30px",
  //   key: "id",
  //   align: "center",
  //   render: (_, record, index) => {
  //     return <span>{index + 1}</span>;
  //   },
  // },
  {
    title: "Thời điểm",
    dataIndex: "time",
    key: "time",
    align: "center",
    render: (text, record) => <span>{_dateHelper.parseDatetime(text)}</span>,
  },
  {
    title: "Các tốc độ (km/h)",
    dataIndex: "speeds",
    key: "speeds",
    align: "center",
  },
];
const columnOverSpeed = [
  // {
  //   title: "TT",
  //   dataIndex: "id",
  //   width: "30px",
  //   key: "id",
  //   align: "center",
  //   render: (_, record, index) => {
  //     return <span>{index + 1}</span>;
  //   },
  // },
  {
    title: "Biển kiểm soát",
    dataIndex: "plate",
    key: "plate",
    align: "center",
  },
  {
    title: "Họ tên lái xe",
    dataIndex: "driverName",
    key: "driverName",
    align: "center",
  },
  {
    title: "Số GPLX",
    dataIndex: "driverNo",
    key: "driverNo",
    align: "center",
  },
  {
    title: "Loại hình hoạt động",
    dataIndex: "businessType",
    key: "businessType",
    align: "center",
  },
  {
    title: "Thời điểm",
    dataIndex: "start",
    key: "start",
    align: "center",
    render: (text, record) => <span>{_dateHelper.parseDatetime(text)}</span>,
  },
  {
    title: "Tốc độ trung bình khi quá tốc độ (km/h)",
    dataIndex: "avgSpeed",
    key: "avgSpeed",
    align: "center",
  },
  {
    title: "Tốc độ lớn nhất (km/h)",
    dataIndex: "maxSpeed",
    key: "maxSpeed",
    align: "center",
  },
  {
    title: "Tốc độ cho phép (km/h)",
    dataIndex: "allowSpeed",
    key: "allowSpeed",
    align: "center",
  },
  {
    title: "Tọa độ quá tốc độ",
    dataIndex: "startCoor",
    key: "startCoor",
    align: "center",
  },
  {
    title: "Địa điểm quá tốc độ",
    dataIndex: "startLoc",
    key: "startLoc",
    align: "center",
  },
];
const columnDriveTime = [
  // {
  //   title: "TT",
  //   dataIndex: "id",
  //   width: "30px",
  //   key: "id",
  //   align: "center",
  //   render: (_, record, index) => {
  //     return <span>{index + 1}</span>;
  //   },
  // },
  {
    title: "Biển kiểm soát",
    dataIndex: "plate",
    key: "plate",
    align: "center",
  },
  {
    title: "Họ tên lái xe",
    dataIndex: "driverName",
    key: "driverName",
    align: "center",
  },
  {
    title: "Số GPLX",
    dataIndex: "driverNo",
    key: "driverNo",
    align: "center",
  },
  {
    title: "Loại hình hoạt động",
    dataIndex: "businessType",
    key: "businessType",
    align: "center",
  },

  {
    title: "Thời điểm",
    dataIndex: "start",
    key: "start",
    align: "center",
    render: (text, record) => <span>{_dateHelper.parseDatetime(text)}</span>,
  },
  {
    title: "Tọa độ",
    dataIndex: "startCoor",
    key: "startCoor",
    align: "center",
  },
  {
    title: "Địa điểm",
    dataIndex: "startLoc",
    key: "startLoc",
    align: "center",
  },

  {
    title: "Thời điểm",
    dataIndex: "end",
    key: "end",
    align: "center",
    render: (text, record) => <span>{_dateHelper.parseDatetime(text)}</span>,
  },
  {
    title: "Tọa độ",
    dataIndex: "endCoor",
    key: "endCoor",
    align: "center",
  },
  {
    title: "Địa điểm",
    dataIndex: "endLoc",
    key: "endLoc",
    align: "center",
  },

  {
    title: "Thời gian lái xe (giờ)",
    dataIndex: "totalTime",
    key: "totalTime",
    align: "center",
    render: (text, record) => (
      <span>{_dateHelper.parseHoursAndMinutes(text)}</span>
    ),
  },
  {
    title: "Quãng đường",
    dataIndex: "totalDis",
    key: "totalDis",
    align: "center",
    render: (text, record) => <span>{(text / 1000).toFixed(2)}</span>,
  },
];
var columnTotalByVehicle = [
  // {
  //   title: "TT",
  //   dataIndex: "id",
  //   width: "30px",
  //   key: "id",
  //   align: "center",
  //   render: (_, record, index) => {
  //     return <span>{index + 1}</span>;
  //   },
  // },
  {
    title: "Biển kiểm soát",
    dataIndex: "plate",
    key: "plate",
    align: "center",
  },
  {
    title: "Loại hình hoạt động",
    dataIndex: "businessType",
    key: "businessType",
    align: "center",
  },
  {
    title: "Quãng đường",
    dataIndex: "totalDis",
    key: "totalDis",
    align: "center",
    render: (text, record) => <span>{(text / 1000).toFixed(2)}</span>,
  },

  {
    title: "Tỷ lệ quá tốc độ từ 5 km/h đến dưới 10 km/h",
    dataIndex: "overSpeed5To10Percent",
    key: "overSpeed5To10Percent",
    align: "center",
  },
  {
    title: "Tỷ lệ quá tốc độ từ 10 km/h đến dưới 20 km/h",
    dataIndex: "overSpeed10To20Percent",
    key: "overSpeed10To20Percent",
    align: "center",
  },
  {
    title: "Tỷ lệ quá tốc độ từ 20 đến 35 km/h",
    dataIndex: "overSpeed20To35Percent",
    key: "overSpeed20To35Percent",
    align: "center",
  },
  {
    title: "Tỷ lệ quá tốc độ trên 35 km/h",
    dataIndex: "overSpeed35Percent",
    key: "overSpeed35Percent",
    align: "center",
  },

  {
    title: "Số lần quá tốc độ từ 5 km/h đến dưới 10 km/h",
    dataIndex: "overSpeed5To10Count",
    key: "overSpeed5To10Count",
    align: "center",
  },
  {
    title: "Số lần quá tốc độ từ 10 km/h đến dưới 20 km/h",
    dataIndex: "overSpeed10To20Count",
    key: "overSpeed10To20Count",
    align: "center",
  },
  {
    title: "Số lần quá tốc độ từ 20 đến 35 km/h",
    dataIndex: "overSpeed20To35Count",
    key: "overSpeed20To35Count",
    align: "center",
  },
  {
    title: "Số lần quá tốc độ trên 35 km/h",
    dataIndex: "overSpeed35Count",
    key: "overSpeed35Count",
    align: "center",
  },

  {
    title: "Tổng số lần dừng đỗ",
    dataIndex: "stopCount",
    key: "stopCount",
    align: "center",
  },
];
const columnDoor = [
  // {
  //   title: "TT",
  //   dataIndex: "id",
  //   width: "30px",
  //   key: "id",
  //   align: "center",
  //   render: (_, record, index) => {
  //     return <span>{index + 1}</span>;
  //   },
  // },
  {
    title: "Biển kiểm soát",
    dataIndex: "plate",
    key: "plate",
    align: "center",
  },
  {
    title: "Thời điểm bật",
    dataIndex: "start",
    key: "start",
    align: "center",
    render: (text, record) => <span>{_dateHelper.parseDatetime(text)}</span>,
  },
  {
    title: "Tọa độ bật",
    dataIndex: "startCoor",
    key: "startCoor",
    align: "center",
  },
  {
    title: "Địa điểm bật",
    dataIndex: "startLoc",
    key: "startLoc",
    align: "center",
  },
  {
    title: "Thời điểm tắt",
    dataIndex: "end",
    key: "end",
    align: "center",
    render: (text, record) => <span>{_dateHelper.parseDatetime(text)}</span>,
  },
  {
    title: "Tọa độ tắt",
    dataIndex: "endCoor",
    key: "endCoor",
    align: "center",
  },
  {
    title: "Địa điểm tắt",
    dataIndex: "endLoc",
    key: "endLoc",
    align: "center",
  },
  {
    title: "Thời gian",
    dataIndex: "totalTime",
    key: "totalTime",
    align: "center",
    render: (text, record) => (
      <span>{_dateHelper.parseHoursAndMinutes(text)}</span>
    ),
  },
];
const columnBenHistory = [
  // {
  //   title: "TT",
  //   dataIndex: "id",
  //   width: "30px",
  //   key: "id",
  //   align: "center",
  //   render: (_, record, index) => {
  //     return <span>{index + 1}</span>;
  //   },
  // },
  {
    title: "Biển kiểm soát",
    dataIndex: "plate",
    key: "plate",
    align: "center",
  },
  {
    title: "Thời điểm nâng",
    dataIndex: "start",
    key: "start",
    align: "center",
    render: (text, record) => <span>{_dateHelper.parseDatetime(text)}</span>,
  },

  {
    title: "Thời điểm hạ",
    dataIndex: "end",
    key: "end",
    align: "center",
    render: (text, record) => <span>{_dateHelper.parseDatetime(text)}</span>,
  },
  {
    title: "Tổng thời gian",
    dataIndex: "totalTime",
    key: "totalTime",
    align: "center",
    render: (text, record) => (
      <span>{_dateHelper.parseHoursAndMinutes(text)}</span>
    ),
  },
  {
    title: "Tọa độ",
    dataIndex: "startCoor",
    key: "startCoor",
    align: "center",
  },
  {
    title: "Vị trí",
    dataIndex: "startLoc",
    key: "startLoc",
    align: "center",
  },
];
const columnAirCondi = [
  // {
  //   title: "TT",
  //   dataIndex: "id",
  //   width: "30px",
  //   key: "id",
  //   align: "center",
  //   render: (_, record, index) => {
  //     return <span>{index + 1}</span>;
  //   },
  // },
  {
    title: "Biển kiểm soát",
    dataIndex: "plate",
    key: "plate",
    align: "center",
  },
  {
    title: "Thời điểm bật",
    dataIndex: "start",
    key: "start",
    align: "center",
    render: (text, record) => <span>{_dateHelper.parseDatetime(text)}</span>,
  },
  {
    title: "Tọa độ bật",
    dataIndex: "startCoor",
    key: "startCoor",
    align: "center",
  },
  {
    title: "Địa điểm bật",
    dataIndex: "startLoc",
    key: "startLoc",
    align: "center",
  },
  {
    title: "Thời điểm tắt",
    dataIndex: "end",
    key: "end",
    align: "center",
    render: (text, record) => <span>{_dateHelper.parseDatetime(text)}</span>,
  },
  {
    title: "Tọa độ tắt",
    dataIndex: "endCoor",
    key: "endCoor",
    align: "center",
  },
  {
    title: "Địa điểm tắt",
    dataIndex: "endLoc",
    key: "endLoc",
    align: "center",
  },
  {
    title: "Thời gian",
    dataIndex: "totalTime",
    key: "totalTime",
    align: "center",
    render: (text, record) => (
      <span>{_dateHelper.parseHoursAndMinutes(text)}</span>
    ),
  },
];
const columnFuelCurrent = [
  // {
  //   title: "TT",
  //   dataIndex: "id",
  //   width: "30px",
  //   key: "id",
  //   align: "center",
  //   render: (_, record, index) => {
  //     return <span>{index + 1}</span>;
  //   },
  // },
  {
    title: "Biển kiểm soát",
    dataIndex: "plate",
    key: "plate",
    align: "center",
  },
  {
    title: "Thời gian",
    dataIndex: "time",
    key: "time",
    align: "center",
    render: (text, record) => <span>{_dateHelper.parseDatetime(text)}</span>,
  },
  {
    title: "Địa điểm",
    dataIndex: "loc",
    key: "loc",
    align: "center",
  },

  {
    title: "Nhiên liệu",
    dataIndex: "fuel",
    key: "fuel",
    align: "center",
    render: (text, record) => <span>{Math.round((text || 0) * 10) / 10}</span>,
  },
];
const columnFuelRefill = [
  // {
  //   title: "TT",
  //   dataIndex: "id",
  //   width: "30px",
  //   key: "id",
  //   align: "center",
  //   render: (_, record, index) => {
  //     return <span>{index + 1}</span>;
  //   },
  // },
  {
    title: "Biển kiểm soát",
    dataIndex: "plate",
    key: "plate",
    align: "center",
  },
  {
    title: "Thời điểm bắt đầu",
    dataIndex: "start",
    key: "start",
    align: "center",
    render: (text, record) => <span>{_dateHelper.parseDatetime(text)}</span>,
  },
  {
    title: "Thời điểm tiếp xong",
    dataIndex: "end",
    key: "end",
    align: "center",
    render: (text, record) => <span>{_dateHelper.parseDatetime(text)}</span>,
  },
  {
    title: "Nhiên liệu",
    dataIndex: "endFuel",
    key: "endFuel",
    align: "center",
    render: (text, record) => <span>{Math.round((text || 0) * 10) / 10}</span>,
  },
  {
    title: "Ban đầu (lít)",
    dataIndex: "startFuel",
    key: "startFuel",
    align: "center",
    render: (text, record) => <span>{Math.round((text || 0) * 10) / 10}</span>,
  },
  {
    title: "Tiếp thêm (lít)",
    dataIndex: "fuelPlus",
    key: "fuelPlus",
    align: "center",
    render: (text, record) => <span>{Math.round((text || 0) * 10) / 10}</span>,
  },
  {
    title: "Địa điểm tiếp nhiên liệu",
    dataIndex: "endLoc",
    key: "endLoc",
    align: "center",
  },
];
const columnFuelPerform = [
  // {
  //   title: "TT",
  //   dataIndex: "id",
  //   width: "30px",
  //   key: "id",
  //   align: "center",
  //   render: (_, record, index) => {
  //     return <span>{index + 1}</span>;
  //   },
  // },
  {
    title: "Biển kiểm soát",
    dataIndex: "plate",
    key: "plate",
    align: "center",
  },
  {
    title: "Ngày",
    dataIndex: "reportDate",
    key: "reportDate",
    align: "center",
    render: (text, record) => <span>{_dateHelper.parseDate(text)}</span>,
  },
  {
    title: "Quãng đường",
    dataIndex: "totalDis",
    key: "totalDis",
    align: "center",
    render: (text, record) => <span>{(text / 1000).toFixed(2)}</span>,
  },

  {
    title: "Bắt đầu",
    dataIndex: "startPowerTime",
    key: "startPowerTime",
    align: "center",
    render: (text, record) => <span>{_dateHelper.parseDatetime(text)}</span>,
  },
  {
    title: "Kết thúc",
    dataIndex: "endPowerTime",
    key: "endPowerTime",
    align: "center",
    render: (text, record) => <span>{_dateHelper.parseDatetime(text)}</span>,
  },
  {
    title: "Tổng thời gian",
    dataIndex: "totalTime",
    key: "totalTime",
    align: "center",
    render: (text, record) => (
      <span>{_dateHelper.parseHoursAndMinutes(text)}</span>
    ),
  },

  {
    title: "Bắt đầu",
    dataIndex: "startFuel",
    key: "startFuel",
    align: "center",
    render: (text, record) => <span>{(text || 0).toFixed(1)}</span>,
  },
  {
    title: "Kết thúc",
    dataIndex: "endFuel",
    key: "endFuel",
    align: "center",
    render: (text, record) => <span>{(text || 0).toFixed(1)}</span>,
  },
  {
    title: "Tổng Tiêu thụ",
    dataIndex: "fuelConsume",
    key: "fuelConsume",
    render: (text, record) => <span>{(text || 0).toFixed(1)}</span>,
    align: "center",
  },

  {
    title: "Số lít",
    dataIndex: "fuelRefill",
    key: "fuelRefill",
    align: "center",
    render: (text, record) => <span>{(text || 0).toFixed(1)}</span>,
  },
  {
    title: "Số lần",
    dataIndex: "fuelRefillCount",
    key: "fuelRefillCount",
    align: "center",
  },

  {
    title: "HS quãng đường(lít/km)",
    dataIndex: "disPerform",
    key: "disPerform",
    align: "center",
    render: (text, record) => <span>{((text || 0) / 100).toFixed(2)}</span>,
  },
  {
    title: "HS thời gian(lít/giờ)",
    dataIndex: "timePerform",
    key: "timePerform",
    align: "center",
  },
  {
    title: "Xem biểu đồ",
    dataIndex: "endLoc",
    key: "endLoc",
    align: "center",
  },
];
const columnTempCurrent = [
  // {
  //   title: "TT",
  //   dataIndex: "id",
  //   width: "30px",
  //   key: "id",
  //   align: "center",
  //   render: (_, record, index) => {
  //     return <span>{index + 1}</span>;
  //   },
  // },
  {
    title: "Biển kiểm soát",
    dataIndex: "plate",
    key: "plate",
    align: "center",
  },
  {
    title: "Thời gian",
    dataIndex: "time",
    key: "time",
    align: "center",
    render: (text, record) => <span>{_dateHelper.parseDatetime(text)}</span>,
  },
  {
    title: "Địa điểm",
    dataIndex: "loc",
    key: "loc",
    align: "center",
  },

  {
    title: "Nhiệt độ(C)",
    dataIndex: "temp",
    key: "temp",
    align: "center",
  },
];
const columnTempHistory = [
  // {
  //   title: "TT",
  //   dataIndex: "id",
  //   width: "30px",
  //   key: "id",
  //   align: "center",
  //   render: (_, record, index) => {
  //     return <span>{index + 1}</span>;
  //   },
  // },
  {
    title: "Biển kiểm soát",
    dataIndex: "plate",
    key: "plate",
    align: "center",
  },
  {
    title: "Thời gian",
    dataIndex: "time",
    key: "time",
    align: "center",
    render: (text, record) => <span>{_dateHelper.parseDatetime(text)}</span>,
  },
  {
    title: "Địa điểm",
    dataIndex: "loc",
    key: "loc",
    align: "center",
  },

  {
    title: "Nhiệt độ(C)",
    dataIndex: "temp",
    key: "temp",
    align: "center",
  },
];
const columnWeightCurrent = [
  // {
  //   title: "TT",
  //   dataIndex: "id",
  //   width: "30px",
  //   key: "id",
  //   align: "center",
  //   render: (_, record, index) => {
  //     return <span>{index + 1}</span>;
  //   },
  // },
  {
    title: "Biển kiểm soát",
    dataIndex: "plate",
    key: "plate",
    align: "center",
  },
  {
    title: "Thời gian",
    dataIndex: "time",
    key: "time",
    align: "center",
    render: (text, record) => <span>{_dateHelper.parseDatetime(text)}</span>,
  },
  {
    title: "Địa điểm",
    dataIndex: "loc",
    key: "loc",
    align: "center",
  },

  {
    title: "Nhiệt độ(C)",
    dataIndex: "temp",
    key: "temp",
    align: "center",
  },
];
const columnWeightHistory = [
  // {
  //   title: "TT",
  //   dataIndex: "id",
  //   width: "30px",
  //   key: "id",
  //   align: "center",
  //   render: (_, record, index) => {
  //     return <span>{index + 1}</span>;
  //   },
  // },
  {
    title: "Biển kiểm soát",
    dataIndex: "plate",
    key: "plate",
    align: "center",
  },
  {
    title: "Thời gian",
    dataIndex: "time",
    key: "time",
    align: "center",
    render: (text, record) => <span>{_dateHelper.parseDatetime(text)}</span>,
  },
  {
    title: "Địa điểm",
    dataIndex: "loc",
    key: "loc",
    align: "center",
  },

  {
    title: "Tải trọng (Kg)",
    dataIndex: "temp",
    key: "temp",
    align: "center",
  },
];
