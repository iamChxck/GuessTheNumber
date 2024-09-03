import BooleanModel from "../model/BooleanModel";
import leaderBoardModel from "../model/LeaderBoardModel";
import NumericModel from "../model/NumericModel";
import AIPlayer from "./AIPlayer";
import LeaderboardObj from "./LeaderboardObj";
import { ScoreData } from "./ScoreHolderObj";

interface GameData {
    playerWager: NumericModel;
    playerMultiplier: NumericModel;
    playerPoints: NumericModel;
    playerWin: NumericModel;
    graphSpeed: NumericModel;
    isRunning: BooleanModel;
    isResultReady: BooleanModel;
    randMultiplier: NumericModel;
    aiWager: NumericModel[];
    aiMultiplier: NumericModel[];
    aiWin: NumericModel[];
    leaderboard: leaderBoardModel;
    leaderboardPlaceholder: ScoreData[];
}

const zero: number = 0;
const ten: number = 10;

export default class Game implements GameData {
    constructor(
        public playerWager: NumericModel,
        public playerPoints: NumericModel,
        public playerMultiplier: NumericModel,
        public playerWin: NumericModel,
        public graphSpeed: NumericModel,
        public isRunning: BooleanModel,
        public isResultReady: BooleanModel,
        public randMultiplier: NumericModel,
        public leaderboard: leaderBoardModel,
        public aiWager: NumericModel[],
        public aiMultiplier: NumericModel[],
        public aiWin: NumericModel[],
    ) { }

    updateAIWager = (index: number, newValue: number) => {
        this.aiWager[index].setValue(newValue);
    };
    updateAIMultiplier = (index: number, newValue: number) => {
        this.aiMultiplier[index].setValue(newValue);
    };
    updateAIWin = (index: number, newValue: number) => {
        this.aiWin[index].setValue(newValue);
    };    
    public aiPlayers: AIPlayer[] = [
        new AIPlayer('CPU 1',
            { value: this.aiWager[0].value, setValue: (value) => this.updateAIWager(0, value) },
            { value: this.aiMultiplier[0].value, setValue: (value) => this.updateAIMultiplier(0, value) },
            { value: this.aiWin[0].value, setValue: (value) => this.updateAIWin(0, value) },
        ),
        new AIPlayer('CPU 2',
            { value: this.aiWager[1].value, setValue: (value) => this.updateAIWager(1, value) },
            { value: this.aiMultiplier[1].value, setValue: (value) => this.updateAIMultiplier(1, value) },
            { value: this.aiWin[1].value, setValue: (value) => this.updateAIWin(1, value) },
        ),
        new AIPlayer('CPU 3',
            { value: this.aiWager[2].value, setValue: (value) => this.updateAIWager(2, value) },
            { value: this.aiMultiplier[2].value, setValue: (value) => this.updateAIMultiplier(2, value) },
            { value: this.aiWin[2].value, setValue: (value) => this.updateAIWin(2, value) },
        ),
        new AIPlayer('CPU 4',
            { value: this.aiWager[3].value, setValue: (value) => this.updateAIWager(3, value) },
            { value: this.aiMultiplier[3].value, setValue: (value) => this.updateAIMultiplier(3, value) },
            { value: this.aiWin[3].value, setValue: (value) => this.updateAIWin(3, value) },
        ),
    ];

    
    checkIfCanPlay = () => {
        return ((this.playerWager.value <= this.playerPoints.value && (this.playerWager.value > 0 && this.playerPoints.value > 0)) &&
        (this.playerMultiplier.value > zero && this.playerMultiplier.value <= ten));
    }
    startGame = () => {
        if (!this.checkIfCanPlay()) {
            return;
        }
        
        this.randMultiplier.setValue(parseFloat((Math.random() * 10).toFixed(2)));
        this.isRunning.setValue(true);
        this.isResultReady.setValue(false);
        this.playerPoints.setValue(this.playerPoints.value - this.playerWager.value);
        
        this.aiPlayers.forEach((player) => {
            player.wager.setValue(player.generateRandomWager());
            player.multiplier.setValue(player.generateRandomMultiplier());
        });
    };
    
    leaderboardObj: LeaderboardObj = new LeaderboardObj(this.leaderboard.setValue);
    public leaderboardPlaceholder: ScoreData[] = this.leaderboardObj.placeholder;
    finishGame = () => {
        this.isRunning.setValue(false);
        this.isResultReady.setValue(true);

        let win: number = 0;

        if (this.playerMultiplier.value <= this.randMultiplier.value) {
            win = this.playerWager.value * this.playerMultiplier.value;
            this.playerWin.setValue(win);
            this.playerPoints.setValue(this.playerPoints.value + win);
            this.leaderboardObj.updateLeaderboard('You', win);
        } else {
            this.playerWin.setValue(0);
            this.leaderboardObj.updateLeaderboard('You', 0);
        }

        this.aiPlayers.forEach((player) => {
            let win = 0;
            if (player.multiplier.value <= this.randMultiplier.value) {
                win = player.wager.value * player.multiplier.value;
                player.win.setValue(win);
                this.leaderboardObj.updateLeaderboard(player.name, win);
            } else {
                player.win.setValue(0);
                this.leaderboardObj.updateLeaderboard(player.name, 0);
            }
        });
    }
}
