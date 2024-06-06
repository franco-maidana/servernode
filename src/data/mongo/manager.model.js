import { Types } from "mongoose";

class MongoManager {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      const one = await this.model.create(data);
      return one._id;
    } catch (error) {
      throw error;
    }
  }

  async read(obj) {
    try {
      const { filter, orderAndPaginate } = obj;
      const all = await this.model.paginate(filter, orderAndPaginate);
      if (all.totalPages === 0) {
        const error = new Error("there aren't documents");
        error.statusCode = 404;
        throw error;
      }
      return all;
    } catch (error) {
      throw error;
    }
  }

  // reportar la cuenta
  async reportBill(uid) {
    try {
      const report = await this.model.aggregate([
        { $match: { user_id: new Types.ObjectId(uid) } },
        {
          $lookup: {
            from: "products",
            foreignField: "_id",
            localField: "products_id",
            as: "products_id",
          },
        },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [{ $arrayElemAt: ["$products_id", 0] }, "$$ROOT"],
            },
          },
        },
        { $set: { subTotal: { $multiply: ["$price", "$quantity"] } } },
        { $group: { _id: "$user_id", total: { $sum: "$subTotal" } } },
        {
          $project: {
            _id: 0,
            user_id: "$_id",
            total: "$total",
            date: new Date(),
            currency: "USD",
          },
        },
      ]);
      return report;
    } catch (error) {
      throw error;
    }
  }

  async readOne(id) {
    if (!id) {
      throw new Error("El ID no es válido");
    }
    try {
      const one = await this.model.findById(id);
      return one;
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    console.log("esto es el id ", id);
    console.log("esto es el data ", data);
    try {
      //const opt = { new: true };
      //console.log("esto es opt", opt);
      const one = await this.model.findByIdAndUpdate(id, data, {new: true});
      console.log("one", one);
      return one;
    } catch (error) {
      throw error;
    }
  }

  async destroy(id) {
    try {
      const one = await this.model.findByIdAndDelete(id);
      return one;
    } catch (error) {
      throw error;
    }
  }

  async readByEmail(email) {
    try {
      const one = await this.model.findOne({ email });
      return one;
    } catch (error) {
      throw error;
    }
  }

  async stats({ filter }) {
    try {
      let stats = await this.model.find(filter).explain("executionStats");
      console.log(stats);
      stats = {
        quantity: stats.executionStats.nReturned,
        time: stats.executionStats.executionTimeMillis,
      };
      return stats;
    } catch (error) {
      throw error;
    }
  }
}

export default MongoManager;
// lo exportamos al model del producto
