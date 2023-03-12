import { Module} from "@nestjs/common";
import { ScheduleService } from "./schedule.service";


@Module({
    imports: [],
    providers: [ScheduleService],
    exports: [ScheduleService]
})
export class ScheduleModule {}