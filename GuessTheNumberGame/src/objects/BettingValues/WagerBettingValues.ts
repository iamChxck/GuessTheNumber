import NumericModel from "../../model/NumericModel";
import BettingValues from "./BettingValues";

export default class WagerBettingValues extends BettingValues {
    constructor(
        input: NumericModel,
        onValueChange: (value: number) => void,
        maxInputValue: number,
    ) {
        super(
            input,
            "Points",
            25,
            onValueChange,
            maxInputValue,
        )
    };
}