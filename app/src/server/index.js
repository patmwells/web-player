import express from 'express';

const app = express();

app.use(express.static('dist/client'));

app.listen(process.env.APP_PORT, () => {
    console.log(`\n----> Server listening on port: ${process.env.APP_PORT}\n`);
});
