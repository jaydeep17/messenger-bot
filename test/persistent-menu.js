'use strict'
const tap = require('tap')
const nock = require('nock')
const Bot = require('../')

tap.test('bot.setPersistentMenu()', (t) => {
  let bot = new Bot({
    token: 'foo'
  })

  const buttons = {
    type: 'postback',
    title: 'help',
    payload: 'HELP'
  }

  const payload = {
    setting_type: 'call_to_actions',
    thread_state: 'existing_thread',
    call_to_actions: buttons
  }

  const response = {
    result: 'Successfully added structured menu CTAs'
  }

  nock('https://graph.facebook.com').post('/v2.6/me/thread_settings', payload).query({
    access_token: 'foo'
  }).reply(200, response)

  bot.setPersistentMenu(buttons, (err, body) => {
    t.error(err, 'response should not be error')
    t.deepEquals(body, response, 'response is correct')
    t.end()
  })
})

tap.test('bot.removePersistentMenu()', (t) => {
  let bot = new Bot({
    token: 'foo'
  })

  const payload = {
    setting_type: 'call_to_actions',
    thread_state: 'existing_thread'
  }

  const response = {
    result: 'Successfully deleted structured menu CTAs'
  }

  nock('https://graph.facebook.com').delete('/v2.6/me/thread_settings', payload).query({
    access_token: 'foo'
  }).reply(200, response)

  bot.removePersistentMenu((err, body) => {
    t.error(err, 'response should not be error')
    t.deepEquals(body, response, 'response is correct')
    t.end()
  })
})
