export const schedulePreventiveTaskAssignUserStatus = {
  assigned: "assigned",
  accepted: "accepted",
  replacement: "replacement",
  inProgress: "inProgress",
  cancelled: "cancelled",
  completed: "completed",
  skipped: "skipped",
  reassignment: "reassignment",
  partiallyCompleted: "partiallyCompleted",
  pendingApproval: "pending_approval",
  approved: "approved",
  submitted: "submitted",
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
    }, // cam: cảnh báo
    {
      label: "constant.schedulePreventiveTaskAssignUserStatus.skipped",
      value: "skipped",
      color: "#8c8c8c",
    }, // xám
    {
      label: "constant.schedulePreventiveTaskAssignUserStatus.reopen",
      value: "reopen",
      color: "#1890ff",
    },
    {
      label: "constant.schedulePreventiveTaskAssignUserStatus.pendingApproval",
      value: "pending_approval",
      color: "#1890ff",
    },
    {
      label: "constant.schedulePreventiveTaskAssignUserStatus.approved",
      value: "approved",
      color: "#1890ff",
    },
    {
      label: "constant.schedulePreventiveTaskAssignUserStatus.submitted",
      value: "submitted",
      color: "#1890ff",
    },
  ],
};
export const schedulePreventiveStatus = {
  new: "new",
  inProgress: "inProgress",
  waitingForAdminApproval: "waitingForAdminApproval",
  skipped: "skipped",
  completed: "completed",
  cancelled: "cancelled",
  submitted: "submitted",
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
      label: "constant.schedulePreventiveStatus.skipped",
      value: "skipped",
      color: "#1890ff",
    },
    {
      label: "constant.schedulePreventiveStatus.submitted",
      value: "submitted",
      color: "#5BBD2B",
    },
  ],
};
export const schedulePreventiveTicketStatus = {
  new: "new",
  inProgress: "inProgress",
  overdue: "overdue",
  upcoming: "upcoming",
  closed: "closed",
  Options: [
    { label: "constant.schedulePreventiveTicketStatus.new", value: "new" },
    {
      label: "constant.schedulePreventiveTicketStatus.inProgress",
      value: "inProgress",
    },
    {
      label: "constant.schedulePreventiveTicketStatus.overdue",
      value: "overdue",
    },
    {
      label: "constant.schedulePreventiveTicketStatus.upcoming",
      value: "upcoming",
    },
    {
      label: "constant.schedulePreventiveTicketStatus.history",
      value: "history",
    },
  ],
};
export const frequencyAllOptions = {
  Days: "Days",
  Weeks: "Weeks",
  Months: "Months",
  Years: "Years",
  Option: [
    {
      label: "constant.frequencyAllOptions.Hours",
      value: "Hours",
    },
    {
      label: "constant.frequencyAllOptions.RepeatHours",
      value: "RepeatHours",
    },
    {
      label: "constant.frequencyAllOptions.Days",
      value: "Days",
    },
    {
      label: "constant.frequencyAllOptions.Date",
      value: "Date",
    },
    {
      label: "constant.frequencyAllOptions.RepeaetWeekDays",
      value: "RepeaetWeekDays",
    },
    {
      label: "constant.frequencyAllOptions.Weeks",
      value: "Weeks",
    },
    {
      label: "constant.frequencyAllOptions.Months",
      value: "Months",
    },
    {
      label: "constant.frequencyAllOptions.Years",
      value: "Years",
    },
  ],
};
export const scheduleBasedOnType = {
  Calendar: "Calendar",
  Monitoring: "Monitoring",
  CalendarOrMonitoring: "CalendarOrMonitoring",
  Adhoc: "Adhoc",
  ConditionBasedSchedule: "ConditionBasedSchedule",
  Option: [
    { value: "Calendar", label: "constant.scheduleBasedOnType.calendar" },
    { value: "Monitoring", label: "constant.scheduleBasedOnType.monitoring" },
    {
      value: "CalendarOrMonitoring",
      label: "constant.scheduleBasedOnType.calendarOrMonitoring",
    },
    { value: "Adhoc", label: "constant.scheduleBasedOnType.adhoc" },
    {
      value: "ConditionBasedSchedule",
      label: "constant.scheduleBasedOnType.conditionBasedSchedule",
    },
  ],
};
export const priorityType = {
  High: "High",
  Medium: "Medium",
  Low: "Low",
  Option: [
    { label: "constant.priorityType.high", value: "High" },
    { label: "constant.priorityType.medium", value: "Medium" },
    { label: "constant.priorityType.low", value: "Low" },
  ],
};
export const serviceTaskType = {
  inspection: "inspection",
  monitoring: "monitoring",
  calibration: "calibration",
  Options: [
    { label: "constant.serviceTaskType.inspection", value: "inspection" },
    { label: "constant.serviceTaskType.monitoring", value: "monitoring" },
    { label: "constant.serviceTaskType.calibration", value: "calibration" },
  ],
  // review: 'review',
  // approval: 'approval',
  // spaceReplacement: 'spare-replacement'
};
export const answerTypeInspection = {
  value: "value",
  yesNoNa: "yes/no/na",
  numbericValue: "numberic-value",
  on: "on",
  range: "rang",
  lessThanOrEqual: "less-than-or-equal",
  greaterThanOrEqual: "greater-than-or-equal",
};
export const historySchedulePreventiveStatus = {
  assigned: "assigned",
  accepted: "accepted",
  replacement: "replacement",
  inProgress: "inProgress",
  completed: "completed",
  partiallyCompleted: "partiallyCompleted",
  skipped: "skipped",
  cancelled: "cancelled",
  reassignment: "reassignment",
  reopen: "reopen",
  new: "new",
  closed: "closed",
  waitingForAdminApproval: "waitingForAdminApproval",
  Options: [
    {
      label: "constant.historySchedulePreventiveStatus.assigned",
      value: "assigned",
    },
    {
      label: "constant.historySchedulePreventiveStatus.accepted",
      value: "accepted",
    },
    {
      label: "constant.historySchedulePreventiveStatus.replacement",
      value: "replacement",
    },
    {
      label: "constant.historySchedulePreventiveStatus.reassignment",
      value: "reassignment",
    },
    {
      label: "constant.historySchedulePreventiveStatus.inProgress",
      value: "inProgress",
    },
    {
      label: "constant.historySchedulePreventiveStatus.cancelled",
      value: "cancelled",
    },
    {
      label: "constant.historySchedulePreventiveStatus.completed",
      value: "completed",
    },
    {
      label: "constant.historySchedulePreventiveStatus.partiallyCompleted",
      value: "partiallyCompleted",
    },
    {
      label: "constant.historySchedulePreventiveStatus.skipped",
      value: "skipped",
    },
    {
      label: "constant.historySchedulePreventiveStatus.reopen",
      value: "reopen",
    },
    { label: "constant.historySchedulePreventiveStatus.new", value: "new" },
    {
      label: "constant.historySchedulePreventiveStatus.closed",
      value: "closed",
    },
    {
      label: "constant.historySchedulePreventiveStatus.waitingForAdminApproval",
      value: "waitingForAdminApproval",
    },
  ],
};
export const ticketSchedulePreventiveStatus = {
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
