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
      .pause(1000)
      .assert.containsText('h3#fiddle-text',
      'Welcome to Meek - Document Management System')
      .pause(2000)
      .click('#menuBar')
      .pause(1000)
      .click('a[href="/profile"')
      .pause(2000)
      .assert.urlContains('profile')
      .click('body')
      .pause(2000)
      .click('button.btn-floating')
      .setValue('Input[name=name]', ' Water')
      .pause(3000)
      .click('button.submitBtn')
      .pause(5000)
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
      .pause(1000)
      .assert.containsText('h3#fiddle-text',
      'Welcome to Meek - Document Management System')
      .pause(2000)
      .click('#menuBar')
      .pause(1000)
      .click('a[href="/profile"')
      .pause(2000)
      .assert.urlContains('profile')
      .click('body')
      .pause(2000)
      .click('button.btn-floating.red')
      .pause(3000)
      .click('.modal.open button.btn.white-text')
      .pause(5000)
      .assert.urlContains('/signup')
      .end(),
};
