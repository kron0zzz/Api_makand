import mongoose from "mongoose";

const PurchaseSchema = new mongoose.Schema({
    customer: String,
    phone: String,
    date: Date,
    items: [{
      product: String,
      quantity: String,
      price: Number
    }],
    delivery: Boolean,
    adress: {
      street: String,
      city: String
    },
    total: Number
  });

const PurchaseModel = mongoose.model("Compra", PurchaseSchema);

class PurchaseRepositoryMongo {

    async create(purchaseData) {
      const purchase = new PurchaseModel(purchaseData);
      return await purchase.save();
    }

    async findAll(){
      return await PurchaseModel.find();
    }

    async findById(id){
      return await PurchaseModel.findById(id);
    }

    async update(id, purchaseData) {
      return await PurchaseModel.findByIdAndUpdate(id, purchaseData, { new: true });
    }

    async delete(id) {
    return await PurchaseModel.findByIdAndDelete(id);
  }
}


export default PurchaseRepositoryMongo;
