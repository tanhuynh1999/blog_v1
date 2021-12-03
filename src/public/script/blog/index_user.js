Vue.component('w-ckeditor-vue', window['w-ckeditor-vue'])
const app = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data() {
        return {
            blogList: {
                linkDetails: '/blog/details/',
                countBlog: '',
                blog: []
            },
            tabMain: {
                tab: [{
                        tab: 'Tất cả',
                        value: 'all'
                    },
                    {
                        tab: 'Ngưng hoạt động',
                        value: 'no_active'
                    },
                    {
                        tab: 'Thùng rác',
                        value: 'bin'
                    }
                ]
            },
            titlePage: 'Blog của bạn',
            isLoadingBlog: true,
            dialogEditBlog: false,
            idBlog: null,
            tabModel: null,
            isActiveAll: false,
            isActiveNo: false,
            //!------------------------
            userForm: defaultConnect.userForm,
            userMain: defaultConnect.userMain,
            blogForm: defaultConnect.blogForm,
            menuMain: defaultConnect.menuMain,
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
        this.tab('');
        //!------------------------
        this.loadUser();
        this.checkMenu();
    },
    methods: {
        tab(value) {
            let that = this;
            if (value == 'no_active') {
                that.clearTab();
                that.isActiveNo = true;
                that.loadBlog('no_active');
            } else if (value == 'bin') {
                that.loadBlog('bin');
            } else {
                that.clearTab();
                that.isActiveAll = true;
                that.loadBlog('user');
            }
        },
        clearTab() {
            let that = this;
            that.isActiveNo = false;
            that.isActiveAll = false;
        },
        clickEditBlog(item) {
            let that = this;
            that.dialogEditBlog = true;
            that.blogForm.value = JSON.parse(JSON.stringify(item));
            that.blogForm.title = 'Sửa bài blog - ' + item.title;
            that.blogForm.imgSrc = item.image;
            that.blogForm.value.image = null;
            that.idBlog = item._id;
        },
        loadBlog(value) {
            let that = this;
            that.isLoadingBlog = true;
            const link = '/blog/get/' + value;
            axios.get(link)
                .then(function (response) {
                    console.log(response.data.data);
                    that.blogList.blog = response.data.data;
                    that.blogList.countBlog = response.data.data.length;
                    that.isLoadingBlog = false;
                })
        },
        editBlog() {
            let that = this;
            const valid = that.$refs.blogForm.validate();
            if (valid) {
                const link = '/blog/edit';
                const data = JSON.parse(JSON.stringify(that.blogForm.value));

                axios.post(link, null, {
                        params: data
                    })
                    .then(function (response) {
                        // handle success
                        console.log(response);
                        if (response.data.status) {
                            that.checkSnackbar(true, response.data.messenger, null);
                            that.dialogEditBlog = false;
                            that.tabModel = 0;
                            that.tab('user');
                        }
                    })
            }
            return false;
        },
        activeBlog(item, common) {
            let that = this;
            const link = '/blog/active/' + item._id + '/' + item.active;

            axios.post(link)
                .then(function (response) {
                    // handle success
                    console.log(response);
                    if (response.data.status) {
                        that.checkSnackbar(true, response.data.messenger, null);
                        that.tab(common);
                    }
                })
        },
        binBlog(item, common) {
            let that = this;
            const link = '/blog/bin/' + item._id + '/' + item.bin;

            axios.post(link)
                .then(function (response) {
                    // handle success
                    console.log(response);
                    if (response.data.status) {
                        that.checkSnackbar(true, response.data.messenger, null);
                        that.tab(common);
                    }
                })
        },
        deleteBlog(item) {
            let that = this;
            const link = '/blog/delete/' + item._id;

            axios.post(link)
                .then(function (response) {
                    // handle success
                    console.log(response);
                    if (response.data.status) {
                        that.checkSnackbar(true, response.data.messenger, null);
                        that.tab('bin');
                    }
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
                            that.tabModel = 0;
                            that.tab('user');
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