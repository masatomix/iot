/**
 * Created by masatomix on 2017/05/20.
 */
const config = require('config');
const moment = require('moment');
const request = require('request');
const logger = require('./logger');


const iot_config = config.iot;

const DashButton = require('dash-button');
const button = new DashButton(iot_config.mac_address);


const options = {
    url: 'https://hooks.slack.com/services' + iot_config.bot_url,
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    json: {"text": iot_config.message}
};


console.log('listen...');
let subscription = button.addListener(() => {
    const now = moment();
    const nowStr = now.format("YYYY/MM/DD HH:mm:ss");

    console.log('Clicked.. ' + nowStr);

    logger.main.info(iot_config.message);

    request(options, function (error, response, body) {
        if (!error) {
            console.log(body);
        }
    });
});
