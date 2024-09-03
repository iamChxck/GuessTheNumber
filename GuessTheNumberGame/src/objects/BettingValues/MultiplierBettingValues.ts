import NumericModel from "../../model/NumericModel";
import BettingValues from "./BettingValues";

export default class MultiplierBettingValues extends BettingValues {
    constructor(
        input: NumericModel,
        onValueChange: (value: number) => void,
        totalPoints: number,
    ) {
        super(
            input,
            "Multiplier",
            0.25,
            onValueChange,
            10,
        )
    };
}