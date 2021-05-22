import request from 'supertest';
import { server } from '../source/Server';

describe('Express Setup testing', () => {
    afterAll(() => {
        server.close();
    });

    it('GET /invalidUrl - Should return 404', async () => {
        await request(server).get('/invalidUrl').expect(404);
    });

    it('Options - Should return 200 with the allowed methods header', async () => {
        const result = await request(server).options('/');
        expect(result.statusCode).toEqual(200);
        expect(result.headers['access-control-allow-methods']).toEqual('PUT, POST, PATCH, DELETE, GET');
    });
});
