import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import { Address } from './Address.ts';

const addresses: {
    raw: string,
    expected: {
        name: string | undefined,
        address: string,
        domain: string,
        username: string,
        str: string
    }
}[] = [
    {
        raw: 'Luke Rieff <luke.rieff@gmail.com>',
        expected: {
            name: 'Luke Rieff',
            address: 'luke.rieff@gmail.com',
            domain: 'gmail.com',
            username: 'luke.rieff',
            str: 'Luke Rieff <luke.rieff@gmail.com>'
        }
    }, {
        raw: '"Luke Rieff" <luke.rieff@gmail.com>',
        expected: {
            name: 'Luke Rieff',
            address: 'luke.rieff@gmail.com',
            domain: 'gmail.com',
            username: 'luke.rieff',
            str: 'Luke Rieff <luke.rieff@gmail.com>'
        }
    }, {
        raw: '"" <luke.rieff@gmail.com>',
        expected: {
            name: undefined,
            address: 'luke.rieff@gmail.com',
            domain: 'gmail.com',
            username: 'luke.rieff',
            str: 'luke.rieff@gmail.com'
        }
    }, {
        raw: '"Luke <Test> Rieff" <luke.rieff@gmail.com>',
        expected: {
            name: 'Luke <Test> Rieff',
            address: 'luke.rieff@gmail.com',
            domain: 'gmail.com',
            username: 'luke.rieff',
            str: '"Luke <Test> Rieff" <luke.rieff@gmail.com>'
        }
    }, {
        raw: '<luke.rieff@gmail.com>',
        expected: {
            name: undefined,
            address: 'luke.rieff@gmail.com',
            domain: 'gmail.com',
            username: 'luke.rieff',
            str: 'luke.rieff@gmail.com'
        }
    }, {
        raw: 'luke.rieff@gmail.com',
        expected: {
            name: undefined,
            address: 'luke.rieff@gmail.com',
            domain: 'gmail.com',
            username: 'luke.rieff',
            str: 'luke.rieff@gmail.com'
        }
    }
];

addresses.forEach(a => {
    Deno.test(`Address: '${a.raw}'`, () => {
        const address: Address = Address.parse(a.raw);
        
        assertEquals(address.name, a.expected.name);
        assertEquals(address.address, a.expected.address);
        assertEquals(address.getDomain(), a.expected.domain);
        assertEquals(address.getUsername(), a.expected.username);

        assertEquals(address.toString(), a.expected.str);
    });
});
