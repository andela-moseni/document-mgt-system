import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import http from 'http';
import path from 'path';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import winston from 'winston';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.config.dev';
import routes from './server/routes';

const app = express();
const router = express.Router();
const port = parseInt(process.env.PORT, 10) || 8000;
const compiler = webpack(webpackConfig);

app.set('port', port);

// Webpack config
app.use(webpackMiddleware(compiler, {
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  noInfo: true,
}));
app.use(webpackHotMiddleware(compiler));

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Use router for our routes
routes(router);
app.use('/api', router);

// Setup a default catch-all route that sends back a welcome message in JSON format
app.get('/*', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, './server/index.html'));
});

const server = http.createServer(app);
server.listen(port, () => {
  winston.info(`The server is running at localhost:${port}`);
});

export default app;
