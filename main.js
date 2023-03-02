"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = void 0;
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const start = async () => {
    const { CURRENT_HOST, PORT = 5000 } = process.env;
    try {
        const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
        setInterval(() => {
            fetch('https://node-team-project.onrender.com/docs');
        }, 10 * 60 * 1000);
        app.setGlobalPrefix('api');
        const config = new swagger_1.DocumentBuilder()
            .setTitle('Petly')
            .setDescription('Docs REST API')
            .setVersion('0.0.1')
            .addServer(`${CURRENT_HOST ? `http://localhost:${PORT}` : 'https://node-team-project.onrender.com'}`)
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup('/docs', app, document);
        await app.listen(PORT, () => console.log(`server start http://localhost:${PORT}/docs`));
    }
    catch (error) {
        console.error(error);
    }
};
exports.start = start;
(0, exports.start)();
//# sourceMappingURL=main.js.map