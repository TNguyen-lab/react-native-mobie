import { permissionCodeConstant } from "./permissionCodeConstant";

export const SimType = {
  VINAPPHONE: "VINAPPHONE",
  VIETTEL: "VIETTEL",
  MOBIFONE: "MOBIFONE",
};
export const DeviceType = {
  CAMERA: "CAMERA",
  GPS: "GPS",
};
export const FirmwareVersion = {
  V1: "V1",
  V2: "V2",
  V3: "V3",
};
export const DeviceStatus = {
  ACTIVE: "ACTIVE",
  LOCKED: "LOCKED",
};
export const SimStatus = {
  ACTIVE: "ACTIVE",
  LOCKED: "LOCKED",
};
export const VehicleOptionTypeCode = {
  VEHICLE_TYPE: "VEHICLE_TYPE",
  BUSINESS_TYPE: "BUSINESS_TYPE",
};
export const STORAGE_KEY = {
  USER: "USER",
  TOKEN: "TOKEN",
  VEHICLES: "VEHICLES",
  PERMISSION: "PERMISSION",
  FOOTER_ACTIVE: "FOOTER_ACTIVE",
  BRANCH_CHANGE: "BRANCH_CHANGE",
  BRANCHS: "BRANCHS",
  COMPANY_SETTING: "COMPANY_SETTING",
  SUSBSCRIPTION_ID: "SUSBSCRIPTION_ID",
  LANGUAGE: "LANGUAGE",
  DEVICE_TOKEN: "DEVICE_TOKEN",
  COMPANY: "COMPANY",
  REDIRECTAFTERLOGIN: "REDIRECT_AFTER_LOGIN",
};
export const VEHICLE_STATE = {
  RUNNING: "RUNNING",
  STOP: "STOP",
  TURN_ON: "TURN_ON",
  LOST_GPS: "LOST_GPS",
  LOST_GPRS: "LOST_GPRS",
  TOO_FAST: "TOO_FAST",
  LOST_CONNECTION: "LOST_CONNECTION",
};

export const POINT_TYPE = {
  STOP: "STOP",
};
export const REPORT_TYPE = {
  OverSpeed: "OverSpeed",
  Speed: "Speed",
  Route: "Route",
  SendData: "SendData",
  SpeedChart: "SpeedChart",
  Stop: "Stop",
  DriveTime: "DriveTime",
  Total: "Total",
  TotalByVehicle: "TotalByVehicle",
  TotalByDriver: "TotalByDriver",
  FuelHistory: "FuelHistory",
  FuelCurrent: "FuelCurrent",
  FuelPerform: "FuelPerform",
  FuelThef: "FuelThef",
  FuelRefill: "FuelRefill",
  Camera: "Camera",
  BenHistory: "BenHistory",
  // BenCurrent: "BenCurrent",
  WeightHistory: "WeightHistory",
  WeightCurrent: "WeightCurrent",
  TempHistory: "TempHistory",
  TempCurrent: "TempCurrent",
  Door: "Door",
  AirCondi: "AirCondi",
  RoutePoint: "RoutePoint",
  RouteReport: "RouteReport",
  RouteKml: "RouteKml",
  ConcreteCurrent: "ConcreteCurrent",
  ConcreteTotal: "ConcreteTotal",
  CameraCurrent: "CameraCurrent",
  GpsData: "GpsData",
  DriverInfoData: "DriverInfoData",
  VoltageData: "VoltageData",
  SerialVelData: "SerialVelData",
  Power: "Power",
  RunMile: "RunMile",
  RunTime: "RunTime",
  Point: "Point",
  Point2Point: "Point2Point",
  ActivateDetail: "ActivateDetail",
  DataLog: "DataLog",
  ReportLog: "ReportLog",
  SystemLog: "SystemLog",
};
export const PAGINATION = {
  page: 1,
  limit: 7,
  sortBy: null,
  totalRecord: 0,
};
export const PAGINATIONMAX = {
  page: 1,
  limit: 10,
  sortBy: null,
  totalRecord: 0,
};
export const breakdownType = {
  assigned: "assigned",
  hasOpened: "hasOpened",
  Option: [
    {
      label: "constant.breakdownType.assigned",
      value: "assigned",
      permissionCode: permissionCodeConstant.ticket_view_list,
    },
    {
      label: "constant.breakdownType.hasOpened",
      value: "hasOpened",
      permissionCode: permissionCodeConstant.breakdown_view_list,
    },
  ],
};

