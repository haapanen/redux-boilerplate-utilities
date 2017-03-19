import * as _ from "lodash";

export function getInterfaceName(action: string): string {
    return _.upperFirst(_.camelCase(action));
}