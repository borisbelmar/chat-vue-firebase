import Vue from 'vue'
import Vuex from 'vuex'
import { auth, db } from '@/firebase';
import router from '@/router';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuario: ''
  },
  mutations: {
    nuevoUsuario(state, payload) {
      if(payload === null) {
        state.usuario = '';
      } else {
        state.usuario = payload;
      }
    }
  },
  actions: {
    async setUsuario({commit}, payload) {
      try {
        const doc = await db.collection('usuarios').doc(payload.uid).get();
        if (doc.exists) {
          commit('nuevoUsuario', doc.data());
        } else {
          const usuario = {
            nombre: payload.displayName,
            email: payload.email,
            uid: payload.uid,
            foto: payload.photoURL
          };
          await db.collection('usuarios').doc(usuario.uid).set(usuario);
          commit('nuevoUsuario', usuario);
        }
      } catch(err) {
        console.log(err);
      }
      
    },
    logOut({commit}) {
      auth.signOut();
      commit('nuevoUsuario', null);
      router.push({name:'login'});
    }
  },
  getters: {
    existeUsuario(state) {
      if(state.usuario === null || state.usuario === '' || state.usuario === undefined) {
        return false;
      } else {
        return true;
      }
    }
  }
});
