import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.29/vue.esm-browser.min.js';

const apiUrl = 'https://vue3-course-api.hexschool.io/v2';
const apiPath = "kn99";
let productModal = {};

const app = createApp({
    data() {
        return {
            products: [],
            tempProduct: {
                imagesUrl:[]
            },
            isNew: false,
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
        showProductModal(status, product) {
            switch (status) {
                case 'add':
                    this.tempProduct = {imagesUrl:[]};
                    this.isNew = true;
                    break;
                case 'edit':
                    this.tempProduct = {...product};
                    this.isNew = false;
                    break;                    
            }
            productModal.show();
        },
        hideProductModal() {
            productModal.hide();
        },
        updateProduct() {
            let method = 'post';
            let url = `${apiUrl}/api/${apiPath}/admin/product`;
            let message = '產品新增完成';

            if (!this.isNew) {
                method = 'put';
                url = `${apiUrl}/api/${apiPath}/admin/product/${this.tempProduct.id}`;
                message = '產品修改完成';
            }

            axios[method](url, {
                "data": this.tempProduct
            })
            .then(res => {
                alert(message);
                this.hideProductModal();
                this.getProducts();
                this.tempProduct = {imagesUrl:[]};
            })
            .catch(err => {
                console.log(err);
                alert('產品新增失敗');
            })
        },
        checkUser() {// 檢查是否有登入 token
            axios.defaults.headers.common.Authorization = document.cookie.replace(/(?:(?:^|.*;\s*)hextoken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            axios.post(`${apiUrl}/api/user/check`)
            .then(res => {
                productModal = new bootstrap.Modal(document.getElementById('productModal'), {});
                this.getProducts();
            })
            .catch(err => {
                console.log(err);
                window.location = 'index.html'
            })
        }

    },
    mounted() {
        this.checkUser();
    }
});

app.mount('#app');