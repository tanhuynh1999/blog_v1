Vue.component('w-ckeditor-vue', window['w-ckeditor-vue'])
const app = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data() {
        return {
            blogList: {
                linkDetails: '/blog/details/',
                count: 0,
                blog: []
            },
            searchForm: {
                valid: false,
                value: {
                    key: '',
                    category: ''
                }
            },
            tabList: {
                tab: []
            },
            titlePage: 'Các danh mục blog',
            isLoading: true,
            textDefault: 'Tất cả blog',
            infoForm: {
                value: {
                    userName: '',
                    nameView: '',
                    email: ''
                },
                validate: {
                    email: [
                        v => v.length < 100 || 'Email không vượt quá 100 ký tự',
                        v => /.+@.+\..+/.test(v) || 'E-mail không hợp lệ',
                    ],
                    userName: [
                        v => v.length < 100 || 'Tên không vượt quá 100 ký tự',
                    ],
                    nameView: [
                        v => v.length < 100 || 'Tên hiển thị không vượt quá 100 ký tự',
                    ]
                },
                valid: false
            },
            changePasswordForm: {
                show1: false,
                value: {
                    passwordNew: '',
                    passwordOld: '',
                    confirmPassword: ''
                },
                valid: false,
                validate: {
                    password: [
                        v => !!v || 'Mật khẩu mới không được để trống',
                    ],
                    confirmPassword: [
                        v => !!v || 'Mật khẩu xác nhận không được để trống',
                        v => v === this.changePasswordForm.value.passwordNew || 'Xác nhận mật khẩu không khớp.',
                    ],
                }
            },
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
        //!------------------------
        this.loadUser();
        this.checkMenu();
    },
    methods: {
        changePassword() {
            let that = this;
            const valid = that.$refs.changePasswordForm.validate();
            if (valid) {
                const link = '/user/change_password';
                const data = JSON.parse(JSON.stringify(that.changePasswordForm.value));
                axios.post(link, null, {
                        params: data
                    })
                    .then(function (response) {
                        if (response.data.status) {
                            location.reload();
                        } else {
                            that.checkSnackbar(true, response.data.message, 'error');
                        }
                    })
            }
            return false;
        },
        editUser() {
            let that = this;
            const valid = that.$refs.infoForm.validate();
            if (valid) {
                const link = '/user/edit';
                const data = JSON.parse(JSON.stringify(that.infoForm.value));
                axios.post(link, null, {
                        params: data
                    })
                    .then(function (response) {
                        if (response.data.status) {
                            location.reload();
                        } else {
                            that.checkSnackbar(true, response.data.message, 'error');
                        }
                    })
            }
            return false;
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
                        } else {
                            that.checkSnackbar(true, response.data.message, 'error');
                            that.userForm.isCheckRegister = true;
                            that.userForm.messageCheck = response.data.message;
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
                        } else {
                            that.checkSnackbar(true, response.data.message, 'error');
                            that.loginForm.isCheckLogin = true;
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