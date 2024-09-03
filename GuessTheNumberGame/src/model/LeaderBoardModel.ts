import React from "react";
import LeaderboardEntryModel from "./LeaderBoardEntryModel";

export default interface leaderBoardModel {
    value: LeaderboardEntryModel[];
    setValue: React.Dispatch<React.SetStateAction<LeaderboardEntryModel[]>>;
}