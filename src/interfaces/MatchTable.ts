import { Player } from './Player';

export interface MatchTable {
  id: number;
  player_1: Player;
  player_2: Player;
  updated_data: string;
  active: boolean;
}
