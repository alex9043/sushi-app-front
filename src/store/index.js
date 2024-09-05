import { createStore } from 'vuex';
import auth from '@/store/modules/auth';
import home from '@/store/modules/home';
import cart from '@/store/modules/cart';
import order from '@/store/modules/order';
import address from '@/store/modules/address';

export default createStore({
  modules: {
    auth,
    home,
    cart,
    order,
    address,
  },
});
