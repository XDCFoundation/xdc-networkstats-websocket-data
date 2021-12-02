/**
 * Created by AyushK on 18/09/20.
 */
import * as ValidationManger from "../middleware/validation";
import TestModule from "../app/modules/testModule";
import {stringConstants} from "../app/common/constants";

const express = require('express');

const Node = require("../app/models/nodeHistory");
module.exports = (app) => {
    app.use(express.json());
    app.get('/', (req, res) => res.send("Working"));
    app.post('/node', new TestModule().addNode);
    app.get('/node', new TestModule().getNode);

    // app.get("/test-route", ValidationManger.validateUserLogin, new TestModule().testRoute);
};
