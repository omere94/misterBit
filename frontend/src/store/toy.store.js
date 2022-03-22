import { toyService } from '../services/toy.service.js';

export default {
  state: {
    toys: null,
    labels: ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor"],
    filterBy: null,
    isLoading: false,
  },
  getters: {
    getToys(state) {
      return state.toys;
    },
    getLabels(state) {
      return state.labels;
    },
    isLoading(state) {
      return state.isLoading
    },
  },
  mutations: {
    setToys(state, { toys }) {
      state.toys = toys;
    },
    setIsLoading(state, { isLoading }) {
      state.isLoading = isLoading
    },
    removeToy(state, { id }) {
      const idx = state.toys.findIndex((toy) => toy._id === id);
      state.toys.splice(idx, 1);
    },
    saveToy(state, { toy }) {
      const idx = state.toys.findIndex((currToy) => currToy._id === toy._id);
      if (idx !== -1) state.toys.splice(idx, 1, toy);
      else state.toys.push(toy);
    },
    setFilter(state, { filterBy }) {
      state.filterBy = filterBy;
    },
  },
  actions: {
    async loadToys({ commit, state }) {
      commit({ type: 'setIsLoading', isLoading: true })
      try {
        var toys = await toyService.query(state.filterBy)
        commit({ type: 'setToys', toys });
      }
      catch(err) {
        console.error('Cannot Load toys', err);
        throw err;
      }
      finally {
        commit({ type: 'setIsLoading', isLoading: false });
      }
    },
    async removeToy({ commit }, { id }) {
      try {
        var id = await toyService.remove(id)
        commit({ type: 'removeToy', id });
      }
      catch(err) {
        console.error('Cannot remove toy', err);
        throw err;
      }
        
    },
    async saveToy({ commit }, { toy }) {
      try {
        var toy = await toyService.save(toy)
          commit({ type: 'saveToy', toy })
        }
      catch(err) {
        console.error('Cannot Edit/Add toy', err);
        throw err;
      }
    },
    filter({ commit, dispatch }, { filterBy }) {
      commit({ type: 'setFilter', filterBy });
      dispatch({ type: 'loadToys' });
    },

  }
};
