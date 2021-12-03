Vue.component('w-ckeditor-vue', window['w-ckeditor-vue'])
const app = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data() {
        return {
            item: {},
            tabList: {
                tab: []
            },
            follow: {},
            replyList: {
                comment: {
                    _id: '',
                    idBlog: '',
                    content: '',
                    author: '',
                    avatar: '',
                    dateCreate: '',
                    dateEdit: '',
                    idUser: ''
                },
                reply: [],
                count: null
            },
            commentList: {
                comment: [],
                count: null
            },
            commentForm: {
                valid: null,
                value: {
                    content: ''
                },
                validate: {
                    content: [
                        v => !!v || 'Nội dung bình luận không được để trống',
                        v => v.length < 800 || 'Nội dung không vượt quá 800 ký tự',
                    ],
                }
            },
            replyForm: {
                valid: null,
                value: {
                    content: ''
                },
                validate: {
                    content: [
                        v => !!v || 'Nội dung phản hồi không được để trống',
                        v => v.length < 800 || 'Nội dung không vượt quá 800 ký tự',
                    ],
                }
            },
            dialogBookBlog: false,
            dialogReply: false,
            //!------------------------
            userForm: defaultConnect.userForm,
            userMain: defaultConnect.userMain,
            blogForm: defaultConnect.blogForm,
            loginForm: defaultConnect.loginForm,
            menuMain: defaultConnect.menuMain,
            configCkEditor: defaultConnect.configCkEditor,
            dialogCreateBlog: false,
            snackbar: false,
            textSnackbar: '',
            messageSanackbar: null,
            drawer: null,
        }
    },
    mounted() {
        this.loadDetails();
        //!------------------------
        this.loadUser();
        this.loadComment(this.takeLink());
        this.loadTab(this.takeLink());
    },
    methods: {
        clickReply(comment) {
            let that = this;
            that.dialogReply = true;
            that.replyList.comment._id = comment._id;
            that.replyList.comment.idBlog = comment.idBlog;
            that.replyList.comment.content = comment.content;
            that.replyList.comment.author = comment.author;
            that.replyList.comment.avatar = comment.avatar;
            that.replyList.comment.dateCreate = comment.dateCreate;
            that.replyList.comment.dateEdit = comment.dateEdit;
            that.replyList.comment.idUser = comment.idUser;
            that.loadReply(comment._id);
        },
        goBack() {
            window.history.back();
        },
        takeLink() {
            let url = location.pathname;
            let arrUrl = url.split('/');
            return arrUrl[3];
        },
        loadDetails() {
            let that = this;
            const link = location.pathname;
            axios.post(link)
                .then(function (response) {
                    that.item = response.data.data;
                    this.loadFollowByID(response.data.data._id);
                })
        },
        loadComment(id) {
            let that = this;
            const link = '/blog/comment/get/' + id;
            axios.get(link)
                .then(function (response) {
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
        loadTab(id) {
            let that = this;
            const link = '/blog/get/tab/' + id;
            axios.get(link)
                .then(function (response) {
                    that.tabList.tab = response.data.data;
                })
        },
        loadFollowByID(idBlog) {
            let that = this;
            const link = '/blog/follow/by/' + idBlog;
            axios.get(link)
                .then(function (response) {
                    that.follow = response.data.data;
                })
        },
        followBlog(item) {
            let that = this;
            const link = '/blog/follow';
            const data = JSON.parse(JSON.stringify(item));

            axios.post(link, null, {
                    params: data
                })
                .then(function (response) {
                    // handle success
                    if (response.data.status) {
                        that.checkSnackbar(true, response.data.messenger, null);
                        that.loadFollowByID(item._id);
                    }
                })
        },
        deleteFollowBlog(id) {
            let that = this;
            const link = '/blog/follow/delete/' + id;

            axios.post(link)
                .then(function (response) {
                    // handle success
                    console.log(response);
                    if (response.data.status) {
                        that.checkSnackbar(true, response.data.messenger, null);
                        location.reload();
                    }
                })
        },
        commentBlog(item) {
            let that = this;
            const valid = that.$refs.commentForm.validate();
            if (valid) {
                const link = '/blog/comment';

                axios.post(link, null, {
                        params: {
                            idBlog: item._id,
                            avatar: that.userMain.image,
                            author: that.userMain.nameView,
                            content: that.commentForm.value.content,
                            titleBlog: item.title
                        }
                    })
                    .then(function (response) {
                        // handle success
                        if (response.data.status) {
                            that.checkSnackbar(true, response.data.message, null);
                            that.loadComment(item._id);
                            that.$refs.commentForm.reset();
                        }
                    })
            }
            return false;
        },
        replyBlog(item) {
            let that = this;
            const valid = that.$refs.replyForm.validate();
            if (valid) {
                const link = '/blog/reply';

                axios.post(link, null, {
                        params: {
                            idBlog: item._id,
                            avatar: that.userMain.image,
                            author: that.userMain.nameView,
                            content: that.replyForm.value.content,
                            idComment: that.replyList.comment._id,
                            titleBlog: item.title,
                            contentComment: that.replyList.comment.content
                        }
                    })
                    .then(function (response) {
                        // handle success
                        if (response.data.status) {
                            that.checkSnackbar(true, response.data.message, null);
                            that.loadComment(item._id);
                            that.$refs.replyForm.reset();
                            that.loadReply(that.replyList.comment._id);
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
                            document.location.href = '/blog/blog_da_dang';
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
        }
    }
});