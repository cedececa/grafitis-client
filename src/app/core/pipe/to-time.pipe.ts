import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment"; // add this 1 of 4

@Pipe({ name: "ToTime" })
export class ToTimePipe implements PipeTransform {
  transform(date: Date) {
    if (date == null) {
      return "Watting";
    }
    return moment(date).format("HH:mm");
  }
}
