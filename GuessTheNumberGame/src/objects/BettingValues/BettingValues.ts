import NumericModel from "../../model/NumericModel";

export default interface BettingValuesData {
  input: NumericModel
  label: string;
  increment: number;
  onValueChange: (value: number) => void;
  maxInputValue: number;
}

export default class BettingValues implements BettingValuesData {
  constructor(
    public input: NumericModel,
    public label: string,
    public increment: number,
    public onValueChange: (value: number) => void,
    public maxInputValue: number,
  ) { }

  handleIncrease = () => {
    const newValue = this.input.value + this.increment;
        if (newValue <= this.maxInputValue)
            this.onValueChange(newValue);
  };

  handleDecrease = () => {
    const newValue = this.input.value - this.increment;
    if (newValue >= 0) {
      this.onValueChange(newValue);
    }
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const parsedValue = parseFloat(newValue);
    if (!isNaN(parsedValue) && parsedValue >= 0)
      this.onValueChange(parsedValue);
  };

  // handleBlur = () => {
  //   // this.onValueChange(this.input.value);
  //   console.log("Out of focus");
  // };
}