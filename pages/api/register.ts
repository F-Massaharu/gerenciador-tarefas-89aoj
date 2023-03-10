import { UserModel } from './../../models/user';
import { connectToDb } from './../../middlewares/dbconnection';
import { DefaultMsgResponse } from './../../types/DefaultMsgResponse';
import type { NextApiRequest, NextApiResponse } from 'next'
import CryptoJs from 'crypto-js';

type Register = {
    email: string;
    password: string;
    name: string,
}


const handler = async (req: NextApiRequest, res: NextApiResponse<DefaultMsgResponse>) => {
    try {
        if (req.method !== "POST") {
            return res.status(405).json({ error: "Método inválido" });
        }

        const { MY_SUPER_SECRET_KEY } = process.env;
        if (!MY_SUPER_SECRET_KEY) {
            console.log("MY_SUPER_SECRET_KEY invalida")
            return res.status(500).json({ error: "MY_SUPER_SECRET_KEY invalida" });
        }

        const { name, email, password } = req.body as Register;
        if (!name || name.trim().length < 2) {
            return res.status(400).json({ error: "nome inválido" });
        }

        const exists = await UserModel.findOne({email});
        if(exists){
            return res.status(400).json({ error: "email ja cadastrado" }); 
        }
        
        if (!email || email.trim().length < 6 || !email.includes('@') || !email.includes('.')) {
            return res.status(400).json({ error: "email inválido" });
        }
        if (!password || password.trim().length < 4) {
            return res.status(400).json({ error: "senha inválido" });
        }

        const passwordCyphered = CryptoJs.AES.encrypt(password,MY_SUPER_SECRET_KEY).toString();

        const user = {
            name, email, password : passwordCyphered
        }

        await UserModel.create(user);

        return res.status(200).json({ error: "usuario cadastrado" });
    } catch (ex) {
        console.log('Ocorreu erro ao cadastrar usuario:', ex);
        res.status(500).json({ error: "Tente novamente, ocorreu erro ao cadastrar usuario!" });
    }
}

export default connectToDb(handler);