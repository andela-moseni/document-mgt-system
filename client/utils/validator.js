import validator from 'validator';
import { notify } from 'react-notify-toast';

const custom = { background: '#ff0000', text: '#FFFFFF' };
/**
* Validate required fields
* @param {Array} inputFields values
* @param {Function} requiredFields names of fields
* @returns {Object} object containing the status and error messages
*/
export function validateRequiredFields(inputFields = [], requiredFields = []) {
  const errors = {};
  let valid = true;

  inputFields.forEach((field, index) => {
    if (validator.isEmpty(String(field))) {
      errors[requiredFields[index]] =
      notify.show(`Please enter the ${requiredFields[index]} field`,
      'custom', 3000, custom);
      valid = false;
    }
  });
  return { errors, valid };
}

/**
* Validate login
* @param {Object} inputFields user details
* @returns {Object} object containing the status and error messages
*/
export function validateLogin({ email = '', password = '' }) {
  return validateRequiredFields([email, password], ['email', 'password']);
}

/**
* Validate signup
* @param {Object} inputFields user details
* @returns {Object} object containing the status and error messages
*/
export function validateSignUp({
  name = '', email = '', password = '', confirmPassword
}) {
  const status = validateRequiredFields(
    [name, email, password, confirmPassword],
    ['name', 'email', 'password', 'confirm password']);
  return status;
}

/**
* Validate document
* @param {Object} inputFields document details
* @returns {Object} object containing the status and error messages
*/
export function validateDocument({ title = '', content = '', type = '' }) {
  const status = validateRequiredFields([title, content, type],
  ['title', 'content', 'type']);
  return status;
}

/**
* Validate user
* @param {Object} inputFields user details
* @returns {Object} object containing the status and error messages
*/
export function validateUser({ name = '', email = '' }) {
  const status = validateRequiredFields(
    [name, email],
    ['name', 'email']);
  return status;
}
