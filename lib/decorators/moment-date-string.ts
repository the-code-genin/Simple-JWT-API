import moment, { Moment } from "moment";

export default function MomentDateString(target: any, key: string): any {
    return moment(target[key] as string);
}