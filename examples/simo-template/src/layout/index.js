import React, { lazy, Suspense, useEffect } from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Button } from "antd";

import logo from "ROOT/statics/images/logo.png";
import styles from "./index.less";

const App = () => {
  // 测试mock数据
  const handleFetchData = async () => {
    const response = await fetch("/api/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  };

  useEffect(() => {
    handleFetchData().then((data) => {
      console.log(data); // JSON data parsed by `data.json()` call
    });
  }, []);

  return (
    <Router>
      <div className={styles["App"]}>
        <header className={styles["App-header"]}>
          <img className={styles["App-logo"]} alt="logo" src={logo} />

          <Button type="primary"> 主题样式 </Button>
          <nav className={styles["App-nav"]}>
            <ul>
              <li>
                <Link to="/">About</Link>
              </li>
              <li>
                <Link to="/guide">Guide</Link>
              </li>
              <li>
                <Link to="/api">Api</Link>
              </li>
            </ul>
          </nav>
          <div className={styles["App-router"]}>
            <Suspense fallback="...">
              <Switch>
                <Route exact path={"/"} component={lazy(() => import("ROOT/views/About"))} />
                <Route exact path={"/guide"} component={lazy(() => import("ROOT/views/Guide"))} />
                <Route exact path={"/api"} component={lazy(() => import("ROOT/views/Api"))} />
              </Switch>
            </Suspense>
          </div>
        </header>
      </div>
    </Router>
  );
};

export default App;
