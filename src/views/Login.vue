<template>
    <div>
    <v-layout justify-center mt-5>
        <v-flex xs12 sm8 md6 xl4>
            <v-card>
                <v-card-text class="title white--text text-xs-center" :class="registro ? 'primary' : 'secondary'">
                    <span v-if="!registro">Ingreso</span>
                    <span v-if="registro">Registro</span>
                </v-card-text>
                <v-card-text>
                    <v-btn block color="error" @click="google">
                        <v-icon left>fab fa-google</v-icon>
                        Google
                    </v-btn>
                    <v-btn block color="info" @click="facebook">
                        <v-icon left>fab fa-facebook-f</v-icon>
                        Facebook
                    </v-btn>
                    <v-btn block color="light" class="mt-4" @click="registro = true" v-if="!registro">
                        ¿No tienes cuenta? Regístrate Aquí
                    </v-btn>
                    <v-btn block color="light" class="mt-4" @click="registro = false" v-if="registro">
                        Ya tienes cuenta? Ingresa Aquí
                    </v-btn>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
    </div>
</template>

<script>
import {firebase, auth, db} from '@/firebase';
import { mapMutations, mapActions } from 'vuex';
import router from '@/router';
export default {
    name: 'Login',
    data() {
        return {
            registro: false
        }
    },
    //var provider = new firebase.auth.FacebookAuthProvider();
    methods: {
        ...mapMutations(['nuevoUsuario']),
        ...mapActions(['setUsuario']),
        google() {
            const provider = new firebase.auth.GoogleAuthProvider();
            this.ingresar(provider);
        },
        facebook() {
            const provider = new firebase.auth.FacebookAuthProvider();
            this.ingresar(provider);
        },
        async ingresar(provider) {
            firebase.auth().languageCode = 'es';
            try {
                //Ingreso de usuario
                const result = await firebase.auth().signInWithPopup(provider);
                const user = result.user;
                this.setUsuario(user);
                router.push({name:'home'});
            } catch(err) {
                console.log(err);
            }
        }
    }
}
</script>

