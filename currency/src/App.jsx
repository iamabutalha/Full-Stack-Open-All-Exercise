import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
import { useEffect } from "react";

function App() {
  const [value, setValue] = useState("");
  const [rates, setRates] = useState({});
  const [currency, setCurrency] = useState(null);

  useEffect(() => {
    console.log("effect run currency is now", currency);

    if (currency) {
      console.log("fetching exchange rates..");
      axios
        .get(`https://open.er-api.com/v6/latest/${currency}`)
        .then((respnse) => {
          setRates(respnse.data.rates);
        });
    }
  }, [currency]);

  const onSearch = (event) => {
    event.preventDefault();
    setCurrency(value);
  };

  return (
    <div>
      <form onSubmit={onSearch}>
        currency:{" "}
        <input value={value} onChange={(e) => setValue(e.target.value)} />
        <button type="submit">exchange rate</button>
      </form>
      {rates ? <pre>{JSON.stringify(rates, null, 2)}</pre> : <p>No rates</p>}
    </div>
  );
}

export default App;
