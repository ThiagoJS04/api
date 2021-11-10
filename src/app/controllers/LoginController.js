const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const Yup = require('yup');
const jwt = require('jsonwebtoken');
const { json } = require('express');


class LoginController {

    async store(req, res) {

        const { email, password } = req.body;

        const userExist = await User.findOne({email:email });

        if(!userExist){
            return res.status(401).json({
                error: true,
                code: 110,
                message: "Erro: Usuário não encontrado!",
            })
        }

        if(!(await bcryptjs.compare(password, userExist.password))){
            return res.status(401).json({
                error: true,
                code: 111,
                message: "Erro: Senha inválida!"
            })
        }

        return res.json({
            user: {
                id: userExist._id,
                name: userExist.name,
                email: userExist.email
            },
            token: jwt.sign({id:  userExist._id}, 'jususCristoRei',{expiresIn: 'id'})
        })

    }   
}

module.exports = new LoginController();