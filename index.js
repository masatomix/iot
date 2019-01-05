"use strict";


const me = this;


const config = require('config');
const moment = require('moment');
const request = require('request');
const logger = require('./logger');


const iot_config = config.iot;
const buttons_config = iot_config.buttons;


module.exports.pushButton = () => {
    const buttons = {};
    const options = {};

    const DashButton = require('dash-button');

    for (let property in buttons_config) {
        const button = new DashButton(buttons_config[property].mac_address);
        const option = {
            url: buttons_config[property].bot_url,
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            json: JSON.parse(json)
        };
        buttons[property] = button;
        options[property] = option;

    }

    for (let property in buttons) {
        logger.main.debug(buttons[property]);
        logger.main.debug(options[property]);
    }


    for (let property in buttons) {
        buttons[property].addListener(() => {
            const now = moment();
            const nowStr = now.format("YYYY/MM/DD HH:mm:ss");
            console.log('Clicked.. ' + property + " Button. " + nowStr);

            logger.main.info(buttons_config[property].mac_address);
            logger.main.info(buttons_config[property].channel);
            logger.main.info(buttons_config[property].message);

            request(options[property], function (error, response, body) {
                if (!error) {
                    console.log(body);
                }
            });
        });
    }
};

me.pushButton();
