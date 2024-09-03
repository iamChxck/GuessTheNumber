import StringModel from "../model/StringModel";

interface ValuesToChangeObjData {
    inputValue: StringModel;
    increment: number;
    totalPoints: number;
    value: number;
    formatValue: (value: number) => string;
    onValueChange: (value: number) => void;
}

export default class ValuesToChangeObj {

    constructor(
        public inputValue: StringModel,
        public increment: number,
        public totalPoints: number,
        public value: number,
        public formatValue: ((value: number) => string) | undefined,
        public onValueChange: (value: number) => void,
    ) {}

    handleIncrease = () => {
        const newValue = parseFloat(this.inputValue.value) + this.increment;
        if (newValue <= this.totalPoints) {
            this.inputValue.setValue(this.formatValue ? this.formatValue(newValue) : newValue.toString());
            this.onValueChange(newValue);
        }
    };

    handleDecrease = () => {
        const newValue = parseFloat(this.inputValue.value) - this.increment;
        if (newValue >= 0) {
            this.inputValue.setValue(this.formatValue ? this.formatValue(newValue) : newValue.toString());
            this.onValueChange(newValue);
        }
    };

    handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        this.inputValue.setValue(newValue);

        const parsedValue = parseFloat(newValue);
        if (!isNaN(parsedValue) && parsedValue >= 0) {
            this.onValueChange(parsedValue);
        }
    };

    handleBlur = () => {
        const parsedValue = parseFloat(this.inputValue.value);
        if (!isNaN(parsedValue)) {
            this.inputValue.setValue(this.formatValue ? this.formatValue(parsedValue) : parsedValue.toString());
        } else {
            this.inputValue.setValue(this.formatValue ? this.formatValue(this.value) : this.value.toString());
        }
    };
}