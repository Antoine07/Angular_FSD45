export interface Passenger {
    PassengerId: string;
    Survived: number | null;
    Pclass: string;
    Name: string;
    Sex: string;
    Age: number | null;
}

export function hydratePassengers(passengers: any[]): Passenger[] {
    const p: Passenger[] = [];
    for (const { PassengerId, Survived, Pclass, Name, Sex, Age } of passengers)
        p.push({ PassengerId, Survived, Pclass, Name, Sex, Age });

    return p;
}

export interface Search {
    sex: string;
    age?: number;
    pclass?: string;
    survived?: string;
}