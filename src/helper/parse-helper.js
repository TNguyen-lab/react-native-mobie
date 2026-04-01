export const parseToLabel = function (arr,value) {
    return arr.find(item => item.value == value)?.label
}