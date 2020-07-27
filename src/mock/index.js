import Mock from 'mockjs'

import login from './login.js'
Mock.mock('/login', 'post', login)
