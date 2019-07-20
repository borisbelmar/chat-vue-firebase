<template>
    <v-layout justify-center>
        <v-flex xs12 sm8 md4 mt-5>
            <v-card class="text-xs-center">
                <v-card-text>
                    <v-avatar
                    color="grey lighten-4"
                    size="128"
                    >
                        <img :src="usuario.foto">
                    </v-avatar>
                </v-card-text>
                <v-card-text>
                    <h2>{{usuario.nombre}}</h2>
                </v-card-text>
                <v-card-text>
                    <v-btn block class="primary" :to="{name:'chat'}">Chatear ahora</v-btn>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import { mapState } from 'vuex';
  export default {
    name: 'Home',
    computed: {
      ...mapState(['usuario'])
    }
  }
</script>
