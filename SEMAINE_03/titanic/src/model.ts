'use strict';
import csv from "csvtojson"
import path from "path"
import dotenv from 'dotenv'
import fs from 'fs';
import { User } from './User'

dotenv.config()
import { Passenger } from "./Passenger"
const csvFilePath: string | undefined = process.env.DATA_URL
const pathTrainCSV = path.join(__dirname, `../src/${csvFilePath}/train.csv`);
const pathUser = path.join(__dirname, `../src/${csvFilePath}/user.json`);

export async function Passengers(): Promise<Passenger[]> {
    const jsonArray = await csv().fromFile(pathTrainCSV);

    return jsonArray;
}

export async function PassengersSurvived(status: string): Promise<Passenger[]> {
    const jsonArray = await csv().fromFile(pathTrainCSV);

    return jsonArray.filter(p => p.Survived == status);
}

export async function PassengersSex(sex: string, q: any): Promise<Passenger[]> {
    const jsonArray = await csv().fromFile(pathTrainCSV);
    const { age, pclass, survived } = q;
    console.log(q)

    /**
     * Dans les différents cas suivants on aura avec le OU passif de JS 
     * 
     * Dans le cas ou age, pclass, survived ne sont pas définies
     * sex == 'female' && true && true && true
     * 
     * Dans le cas ou pclass, survived ne sont pas définies
     * sex == 'female' && age == 40 && true && true
     * 
     * Ec 
     */
    const passengers = jsonArray.filter(p => (
        p.Sex == sex
        && (!survived || p.Survived == survived) // le OU passif 
        && (!age || p.Age == age)
        && (!pclass || p.Pclass == pclass)
    ));

    return passengers;
}

// User

export async function findUser( email : string, password? : string): Promise<User | undefined> {

    try {
        const data : string = fs.readFileSync(pathUser, 'utf-8');

        const users: User[] = JSON.parse(data);
        const user = users.find(u =>  u.email == email || u.password == password);
        console.log(user);

        if ( user ) return user ;

        return undefined ;

    } catch (err) {
        console.error('Erreur lors de la lecture du fichier JSON :', err);
    }
}

export async function allUsers(): Promise<User[] | undefined > {

    try {
        const options: any = { encoding: "utf8" }
        const data : any = await fs.readFile(pathUser, options);
        const users: User[] = JSON.parse(data);
        
        return users; 

    } catch (err) {
        console.error('Erreur lors de la lecture du fichier JSON :', err);
    }
}