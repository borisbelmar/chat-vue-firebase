<template>
    <v-layout justify-center>
        <v-flex xs12 sm8 md8>
            <v-card>
                <v-card-text>
                    <h3>Chat {{usuario.nombre}}</h3>
                </v-card-text>
                <v-card-text style="height: 60vh; overflow: auto" v-chat-scroll>
                    <div :class="item.nombre === usuario.nombre ? 'text-xs-right' : 'text-xs-left'"
                    v-for="(item, index) of mensajes" :key="index">
                        <small class="caption mr-2 d-block">{{item.nombre}}</small>
                        <v-chip>
                            <v-avatar>
                                <img :src="item.foto">
                            </v-avatar>
                            {{item.mensaje}}
                        </v-chip>
                        <p class="caption mr-2">{{item.fecha}}</p>
                    </div>
                </v-card-text>
                <v-card-text>
                    <v-form @submit.prevent="enviarMensaje()" v-model="valido">
                        <v-text-field 
                        v-model="mensaje" 
                        label="Escribe tu mensaje"
                        required
                        :rules="reglas">
                        </v-text-field>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import { db } from '@/firebase';
import { mapState } from 'vuex';
const moment = require('moment');
export default {
    name: 'Chat',
    data() {
        return {
            mensaje: '',
            valido: false,
            reglas: [
                v => !!v || 'Tienes que escribir un mensaje'
            ],
            mensajes: []
        }
    },
    computed: {
        ...mapState(['usuario'])
    },
    methods: {
        async enviarMensaje() {
            if(this.valido) {
                //console.log(`Enviaste el mensaje: ${this.mensaje}`)
                try {
                    await db.collection('chat').add({
                        mensaje: this.mensaje,
                        nombre: this.usuario.nombre,
                        foto: this.usuario.foto,
                        fecha: Date.now()
                    });
                    this.mensaje = '';
                } catch(err) {
                    console.log(err);
                }
                
            } else {
                console.log('No escribiste nada')
            }
        }
    },
    async created() {
        moment.locale('es');
        let ref = await db.collection('chat').orderBy('fecha', 'desc').limit(10);
        ref.onSnapshot(querySnapshot => {
            this.mensajes = []
            querySnapshot.forEach(doc => {
                this.mensajes.unshift({
                    mensaje: doc.data().mensaje,
                    foto: doc.data().foto,
                    nombre: doc.data().nombre,
                    fecha: moment(doc.data().fecha).format('lll')
                });
            })
        })
    }
}
</script>
