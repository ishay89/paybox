"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const Todo_1 = __importDefault(require("./models/Todo"));
dotenv_1.default.config();
// Connect to MongoDB
mongoose_1.default.connect(process.env.MONGODB_URI || '', {});
mongoose_1.default.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});
mongoose_1.default.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});
// Check for relevant items
const checkRelevantItems = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("looking for notifications");
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const nextDay = new Date(today);
        nextDay.setDate(today.getDate() + 1);
        const relevantItems = yield Todo_1.default.find({
            dueDate: {
                $gte: today,
                $lt: nextDay,
            },
            done: { $eq: false }
        });
        if (relevantItems.length > 0) {
            // Send notifications for relevant items
            relevantItems.forEach((item) => {
                console.log(`Sending notification for item with ID: ${item._id}`);
            });
        }
        else {
            console.log('No relevant items found');
        }
    }
    catch (error) {
        console.error('Error checking for relevant items:', error);
    }
});
// Run the microservice
const runMicroservice = () => {
    console.log('Notification microservice started');
    // Schedule the cron job to run every day at 8 AM
    //cron.schedule('0 8 * * *', () => {
    // Schedule the cron job to run every minute
    node_cron_1.default.schedule('* * * * *', () => {
        checkRelevantItems();
    });
};
runMicroservice();
//# sourceMappingURL=notificationMicroservice.js.map