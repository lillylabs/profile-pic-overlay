import { filter as FilterService } from '~assets/services/image.service';
// Switch on env variable
const content = JSON.parse(require('../static/content/' + process.env.contentFile));
// console.log(content);

export const state = () => ({
  selectedFilter: null,
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
  selectedFilter(state, key) {
    console.log('selected', key);
    state.selectedFilter = key;
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
      dispatch('filterUploadedImage');
    };

    fReader.readAsDataURL(file);
  },
  filterUploadedImage({ dispatch, state }) {
    dispatch('filterImage', {
      id: 'uploaded',
      image: state.uploadedImage.src,
      filter: state.content.filters[state.selectedFilter] || state.content.filters.woman
    });
  },
  filterImage({ commit }, { id, image, filter }) {
    console.log(filter);
    commit('filteredImagesStatus', { id, status: 'IN_PROGRESS' });
    FilterService(image, filter).then(filteredImage => {
      commit('filteredImage', { id, src: filteredImage });
      commit('filteredImagesStatus', { id, status: 'DONE' });
    });
  }
};
