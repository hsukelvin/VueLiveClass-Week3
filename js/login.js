import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.28/vue.esm-browser.min.js";

const url = `https://vue3-course-api.hexschool.io/v2`;

const app = createApp({
    data() {
        return {
            user: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        login() {
            axios.post(`${url}/admin/signin`, this.user)
                .then(res => {
                    const { token , expired } = res.data;
                    document.cookie = `hexToken=${token}; expires=${expired}`;
                    window.location = 'products.html';
                })
                .catch(err => {
                    alert(err.data.message);
                })
        }
    },
    mounted() {
    }
});

app.mount('#app');