export const breakdownTicketStatus = {
  new: "new",
  inProgress: "inProgress",
  cloesed: "cloesed",
  overdue: "overdue",
  completed: "completed",
  Option: [
    { label: "constant.ticketStatus.new", value: "new" },
    { label: "constant.ticketStatus.inProgress", value: "inProgress" },
    { label: "constant.ticketStatus.overdue", value: "overdue" },
    { label: "constant.ticketStatus.completed", value: "completed" },
    { label: "constant.ticketStatus.cloesed", value: "cloesed" },
  ],
};

export const breakdownUserStatus = {
  new: "new",
  assigned: "assigned",
  inProgress: "inProgress",
  awaiting: "awaiting",
  accepted: "accepted",
  rejected: "rejected",
  cancelled: "cancelled",
  completed: "completed",
  replacement: "replacement",
  experimentalFix: "experimentalFix",
  WCA: "WCA",
  WWA: "WWA",
  cloesed: "cloesed",
  reassignment: "reassignment",
  requestForSupport: "requestForSupport",
  reopen: "reopen",
  pending_approval: "pending_approval",
  approved: "approved",
  submitted: "submitted",
  spareReplace: "spareReplace",
  Option: [
    {
      label: "constant.breakdownUserStatus.new",
      value: "new",
      color: "#21d9a4",
    },
    {
      label: "constant.breakdownUserStatus.assigned",
      value: "assigned",
      color: "#21d9a4",
    },
    {
      label: "constant.breakdownUserStatus.reassignment",
      value: "reassignment",
      color: "#1890ff",
    },
    {
      label: "constant.breakdownUserStatus.awaiting",
      value: "awaiting",
      color: "#3AA1FF",
    },
    {
      label: "constant.breakdownUserStatus.pending_approval",
      value: "pending_approval",
      color: "#3AA1FF",
    },
    {
      label: "constant.breakdownUserStatus.inProgress",
      value: "inProgress",
      color: "#5BBD2B",
    },
    {
      label: "constant.breakdownUserStatus.accepted",
      value: "accepted",
      color: "#13c2c2",
    },
    {
      label: "constant.breakdownUserStatus.approved",
      value: "approved",
      color: "#1890ff",
    },
    {
      label: "constant.breakdownUserStatus.submitted",
      value: "submitted",
      color: "#52c41a",
    },
    {
      label: "constant.breakdownUserStatus.spareReplace",
      value: "spareReplace",
      color: "#52c41a",
    },
    {
      label: "constant.breakdownUserStatus.requestForSupport",
      value: "requestForSupport",
      color: "#faad14",
    },
    {
      label: "constant.breakdownUserStatus.WCA",
      value: "WCA",
      color: "#faad14",
    },
    {
      label: "constant.breakdownUserStatus.WWA",
      value: "WWA",
      color: "#faad14",
    },
    {
      label: "constant.breakdownUserStatus.experimentalFix",
      value: "experimentalFix",
      color: "#79378B",
    },
    {
      label: "constant.breakdownUserStatus.completed",
      value: "completed",
      color: "#52c41a",
    },
    {
      label: "constant.breakdownUserStatus.cloesed",
      value: "cloesed",
      color: "#8c8c8c",
    },
    {
      label: "constant.breakdownUserStatus.reopen",
      value: "reopen",
      color: "#1890ff",
    },
    {
      label: "constant.breakdownUserStatus.rejected",
      value: "rejected",
      color: "#ff4d4f",
    },
    {
      label: "constant.breakdownUserStatus.cancelled",
      value: "cancelled",
      color: "#ff4d4f",
    },
    {
      label: "constant.breakdownUserStatus.replacement",
      value: "replacement",
      color: "#ff4d4f",
    },
  ],
};

