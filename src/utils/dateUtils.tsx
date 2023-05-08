import moment from "moment";

export default class DateUtil {
    static toDDMMYYYY_HH_MM_SS(date: Date): string {
        if (date != null) {
            return moment(date).format("DD/MM/YYYY HH:mm:ss");
        } else {
            return "";
        }
    }

    static toDDMMYYYY(date: null | Date): string {
        if (date != null) {
            return moment(date).format("DD/MM/YYYY");
        } else {
            return "";
        }
    }

    static timeToDDMMYYYY(dateTime: null | number): string {
        if (dateTime && dateTime != 0) {
            return moment(new Date(dateTime)).format("DD/MM/YYYY");
        } else {
            return "";
        }
    }

    static dateTimeStringToDDMMYYYY(dateTime: string): string {
        return moment(Date.parse(dateTime)).format("DD/MM/YYYY");
    }

    static dateTimeStringToDDMMYYYYhhmmss(dateTime: string): string {
        return moment(Date.parse(dateTime)).format("DD/MM/YYYY hh:mm:ss");
    }

    static dateTimeStringToDDMMYYYYhhmmssUTC(dateTime: string): string {
        return moment(Date.parse(dateTime)).utc().format("DD/MM/YYYY hh:mm:ss");
    }

    static checkValidDate(date: string) {
        return /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(date);
    }

    static getDayDifference(d1: string | Date, d2: string | Date) {
        // Discard the time and time-zone information.
        const day1 = new Date(d1);
        const day2 = new Date(d2);
        const utc1 = Date.UTC(day1.getFullYear(), day1.getMonth(), day1.getDate());
        const utc2 = Date.UTC(day2.getFullYear(), day2.getMonth(), day2.getDate());

        return Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
    }
}
