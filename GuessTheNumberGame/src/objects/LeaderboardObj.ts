import LeaderboardEntryModel from "../model/LeaderBoardEntryModel";
import ScoreHolder from "./ScoreHolderObj";

export default class LeaderboardObj extends ScoreHolder {
    constructor(public setLeaderboard: (value: LeaderboardEntryModel[] | ((prev: LeaderboardEntryModel[]) => LeaderboardEntryModel[])) => void) {
        super();
    }

    updateLeaderboard = (name: string, points: number) => {
        this.setLeaderboard((prev: LeaderboardEntryModel[]) => {
            let updated = false;

            let filteredLeaderboard = prev.filter(entry => entry.name !== '-');

            const updatedLeaderboard = filteredLeaderboard.map((entry: LeaderboardEntryModel) => {
                if (entry.name === name) {
                    updated = true;
                    if (points > entry.points) {
                        return { ...entry, points };
                    }
                }
                return entry;
            });

            if (!updated) {
                updatedLeaderboard.push({ name, points });
            }

            return updatedLeaderboard.sort((a, b) => b.points - a.points);
        });
    };
}