export const loginStatusBreakdownAssignUser = {
  logIn: "logIn",
  logOut: "logOut",
  Option: [
    { label: "constant.loginStatusBreakdownAssignUser.logIn", value: "logIn" },
    {
      label: "constant.loginStatusBreakdownAssignUser.logOut",
      value: "logOut",
    },
  ],
};

export const assetType = {
  MachineEquipment: "MachineEquipment",
  MeasuringEquipment: "MeasuringEquipment",
  Facility: "Facility",
  Options: [
    {
      label: "assetMaintenance.list.search.asset_type_option.machine",
      value: 1,
    },
    {
      label: "assetMaintenance.list.search.asset_type_option.measuring",
      value: 2,
    },
    {
      label: "assetMaintenance.list.search.asset_type_option.facility",
      value: 3,
    },
  ],
};
export const assetStyle = {
  MachineEquipment: "MachineEquipment",
  MeasuringEquipment: "MeasuringEquipment",
  Facility: "Facility",
  Options: [
    {
      label: "assetMaintenance.list.search.asset_type_option.machine",
      value: 1,
    },
    {
      label: "assetMaintenance.list.search.asset_type_option.measuring",
      value: 2,
    },
    {
      label: "assetMaintenance.list.search.asset_type_option.facility",
      value: 3,
    },
  ],
};

export const answerTypeSeftDiagnosia = {
  option: "option",
  range: "range",
  options: [
    { label: "constant.answerTypeSeftDiagnosia.option", value: "option" },
    { label: "constant.answerTypeSeftDiagnosia.range", value: "range" },
  ],
};
export const FILE_EXTENSION = {
  WORD: [".doc", ".docm", ".docx", ".dot", ".dotm", ".dotx"],
  EXCEL: [
    ".xlsx",
    ".xlsm",
    ".xlsb",
    ".xltx",
    ".xltm",
    ".xls",
    ".xlt",
    ".xls",
    ".xlam",
    ".xla",
    ".xlw",
    ".xlr",
  ],
  XML: [".xml"],
  TEXT: [".txt"],
  PDF: [".pdf"],
  IMAGE: [".jpg", ".jpeg", ".png", ".gif"],
  FOLDER: "FOLDER",
};
export const progressStatus = {
  new: "new",
  raised: "raised",
  assigned: "assigned",
  inProgress: "inProgress",
  awaiting: "awaiting",
  accepted: "accepted",
  rejected: "rejected",
  cancelled: "cancelled",
  completed: "completed",
  replacement: "replacement",
  experimentalFix: "experimentalFix",
  WCA: "WCA",
  WWA: "WWA",
  cloesed: "cloesed",
  reassignment: "reassignment",
  requestForSupport: "requestForSupport",
  reopen: "reopen",
  pending_approval: "pending_approval",
  approved: "approved",
  partiallyCompleted: "partiallyCompleted",
  completeRecalibrationIssue: "completeRecalibrationIssue",
  submitted: "submitted",
  spareReplace: "spareReplace",
  Option: [
    { label: "Tạo mới", value: "new" },
    { label: "constant.progressStatus.raised", value: "raised" },
    { label: "constant.progressStatus.assigned", value: "assigned" },
    { label: "constant.progressStatus.inProgress", value: "inProgress" },
    { label: "constant.progressStatus.awaiting", value: "awaiting" },
    { label: "constant.progressStatus.accepted", value: "accepted" },
    { label: "constant.progressStatus.rejected", value: "rejected" },
    { label: "constant.progressStatus.cancelled", value: "cancelled" },
    { label: "constant.progressStatus.completed", value: "completed" },
    { label: "constant.progressStatus.replacement", value: "replacement" },
    {
      label: "constant.progressStatus.experimentalFix",
      value: "experimentalFix",
    },
    { label: "constant.progressStatus.WCA", value: "WCA" },
    { label: "constant.progressStatus.WWA", value: "WWA" },
    {
      label: "constant.progressStatus.cloesed",
      value: "cloesed",
      color: "#dde01a",
    },
    {
      label: "constant.progressStatus.reassignment",
      value: "reassignment",
      color: "red",
    },
    {
      label: "constant.progressStatus.requestForSupport",
      value: "requestForSupport",
      color: "#dde01a",
    },
    { label: "constant.progressStatus.reopen", value: "reopen" },
    { label: "Hoàn thành một phần", value: "partiallyCompleted" },
    {
      label: "Hoàn thành sự cố, hiệu chuẩn lại",
      value: "completeRecalibrationIssue",
    },
  ],
};
export const assetModelDocumentCategory = {
  instruction: "constant.assetModelDocumentCategory.instruction",
  troubleshooting: "constant.assetModelDocumentCategory.troubleshooting",
  specification: "constant.assetModelDocumentCategory.specification",
  drawing: "constant.assetModelDocumentCategory.drawing",
  other: "constant.assetModelDocumentCategory.other",
};
export const FORMAT_DATE = "DD-MM-YYYY";
export const FORMAT_DATETIME = "DD-MM-YYYY HH:mm";
export const FORMAT_MINUTE = "HH:mm";
export const FORMAT_INPUT_DATE = "YYYY-MM-DD";
export const assetModelSpareRequestCategory = {
  pending_approval: "constant.assetModelSpareRequestCategory.pending_approval",
  approved: "constant.assetModelSpareRequestCategory.approved",
  rejected: "constant.assetModelSpareRequestCategory.rejected",
  submitted: "constant.assetModelSpareRequestCategory.submitted",
  spareRequest: "constant.assetModelSpareRequestCategory.spareRequest",
  spareReplace: "constant.assetModelSpareRequestCategory.spareReplace",
};

