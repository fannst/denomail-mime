/*
Copyright 2020 fannst

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import { assert, assertNotEquals } from "https://deno.land/std/testing/asserts.ts";

export const ADDRESS_REGEX: RegExp = /\S+@\S+\.\S+/;

export class Address
{
    private _address?: string;
    private _name?: string;

    /**
     * Creates a new address instance
     * @param address the address
     * @param name the name
     */
    public constructor(address?: string, name?: string)
    {
        this._address = address;
        this._name = name;
    }

    /*********************************
     * Getters / Setters
     *********************************/

    public set address(a: string | undefined) {
        this._address = a;
    }

    public set name(n: string | undefined) {
        this._name = n;
    }

    public get address(): string | undefined {
        return this._address;
    }

    public get name(): string | undefined {
        return this._name;
    }

    /*********************************
     * Instance Methods
     *********************************/

    /**
     * Gets the username from the current address
     */
    public getUsername = (): string => {
        assert(this._address);
        assertNotEquals(this._address.indexOf('@'), -1);

        return this._address.substring(0, this._address.indexOf('@'));
    }

    /**
     * Gets the domain from the current address
     */
    public getDomain = (): string => {
        assert(this._address);
        assertNotEquals(this._address.indexOf('@'), -1);

        return this._address.substr(this._address.indexOf('@') + 1); 
    }

    /**
     * Returns the string version of the current address
     */
    public toString = (): string => {
        assert(this._address);

        if (this._name !== undefined && (this._name.indexOf('<') !== -1 || this._name.indexOf('>') !== -1)) {
            return `"${this._name}" <${this.address}>`
        } else if (this._name !== undefined) {
            return `${this._name} <${this._address}>`
        } else {
            return this._address;
        }
    };

    /*********************************
     * Static Methods
     *********************************/

    /**
     * Parses an raw address
     * @param raw the raw address
     */
    public static parse = (raw: string): Address => {
        let result: Address = new Address();

        // Removes all duplicate whitespace
        raw = raw.replace(/\s+/g, ' ').trim();

        // Checks if the address contains an name, if so parse it using the
        //  < and >
        if (raw.indexOf('<') !== -1 && raw.indexOf('>') !== -1) {
            // Checks if there is an quite, if there is an quite, make sure
            //  that we use the quotes to get the name
            if (raw.indexOf('"') === -1) {
                result.name = raw.substring(0, raw.indexOf('<')).trim();
                result.address = raw.substring(raw.indexOf('<') + 1, raw.indexOf('>')).trim();
            } else {
                result.name = raw.substring(raw.indexOf('"') + 1, raw.lastIndexOf('"')).trim();
                result.address = raw.substring(raw.indexOf('<', raw.lastIndexOf('"')) + 1, raw.lastIndexOf('>')).trim();
            }

            // If the name is an empty string, make the name undefined
            if (result.name.length === 0) {
                result.name = undefined;
            }
        } else if (raw.indexOf('<') !== -1 || raw.indexOf('>') !== -1) {
            throw new SyntaxError('Opening or closing bracket missing.');
        } else {
            result.address = raw;
        }

        // Make sure that the result address is valid
        if (!ADDRESS_REGEX.test(result.address)) {
            throw new SyntaxError('Invalid address.');
        }

        return result;
    };
}