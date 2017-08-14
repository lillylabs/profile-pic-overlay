import createLogger from 'vuex/dist/logger';
import Filter from '../services/image.service';
// Switch on env variable
const content = JSON.parse(require('../static/content/' + process.env.contentFile));

const SIZE = {
  SM: 500,
  MD: 750,
  LG: 1000
};

export const state = () => ({
  steps: {
    keys: ['index', 'edit', 'share'],
    selected: 'index'
  },
  uploading: false,
  orientation: 1,
  image: null,
  croppedImage: null,
  size: SIZE.LG,
  filtering: false,
  filteredImage: null,
  overlay: null,
  error: [],
  content: { ...content.attributes, about: content.body }
});

export const mutations = {
  setSelectedStep(state, key) {
    state.steps = {
      keys: state.steps.keys,
      selected: key
    };
  },
  startUpload(state) {
    state.uploading = true;
  },
  endUpload(state) {
    state.uploading = false;
  },
  startFiltering(state) {
    state.filtering = true;
  },
  endFiltering(state) {
    state.filtering = false;
  },
  setOrientation(state, orientation) {
    state.orientation = orientation;
  },
  setImage(state, image) {
    state.image = image;
  },
  setCroppedImage(state, image) {
    state.croppedImage = image;
  },
  setSize(state, size) {
    if (size < SIZE.MD) {
      state.size = SIZE.SM;
      state.overlay = state.content.overlay.sm;
    } else if (size < SIZE.LG) {
      state.size = SIZE.MD;
      state.overlay = state.content.overlay.md;
    } else {
      state.size = SIZE.LG;
      state.overlay = state.content.overlay.lg;
    }
  },
  setFiltredImage(state, image) {
    state.filteredImage = image;
  },
  addError(state, error) {
    state.error = [...state.error, error];
  }
};

export const actions = {
  useImage({ commit }, imageUrl) {
    commit('setImage', null);
    commit('startUpload');
    Filter.grayscaleAndSize(imageUrl).then(({ size, image }) => {
      commit('setImage', image);
      commit('setSize', size);
      commit('endUpload');
    });
  },
  uploadFile({ commit, dispatch }, file) {
    const fReader = new FileReader();
    commit('startUpload');

    fReader.onload = () => {
      dispatch('useImage', fReader.result);
    };

    fReader.readAsDataURL(file);
  },
  filterImage({ commit, dispatch, state }, image) {
    commit('startFiltering');
    commit('setFiltredImage', null);
    Filter.overlay(image, state.overlay).then(filtredImage => {
      commit('setFiltredImage', filtredImage);
      commit('endFiltering');
    });
  }
};

const facebookAvailable = store => {
  store.subscribe(mutation => {
    if (mutation.type === 'facebook/available') {
      store.dispatch('facebook/loginStatus');
    }
  });
};

export const plugins = process.env.NODE_ENV !== 'production' ? [createLogger(), facebookAvailable] : [facebookAvailable];
