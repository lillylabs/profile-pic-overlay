import Filter from '~assets/services/image.service';
// Switch on env variable
const content = JSON.parse(require('../static/content/' + process.env.contentFile));
// console.log(content);

export const state = () => ({
  uploading: false,
  orientation: 1,
  image: null,
  overlay: null,
  error: [],
  content: { ...content.attributes, about: content.body }
});

export const mutations = {
  startUpload(state) {
    state.uploading = true;
  },
  endUpload(state) {
    state.uploading = false;
  },
  setOrientation(state, orientation) {
    console.log('index', orientation);
    state.orientation = orientation;
  },
  setImage(state, image) {
    state.image = image;
  },
  setOverlay(state, overlay) {
    state.overlay = overlay;
  },
  addError(state, error) {
    state.error = [...state.error, error];
  }
};

export const actions = {
  uploadFile({ commit, state, dispatch }, file) {
    const fReader = new FileReader();
    commit('startUpload');
    commit('setImage', null);

    fReader.onload = () => {
      Filter.grayscale(fReader.result).then(grayscale => {
        commit('setImage', grayscale);
        commit('endUpload');
      });
    };

    fReader.readAsDataURL(file);
  }
};
