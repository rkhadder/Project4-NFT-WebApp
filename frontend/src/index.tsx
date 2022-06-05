import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { DAppProvider } from "@usedapp/core";
// import NFT from "./routes/NFT";
import SingleNFT from "./routes/SingleNFT";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <DAppProvider config={{}}>
        <Routes>
          <Route path="/" element={<App />}>
            {/* <Route path="NFT" element={<NFT />}> */}
              <Route path="NFT/:nftId" element={<SingleNFT />} />
            {/* </Route> */}
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>404</p>
                </main>
              }
            />
          </Route>
        </Routes>
      </DAppProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
