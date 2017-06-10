import faker from 'faker';
import config from './config';

export default {
  'Signin a user': browser =>
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .click('#signin')
      .setValue('Input[name=email]', 'love@handle.com')
      .setValue('Input[name=password]', 'love')
      .click('button')
      .waitForElementVisible('h3#fiddle-text')
      .assert.containsText('h3#fiddle-text',
      'Welcome to Meek - Document Management System')
      .waitForElementVisible('#menuBar')
      .click('#menuBar')
      .assert.containsText('span#black-text', 'Welcome, Love Handle')
      .assert.containsText('p#black-text', 'love@handle.com')
      .end(),

  'Invalid signin': browser =>
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .click('#signin')
      .setValue('Input[name=email]', faker.internet.email())
      .setValue('Input[name=password]', faker.internet.password())
      .click('button')
      .pause(2000)
      .assert.urlContains('login')
      .assert.containsText('.brand-logo', 'Meek')
      .end(),
};
