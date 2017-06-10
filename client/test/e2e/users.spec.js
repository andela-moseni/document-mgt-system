import config from './config';

export default {
  'User signin and update profile': browser =>
    browser
      .maximizeWindow()
      .url(config.url)
      .waitForElementVisible('body')
      .click('#signin')
      .setValue('Input[name=email]', 'hello@water.com')
      .setValue('Input[name=password]', 'hello')
      .click('button')
      .waitForElementVisible('h3#fiddle-text')
      .assert.containsText('h3#fiddle-text',
      'Welcome to Meek - Document Management System')
      .waitForElementVisible('#menuBar')
      .click('#menuBar')
      .click('a[href="/profile"')
      .waitForElementVisible('a[href="/profile"')
      .assert.urlContains('profile')
      .click('body')
      .waitForElementVisible('button.btn-floating')
      .click('button.btn-floating')
      .setValue('Input[name=name]', ' Water')
      .click('button.submitBtn')
      .click('.modal.open button.modal-close')
      .pause(2000)
      .assert.urlContains('/profile')
      .end(),

  'User signin and delete profile': browser =>
    browser
      .maximizeWindow()
      .url(config.url)
      .waitForElementVisible('body')
      .click('#signin')
      .setValue('Input[name=email]', 'hello@water.com')
      .setValue('Input[name=password]', 'hello')
      .click('button')
      .waitForElementVisible('h3#fiddle-text')
      .assert.containsText('h3#fiddle-text',
      'Welcome to Meek - Document Management System')
      .waitForElementVisible('#menuBar')
      .click('#menuBar')
      .click('a[href="/profile"')
      .waitForElementVisible('a[href="/profile"')
      .assert.urlContains('profile')
      .click('body')
      .pause(2000)
      .click('button.btn-floating.red')
      .pause(2000)
      .click('.modal.open button.btn.white-text')
      .pause(2000)
      .assert.urlContains('/signup')
      .end()
};
