import Filter from '../services/image.service';
// Switch on env variable
const content = JSON.parse(require('../static/content/' + process.env.contentFile));
// console.log(content);

export const state = () => ({
  steps: {
    keys: ['index', 'edit', 'share'],
    selected: 'index'
  },
  uploading: false,
  orientation: 1,
  image: null,
  filtering: false,
  filteredImage: null,
  overlay: content.attributes.overlay,
  error: [],
  content: { ...content.attributes, about: content.body }
});

export const mutations = {
  setSelectedStep(state, key) {
    console.log(key);
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
  setFiltredImage(state, image) {
    state.filteredImage = image;
  },
  addError(state, error) {
    state.error = [...state.error, error];
  }
};

export const actions = {
  useImage({ commit }, image) {
    commit('setImage', null);
    commit('startUpload');
    Filter.grayscale(image).then(grayscale => {
      commit('setImage', grayscale);
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
