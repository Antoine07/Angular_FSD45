import express, { Router, Request, Response } from "express";
import { sign } from 'jsonwebtoken';
import { User } from "../User";
import bcrypt from 'bcrypt';
import { trimAll } from "../utils";
import { authentified } from "../middleware";
import { findUser } from "../model";

const router: Router = express.Router();

router.post('/login', async (req: Request, res: Response) => {
    const { email, password } = trimAll(req.body); // récupération des données du formulaire de login (email et password)

    if (!email || !password) {
        return res.status(400).json({ message: "Veuillez remplir tous les champs" });
    }

    // on cherche l'utilisateur dans le mock
    const user: User | undefined = await findUser(email);

    console.log(user);

    if (!user) {
        return res.status(400).json({ message: "Identifiants incorrects" });
    }

    if (!user.password) {
        return res.status(400).json({ message: "Identifiants incorrects" });
    }

    // on compare le mot de passe en clair avec le mot de passe hashé en mock
    const result = await bcrypt.compare(password, user.password);

    if (result) {
        const token = sign({
            _id: user.id /* l'id de l'utilisateur enregistré dans le payload du token */
        }, 'secret', {
            expiresIn: '1h' // le token expire dans 1 heure
        });
        res.cookie('token', token, { httpOnly: true }); // écriture du cookie avec la valeur du token jwt
        /* httpOnly protege des attaques XSS (quelqu'un de malveillant ne pourra pas lire le cookie facilement) */
        return res.status(200).json({ message: "Vous êtes bien connecté !" });
    } else {
        return res.status(400).json({ message: "Identifiants incorrects" })
    }

});

router.get('/logout', authentified, function (req: Request, res: Response) {
    res.clearCookie('token');
    return res.status(200).json({ message: "Vous êtes bien déconnecté" });
});

export default router;