/* tslint:disable */
/* eslint-disable */
/**
 * NOTE: This file is added by scripts/generate-api.sh because the
 * typescript-fetch generator imports a Null model for OpenAPI 3.1
 * `type: null` schemas but does not emit the model file.
 */

export type Null = null;

export function instanceOfNull(value: unknown): value is Null {
    return value === null;
}

export function NullFromJSON(json: any): Null {
    return NullFromJSONTyped(json, false);
}

export function NullFromJSONTyped(json: any, ignoreDiscriminator: boolean): Null {
    return json == null ? null : json;
}

export function NullToJSON(json: any): Null {
    return NullToJSONTyped(json, false);
}

export function NullToJSONTyped(value?: Null | null, ignoreDiscriminator: boolean = false): any {
    return value == null ? null : value;
}
