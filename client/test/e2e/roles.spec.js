import faker from 'faker';
import config from './config';

const fakeRole = faker.lorem.word(4);

export default {
  'Admin signin and create role': browser =>
    browser
      .maximizeWindow()
      .url(config.url)
      .waitForElementVisible('body')
      .click('#signin')
      .setValue('Input[name=email]', 'admin@test.com')
      .setValue('Input[name=password]', 'admin')
      .click('button')
      .waitForElementVisible('h3#fiddle-text')
      .assert.containsText('h3#fiddle-text',
      'Welcome to Meek - Document Management System')
      .waitForElementVisible('#menuBar')
      .click('#menuBar')
      .click('#roles')
      .assert.urlContains('roles')
      .click('body')
      .waitForElementVisible('#rolesBtn')
      .click('#rolesBtn')
      .waitForElementVisible('Input#titleUnique')
      .setValue('Input#titleUnique', fakeRole)
      .waitForElementVisible('#crRole')
      .click('#crRole')
      .click('.modal.open button.modal-close')
      .waitForElementVisible('tr:last-child td:nth-child(2)')
      .assert.containsText('tr:last-child td:nth-child(2)', fakeRole)
      .end(),

  'Admin edit role': browser =>
    browser
      .maximizeWindow()
      .url(config.url)
      .waitForElementVisible('body')
      .click('#signin')
      .setValue('Input[name=email]', 'admin@test.com')
      .setValue('Input[name=password]', 'admin')
      .click('button')
      .waitForElementVisible('#menuBar')
      .click('#menuBar')
      .waitForElementVisible('#roles')
      .click('#roles')
      .click('body')
      .waitForElementVisible('tr:nth-child(5) td:nth-child(5)')
      .click('tr:nth-child(5) td:nth-child(5)')
      .waitForElementVisible('.modal.open #editRole')
      .setValue('.modal.open #editRole', 'editors')
      .waitForElementVisible('.modal.open button.submitBtn')
      .pause(2000)
      .click('.modal.open button.submitBtn')
      .pause(2000)
      .click('.modal.open button.modal-close')
      .waitForElementVisible('tr:nth-child(5) td:nth-child(2)')
      .assert.containsText('tr:nth-child(5) td:nth-child(2)', 'editors')
      .end(),

  'Admin delete role': browser =>
    browser
      .maximizeWindow()
      .url(config.url)
      .waitForElementVisible('body')
      .click('#signin')
      .setValue('Input[name=email]', 'admin@test.com')
      .setValue('Input[name=password]', 'admin')
      .click('button')
      .waitForElementVisible('#menuBar')
      .click('#menuBar')
      .waitForElementVisible('#roles')
      .click('#roles')
      .click('body')
      .waitForElementVisible('tr:nth-child(5) td:nth-child(6)')
      .click('tr:nth-child(5) td:nth-child(6)')
      .click('.modal.open button.btn.white-text')
      .pause(2000)
      .assert.urlContains('roles')
      .end()
};