export const priorityLevelStatus = {
  immediate: "immediate",
  emergent: "emergent",
  urgent: "urgent",
  semiUrgent: "semiUrgent",
  nonUrgent: "nonUrgent",
  Options: [
    {
      label: "constant.priorityLevelStatus.immediate",
      value: "immediate",
      color: "red",
    },
    {
      label: "constant.priorityLevelStatus.emergent",
      value: "emergent",
      color: "volcano",
    },
    {
      label: "constant.priorityLevelStatus.urgent",
      value: "urgent",
      color: "orange",
    },
    {
      label: "constant.priorityLevelStatus.semiUrgent",
      value: "semiUrgent",
      color: "purple",
    },
    {
      label: "constant.priorityLevelStatus.nonUrgent",
      value: "nonUrgent",
      color: "green",
    },
  ],
};
export const sortOrder = {
  asc: "asc",
  desc: "desc",
  Options: [
    { label: "Asc", value: "asc" },
    { label: "Desc", value: "desc" },
  ],
};

export const preventiveStatus = {
  new: "new",
  inProgress: "inProgress",
  cloesed: "cloesed",
  overdue: "overdue",
  upcoming: "upcoming",
  Option: [
    { label: "constant.preventiveStatus.new", value: "new" },
    { label: "constant.preventiveStatus.inProgress", value: "inProgress" },
    { label: "constant.preventiveStatus.overdue", value: "overdue" },
    { label: "constant.preventiveStatus.upcoming", value: "upcoming" },
    { label: "constant.preventiveStatus.history", value: "history" },
  ],
};

export const reportView = {
  summary: "summary",
  details: "details",
  Options: [
    { label: "constant.reportView.summary", value: "summary" },
    { label: "constant.reportView.details", value: "details" },
  ],
};

