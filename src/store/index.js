import { createStore } from 'vuex';
import auth from './modules/auth';
import error from './modules/error';
import districts from './modules/districts';
import home from './modules/home';

export default createStore({
  modules: {
    auth,
    error,
    districts,
    home,
  },
});
