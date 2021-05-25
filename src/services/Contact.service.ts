import { logger } from '../config/Logger';
import { fireDb } from '../db/firebase';
import { IContact } from '../db/models/IContacts';
import { User } from '../db/models/User';

class ContactService {
    constructor() {}

    async addContact(userId: string, contact: IContact) {
        let resp;
        try {
            resp = await fireDb.collection('users').doc(userId).collection('contacts').add(contact);
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

const contactService = new ContactService();

export { contactService };
