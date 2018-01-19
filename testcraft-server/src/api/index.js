import { version } from '../../package.json';
import { Router } from 'express';
import fs from 'fs';
import { spawn } from 'child_process';
import { runPy, postPy } from '../utils/utils';
var Promise = require("bluebird");
const path = require("path");



export default ({ config, db }) => {
	let api = Router();

	api.get('/', (req, res) => {
		res.json({ version });
	});

	api.get('/executeScript/:scriptName', (req, res) => {
		const scriptName = req.params.scriptName;
		runPy(scriptName).then(fromRunpy => res.json({ result: fromRunpy }))
			.catch(err => console.log("err", err));
	});

	api.post('/postScript', (req, res) => {
		const scriptName = req.body.scriptName;
		const script = req.body.script;

		postPy(scriptName, script)
			.then(() => {
				res.json({
					
				});
			})
			.catch((err) => {
				res.json({ err: err });
			});
	});

	api.get('/getScripts', (req, res) => {
		const stack = [];
		const scriptsList = [];
		const scriptPath = path.join(__dirname, '../scripts');

		fs.readdir(scriptPath, (err, items) => {
			for (var i = 0; i < items.length; i++) {
				stack.push(runPy(items[i]));
			}

			Promise.all(stack)
				.then((results) => {
					res.json({
						scripts: results
					});
				})
				.catch((err) => {
					res.json({ err: err });
				});
		});
	});
	return api;
}