export const breakdownStatus = {
  new: "new",
  assigned: "assigned",
  accepted: "accepted",
  inProgress: "inProgress",
  cancelled: "cancelled",
  cloesed: "cloesed",
  rejected: "rejected",
  submitted: "submitted",
  WWA: "WWA",
  Option: [
    { label: "constant.breakdownStatus.new", value: "new", color: "#1890ff" },
    {
      label: "constant.breakdownStatus.assigned",
      value: "assigned",
      color: "#21d9a4",
    },
    { label: "constant.breakdownStatus.reopen", value: "reopen", color: "red" },
    {
      label: "constant.breakdownStatus.inProgress",
      value: "inProgress",
      color: "#5BBD2B",
    },
    {
      label: "constant.breakdownStatus.accepted",
      value: "accepted",
      color: "#13c2c2",
    },
    {
      label: "constant.breakdownStatus.completed",
      value: "completed",
      color: "#52c41a",
    },
    {
      label: "constant.breakdownStatus.rejected",
      value: "rejected",
      color: "#ff4d4f",
    },
    {
      label: "constant.breakdownStatus.cancelled",
      value: "cancelled",
      color: "#ff4d4f",
    },
    {
      label: "constant.breakdownStatus.replacement",
      value: "replacement",
      color: "#ff4d4f",
    },
    { label: "constant.breakdownStatus.WWA", value: "WWA", color: "#ff4d4f" },
    {
      label: "constant.breakdownStatus.experimentalFix",
      value: "experimentalFix",
      color: "#79378B",
    },
    {
      label: "constant.breakdownStatus.closed",
      value: "closed",
      color: "#8c8c8c",
    },
    {
      label: "constant.breakdownStatus.submitted",
      value: "submitted",
      color: "#faad14",
    },
  ],
};

export const typeReportAssetMaintenanceResquest = {
  breakdown: "breakdown",
  schedulePreventive: "schedulePreventive",
  Options: [
    {
      label: "constant.typeReportAssetMaintenanceResquest.breakdown",
      value: "breakdown",
    },
    {
      label: "constant.typeReportAssetMaintenanceResquest.schedulePreventive",
      value: "schedulePreventive",
    },
  ],
};

