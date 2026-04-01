export const inventoryAssetStatus = {
    draft: 'draft',
    new: 'new',
    inProgress: 'inProgress',
    done: 'done',
    await_approve: 'await_approve',
    Options: [
        { value: "draft", label: "Nháp" },
        { value: "new", label: "Thêm mới" },
        { value: "inProgress", label: "Đang thực hiện" },
        { value: "done", label: "Hoàn thành" },
        { value: "await_approve", label: "Chờ duyệt" },
    ]
};
export const inventoryAssetDepartmentStatus = {
    draft: 'draft',
    assigned: 'assigned',
    accepted: 'accepted',
    cancel: 'cancel',
    inProgress: 'inProgress',
    pending_approval: 'pending_approval',
    approved: 'approved',
    close: 'close',
    Options: [
        { value: "draft", label: "Nháp" },
        { value: "assigned", label: "Chờ xác nhận" },
        { value: "accepted", label: "Xác nhận" },
        { value: "cancel", label: "Hủy bỏ" },
        { value: "inProgress", label: "Đang thực hiện" },
        { value: "pending_approval", label: "Chờ duyệt" },
        { value: "approved", label: "Đã duyệt" },
        { value: "close", label: "Đóng" },
    ]
};
export const inventoryAssetDepartmentAssetMaintenanceStatus = {
    exist: 'exist',
    does_not_exist: 'does_not_exist',
    not_yet_inventoried: 'not_yet_inventoried',
    is_process_scan: 'is_process_scan'
}