'use strict';
import csv from "csvtojson"
import path from "path"
import dotenv from 'dotenv'
dotenv.config()
import { Passenger } from "./Passenger"
const csvFilePath: string | undefined = process.env.DATA_URL
const pathTrainCSV = path.join(__dirname, `../src/${csvFilePath}/train.csv`) ;


export async function Passengers(): Promise<Passenger[]> {
    const jsonArray = await csv().fromFile(pathTrainCSV);

    return jsonArray;
}

export async function PassengersSurvived(status: string): Promise<Passenger[]> {
    const jsonArray = await csv().fromFile(pathTrainCSV);

    return jsonArray.filter(p => p.Survived == status);
}