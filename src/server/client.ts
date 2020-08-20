import { jar, post } from 'request-promise';
import { CookieJar, CoreOptions } from 'request';
import { v4 as uuid } from 'uuid';
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';
import { User } from '../types';


interface RandomCredentials {
    email: string;
    password: string;
    name: string;
    address: string;
}

const $register = ({ email, name }) => `
    mutation {
        testRegister(email: "${email}", name: "${name}") {
        id
        name
        emails {
            email
            verified
          }
        phones {
            country
            number
          }
        }
    }
`;

const $login = ({ userId, email }) => `
    mutation {
        testLogin(email: "${email}", userId: "${userId}") {
        id
        name
        emails {
            email
            verified
          }
        phones {
            country
            number
          }
        }
    }
`;

const $logout = () => `
    query {
        logout
    }
`


export class TestClient {
    jar: CookieJar;
    options: CoreOptions;

    constructor(options: Partial<CoreOptions> = {}, public url: string = 'http://localhost:4001') {
        this.jar = jar();
        this.options = {
            withCredentials: true,
            jar: jar(),
            json: true,
            ...options,
        };
    }

    async query(query: string, raiseError = true): Promise<any> {
        const response = await post(this.url, { ...this.options, body: { query } });
        if (raiseError && response.error) throw new Error(`Query ${query} failed`);
        return response.data;
    }

    static createCredentials(): RandomCredentials {
        return {
            email: `${uuid()}@example.com`,
            password: `Pass:${uuid()}`,
            address: `Address: ${uuid()}`,
            name: uniqueNamesGenerator({
                dictionaries: [adjectives, colors, animals],
                separator: ' ',
                length: 2,
            }),
        };
    }

    async register({ name, email }): Promise<User | null> {
        const { testRegister: user } = await this.query($register({ name, email }));
        return user;
    }

    async login({ userId, email }): Promise<User | null> {
        const { testLogin: user } = await this.query($login({
            userId: userId,
            email
        }));
        return user;
    }

    async logout(): Promise<void> {
        await this.query($logout());
    }

    async registerRandomUser() {
        const { name, email } = TestClient.createCredentials();
        const user = await this.register({ name, email });
        return { user, name, email }
    }

    static checkError(qt: string) {
        return (data: any) => (errorCode: any, path: string | null): void => {
            const res = data[qt];
            expect(res?.__typename).toEqual('Exceptions');
            expect(res?.exceptions).toEqual(
                expect.arrayContaining([
                    {
                        code: errorCode().code,
                        path,
                    },
                ]),
            );
        };
    }
}
