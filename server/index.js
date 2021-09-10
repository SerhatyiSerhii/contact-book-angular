import express from 'express';

const port = 8080;
const app = express();

app.use(express.json());

app.use((_req, res, next) => {
    ['Access-Control-Allow-Origin', 'Access-Control-Allow-Methods', 'Access-Control-Allow-Headers'].forEach(h => res.setHeader(h, '*'));
    next();
});

let contactsDataBase = [];

app.get('/contact', (_req, res) => res.json(contactsDataBase));

app.get('/contact/:id', (req, res) => {
    const contactId = Number(req.params.id);
    const contact = contactsDataBase.find(c => c.id === contactId);

    res.json(contact);
});

app.post('/contact', (req, res) => {
    const contact = req.body.contact;

    if (!isContactValid(contact)) {
        res.status(400).json({ errorMessage: 'Some required field missed!' });
        return;
    }

    contact.id = Date.now();
    contactsDataBase.push(contact);

    res.json(contact);
});

app.put('/contact/:id', (req, res) => {
    const contactId = Number(req.params.id);
    const contactIndex = contactsDataBase.findIndex(c => c.id === contactId);

    if (contactIndex === -1) {
        res.status(400).json({ errorMessage: 'Contact does not exist!' });
        return;
    }

    const contact = req.body.contact;

    if (!isContactValid(contact)) {
        res.status(400).json({ errorMessage: 'Some required field missed!' });
        return;
    }

    contact.id = contactId;

    contactsDataBase[contactIndex] = contact;

    res.json(contact);
});

app.delete('/contact/:id', (req, res) => {
    const contactId = Number(req.params.id);

    if (!contactsDataBase.some(c => c.id === contactId)) {
        res.status(400).json({ errorMessage: 'Contact does not exist!' });
        return;
    }

    contactsDataBase = contactsDataBase.filter(c => c.id !== contactId);

    res.json({});
});

const isContactValid = (contact) => Boolean(contact)
    && Boolean(contact.name)
    && Boolean(contact.surname)
    && (Boolean(contact.phone) || Boolean(contact.email));

app.listen(port, () => console.log(`Server running at http://localhost:${port}/`));
