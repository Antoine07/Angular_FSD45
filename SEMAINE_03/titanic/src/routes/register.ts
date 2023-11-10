import express, { Router, Request, Response } from "express";
import { User } from "../User";
import bcrypt from 'bcrypt';
import { trimAll } from "../utils";
import passwordValidator from 'password-validator'
import * as validator from 'email-validator'
import { authentified } from "../middleware";
import { findUser, allUsers } from "../model";

const router: Router = express.Router();
const schema = new passwordValidator().is().min(8)
    .is().max(20)
    .has().digits()

/* Register an user */
router.post("/register", async function (req: Request, res: Response) {
    const { email, name, password }: User = trimAll(req.body);

    if (name.length < 3) {
        return res.status(400).json({ message: "Le nom doit avoir au moins 3 caractères" });
    }

    if (!password) {
        return res.status(400).json({ message: "Le mot de passe est obligatoire" });
    }

    // on vérifie si le mot de passe est conforme au schéma
    if (!schema.validate(password)) {
        return res.status(400).json({ message: "Le mot de passe doit faire minimum 8 caractères et avoir des chiffres" });
    }

    // on vérifie si l'email est valide
    if (!validator.validate(email)) {
        return res.status(400).json({ message: "L'adresse e-mail saisit est invalide" });
    }

    // on recherche l'utilisateur dans le mock
    const user: User | undefined = await findUser(name, email);
    if (user) {
        if (user.name == name) {
            return res.status(400).json({ message: "Le nom d'utilisateur est déjà prit" });
        } else {
            return res.status(400).json({ message: "L'adresse email est déjà prit" });
        }
    }

    // hash password
    const hash = await bcrypt.hash(password, 10);
    const users: User[] | undefined = await allUsers();
    if (users) {
        const lastId: number = users[users.length - 1]?.id || 0;

        const user: User = {
            id: lastId + 1, // on incrémente l'id de 1
            name,
            email,
            password: hash
        };
        users.push(user);

        return res.status(200).json({ message: "Vous êtes bien inscrit !" });

    }

    return res.status(400).json({ message: "L'adresse email est déjà prit" });
    // on récupère le dernier id de la liste des utilisateurs

});

router.get('/logout', authentified, function (req: Request, res: Response) {
    res.clearCookie('token');
    return res.status(200).json({ message: "Vous êtes bien déconnecté" });
});

export default router;