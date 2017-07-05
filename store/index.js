export const state = () => ({
  image: {
    dataUrl: null,
    status: null
  }
});

export const mutations = {
  imageStatus(state, status) {
    state.image.status = status;
  },
  imageDataUrl(state, dataUrl) {
    console.log('mutations imageDataUrl');
    state.image.dataUrl = dataUrl;
  }

};

export const actions = {
  uploadFile({ commit }, file) {
    const fReader = new FileReader();
    commit('imageStatus', 'IN_PROGRESS');

    fReader.onload = () => {
      console.log('actions onLoad');
      commit('imageDataUrl', fReader.result);
    };

    fReader.readAsDataURL(file);
  }
};
