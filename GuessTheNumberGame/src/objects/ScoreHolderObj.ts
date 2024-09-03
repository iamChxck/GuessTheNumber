import PlayerData from "../model/PlayerModel";

export interface ScoreData {
    name: string;
    points: number | string;
    multiplier?: number | string;
}

interface ScoreHolderData {
    placeholder: ScoreData[];
    players: PlayerData[];
}

export default class ScoreHolderObj implements ScoreHolderData {
    public placeholder: ScoreData[] = [
        { name: '-', points: 0 },
        { name: '-', points: 0 },
        { name: '-', points: 0 },
        { name: '-', points: 0 },
        { name: '-', points: 0 },
    ];

    public players: PlayerData[] = [];

    // constructor( public players: PlayerData[] ) {}
}
