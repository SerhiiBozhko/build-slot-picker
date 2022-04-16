export type slotItem = {
    name:string, 
    active: boolean
};

export type sortedSlot = {
    [key: string|number]: slotItem[],
};

export type seletedDate = {
    day: string,
    time: string,
};