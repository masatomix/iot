'use strict'

const me = this

const config = require('config')
const moment = require('moment')
const request = require('request')
const logger = require('./logger')

const iot_config = config.iot
// const buttons_config = iot_config.buttons

const settings = config.settings
const userInfo = config.userInfo
const firebaseConfig = config.firebaseConfig

const firebase = require('firebase/app')
require('firebase/firestore')
require('firebase/auth')
const firebaseApp = firebase.initializeApp(firebaseConfig)

const DashButton = require('dash-button')

module.exports.pushButton = async () => {
  logger.main.debug('Amazon Dash Button の検知を開始します...')
  const nic = settings.nic
  const buttons_config = await me.getButtonConfig()

  for (let property in buttons_config) {
    for (let mac_address of buttons_config[property].mac_addresses) {
      const button = new DashButton(mac_address, {
        networkInterface: nic,
      })
      button.addListener(() => {
        const now = moment()
        const nowStr = now.format('YYYY/MM/DD HH:mm:ss')
        console.log('Clicked.. ' + property + ' Button. ' + nowStr)
        logger.main.info(mac_address)
        me.postLog(settings, mac_address, 'ボタンが押されました', buttons_config[property].message)
      })
    }
  }
}

module.exports.postLog = (settings, sourceMacAddress, action, message) => {
  const optionEla = {
    url: settings.elastic_url,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    json: {
      date: new Date(),
      action: action,
      message: message,
      macAddress: sourceMacAddress,
    },
  }
  request(optionEla, function (error, response, body) {
    if (!error) {
      console.log(body)
    }
  })
}

module.exports.getButtonConfig = async () => {
  const result = await firebase.auth().signInWithEmailAndPassword(userInfo.userId, userInfo.password)
  const user = firebase.auth().currentUser
  const buttons = {}

  try {
    const db = firebaseApp.firestore()
    const snapshot = await db.collection('app_settings/dash_button/buttons').get()
    snapshot.forEach((doc) => {
      let property = doc.id
      let value = doc.data()
      buttons[property] = value
    })
    console.log('デバイス情報:')
    console.log(buttons)
  } catch (err) {
    console.log('Error getting documents', err)
  }
  return buttons
}

if (!module.parent) {
  me.pushButton()
}
