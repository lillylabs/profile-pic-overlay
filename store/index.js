export const state = () => ({
  uploadedImage: {
    src: null,
    status: null,
    error: null
  }
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
  }

};

export const actions = {
  uploadFile({ commit }, file) {
    const fReader = new FileReader();
    commit('imageStatus', 'IN_PROGRESS');

    fReader.onload = () => {
      commit('imageStatus', 'DONE');
      commit('imageDataUrl', fReader.result);
    };

    fReader.readAsDataURL(file);
  }
};
