
import { Rank } from "@/types/server/dataforge/enums";

export type UserRankDto = {
    user_login: string,
    xp: number,
    tier: Rank
}