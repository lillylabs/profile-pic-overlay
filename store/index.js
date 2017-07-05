export const state = () => ({
  uploadedImage: {
    dataUrl: null,
    status: null
  }
});

export const mutations = {
  imageStatus(state, status) {
    state.uploadedImage.status = status;
  },
  imageDataUrl(state, dataUrl) {
    state.uploadedImage.dataUrl = dataUrl;
  }

};

export const actions = {
  uploadFile({ commit }, file) {
    const fReader = new FileReader();
    commit('imageStatus', 'IN_PROGRESS');

    fReader.onload = () => {
      console.log('actions onLoad');
      commit('imageStatus', 'DONE');
      commit('imageDataUrl', fReader.result);
    };

    fReader.readAsDataURL(file);
  }
};
