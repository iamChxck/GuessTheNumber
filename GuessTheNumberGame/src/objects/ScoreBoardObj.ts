
import BooleanModel from "../model/BooleanModel";
import PlayerData from "../model/PlayerModel";
import ScoreHolderObj from "./ScoreHolderObj";


export default class ScoreBoardObj extends ScoreHolderObj {
    public placeholder = [
        { name: '-', points: '-', multiplier: '-' },
        { name: '-', points: '-', multiplier: '-' },
        { name: '-', points: '-', multiplier: '-' },
        { name: '-', points: '-', multiplier: '-' },
        { name: '-', points: '-', multiplier: '-' },
    ]

    constructor( public players: PlayerData[], public resultReady: BooleanModel, public graphMultiplier: number, ) {
        super();
    }

    public determineTextColor = (playerMultiplier: number) => {
        if (!this.resultReady.value) return 'text-white';
        return playerMultiplier <= this.graphMultiplier ? 'text-green-500' : 'text-red-500';
    };
    
    public displayWinnings = (points: number | undefined) => {
        return points?.toFixed(2);
    };

    public displayMultiplier = (multiplier: number) => {
        return multiplier.toFixed(2);
    };
}