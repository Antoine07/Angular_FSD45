'use strict';
import express, { Router, Request, Response } from "express";
import { Passengers, PassengersSurvived } from "./model";
import { log } from "console";
import { readFile, writeFile } from 'node:fs/promises';
import path from "path";

const csvFilePath: string | undefined = process.env.DATA_URL;
const pathStatJSON = path.join(__dirname, `../src/${csvFilePath}/stat.json`);

const router: Router = express.Router();

router.get("/passengers", async function (req: Request, res: Response) {
    const data = await Passengers();
    log(data)
    res.json(data);
});

router.get("/passengers/Survived/:status", async function (req: Request, res: Response) {
    const status: string = req.params.status;
    const data = await PassengersSurvived(status);
    log(data)

    res.json(data);
});

router.post("/stat", async function (req: Request, res: Response) {
    const { Survived, SexAgePclass }: { Survived: string, SexAgePclass: string } = req.body;
    let contents: any = await readFile(pathStatJSON, { encoding: 'utf8' });
    contents = JSON.parse(contents);

    log(contents)

    if (SexAgePclass) {
        contents["SexAgePclass"]["Survived"] += parseInt(Survived);
    }

    writeFile(pathStatJSON, JSON.stringify(contents));

    res.json(JSON.parse(contents))

    // res.redirect('/stat');
});

router.get("/stat/", async function (req: Request, res: Response) {

    const contents = await readFile(pathStatJSON, { encoding: 'utf8' });
    console.log(contents);

    res.json(JSON.parse(contents))

});

router.get('*', function (req: Request, res: Response) {
    res.status(404).json({ error: "Not found" })
});

export default router;