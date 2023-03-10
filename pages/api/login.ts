import { UserModel } from './../../models/user';
import { connectToDb } from './../../middlewares/dbconnection';
import { DefaultMsgResponse } from './../../types/DefaultMsgResponse';
import type { NextApiRequest, NextApiResponse } from 'next'
import CryptoJs from 'crypto-js';

type Login = {
    login: string;
    password: string;
}


const handler = async (req: NextApiRequest, res: NextApiResponse<DefaultMsgResponse>) => {
    try {
        if (req.method !== "POST") {
            return res.status(405).json({ error: "Método inválido" });
        }

        const { login, password } = req.body as Login;

        const user = await UserModel.findOne({email:login});
        if(!user){
            return res.status(400).json({ error: "Usuario e senha n encontrado" });
        }

        const { MY_SUPER_SECRET_KEY } = process.env;
        if (!MY_SUPER_SECRET_KEY) {
            console.log("MY_SUPER_SECRET_KEY invalida")
            return res.status(500).json({ error: "MY_SUPER_SECRET_KEY invalida" });
        }

        const bytes = CryptoJs.AES.decrypt(user.password,MY_SUPER_SECRET_KEY).toString();
        const savedPassword = bytes.toString(CryptoJs.enc.Utf8)

        if(password !== savedPassword){
            return res.status(400).json({ error: "Usuario e senha n encontrado" });
        }

        if (login === 'teste@teste.com' && password === 'senha@123') {

            return res.status(200).json({ msg: "Usuário autenticado" });
        }

        return res.status(200).json({ error: "Usuario autenticado" });
    } catch (ex) {
        console.log('Ocorreu erro no login:', ex);
        res.status(500).json({ error: "Tente novamente, erro!" });
    }
}

export default connectToDb(handler);