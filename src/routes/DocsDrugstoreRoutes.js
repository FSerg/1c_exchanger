import express from 'express';

import bearer from '../middlewares/bearer';

import DocsInvoiceDrugstore from '../models/DocsInvoiceDrugstore';
import DocsReceiptsDrugstore from '../models/DocsReceiptsDrugstore';
import DocsSaleDrugstore from '../models/DocsSaleDrugstore';
import DocsRevaluationDrugstore from '../models/DocsRevaluationDrugstore';
import DocsResortingDrugstore from '../models/DocsResortingDrugstore';
import DocsRelocationDrugstore from '../models/DocsRelocationDrugstore';

const router = express.Router();

router.post('/invoices', bearer, (req, res) => {
  console.log('Invoices from 1C:');
  // console.log(req.body);

  const newInvoiceDoc = new DocsInvoiceDrugstore(req.body);
  newInvoiceDoc.save(err => {
    if (err) {
      console.error(err);
      res.status(400).send({ result: 'error' });
    } else {
      // console.log('Invoices DONE!');
      res.status(200).send({ result: 'success' });
    }
  });
});

router.get('/invoices', bearer, (req, res) => {
  console.log('GET Invoices!');
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

router.get('/allinvoices', (req, res) => {
  console.log('GET ALL Invoices!');
  // console.log(req.query);

  DocsInvoiceDrugstore.aggregate()
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

router.post('/receipts', bearer, (req, res) => {
  console.log('Receipts from 1C:');
  // console.log(req.body);

  const newReceiptsDoc = new DocsReceiptsDrugstore(req.body);
  newReceiptsDoc.save(err => {
    if (err) {
      console.error(err);
      res.status(400).send({ result: 'error' });
    } else {
      // console.log('Receipts DONE!');
      res.status(200).send({ result: 'success' });
    }
  });
});

router.get('/receipts', bearer, (req, res) => {
  console.log('GET Receipts!');
  // console.log(req.query);

  if (req.query === undefined) {
    const errorMessage = 'Empty query to get Receipts from Drugstore!';
    console.error(errorMessage);
    res.status(400).send({ result: errorMessage });
  }

  const data1 = new Date(req.query.date_begin);
  const data2 = new Date(req.query.date_end);

  DocsReceiptsDrugstore.aggregate()
    .match({ date: { $gte: data1, $lte: data2 } })
    .sort({ moment_of_changes: -1 })
    .group({ originalId: { $first: '$_id' }, _id: '$id_doc' })
    .lookup({
      from: 'docsreceiptsdrugstores',
      localField: 'originalId',
      foreignField: '_id',
      as: 'original_doc'
    })
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

router.post('/sales', bearer, (req, res) => {
  console.log('Sales from 1C:');
  // console.log(req.body);

  const newSaleDoc = new DocsSaleDrugstore(req.body);
  newSaleDoc.save(err => {
    if (err) {
      console.error(err);
      res.status(400).send({ result: 'error' });
    } else {
      // console.log('Sales DONE!');
      res.status(200).send({ result: 'success' });
    }
  });
});

router.get('/sales', bearer, (req, res) => {
  console.log('GET Sales!');
  // console.log(req.query);

  if (req.query === undefined) {
    const errorMessage = 'Empty query to get Sales from Drugstore!';
    console.error(errorMessage);
    res.status(400).send({ result: errorMessage });
  }

  const data1 = new Date(req.query.date_begin);
  const data2 = new Date(req.query.date_end);

  DocsSaleDrugstore.aggregate()
    .match({ date: { $gte: data1, $lte: data2 } })
    .sort({ moment_of_changes: -1 })
    .group({ originalId: { $first: '$_id' }, _id: '$id_doc' })
    .lookup({
      from: 'docssaledrugstores',
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

router.post('/revaluations', bearer, (req, res) => {
  console.log('Revaluations from 1C:');
  // console.log(req.body);

  const newRevaluationDoc = new DocsRevaluationDrugstore(req.body);
  newRevaluationDoc.save(err => {
    if (err) {
      console.error(err);
      res.status(400).send({ result: 'error' });
    } else {
      // console.log('Revaluations DONE!');
      res.status(200).send({ result: 'success' });
    }
  });
});

router.get('/revaluations', bearer, (req, res) => {
  console.log('GET Revaluations!');
  // console.log(req.query);

  if (req.query === undefined) {
    const errorMessage = 'Empty query to get Revaluations from Drugstore!';
    console.error(errorMessage);
    res.status(400).send({ result: errorMessage });
  }

  const data1 = new Date(req.query.date_begin);
  const data2 = new Date(req.query.date_end);

  DocsRevaluationDrugstore.aggregate()
    .match({ date: { $gte: data1, $lte: data2 } })
    .sort({ moment_of_changes: -1 })
    .group({ originalId: { $first: '$_id' }, _id: '$id_doc' })
    .lookup({
      from: 'docsrevaluationdrugstores',
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

router.post('/resortings', bearer, (req, res) => {
  console.log('Resortings from 1C:');
  // console.log(req.body);

  const newResortingDoc = new DocsResortingDrugstore(req.body);
  newResortingDoc.save(err => {
    if (err) {
      console.error(err);
      res.status(400).send({ result: 'error' });
    } else {
      // console.log('Revaluations DONE!');
      res.status(200).send({ result: 'success' });
    }
  });
});

router.get('/resortings', bearer, (req, res) => {
  console.log('GET Resortings!');
  // console.log(req.query);

  if (req.query === undefined) {
    const errorMessage = 'Empty query to get Resortings from Drugstore!';
    console.error(errorMessage);
    res.status(400).send({ result: errorMessage });
  }

  const data1 = new Date(req.query.date_begin);
  const data2 = new Date(req.query.date_end);

  DocsResortingDrugstore.aggregate()
    .match({ date: { $gte: data1, $lte: data2 } })
    .sort({ moment_of_changes: -1 })
    .group({ originalId: { $first: '$_id' }, _id: '$id_doc' })
    .lookup({
      from: 'docsresortingdrugstores',
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


router.post('/movings', bearer, (req, res) => {
  console.log('Relocations from 1C:');
  // console.log(req.body);

  const newRelocDoc = new DocsRelocationDrugstore(req.body);
  newRelocDoc.save(err => {
    if (err) {
      console.error(err);
      res.status(400).send({ result: 'error' });
    } else {
      // console.log('Sales DONE!');
      res.status(200).send({ result: 'success' });
    }
  });
});

router.get('/movings', bearer, (req, res) => {
  console.log('GET Relocations!');
  // console.log(req.query);

  if (req.query === undefined) {
    const errorMessage = 'Empty query to get Relocations from Drugstore!';
    console.error(errorMessage);
    res.status(400).send({ result: errorMessage });
  }

  const data1 = new Date(req.query.date_begin);
  const data2 = new Date(req.query.date_end);

  DocsRelocationDrugstore.aggregate()
    .match({ date: { $gte: data1, $lte: data2 } })
    .sort({ moment_of_changes: -1 })
    .group({ originalId: { $first: '$_id' }, _id: '$id_doc' })
    .lookup({
      from: 'docsrelocationdrugstores',
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

export default router;
