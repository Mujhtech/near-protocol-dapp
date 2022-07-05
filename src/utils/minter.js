require('regenerator-runtime/runtime');

export const getPlayers = async () => {
  const scores = await window.contract.getPlayers();
  return scores.sort((a, b) => {
    a = parseInt(a.timestamp, 10);
    b = parseInt(b.timestamp, 10);
    if (a < b) {
      return 1;
    }
    if (a > b) {
      return -1;
    }
    return 0;
  });
};

export const postPlayer = async (score) => {
  await window.contract.savePlayer(
    JSON.parse(
      `{"player": {"score": "${score}", "timestamp" : "${Date.now() / 1000}" }}`
    )
  );
  await window.contract.ft_mint(
    JSON.parse(
      `{"account": "${window.walletConnection.getAccountId()}", "amount" : "${score}" }`
    )
  );
  return getPlayers();
};
