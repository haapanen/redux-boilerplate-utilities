import * as program from "commander";
import * as _ from "lodash";
import {createAsyncActionBoilerplate} from "./asyncAction";
const packageJson = require("./package.json");

program
    .version(packageJson.version)
    .command("asyncaction <name>")
    .action(createAsyncActionBoilerplate)
    .option("-l, --lib [library]", "Output boilerplate for specified library. Available libraries: axios", "axios");

program.parse(process.argv);