import { filter as FilterService } from '~assets/services/image.service';
// Switch on env variable
const content = JSON.parse(require('../static/content/' + process.env.contentFile));
// console.log(content);

export const state = () => ({
  selectedOverlay: 'woman',
  uploadedImage: {
    src: null,
    status: null,
    error: null
  },
  filteredImages: {
    status: null,
    error: null,
    man: null,
    woman: null,
    uploaded: null
  },
  content: { ...content.attributes, about: content.body }
});

export const mutations = {
  selectedOverlay(state, key) {
    state.selectedOverlay = key;
  },
  imageStatus(state, status) {
    state.uploadedImage.status = status;
  },
  imageDataUrl(state, dataUrl) {
    state.uploadedImage.src = dataUrl;
  },
  uploadError(state, error) {
    state.uploadedImage.status = 'ERROR';
    state.uploadedImage.error = error;
  },
  filteredImagesStatus(state, status) {
    state.filteredImages.status = status;
  },
  filteredImage(state, { id, src }) {
    state.filteredImages[id] = src;
  }

};

export const actions = {
  uploadFile({ commit, dispatch }, file) {
    const fReader = new FileReader();
    commit('imageStatus', 'IN_PROGRESS');

    fReader.onload = () => {
      commit('imageDataUrl', fReader.result);
      commit('imageStatus', 'DONE');
    };

    fReader.readAsDataURL(file);
  },
  filterImage({ commit }, { id, image, overlay }) {
    commit('filteredImagesStatus', { id, status: 'IN_PROGRESS' });
    FilterService(image, overlay).then(filteredImage => {
      commit('filteredImage', { id, src: filteredImage });
      commit('filteredImagesStatus', { id, status: 'DONE' });
    });
  }
};
