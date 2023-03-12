import { CronJob } from "cron";
import { SchedulerRegistry } from "@nestjs/schedule";
import { Injectable, Logger } from "@nestjs/common";
import * as fs from "fs";

@Injectable()
export class ScheduleService {
    constructor(
        private schedulerRegistry: SchedulerRegistry,
    ) {}
    private logger = new Logger();

    async addCronJob(name: string, seconds: number, expiresAt: Date, spec: string, username: string) {
        const date = new Date();
        date.setSeconds(date.getSeconds() + seconds);

        const job = new CronJob(date,() => {
            const message =
                `\n${date.toLocaleString()} | Привет ${username}! Напоминаем что вы записаны к ${spec} на ${expiresAt.toLocaleString()}\n`
            fs.appendFile('info.log', message, (err) => console.log(err));
            fs.close(1);
            this.logger.debug(`(${100 - seconds}) seconds left.`);
            this.deleteCron(name);
        });

        this.schedulerRegistry.addCronJob(name, job);
        job.start();
    }

    deleteCron(name: string) {
        this.schedulerRegistry.deleteCronJob(name);
        this.logger.warn(`job ${name} deleted!`);
    }
}