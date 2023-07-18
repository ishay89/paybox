import cron from 'node-cron';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Todo from './models/Todo';

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || '', {
});

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

// Check for relevant items
const checkRelevantItems = async () => {
    try {
        console.log("looking for notifications");
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const nextDay = new Date(today);
        nextDay.setDate(today.getDate() + 1);

        const relevantItems = await Todo.find({
            dueDate: {
                $gte: today,
                $lte: nextDay,
            },
            done: {$eq: false}
        });

        if (relevantItems.length > 0) {
            // Send notifications for relevant items
            relevantItems.forEach((item:any) => {
                console.log(`Sending notification for item with ID: ${item._id}`);
                //sendNotification()
            });
        } else {
            console.log('No relevant items found');
        }
    } catch (error) {
        console.error('Error checking for relevant items:', error);
    }
};

// Run the microservice
const runMicroservice = () => {
    console.log('Notification microservice started');

    // Schedule the cron job to run every day at 12PM
    //cron.schedule('0 12 * * *', () => {
    cron.schedule('* * * * *', () => {
        checkRelevantItems();
    });
};

runMicroservice();
