import { Request, Response } from 'express';
import { IContact } from '../db/models/IContacts';
import { User } from '../db/models/User';
import { contactService } from '../services/Contact.service';

class ContactController {
    constructor() {}

    async addContact(req: Request, res: Response) {
        let resp;
        const user = req.user! as User;

        try {
            const contact: IContact = req.body as IContact;
            resp = await contactService.addContact(user!.id, contact);
        } catch {
            return res.sendStatus(500);
        }

        res.status(201).json(resp);
    }

    async getContactsByUserId(req: Request, res: Response) {
        let contacts;
        try {
            const id = req.params.id;
            contacts = await contactService.getContactsByUserId(id);
        } catch {
            return res.sendStatus(500);
        }

        res.status(200).json(contacts);
    }
}

const contactController = new ContactController();

export { contactController };
