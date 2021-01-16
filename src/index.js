import React from "react";
import ReactDOM from "react-dom";

import "index.scss";

import Application from "components/Application";

import tweets from './tweets.json'

ReactDOM.render(<Application />, document.getElementById("root"));
