import faker from 'faker';
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
      .click('a[href="/create-document"')
      .pause(2000)
      .assert.urlContains('create-document')
      .click('body')
      .pause(2000)
      // .click('.rolesForm')
      .setValue('Input[name=title]', faker.lorem.word())
      .click('button.mce-close')
      .setValue('Input.tinymce', faker.lorem.paragraph())
      .setValue('Input[name=type]', faker.lorem.word())
      .pause(5000)
      .click('button.submitBtn')
      .pause(5000)
      .assert.urlContains('my-documents')
      .end(),
};
