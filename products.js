import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.29/vue.esm-browser.min.js';

const apiUrl = 'https://vue3-course-api.hexschool.io/v2';
const apiPath = "kn99";
let productModal = {};

const app = createApp({
    data() {
        return {
            products: [],
            tempProduct: {
                imagesUrl:[],
            },
        }
    },
    methods: {
        getProducts() {
            axios.get(`${apiUrl}/api/${apiPath}/admin/products`)
            .then(res => {
                this.products = res.data.products;
            })
            .catch(err => {
                console.log(err.response);
            })
        },
        showProductModal() {
            productModal.show();
        },
        hideProductModal() {
            productModal.hide();
        },
        createProduct() {
            axios.post(`${apiUrl}/api/${apiPath}/admin/product`, {
                "data": this.tempProduct
            })
            .then(res => {
                console.log(res.data);
                alert('產品新增完成');
                this.hideProductModal();
                this.getProducts();
                this.tempProduct = {imagesUrl:[]};
            })
            .catch(err => {
                console.log(err);
                alert('產品新增失敗');
            })
        }

    },
    mounted() {
        axios.defaults.headers.common.Authorization = document.cookie.replace(/(?:(?:^|.*;\s*)hextoken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        productModal = new bootstrap.Modal(document.getElementById('productModal'), {});
        this.getProducts();
    }
});

app.mount('#app');
