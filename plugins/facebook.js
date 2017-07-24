/* eslint-disable */

export default ({ app: { store } }) => {

  window.fbAsyncInit = function () {
    FB.init({
      appId: process.env.facebookAppId,
      xfbml: true,
      version: 'v2.9'
    });
    FB.AppEvents.logPageView();
    store.commit('facebook/available');
  };

  (function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
}