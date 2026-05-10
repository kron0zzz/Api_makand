import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
    documento: String,
    nombre: String,
    email: String,
    whatsapp: String
  });

const CustomerModel = mongoose.model("Customer", CustomerSchema);

class CustomerRepositoryMongo {

    async create(customerData) {
      const customer = new CustomerModel(customerData);
      return await customer.save();
    }

    async findAll(){
      return await CustomerModel.find();
    }

    async findById(id){
      return await CustomerModel.findById(id);
    }

    async update(id, customerData) {
      return await CustomerModel.findByIdAndUpdate(id, customerData, { new: true });
    }

    async delete(id) {
    return await CustomerModel.findByIdAndDelete(id);
  }
}


export default CustomerRepositoryMongo;
