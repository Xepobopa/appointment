import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as mongoose from "mongoose";
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
    mongoose.pluralize(null);
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());
    const server = await app.listen( parseInt(process.env.PORT) || 5000);
    const router = server._events.request._router;

    const availableRoutes: [] = router.stack
        .map(layer => {
            if (layer.route) {
                return {
                    route: {
                        path: layer.route?.path,
                        method: layer.route?.stack[0].method,
                    },
                };
            }
        })
        .filter(item => item !== undefined);
    console.log(availableRoutes);
}

bootstrap();
