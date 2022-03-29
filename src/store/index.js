import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    projects: [],
    autocompletePage: {
      hasNextPage: false,
      endCursor: '',
    },
  },
  mutations: {
    pushNewProject(state, project) {
      state.projects.push(project)
    },
    setAutocompleteEndCursor(state, cursor) {
      state.autocompletePage.endCursor = cursor
    },
    setAutoCompleteHasNextPage(state, hasNextPage) {
      state.autocompletePage.hasNextPage = hasNextPage
    }
  },
})
