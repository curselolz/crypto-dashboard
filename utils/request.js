/* global window, INTEGRATOR_URL */
import 'whatwg-fetch';

const PERSIST_KEY = 'persist:primary';

const whiteListedUrls = ['^.+/users/authgrant/token', '^.+/users/[0-9]+$'];

/**
 * Parses the JSON returned by a network request
 *
 * @param {object} response - A response from a network request
 *
 * @return {object} - The parsed JSON from the request
 */
async function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }

  const contentType = response.headers.get('content-type');

  // in case of xml or text responses
  if (contentType && contentType.indexOf('text/plain') !== -1) {
    return response.text();
  }

  if (contentType && contentType.indexOf('application/json') !== -1) {
    return response.json();
  }

  if (
    contentType
    && (contentType.indexOf('application/pdf') !== -1 || contentType.indexOf('text/csv') !== -1)
  ) {
    return response.blob();
  }

  if (!contentType) {
    return response.text();
  }

  return response;
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param {object} response - A response from a network request
 *
 * @return {object|undefined} - Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  if (response.status === 401) {
    localStorage.removeItem(PERSIST_KEY);

    if (window.location.href.indexOf('/login') === -1) {
      window.location.href = '/login';
    }

    if (!response.statusText) {
      throw new Error('Unauthorized request');
    }
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Adds JWT header to the request options for specific requests
 *
 * @param {string} url - The URL we want to request
 * @param {object} [options] - The options we want to pass to "fetch"
 *
 * @return {object} - The options with JWT header, if necessary
 */
function tryAddJWTHeader(url, options = { method: 'GET' }) {
  const modifiedOptions = { ...options }; // copy object to make it pure

  // only specific requests need to be changed
  if (
    url.indexOf(INTEGRATOR_URL) !== -1
    && !whiteListedUrls.some(whiteListedUrl => url.match(whiteListedUrl))
  ) {
    // get persisted store in localstorage
    const store = localStorage.getItem('persist:primary');

    if (store) {
      const user = JSON.parse(JSON.parse(store).user);

      if (user) {
        if (!modifiedOptions.headers) {
          modifiedOptions.headers = {};
        }

        modifiedOptions.headers.Authorization = user.jwt;
      }
    }
  }

  return modifiedOptions;
}

/**
 * Checks for the error status codes inside of the returned JSON,
 * in case when the response code is success.
 *
 * @param {any} parsedData - Parsed JSON data
 *
 * @return {any} - Checked parsed data.
 */
function tryParseErrors(parsedData) {
  if (parsedData.statusCode && parsedData.statusCode >= 300) {
    if (parsedData.message) {
      throw new Error(parsedData.message);
    }

    console.error(parsedData);
    throw new Error('Unexpected server error!');
  }

  if (parsedData.errorFlag === true) {
    if (parsedData.errorMessage) {
      throw new Error(parsedData.errorMessage);
    }

    console.error(parsedData);
    throw new Error('Unexpected server error!');
  }

  return parsedData;
}

/**
 * Requests a URL, returning a promise
 *
 * @param {string} url - The URL we want to request
 * @param {object} [options] - The options we want to pass to "fetch"
 *
 * @return {object} - The response data
 */
export default async function request(url, options) {
  try {
    const modifiedOptions = tryAddJWTHeader(url, options);
    const response = await fetch(url, modifiedOptions);
    const checkStatusResult = checkStatus(response);

    const parsedData = await parseJSON(checkStatusResult);
    return tryParseErrors(parsedData);
  } catch (error) {
    if (!error.response) {
      throw error;
    }

    const errorBody = await error.response.json();
    throw errorBody;
  }
}

/**
 * Gets detailed error object from error response
 *
 * @param {object} errorResponse - API Response with error information
 *
 * @return {object} - Formatted error data
 */
export async function parseErrors(errorResponse) {
  if (errorResponse.response && errorResponse.response.json) {
    return errorResponse.response.json();
  }

  return errorResponse;
}
