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

export async function PassengersSex(sex: string, q : any): Promise<Passenger[]> {
    const jsonArray = await csv().fromFile(pathTrainCSV);
    const { age, pclass, survived } = q ;

    if (age && pclass)
        return jsonArray.filter(p => (p.Sex == sex && p.Age == age && p.Pclass == pclass && p.Survived == survived));

    if (age)
        return jsonArray.filter(p => (p.Sex == sex && p.Age == age));

    if (pclass)
        return jsonArray.filter(p => (p.Sex == sex && p.Pclass == pclass));

    return jsonArray.filter(p => (p.Sex == sex));
}