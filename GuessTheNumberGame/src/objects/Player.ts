import BooleanModel from "../model/BooleanModel";
import NumericModel from "../model/NumericModel";
import PlayerData from "../model/PlayerModel";

const defaultPoints = 1000;

export default class Player implements PlayerData {    
    constructor(
        public name: string, 
        public points: NumericModel,
        public wager: NumericModel,
        public multiplier: NumericModel,
        public win: NumericModel,
        public nameHighlight?: boolean,
    ) {}    
}