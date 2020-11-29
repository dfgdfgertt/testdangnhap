const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcryptjs = require('bcryptjs');

router.post('/dangky' , (req , res , next) => {
    console.log(req.body);
    const {username, email, password } =req.body;

    try {

        let user_exist =  User.find({email: email});
        if (!user_exist) {
            return res.json({
                success: false,
                msg: 'Người dùng đã tồn tại'
            });
        }

        console.log("aaa");
        let user = new User();
        user.username = username;
        user.email = email;
        user.password =  password;

        let size = 200;
        user.avatar = "https://scontent-hkt1-1.xx.fbcdn.net/v/t1.0-9/124398054_1538823412977499_6309226623145131419_o.jpg?_nc_cat=107&ccb=2&_nc_sid=09cbfe&_nc_ohc=o0nULpVHmZQAX9foSzw&_nc_oc=AQmIC4t-MyckAYh6BKV3f8ZFajF9b8UkoEQkVM56ejiP9hbfpgf2Qss8XK0cKHo69cE&_nc_ht=scontent-hkt1-1.xx&oh=8bd206e820d738b785b7775ba9c581d2&oe=5FE7909B";

        user.save();
        
        res.json({
            success: true,
            msg: 'Tạo thành công',
            user: user
        });
    

    } catch (err) {
        console.log(err);
    };
});

router.post('/dangnhap', async(req, res, next)=>{

    const email= req.body.email;
    const password = req.body.password;
    try {
        
        let user = await User.findOne({
            email: email
        });

        if(!user){
            res.status(400).json({
                success: false,
                msg: 'người dùng không tồn tại'
            });
        }

        if(password != user.password){
            return res.status(400).json({
                success: false,
                msg: 'sai mật khẩu'
            });
        }
        res.json({
            success: true,
            msg: 'Đăng nhập thành công',
            user: user
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Error'
        })
    }

});



module.exports = router;