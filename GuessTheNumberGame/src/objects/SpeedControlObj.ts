interface SpeedControlObjData {
    onSpeedChange: (speed: number) => void;
}

export default class SpeedControlObj implements SpeedControlObjData {

    constructor ( public onSpeedChange: (speed: number) => void ) {}

    handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const speedValue = parseInt(e.target.value, 10);
    
        const speedMapping: Record<number, number> = {
          1: 10,
          2: 7.5,
          3: 5,
          4: 2.5,
          5: 1,
        };
    
        if (this.onSpeedChange) {
            this.onSpeedChange(speedMapping[speedValue]);
        }
      };
}