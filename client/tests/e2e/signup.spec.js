import faker from 'faker';
import config from './config';

const fakeName = faker.name.findName();
const fakeEmail = faker.internet.email();
const fakePassword = faker.internet.password();

export default {
  'Register a user': browser =>
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .click('#signup')
      .setValue('Input[name=name]', fakeName)
      .setValue('Input[name=email]', fakeEmail)
      .setValue('Input[name=password]', fakePassword)
      .setValue('Input[name=passwordConfirmation]', fakePassword)
      .click('button')
      .pause(2000)
      .assert.containsText('h3#fiddle-text',
      'Welcome to Meek - Document Management System')
      .click('#menuBar')
      .pause(2000)
      .waitForElementVisible('#menuBar')
      .assert.containsText('span.black-text', `Welcome, ${fakeName}`)
      .assert.containsText('p.black-text', `${fakeEmail}`)
      .end(),

  'Invalid signup': browser =>
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .click('#signup')
      .setValue('Input[name=name]', faker.name.findName())
      .setValue('Input[name=email]', faker.internet.email())
      .setValue('Input[name=password]', faker.internet.password())
      .setValue('Input[name=passwordConfirmation]', faker.internet.password())
      .click('button')
      .pause(2000)
      .assert.urlContains('signup')
      .end(),
};
