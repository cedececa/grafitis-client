import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment"; // add this 1 of 4

@Pipe({ name: "ToDate" })
export class ToDatePipe implements PipeTransform {
  transform(date: Date) {
    if (date == null) {
      return "Watting";
    }
    return moment(date).format("YYYY-MM-DD");
  }
}
