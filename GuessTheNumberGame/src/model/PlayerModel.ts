import NumericModel from "./NumericModel";

export default interface PlayerData {
    name: string;
    points?: NumericModel;
    wager: NumericModel;
    multiplier: NumericModel;
    win: NumericModel;
    nameHighlight?: boolean;
}