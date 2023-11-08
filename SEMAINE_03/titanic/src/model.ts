'use strict';
import csv from "csvtojson"
import path from "path"
import dotenv from 'dotenv'
dotenv.config()
import { Passenger } from "./Passenger"
const csvFilePath: string | undefined = process.env.DATA_URL
const pathTrainCSV = path.join(__dirname, `../src/${csvFilePath}/train.csv`);


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
        && ( !survived || p.Survived == survived ) // le OU passif 
        && ( !age || p.Age == age ) 
        && ( !pclass || p.Pclass == pclass ) 
        ) );
   
    return passengers; 
}