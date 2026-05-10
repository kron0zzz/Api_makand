class Purchase {
    constructor({customer, phone, date, items, delivery, adress, total}){
        this.customer = customer;
        this.phone = phone;
        this.date = date;
        this.items = items;
        this.delivery = delivery;
        this.adress = adress;
        this.total = total;
    }
}

export default Purchase;