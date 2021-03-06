import environment from "./config";
import { connect, Contract, keyStores, WalletConnection } from "near-api-js";
import { formatNearAmount } from "near-api-js/lib/utils/format";

const nearEnv = environment("testnet");

export async function initializeContract() {
    const near = await connect(
      Object.assign(
        { deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } },
        nearEnv
      )
    );
    window.walletConnection = new WalletConnection(near);
    window.accountId = window.walletConnection.getAccountId();
    window.contract = new Contract(
      window.walletConnection.account(),
      nearEnv.contractName,
      {
        viewMethods: ['getPlayer', 'getPlayers', 'ft_balance_of', 'ft_total_supply'],
        changeMethods: ['savePlayer', 'ft_mint'],
      }
    );
}

export async function accountBalance() {
    return formatNearAmount(
        (await window.walletConnection.account().getAccountBalance()).total,
        2
    );
}

export async function tokenBalance() {
  return await window.contract.ft_balance_of({"account_id": window.walletConnection.getAccountId()});
}

export async function tokenTotalSupply() {
  return await window.contract.ft_total_supply();
}

export async function previousScore() {
  let player = await window.contract.getScore({"id" : window.walletConnection.getAccountId()});
  player = player === null ? "No record" : player["score"]
  return player;
}

export async function getAccountId() {
    return window.walletConnection.getAccountId();
}

export function login() {
    window.walletConnection.requestSignIn(nearEnv.contractName);
}

export function logout() {
    window.walletConnection.signOut();
    window.location.reload();
}