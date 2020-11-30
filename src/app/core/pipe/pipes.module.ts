import { NgModule } from "@angular/core";
import { ToDateAndTimePipe } from "./to-date-and-time.pipe";
import { ToDatePipe } from "./to-date.pipe";
import { ToTimePipe } from "./to-time.pipe";

@NgModule({
  declarations: [ToDateAndTimePipe, ToDatePipe, ToTimePipe],
  exports: [ToDateAndTimePipe, ToDatePipe, ToTimePipe]
})
export class PipesModule {}
