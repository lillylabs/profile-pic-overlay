import Vuex from 'vuex'

const store = () => new Vuex.Store({

  state: {
    title: '#Campaign',
    subtitle: 'Nam lacinia placerat justo, nec placerat leo condimentum vitae.',
    prompt: 'Aliquam lacus tellus, volutpat eu iaculis quis, faucibus id ex. Curabitur vitae mi velit',
    about: 'Nam lacinia placerat justo, nec placerat leo condimentum vitae. Nam sodales ac tellus sed pulvinar. Praesent vestibulum quam elit, nec dictum ante blandit sit amet. Fusce eget metus volutpat mi luctus dapibus. Vestibulum ut ipsum accumsan, ullamcorper quam ac, eleifend nulla. Aliquam lacus tellus, volutpat eu iaculis quis, faucibus id ex. Curabitur vitae mi velit. Curabitur placerat erat id vulputate mollis. Suspendisse quis erat a purus aliquam blandit. Mauris mollis felis at dignissim cursus. Cras venenatis tristique metus.',
    photo: {
      src: '/images/avatar.jpeg',
      title: 'profile'
    },
    buttons: {
      upload: {
        default: 'Select photo',
        new: 'Change photo'
      },
      download: {
        default: 'Download',
        icon: 'fa-download'
      }
    },
    filters: [
      '/images/filter-01.png',
      '/images/filter-02.png'
    ],
    nav: {
      left: [{
        label: 'About',
        href: '#about',
        icon: 'fa-chevron-down',
        iconOnly: false
      }],
      center: [

      ],
      right: [{
        label: 'Facebook',
        icon: 'fa-facebook-square',
        href: 'http://facebook.com',
        iconOnly: true
      }, {
        label: 'Instagram',
        icon: 'fa-instagram',
        href: 'http://instagram.com',
        iconOnly: true
      }]
    }
  },
  mutations: {

  }
})

export default store
