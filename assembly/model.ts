import { PersistentUnorderedMap, context } from "near-sdk-as";

/** 
 * Exporting a new class PostedMessage so it can be used outside of this file.
 */
@nearBindgen
export class Player {
  score: u64;
  timestamp: u64;
  userId: string;

  public static fromPayload(payload: Player): Player {
    const player     = new Player();
    player.userId    = context.sender;
    player.score     = payload.score;
    player.timestamp = payload.timestamp;
    return player;
  }
}

export const listedPlayers = new PersistentUnorderedMap<string, Player>("SAVE_PLAYER");