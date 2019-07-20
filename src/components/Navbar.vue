<template>
    <nav>
        <v-toolbar app>
            <v-toolbar-side-icon v-if="existeUsuario" @click="drawer = !drawer"/>
            <v-toolbar-title class="headline text-uppercase">
                <router-link :to="{name:'home'}">
                <span>dobleb</span>
                <span class="font-weight-light">chat</span>
                </router-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
                flat
                @mouseover="logoutIcon = 'fa-door-open'"
                @mouseleave="logoutIcon = 'fa-door-closed'"
                @click="logOut"
                v-if="existeUsuario"
            >
                <span class="mr-2">Cerrar Sesión</span>
                <v-icon>{{logoutIcon}}</v-icon>
            </v-btn>
        </v-toolbar>
        <v-navigation-drawer class="primary" v-model="drawer" app>
            <v-layout column align-center mt-3>
                <v-flex>
                    <v-avatar
                    color="grey lighten-4"
                    >
                        <img :src="usuario.foto">
                    </v-avatar>
                </v-flex>
                <v-flex my-3>
                    <h1 class="white--text">{{usuario.nombre}}</h1>
                </v-flex>
            </v-layout>
            <v-divider/>
            <v-list>
                <v-list-tile v-for="(item, index) of menuItems" :key="index" :to="item.to">
                    <v-list-tile-action>
                        <v-icon class="white--text">{{item.icon}}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title class="white--text">{{item.title}}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
    </nav>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
    name: 'Navbar',
  data () {
    return {
      logoutIcon: 'fa-door-closed',
      drawer: false,
      menuItems: [
          {title: 'Perfil', icon: 'fas fa-address-card', to: {name:'home'}},
          {title: 'Chat', icon: 'far fa-comments', to: {name:'chat'}},
          {title: 'Preferencias', icon: 'fas fa-cog', to: {name:'admin'}}
      ]
    }
  },
  methods: {
    ...mapActions(['logOut'])
  },
  computed: {
    ...mapGetters(['existeUsuario']),
    ...mapState(['usuario'])
  } 
}
</script>
