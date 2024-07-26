import { createStore } from "vuex";
import auth from "./modules/auth";
import error from "./modules/error";
import districts from "./modules/districts";

export default createStore({
  modules: {
    auth,
    error,
    districts,
  },
});
