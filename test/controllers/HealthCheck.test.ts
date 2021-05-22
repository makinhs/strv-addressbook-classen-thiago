import request from 'supertest';
import { server } from '../../source/Server';

describe('Health Check Controller', () => {
    afterAll(() => {
        server.close();
    });

    it('GET /ping - Should return 200 with "pong" message', async () => {
        const result = await request(server).get('/ping');
        expect(result.statusCode).toEqual(200);
        expect(result.body.message).toEqual('pong');
    });
});
