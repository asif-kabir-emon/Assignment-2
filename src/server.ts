/* eslint-disable no-console */
import app from './app';
import mongoose from 'mongoose';
import config from './app/config';

async function main() {
    try {
        await mongoose.connect(config.databaseURL as string);

        app.listen(config.port, () => {
            console.log(`Server is running on port ${config.port}`);
        });
    } catch (error) {
        console.log(error);
    }
}

main();
