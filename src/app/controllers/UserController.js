const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const Yup = require('yup');


class UserController {

    async store(req, res) {

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().required(),
            password: Yup.string().required().min(6)

        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: true,
                code: 103,
                message: "Error:Dados inválidos!"
            })
        }



        const emailExist = await User.findOne({ email: req.body.email });
        if (emailExist) {
            return res.status(400).json({
                error: true,
                code: 102,
                message: "Error: Este e-mail já está cadastrado!"
            });
        }

        const dados = req.body;
        dados.password = await bcryptjs.hash(dados.password, 12);

        //Cadastrando...
        const user = await User.create(dados);
        return res.json(user);
    }

    async delete(req, res) {

        const userExist = await User.findOne({ _id: req.params.id });
        if (!userExist) {
            return res.status(400).json({
                error: true,
                code: 121,
                message: "Erro: Usuário não encontrado!"
            })
        }

        User.deleteOne({ _id: req.params.id }).then((user) => {
            return res.json({
                error: false,
                message: "Usuário excluído com sucesso"
            })
        }).catch((error) => {
            return res.status(400).json({
                error: true,
                code: 122,
                message: "Error: Usuário não foi excluído!"
            })
        })
    }
}

module.exports = new UserController();