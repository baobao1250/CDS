export enum TypeCell {
    BOOLEAN = "0",
    NUMBERIC = "1",
    DATE = "2",
    DATE_TIME = "3",
    CURRENCY = "4",
    FILE = "5",
    ACTION = "6",
    ACTION_LINE = "7",
    LINK = "8",
    OBJECT = "9",
    OBJECT_LINK = "11",
    DATE_TO_DATE = "12",
    YEAR = "13",
    ACTION_BUTTON = "14",
    CHECK_BOX = "15",
    SWITCH = "16",
    STATUS = "17",
    ACTION_LINE_STATUS = "18",
    ACTION_POPUP = "19",
    ICON = "20",
    TEXT_OVERFLOW = "21"
}

export interface Action<T> {
    func?: (data: T, index?: number) => void;
    title?: string;
    icon?: any;
    disabled?: (data: T) => boolean;
}

export interface Pageable {
    total: number;
    page: number;
    rowsPerPage: number;
}
