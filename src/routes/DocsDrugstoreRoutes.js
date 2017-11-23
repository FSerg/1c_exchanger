import express from 'express';

import bearer from '../middlewares/bearer';

import DocsInvoiceDrugstore from '../models/DocsInvoiceDrugstore';

const router = express.Router();

// app.get('/api/surveys', requireCredits, async (req, res) => {
router.get('/invoices', bearer, (req, res) => {
  console.log('GET!');
  // console.log(req.query);

  if (req.query === undefined) {
    const errorMessage = 'Empty query to get Invoices from Drugstore!';
    console.error(errorMessage);
    res.status(400).send({ result: errorMessage });
  }

  const data1 = new Date(req.query.date_begin);
  const data2 = new Date(req.query.date_end);

  DocsInvoiceDrugstore.aggregate()
    .match({ date: { $gte: data1, $lt: data2 } })
    .sort({ moment_of_changes: -1 })
    .group({ originalId: { $first: '$_id' }, _id: '$id_doc' })
    .lookup({
      from: 'docsinvoicedrugstores',
      localField: 'originalId',
      foreignField: '_id',
      as: 'original_doc'
    })
    .project({ 'original_doc.positions': 0 })
    .exec((err, results) => {
      if (err) {
        console.error(err);
        res.status(400).send({ result: err });
      } else {
        res.status(200).send({
          result: results.map(item => item.original_doc[0])
        });
      }
    });
});

router.post('/invoices', bearer, (req, res) => {
  // console.log('data from 1C:');
  // console.log(req.body);

  const newInvoiceDoc = new DocsInvoiceDrugstore(req.body);
  newInvoiceDoc.save(err => {
    if (err) {
      console.error(err);
      res.status(400).send({ result: 'error' });
    } else {
      // console.log('DONE!');
      res.status(200).send({ result: 'success' });
    }
  });
});

export default router;