export const assetMaintenanceStatus = {
  isActive: "isActive",
  isNotActive: "isNotActive",
  Options: [
    {
      label: "constant.assetMaintenanceStatus.isActive",
      value: "isActive",
      color: "#00FF00",
    },
    {
      label: "constant.assetMaintenanceStatus.isNotActive",
      value: "isNotActive",
      color: "rebreakdownTicketStatus",
    },
  ],
};
export const spareRequestType = {
  spareReplace: "spareReplace",
  spareRequest: "spareRequest",
  Options: [
    {
      label: "constant.assetModelSpareRequestCategory.spareReplace",
      value: "spareReplace",
    },
    {
      label: "constant.assetModelSpareRequestCategory.spareRequest",
      value: "spareRequest",
    },
  ],
};
export const schedulePreventiveTaskRequestSparePartStatus = {
  pendingApproval: "pending_approval",
  approved: "approved",
  rejected: "rejected",
  submitted: "submitted",
  spareReplace: "spareReplace",
  Options: [
    {
      value: "pending_approval",
      label: "constant.assetModelSpareRequestCategory.pending_approval",
    },
    {
      value: "approved",
      label: "constant.assetModelSpareRequestCategory.approved",
    },
    {
      value: "rejected",
      label: "constant.assetModelSpareRequestCategory.rejected",
    },
    {
      value: "submitted",
      label: "constant.assetModelSpareRequestCategory.submitted",
    },
    {
      value: "spareReplace",
      label: "constant.assetModelSpareRequestCategory.spareReplace",
    },
  ],
};
export const schedulePreventiveTaskRequestSparePartDetailStatus = {
  pendingApproval: "pending_approval",
  approved: "approved",
  rejected: "rejected",
  submitted: "submitted",
  spareReplace: "spareReplace",
  Options: [
    {
      value: "pending_approval",
      label: "constant.assetModelSpareRequestCategory.pending_approval",
    },
    {
      value: "approved",
      label: "constant.assetModelSpareRequestCategory.approved",
    },
    {
      value: "rejected",
      label: "constant.assetModelSpareRequestCategory.rejected",
    },
    {
      value: "submitted",
      label: "constant.assetModelSpareRequestCategory.submitted",
    },
    {
      value: "spareReplace",
      label: "constant.assetModelSpareRequestCategory.spareReplace",
    },
  ],
};
export const optionDurationType = [
  {
    label: "Ngày",
    value: "day",
  },
  {
    label: "Tháng",
    value: "month",
  },
  {
    label: "Năm",
    value: "year",
  },
];
export const breakdownSpareRequestStatus = {
  pending_approval: "pending_approval",
  approved: "approved",
  rejected: "rejected",
  submitted: "submitted",
  spareReplace: "spareReplace",
  Options: [
    { label: "Đã gửi", value: "submitted" },
    { label: "Đã thay thế", value: "spareReplace" },
    { label: "Chờ duyệt phụ tùng", value: "pending_approval" },
    { label: "Chờ gửi phụ tùng", value: "approved" },
    { label: "Đã từ chối", value: "rejected", color: "red" },
  ],
};
export const breakdownSpareRequestDetailStatus = {
  pending_approval: "pending_approval",
  approved: "approved",
  rejected: "rejected",
  submitted: "submitted",
  spareReplace: "spareReplace",
  Options: [
    { label: "Đã gửi", value: "submitted" },
    { label: "Đã thay thế", value: "spareReplace" },
    { label: "Chờ duyệt phụ tùng", value: "pending_approval" },
    { label: "Chờ gửi phụ tùng", value: "approved" },
    { label: "Đã từ chối", value: "rejected", color: "red" },
  ],
};
export const notificationStatus = {
  all: "all",
  read: "read",
  unread: "unread",
  Options: [
    { label: "notification.all", value: "all" },
    { label: "notification.unread", value: "unread" },
    { label: "notification.read", value: "read" },
  ],
};
export const jobSummaryType = {
  BREAKDOWN: "BREAKDOWN",
  CALIBRATION_WORK: "CALIBRATION_WORK",
  SCHEDULE_PREVENTIVE: "SCHEDULE_PREVENTIVE",
  ALL: "ALL",
  Options: [
    { label: "jobSummary.breakdown", value: "BREAKDOWN" },
    { label: "jobSummary.calibration_work", value: "CALIBRATION_WORK" },
    { label: "jobSummary.schedule_preventive", value: "SCHEDULE_PREVENTIVE" },
    { label: "jobSummary.all", value: "ALL" },
  ],
};
export const jobSummaryStatus = {
  new: "new",
  assigned: "assigned",
  accepted: "accepted",
  inProgress: "inProgress",
  cancelled: "cancelled",
  cloesed: "cloesed",
  rejected: "rejected",
  submitted: "submitted",
  WWA: "WWA",
  completed: "completed",
  replacement: "replacement",
  experimentalFix: "experimentalFix",
  reopen: "reopen",
  waitingForAdminApproval: "waitingForAdminApproval",
  skipped: "skipped",
  Options: [
    { label: "constant.breakdownStatus.new", value: "new", color: "#1890ff" },
    {
      label: "constant.breakdownStatus.assigned",
      value: "assigned",
      color: "#21d9a4",
    },
    { label: "constant.breakdownStatus.reopen", value: "reopen", color: "red" },
    {
      label: "constant.breakdownStatus.inProgress",
      value: "inProgress",
      color: "#5BBD2B",
    },
    {
      label: "constant.breakdownStatus.accepted",
      value: "accepted",
      color: "#13c2c2",
    },
    {
      label: "constant.breakdownStatus.completed",
      value: "completed",
      color: "#52c41a",
    },
    {
      label: "constant.breakdownStatus.rejected",
      value: "rejected",
      color: "#ff4d4f",
    },
    {
      label: "constant.breakdownStatus.cancelled",
      value: "cancelled",
      color: "#ff4d4f",
    },
    {
      label: "constant.breakdownStatus.replacement",
      value: "replacement",
      color: "#ff4d4f",
    },
    { label: "constant.breakdownStatus.WWA", value: "WWA", color: "#ff4d4f" },
    {
      label: "constant.breakdownStatus.experimentalFix",
      value: "experimentalFix",
      color: "#79378B",
    },
    {
      label: "constant.breakdownStatus.closed",
      value: "cloesed",
      color: "#ff0000ff",
    },
    {
      label: "constant.breakdownStatus.submitted",
      value: "submitted",
      color: "#5ae615ff",
    },
    {
      label: "constant.schedulePreventiveStatus.skipped",
      value: "skipped",
      color: "#1890ff",
    },
    {
      label: "constant.schedulePreventiveStatus.waitingForAdminApproval",
      value: "waitingForAdminApproval",
      color: "#faad14",
    },
  ],
};
export const calibrationWorkAssignUserStatus = {
  assigned: "assigned",
  accepted: "accepted",
  replacement: "replacement",
  inProgress: "inProgress",
  cancelled: "cancelled",
  completed: "completed",
  reassignment: "reassignment",
  partiallyCompleted: "partiallyCompleted",
  completeRecalibrationIssue: "completeRecalibrationIssue",
  Options: [
    {
      label: "constant.schedulePreventiveTaskAssignUserStatus.assigned",
      value: "assigned",
      color: "#21d9a4",
    }, // xanh ngọc: giống breakdown
    {
      label: "constant.schedulePreventiveTaskAssignUserStatus.accepted",
      value: "accepted",
      color: "#13c2c2",
    }, // xanh teal
    {
      label: "constant.schedulePreventiveTaskAssignUserStatus.replacement",
      value: "replacement",
      color: "#ff4d4f",
    }, // đỏ
    {
      label: "constant.schedulePreventiveTaskAssignUserStatus.reassignment",
      value: "reassignment",
      color: "#1890ff",
    }, // xanh dương
    {
      label: "constant.schedulePreventiveTaskAssignUserStatus.inProgress",
      value: "inProgress",
      color: "#5BBD2B",
    }, // xanh lá
    {
      label: "constant.schedulePreventiveTaskAssignUserStatus.cancelled",
      value: "cancelled",
      color: "#ff4d4f",
    }, // đỏ
    {
      label: "constant.schedulePreventiveTaskAssignUserStatus.completed",
      value: "completed",
      color: "#52c41a",
    }, // xanh lá nhạt
    {
      label:
        "constant.schedulePreventiveTaskAssignUserStatus.partiallyCompleted",
      value: "partiallyCompleted",
      color: "#faad14",
    },
    {
      label:
        "constant.schedulePreventiveTaskAssignUserStatus.completeRecalibrationIssue",
      value: "completeRecalibrationIssue",
      color: "#faad14",
    },
  ],
};
export const manufacturingCompanyType = {
  pnp: "pnp",
  mtc: "mtc",
  getOptions: () => [
    { label: "Công ty pnp", value: manufacturingCompanyType.pnp },
    { label: "Công ty mtc", value: manufacturingCompanyType.mtc },
  ],
};
export const propertyInspectionStatus = {
  waitingForAdminApproval: "waitingForAdminApproval",
  partiallyCompleted: "partiallyCompleted",
  completed: "completed",
  cancelled: "cancelled",
  Options: [
    {
      label: "Chờ phê duyệt của quản trị viên",
      value: "waitingForAdminApproval",
      color: "#ceec22",
    },
    {
      label: "Một phần đã hoàn thành",
      value: "partiallyCompleted",
      color: "#1890ff",
    },
    {
      label: "Đã hoàn thành",
      value: "completed",
      color: "#5BBD2B",
    },
    {
      label: "Đã hủy",
      value: "cancelled",
      color: "#ff4d4f",
    },
  ],
};
export const assetStatusOptions = {
  ACTIVE: "ACTIVE",
  PAUSED: "PAUSED",
  PENDING_CANCEL: "PENDING_CANCEL",
  PENDING_DISPOSAL: "PENDING_DISPOSAL",
  Options: [
    { value: "ACTIVE", label: "assetStatusOptions.active", color: "green" },
    { value: "PAUSED", label: "assetStatusOptions.paused", color: "orange" },
    { value: "PENDING_CANCEL", label: "assetStatusOptions.pendingCancel", color: "red" },
    { value: "PENDING_DISPOSAL", label: "assetStatusOptions.pendingDisposal", color: "purple" }
  ]
};