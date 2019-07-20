<template>
    <v-layout justify-center>
        <v-flex xs12 sm8 md6 mt-5>
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
                    <input type="file" ref="subir" class="d-none" @change="buscarImagen($event)">
                    <v-btn color="primary" @click="$refs.subir.click()">Buscar imagen</v-btn>
                    <v-btn color="secondary" :disabled="file === null" @click="subirImagen()" :loading="loading">Subir imagen</v-btn>
                </v-card-text>
                <v-card-text v-if="error">
                    <h4>{{error}}</h4>
                </v-card-text>
                <v-card-text v-if="file">
                    <h4>{{file.name}}</h4>
                    <v-img :src="imgUrl"></v-img>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import { mapState } from 'vuex';
import { firebase, storage, db } from "@/firebase";
export default {
    name: 'Admin',
    data() {
        return {
            file: null,
            imgUrl: '',
            loading: false,
            error: null
        }
    },
    computed: {
        ...mapState(['usuario'])
    },
    methods: {
        buscarImagen(event) {
            const tipo = event.target.files[0].type;
            if(tipo === 'image/jpeg' || tipo === 'image/png') {
                this.file = event.target.files[0];
            } else {
                this.error = 'Archivo no válido';
                this.file = null;
                return;
            }
            const reader = new FileReader();
            reader.readAsDataURL(this.file);
            reader.onload = (event) => {
                this.imgUrl = event.target.result;
            }
            this.error = null;
        },
        async subirImagen() {
            try {
                this.loading = true;
                const refImagen = storage.ref().child(this.usuario.email).child('foto-perfil');
                const res = await refImagen.put(this.file);
                const urlDescarga = await refImagen.getDownloadURL();
                this.usuario.foto = urlDescarga;
                await db.collection('usuarios').doc(this.usuario.uid).update({foto: this.usuario.foto});
            } catch(err) {
                console.log(err);
            } finally {
                this.loading = false;
                this.file = null;
            }
        }
    }
}
</script>

