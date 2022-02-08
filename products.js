import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.29/vue.esm-browser.min.js';

const apiUrl = 'https://vue3-course-api.hexschool.io/v2';
const apiPath = "kn99";
let productModal = {};

const app = createApp({
    data() {
        return {
            products: [],
            tempProduct: {},
        }
    },
    methods: {
        getProducts() {
            axios.get(`${apiUrl}/api/${apiPath}/admin/products`)
            .then(res => {
                this.products = res.data.products;
            })
        },
        showProductModal() {
            productModal.show();
        }

    },
    mounted() {
        axios.defaults.headers.common.Authorization = document.cookie.replace(/(?:(?:^|.*;\s*)hextoken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        productModal = new bootstrap.Modal(document.getElementById('productModal'), {});
        this.getProducts();
    }
});

app.mount('#app');
