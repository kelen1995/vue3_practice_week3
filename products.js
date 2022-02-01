import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.29/vue.esm-browser.min.js';

const app = createApp({
    data() {
        return {
            text: '一段文字'
        }
    },
    methods: {

    },
    mounted() {

    }
});

app.mount('#app');