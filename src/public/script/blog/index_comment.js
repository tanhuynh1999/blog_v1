Vue.component('w-ckeditor-vue', window['w-ckeditor-vue'])
const app = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data() {
        return {
            commentList: {
                linkDetails: '/blog/details/',
                comment: [],
                count: null
            },
            replyList: {
                reply: [],
                count: null
            },
            titlePage: 'Bình luận của bạn',
            dialogReply: false,
            //!------------------------
            userForm: defaultConnect.userForm,
            userMain: defaultConnect.userMain,
            menuMain: defaultConnect.menuMain,
            blogForm: defaultConnect.blogForm,
            loginForm: defaultConnect.loginForm,
            configCkEditor: defaultConnect.configCkEditor,
            dialogCreateBlog: false,
            snackbar: false,
            textSnackbar: '',
            messageSanackbar: null,
            drawer: null,
        }
    },
    mounted() {
        this.loadCommentBlog();
        //!------------------------
        this.loadUser();
        this.checkMenu();
    },
    methods: {
        clickShowReply(item) {
            let that = this;
            that.dialogReply = true;
            that.loadReply(item._id);
        },
        loadCommentBlog() {
            let that = this;
            const link = '/blog/comment/getbyuser';
            axios.get(link)
                .then(function (response) {
                    console.log(response.data.data);
                    that.commentList.comment = response.data.data;
                    that.commentList.count = response.data.data.length;
                })
        },
        loadReply(id) {
            let that = this;
            const link = '/blog/reply/get/' + id;
            axios.get(link)
                .then(function (response) {
                    that.replyList.reply = response.data.data;
                    that.replyList.count = response.data.data.length;
                })
        },
        //!------------------------
        loadUser() {
            let that = this;
            const link = '/user/check';
            axios.get(link)
                .then(function (response) {
                    console.log(response.data.data);
                    that.userMain = response.data.data;
                })
        },
        tabUserForm(value) {
            let that = this;
            if (value === 'login') {
                that.userForm.title = 'Đăng nhập';
                that.userForm.isLogin = true;
            } else {
                that.userForm.title = 'Đăng ký';
                that.userForm.isLogin = false;
            }
        },
        register() {
            let that = this;
            const valid = that.$refs.userForm.validate();
            if (valid) {
                const link = '/user/register';
                const data = JSON.parse(JSON.stringify(that.userForm.value));
                axios.post(link, null, {
                        params: data
                    })
                    .then(function (response) {
                        // handle success
                        console.log(response);
                        if (response.data.status) {
                            location.reload();
                        }
                    })
            }
            return false;
        },
        login() {
            let that = this;
            const valid = that.$refs.loginForm.validate();
            if (valid) {
                const link = '/user/login';
                const data = JSON.parse(JSON.stringify(that.loginForm.value));
                axios.post(link, null, {
                        params: data
                    })
                    .then(function (response) {
                        // handle success
                        console.log(response);
                        if (response.data.status) {
                            location.reload();
                        }
                    })
            }
            return false;
        },
        signOut() {
            const link = '/user/sign-out';
            axios.get(link)
                .then(function (response) {
                    // handle success
                    if (response.data.status) {
                        location.reload();
                    }
                })
        },
        createBlog() {
            let that = this;
            const valid = that.$refs.blogForm.validate();
            if (valid) {
                const link = '/blog/create';
                const data = JSON.parse(JSON.stringify(that.blogForm.value));

                const formData = new FormData();
                formData.append('fileIMG', that.blogForm.value.image);

                axios.post(link, formData, {
                        params: data
                    })
                    .then(function (response) {
                        // handle success
                        console.log(response);
                        if (response.data.status) {
                            that.checkSnackbar(true, response.data.messenger, null);
                            that.dialogCreateBlog = false;
                            that.$refs.blogForm.reset();
                            that.loadBlog();
                        }
                    })
            }
            return false;
        },
        clearBlogForm() {
            this.$refs.blogForm.reset();
        },
        uploadImage() {
            let that = this;
            const file = that.blogForm.value.image;
            const reader = new FileReader();

            reader.addEventListener("load", function () {
                // convert image file to base64 string
                that.blogForm.imgSrc = reader.result;
                that.blogForm.isRemoteImage = true;
            }, false);

            if (file) {
                reader.readAsDataURL(file);
            }
        },
        remoteUploadImage() {
            let that = this;
            that.blogForm.imgSrc = '/content/images/no-image.png';
            that.blogForm.isRemoteImage = false;
            that.blogForm.value.image = null;
        },
        checkSnackbar(active, text, message) {
            let that = this;
            that.snackbar = active;
            that.textSnackbar = text;
            that.messageSanackbar = message;
        },
        checkMenu() {
            let that = this;
            for (let i = 0; i < that.menuMain.length; i++) {
                if (that.menuMain[i].name == that.titlePage) {
                    that.menuMain[i].active = true;
                }
            }
        }
    }
});