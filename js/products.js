import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.28/vue.esm-browser.min.js";

let productModal = {};
let delProductModal = {};

const app = createApp({
    data() {
        return {
            url: 'https://vue3-course-api.hexschool.io/v2',
            api_Path: 'skps0102',
            Type: '',
            products: [],
            tempItem: {
                // title: '',
                // category: '',
                // origin_price: parseInt(''),
                // price: parseInt(''),
                // unit: '',
                // description: '',
                // content: '',
                // is_enabled: parseInt(''),
                // imageUrl: '',
                //imagesUrl: []
            }
        }
    },
    methods: {
        checkLogin() {
            axios.post(`${this.url}/api/user/check`)
                .then(res => {
                    // 登入成功取得產品資料
                    this.getProducts();
                })
                .catch(err => {
                    alert(err.data.message);
                    window.location = 'login.html';
                });
        },
        getProducts() {
            axios.get(`${this.url}/api/${this.api_Path}/admin/products`)
                .then(res => {
                    this.products = res.data.products;
                })
                .catch(err => {
                    alert(err.data.message);
                })
        },
        addProduct() { //新增產品
            const product = {
                data: this.tempItem
            };
            axios.post(`${this.url}/api/${this.api_Path}/admin/product`, product)
                .then(res => {
                    alert(res.data.message);
                    this.getProducts();
                    this.toggleModal('add', 'close');
                })
                .catch(err => {
                    alert(err.data.message);
                })
        },
        removeProduct() { //刪除產品
            const id = this.tempItem.id;
            axios.delete(`${this.url}/api/${this.api_Path}/admin/product/${id}`)
                .then(res => {
                    alert(res.data.message);
                    this.getProducts();
                    this.toggleModal('remove', 'close')
                })
                .catch(err => {
                    alert(err.data.message);
                })
        },
        modifyProduct(){ //修改產品
            const id = this.tempItem.id;
            const product = {
                data: this.tempItem
            };
            axios.put(`${this.url}/api/${this.api_Path}/admin/product/${id}`, product)
                .then(res => {
                    alert(res.data.message);
                    this.getProducts();
                    this.toggleModal('modify', 'close');
                })
                .catch(err => {
                    alert(err.data.message);
                })
        },
        clearTempItem() {
            this.tempItem = {};
        },
        editData(item) {
            this.tempItem = JSON.parse(JSON.stringify(item));
        },
        addImg() {
            if (this.tempItem.imagesUrl === undefined){
                this.tempItem.imagesUrl = [];
                this.tempItem.imagesUrl.push('');
            } else {
                this.tempItem.imagesUrl.push('');
            }
        },
        removeImg() {
            this.tempItem.imagesUrl.pop(); 
        },
        toggleModal(request, action) {
            if (request === 'add' || request === 'modify') {
                if (action === 'open') {
                    productModal.show();
                } else {
                    productModal.hide();
                }
                return;
            }

            if (request === 'remove') {
                if (action === 'open') {
                    delProductModal.show();
                } else {
                    delProductModal.hide();
                }
                return;
            }
        }
    },
    mounted() {
        // 自訂操作Modal
        productModal = new bootstrap.Modal(document.querySelector('#productModal'));
        delProductModal = new bootstrap.Modal(document.querySelector('#delProductModal'));
        // 取出存放在cookie內的token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        // 將token設定在http request header內
        axios.defaults.headers.common['Authorization'] = token;
        // 確認是否登入
        this.checkLogin();
    }
})

app.mount('#app');