export const dateType = {
  days: "days",
  weeks: "weeks",
  months: "months",
  years: "years",
  Options: [
    {
      label: "Days",
      value: "days",
    },
    {
      label: "Weeks",
      value: "weeks",
    },
    {
      label: "Months",
      value: "months",
    },
    {
      label: "Years",
      value: "years",
    },
  ],
};

export const calibrationGroupStatus = {
  new: "new",
  inProgress: "inProgress",
  overdue: "overdue",
  upcoming: "upcoming",
  history: "history",
  Options: [
    { label: "constant.ticketSchedulePreventiveStatus.new", value: "new" },
    {
      label: "constant.ticketSchedulePreventiveStatus.inProgress",
      value: "inProgress",
    },
    {
      label: "constant.ticketSchedulePreventiveStatus.overdue",
      value: "overdue",
    },
    {
      label: "constant.ticketSchedulePreventiveStatus.upcoming",
      value: "upcoming",
    },
    {
      label: "constant.ticketSchedulePreventiveStatus.history",
      value: "history",
    },
  ],
};
export const calibrationWorkStatus = {
  new: "new",
  inProgress: "inProgress",
  waitingForAdminApproval: "waitingForAdminApproval",
  completed: "completed",
  cancelled: "cancelled",
  reOpen: "reOpen",
  Options: [
    {
      label: "constant.schedulePreventiveStatus.new",
      value: "new",
      color: "#1890ff",
    },
    {
      label: "constant.schedulePreventiveStatus.inProgress",
      value: "inProgress",
      color: "#5BBD2B",
    },
    {
      label: "constant.schedulePreventiveStatus.waitingForAdminApproval",
      value: "waitingForAdminApproval",
      color: "#faad14",
    },
    {
      label: "constant.schedulePreventiveStatus.completed",
      value: "completed",
      color: "#00FF00",
    },
    {
      label: "constant.schedulePreventiveStatus.cancelled",
      value: "cancelled",
      color: "#ff4d4f",
    },
    {
      label: "constant.calibrationWorkStatus.reopen",
      value: "reOpen",
      color: "#ff4d4f",
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
