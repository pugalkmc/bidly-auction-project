import MailChecker from 'mailchecker';
import { Email } from '../db/dbConnect.js';

const subscribeEmail = async (req, res) => {
    if (!MailChecker.isValid(req.body.email)) {
        return res.status(400).json({ message: 'Invalid email' });
    } else {
        try {
            const newEmail = new Email({ email: req.body.email });
            await newEmail.save();
            return res.status(200).json({ message: 'success' });
        } catch (error) {
            console.error("Error subscribing email:", error);
            return res.status(500).json({ message: 'Error subscribing email', error: error.message });
        }
    }
};

export {
    subscribeEmail
};
