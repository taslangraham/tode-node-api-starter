"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureCors = void 0;
const cors_1 = __importDefault(require("cors"));
const app_1 = require("../app");
const corsOptions = {
    methods: "GET,HEAD,PUT,PATCH,DELETE",
    optionsSuccessStatus: 200,
    origin: "google.com",
    preflightContinue: true,
};
function configureCors() {
    return app_1.app.use(cors_1.default(corsOptions));
}
exports.configureCors = configureCors;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWcvY29ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxnREFBeUM7QUFDekMsZ0NBQTZCO0FBRTdCLE1BQU0sV0FBVyxHQUFnQjtJQUM3QixPQUFPLEVBQUUsMkJBQTJCO0lBQ3BDLG9CQUFvQixFQUFFLEdBQUc7SUFDekIsTUFBTSxFQUFFLFlBQVk7SUFDcEIsaUJBQWlCLEVBQUUsSUFBSTtDQUMxQixDQUFDO0FBRUYsU0FBUyxhQUFhO0lBQ2xCLE9BQU8sU0FBRyxDQUFDLEdBQUcsQ0FBQyxjQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztBQUN0QyxDQUFDO0FBQ1Esc0NBQWEifQ==