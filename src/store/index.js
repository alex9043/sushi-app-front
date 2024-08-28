import { createStore } from 'vuex';
import auth from '@/store/modules/auth';
import error from '@/store/modules/error';
import districts from '@/store/modules/districts';
import home from '@/store/modules/home';
import cart from '@/store/modules/cart';

export default createStore({
  modules: {
    auth,
    error,
    districts,
    home,
    cart,
  },
});
