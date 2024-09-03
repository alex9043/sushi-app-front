import { createStore } from 'vuex';
import auth from '@/store/modules/auth';
import districts from '@/store/modules/districts';
import home from '@/store/modules/home';
import cart from '@/store/modules/cart';
import order from '@/store/modules/order';

export default createStore({
  modules: {
    auth,
    districts,
    home,
    cart,
    order,
  },
});
