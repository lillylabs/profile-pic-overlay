import { overlay as Overlay, grayscale as Grayscale } from '~assets/services/image.service';
// Switch on env variable
const content = JSON.parse(require('../static/content/' + process.env.contentFile));
// console.log(content);

export const state = () => ({
  images: {
    man: {
      original: content.attributes.avatars.man,
      overlay: content.attributes.filters.man,
      filtered: null,
      status: null
    },
    woman: {
      original: content.attributes.avatars.woman,
      overlay: content.attributes.filters.woman,
      filtered: null,
      status: null
    },
    uploaded: {
      original: null,
      overlay: content.attributes.filters.woman,
      filtered: null,
      status: null
    }
  },
  content: { ...content.attributes, about: content.body }
});

export const mutations = {
  imageOverlay(state, { key, overlay }) {
    state.images[key].overlay = overlay;
  },
  imageStatus(state, { key, status }) {
    state.images[key].status = status;
  },
  originalImage(state, { key, image }) {
    state.images[key].original = image;
  },
  filteredImage(state, { key, image }) {
    state.images[key].filtered = image;
  },
  uploadError(state, error) {
    state.images.original.status = 'ERROR';
    state.images.original.error = error;
  }
};

export const actions = {
  uploadFile({ commit, state, dispatch }, file) {
    const fReader = new FileReader();
    commit('imageStatus', { key: 'uploaded', status: 'LOADING' });

    fReader.onload = () => {
      commit('imageStatus', { key: 'uploaded', status: 'LOADED' });
      Grayscale(fReader.result).then(function (image) {
        commit('imageStatus', { key: 'uploaded', status: 'GRAYSCALE' });
        commit('originalImage', { key: 'uploaded', image: image });
        dispatch('filterImage', 'uploaded');
      });
    };

    fReader.readAsDataURL(file);
  },
  filterImage({ commit, state }, key) {
    commit('imageStatus', { key, status: 'FILTERING' });
    const image = state.images[key].original;
    const overlay = state.images[key].overlay;
    Grayscale(image).then(grayImage => {
      Overlay(grayImage, overlay).then(filteredImage => {
        commit('filteredImage', { key, image: filteredImage });
        commit('imageStatus', { key, status: 'FILTERED' });
      });
    });
  }
};
