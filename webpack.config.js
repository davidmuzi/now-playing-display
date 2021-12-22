import webpack from 'webpack';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

export default {
    entry: {
        login: './client/login.js',
        now_playing: './client/now_playing.js',
    },
    output: {
      path: path.resolve('./public'),
    },
    mode: 'development',
    plugins: [
        new webpack.DefinePlugin({
            SERVER_URL: JSON.stringify(`http://${process.env.HOST_DOMAIN}:${process.env.HOST_PORT}`)
        }),
    ]
};
