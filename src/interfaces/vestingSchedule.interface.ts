export interface IVestingSchedule {
    name: string;
    terms: number;
    cliff: number;
    duration: number;
    durationLeft: number;
    durationProgress: number;
    vestingRate: number;
    vestingRateAsString: string;
    allocatedAmount: number;
    withdrawnAmount: number;
    unlockedAmount: number;
    isUnlocked: boolean;
    availableAmount: number;
}
