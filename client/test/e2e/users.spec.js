import config from './config';

export default {
  'User signin and create document': browser =>
    browser
      .maximizeWindow()
      .url(config.url)
      .waitForElementVisible('body')
      .click('#signin')
      .setValue('Input[name=email]', 'love@handle.com')
      .setValue('Input[name=password]', 'love')
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
      .click('button.btn-floating btn-large waves-effect waves-light')
      .setValue('Input[name=name]', 'Love Handle L')
      .setValue('Input[name=password]', 'love')
      .pause(3000)
      .click('button.submitBtn')
      .pause(2000)
      .click('button.modal-close')
      .pause(2000)
      .assert.urlContains('/profile')
      .end(),
};
