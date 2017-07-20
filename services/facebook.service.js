/* global FB */

import axios from 'axios';

function login(permission) {
  return new Promise((resolve, reject) => {
    FB.login((response) => {
      if (response.authResponse) {
        resolve(response.authResponse);
      } else {
        reject(new Error('User cancelled login or did not fully authorize.'));
      }
    }, { scope: permission });
  });
};

function loginStatus() {
  return new Promise((resolve) => {
    FB.getLoginStatus((response) => {
      resolve(response);
    });
  });
};

function permissions(authResponse) {
  if (!authResponse) {
    return [];
  }

  var fd = new FormData();
  fd.append('access_token', authResponse.accessToken);
  return axios.get('https://graph.facebook.com/me/permissions', {
    params: {
      access_token: authResponse.accessToken
    }
  })
    .then(response => {
      return response.data.data;
    })
    .catch(error => {
      console.log(error);
      return [];
    });
}

function getProfilePicture() {
  return new Promise((resolve, reject) => {
    FB.api('me/picture', 'get', { type: 'large' }, (response) => {
      if (!response || response.error) {
        reject(new Error('Profile picture error'));
      } else {
        resolve(response.data.url);
      }
    });
  });
}

function connect() {
  var _response = null;
  return loginStatus()
    .then(response => {
      _response = response;
      return permissions(response.authResponse);
    })
    .then(permissions => {
      return {
        response: _response,
        permissions
      };
    });
}

export default { connect, getProfilePicture, login };
