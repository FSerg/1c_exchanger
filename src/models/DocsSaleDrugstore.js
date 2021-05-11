import mongoose from "mongoose";

const { Schema } = mongoose;
const docSchema = new Schema({
  id_doc: { type: String, index: true },
  date: { type: Date, index: true },
  number: String,
  deleting_mark: Boolean,
  recognized: Boolean,
  user: String,
  moment_of_changes: { type: Date, index: true },
  head: {
    organization_inn: String,
    partner: String,
    partner_inn: String,
    partner_kpp: String,
    contract: String,
    contract_number: String,
    contract_date: String,
    shop: String,
    type_doc: String,
    summa_doc: Number,
    summa_doc_retail: Number,
    comment: String,
  },
  positions: [
    {
      _id: false,
      product: String,
      product_code: String,
      product_id: String,
      vital: Boolean,
      ean: [
        {
          _id: false,
          barcode: String,
        },
      ],
      count: Number,
      summa: Number,
      summa_retail: Number,
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("DocsSaleDrugstore", docSchema);
