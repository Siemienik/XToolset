const { Router } = require('express');
const multer = require('multer');
const { ImporterFactory } = require('xlsx-import/lib/ImporterFactory');
const { UPLOAD_DIR } = require('../../config');
const { getInvoiceConfig } = require('./invoiceConfig');

const router = Router();
const upload = multer({ dest: UPLOAD_DIR });
const factory = new ImporterFactory();

const importInvoice = async invoicePath => {
    const config = getInvoiceConfig();

    const importer = await factory.from(invoicePath);

    const { date, dueDate } = importer.getAllItems(config.misc)[0];
    const seller = importer.getAllItems(config.seller)[0];
    const buyer = importer.getAllItems(config.buyer)[0];
    const items = importer.getAllItems(config.items);

    const total = items.reduce((p, c) => p + c.price, 0);

    return {
        date,
        dueDate,
        seller,
        buyer,
        items,
        total,
    };
};

router.post('/parse', upload.single('invoice'), (req, res, next) => {
    const invoicePath = req.file && req.file.path;
    if (!invoicePath) return res.status(500).json({ status: 'error' });
    importInvoice(invoicePath)
        .then(payload => res.json({ status: 'ok', payload }))
        .catch(next);
});

module.exports = router;
