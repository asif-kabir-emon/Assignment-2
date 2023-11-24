/* eslint-disable no-console */
import app from './app';
import mongoose from 'mongoose';
import config from './app/config';

const PORT = process.env.PORT || 4000;

async function main() {
    try {
        await mongoose.connect(config.databaseURL as string);

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}

main();
