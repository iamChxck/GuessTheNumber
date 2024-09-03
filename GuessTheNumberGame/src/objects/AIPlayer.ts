import NumericModel from "../model/NumericModel";
import PlayerData from "../model/PlayerModel";

export default class AIPlayer implements PlayerData {
    constructor(
        public name: string,
        public wager: NumericModel,
        public multiplier: NumericModel,
        public win: NumericModel,
    ) { }

    generateRandomWager = () => {
        return (Math.floor(Math.random() * 1000));
    };
    generateRandomMultiplier = () => {
        return (parseFloat((Math.random() * 10).toFixed(2)));
    };
}