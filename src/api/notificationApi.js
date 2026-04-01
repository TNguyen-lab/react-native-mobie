import { post, get, patch, deleteRequest } from "./restApi";
import { baseURL } from "./config";

export const susbscription = (payload) => {
    return post(`notification/susbscription`, { ...payload });
};
export const getMyNotifications = (payload) => {
    return get(`notification/get-my-notifications`, { ...payload });
};
export const readNotification = (payload) => {
    return patch(`notification/read`, { ...payload });
};
export const getTotalNotYetViewed = () => {
    return get(`notification/total-not-yet-viewed`, {});
}
export const getNotificationUsers = (payload) => {
    return patch(`notification/get-notification-user`, { ...payload });
};
export const deleteNotificationUser = (payload) => {
    return patch("notification/delete-notification-user", { ...payload });
}
export const unReadNotification = (payload) => {
    return patch("notification/un-read", { ...payload });
}
export const readAllNotification = (payload) => {
    return patch("notification/read-all", { ...payload });
}