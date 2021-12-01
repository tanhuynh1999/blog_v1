const defaultConnect = new Vue({
    el: '#default',
    vuetify: new Vuetify(),
    data() {
        return {
            //ckEditor
            configCkEditor: {
                licenseKey: '',
                language: 'vi'
            },
            userForm: {
                valid: false,
                title: 'Đăng nhập',
                isLogin: true,
                show1: false,
                tab: [{
                        name: 'Đăng nhập',
                        value: 'login'
                    },
                    {
                        name: 'Đăng ký',
                        value: 'register'
                    }
                ],
                value: {
                    email: '',
                    userName: '',
                    nameView: '',
                    password: ''
                },
                validate: {
                    email: [
                        v => !!v || 'Email không được để trống',
                        v => v.length < 100 || 'Email không vượt quá 100 ký tự',
                        v => /.+@.+\..+/.test(v) || 'E-mail không hợp lệ',
                    ],
                    userName: [
                        v => !!v || 'Tên đăng nhập không được để trống',
                        v => v.length < 100 || 'Tên không vượt quá 100 ký tự',
                    ],
                    nameView: [
                        v => !!v || 'Tên hiển thị không được để trống',
                        v => v.length < 100 || 'Tên hiển thị không vượt quá 100 ký tự',
                    ],
                    password: [
                        v => !!v || 'Mật khẩu không được để trống',
                    ]
                }
            },
            loginForm: {
                valid: false,
                validate: {
                    userName: [
                        v => !!v || 'Tên đăng nhập không được để trống',
                        v => v.length < 100 || 'Tên không vượt quá 100 ký tự',
                    ],
                    password: [
                        v => !!v || 'Mật khẩu không được để trống',
                    ]
                },
                value: {
                    userName: '',
                    password: '',
                }
            },
            blogForm: {
                valid: false,
                title: 'Viết blog',
                describe: 'Bạn có thể viết mọi chủ đề, từ hỏi bài đến các bài viết chia sẻ kiến thức hoặc bản thân mình,...',
                imgSrc: '/content/images/no-image.png',
                isRemoteImage: false,
                value: {
                    title: '',
                    describe: '',
                    category: '',
                    tag: [],
                    content: '',
                    image: null
                },
                validate: {
                    title: [
                        v => !!v || 'Tiêu đề không được để trống',
                        v => v.length < 100 || 'Tiêu đề không vượt quá 100 ký tự',
                    ],
                    describe: [
                        v => !!v || 'Mô tả không được để trống',
                        v => v.length < 2000 || 'Mô tả không vượt quá 500 ký tự',
                    ],
                    image: [
                        v => !!v || 'Ảnh minh hoạ không được để trống'
                    ],
                    category: [
                        v => !!v || 'Vui lòng chọn phân loại blog'
                    ]
                },
                select: {
                    category: ['Câu hỏi và cần trả lời', 'Chia sẻ kinh nghiệm', 'Tin tức', 'Kiến thức'],
                    tag: ['Gaming', 'Programming', 'Vue', 'Vuetify']
                }
            },
            userMain: {},
            drawer: false,
        }
    },
    mounted() {

    },
    methods: {

    }
})