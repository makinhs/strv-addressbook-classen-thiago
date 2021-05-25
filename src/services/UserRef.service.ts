import { logger } from '../config/Logger';
import { fireDb } from '../db/firebase';

class UserRefService {
    constructor() {}

    async addUserRef(id: string) {
        let resp;
        try {
            resp = await fireDb.collection('users').doc(id).set({});
        } catch (err) {
            logger.error(err.toString());
            throw Error(err.toString());
        }

        return resp;
    }
    async getContactsByUserId(id: string) {
        let resp: any[] = [];
        try {
            const userRef = fireDb.collection('users').doc(id).collection('contacts');
            const doc = await userRef.get();

            doc.forEach((doc: any) => {
                console.log(doc.data());
                resp.push(doc.data());
            });
        } catch (err) {
            logger.error(err.toString());
        }

        return resp;
    }
}

const userRefService = new UserRefService();

export { userRefService };
