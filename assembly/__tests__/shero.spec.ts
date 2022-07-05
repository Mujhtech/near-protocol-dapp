import {
  savePlayer,
  getPlayer,
  getPlayers,
  ft_initialize,
  ft_mint,
  ft_total_supply,
  ft_balance_of,
  ft_burn,
} from "../main";
import { listedPlayers } from "../model";

describe("Test score", () => {
  it("It should save score", () => {
    savePlayer({ score: 100, timestamp: 1648309300 });
    expect(listedPlayers.length).toBe(1, "should only contain one listed score");
  });

  it("It should failed if don't pass account Id", () => {
    expect(() => {
      getPlayer("testing.testnet");
    }).not.toThrow();
  });

  it("Query all score", () => {
    expect(() => {
      getPlayers();
    }).not.toThrow();
  });
});

describe("Test fungible token", () => {
  it("Mint token", () => {
    ft_initialize();
    ft_mint("testing.testnet", "100");
    expect(ft_balance_of("testing.testnet")).toBe(
      "100",
      "Token amount not correct"
    );
    ft_mint("testing2.testnet", "200");
    ft_burn("testing2.testnet", "100");
    expect(ft_total_supply()).toBe("200", "Total token amount not correct");
  });
});
