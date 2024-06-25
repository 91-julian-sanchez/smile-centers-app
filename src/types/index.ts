export interface SmileCenter {
    services(services: any): unknown;
    centerType: string;
    zone: string;
    name: string;
    address: string;
    calendarId: string;
    appointmentTypeId: string;
    neighborhood: string;
    timetable: {
        weekdays?: string[];
        saturday?: string[];
        sunday?: string[];
    },
    promo:string
}