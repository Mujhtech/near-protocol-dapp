import useContract from "./hooks/useContract";
import Login from "./Login";
import "./utils/game";

function App() {
  const { account } = useContract();

  return account.accountId == undefined || account.accountId == null ? (
    <Login />
  ) : (
    <div className="container">
      <div id="score"></div>
      <canvas id="game" width="375" height="375"></canvas>
      <div id="introduction">Hold down the mouse to stretch out a stick</div>
      <div id="perfect">DOUBLE SCORE</div>
      <button id="restart">RESTART</button>
    </div>
  );
}

export default App;
