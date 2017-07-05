import { filter as FilterService } from '~assets/services/image.service';

export const state = () => ({
  uploadedImage: {
    src: null,
    status: null,
    error: null
  },
  filteredImage: {},
  filteredImageStatus: {}
});

export const mutations = {
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
  filteredImageStatus(state, { id, status }) {
    state.filteredImageStatus = { ...state.filteredImageStatus, [id]: status };
    console.log(state.filteredImageStatus);
  },
  filteredImage(state, { id, src }) {
    state.filteredImage = { ...state.filteredImage, [id]: src };
  }

};

export const actions = {
  uploadFile({ commit }, file) {
    const fReader = new FileReader();
    commit('imageStatus', 'IN_PROGRESS');

    fReader.onload = () => {
      commit('imageDataUrl', fReader.result);
      commit('imageStatus', 'DONE');
    };

    fReader.readAsDataURL(file);
  },
  filterImage({ commit }, { id, image, filter }) {
    commit('filteredImageStatus', { id, status: 'IN_PROGRESS' });
    console.log(image);
    FilterService(image, filter).then(filteredImage => {
      commit('filteredImage', { id, src: filteredImage });
      commit('filteredImageStatus', { id, status: 'DONE' });
    });
  }
};
