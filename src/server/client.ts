import { jar, post } from 'request-promise';
import { CookieJar, CoreOptions } from 'request';

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
        }
    }

    async query(query: string, raiseError = true): Promise<any> {
        const response = await post(this.url, { ...this.options, body: { query } });
        if (raiseError && response.error) throw new Error(`Query ${query} failed`);
        return response.data;
    }
}
