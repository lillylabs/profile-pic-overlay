/* global FB */

import axios from 'axios';
import Filter from '../services/image.service';

function post(accessToken, image, text) {
  const blob = Filter.dataURItoBlob(image);
  var fd = new FormData();
  fd.append('access_token', accessToken);
  fd.append('filename', 'test.jpeg');
  fd.append('source', blob);
  if (text) {
    fd.append('message', text);
  }
  return axios.post('https://graph.facebook.com/me/photos', fd);
}

function login(permission) {
  return new Promise((resolve, reject) => {
    FB.login((response) => {
      if (response.authResponse) {
        permissions(response.authResponse)
          .then(permissions => {
            resolve({ response, permissions });
          });
      } else {
        reject(new Error('User cancelled login or did not fully authorize.'));
      }
    }, { scope: permission });
  });
}

function loginStatus() {
  return new Promise((resolve) => {
    FB.getLoginStatus((response) => {
      permissions(response.authResponse)
        .then(permissions => {
          resolve({ response, permissions });
        });
    });
  });
};

function permissions(authResponse) {
  if (!authResponse) {
    return Promise.resolve([]);
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
      console.error('Facebook persmission', error);
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

export default { loginStatus, getProfilePicture, login, post };
