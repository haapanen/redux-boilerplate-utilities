import * as program from "commander";
import * as _ from "lodash";
const packageJson = require("./package.json");

program
    .version(packageJson.version)
    .command("action <name>")
    .action(name => {
        let reduxAction = "Action";
        let reduxDispatch = "Dispatch<ApplicationState>";
        let request = `${name}_REQUEST`;
        let actions = [
            request,
            `${request}_SUCCESSFUL`,
            `${request}_FAILED`
        ];

        actions.forEach(a => {
            console.log(`export const ${a} = "${a}"`);
        });

        actions.forEach(a => {
            const interfaceName = getInterfaceName(a);

            console.log(`export interface ${interfaceName} extends ${reduxAction} {`);
            console.log(`\t`)
            console.log(`}`);
        });

        actions.forEach(a => {
            const interfaceName = getInterfaceName(a);

            console.log(`export function is${interfaceName}(action: ${reduxAction}): action is ${interfaceName} {`);
            console.log(`\treturn action.type === ${a};`);
            console.log(`}`);
        });

        const interfaceName = getInterfaceName(name);
        console.log(`export function start${interfaceName}(): ${getInterfaceName(actions[0])} {`);
        console.log(`\treturn {`);
        console.log(`\t\ttype: ${actions[0]},`);
        console.log(`\t};`);
        console.log(`}`);

        console.log(`export function successful${interfaceName}(): ${getInterfaceName(actions[1])} {`);
        console.log(`\treturn {`);
        console.log(`\t\ttype: ${actions[1]},`);
        console.log(`\t};`);
        console.log(`}`);

        console.log(`export function failed${interfaceName}(): ${getInterfaceName(actions[2])} {`);
        console.log(`\treturn {`);
        console.log(`\t\ttype: ${actions[2]},`);
        console.log(`\t};`);
        console.log(`}`);

        console.log(`export function ${_.camelCase(name)}() {`);
        console.log(`\treturn (dispatch: ${reduxDispatch}) => {`);
        console.log(`\t\tdispatch(start${interfaceName}());`);
        console.log(`\t\tdispatch(successful${interfaceName}());`);
        console.log(`\t\tdispatch(failed${interfaceName}());`); 
        console.log(`\t};`);
        console.log(`}`);
    });

function getInterfaceName(action: string): string {
    return _.upperFirst(_.camelCase(action));
}

program.parse(process.argv);