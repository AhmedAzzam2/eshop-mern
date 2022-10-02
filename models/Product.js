const mongoose = require("mongoose");

// ● Category
// ● Product code (should be a unique one eg: P01, P02, etc...)
// ● Name
// ● Image (should be able to be saved in aws s3bucket(https://aws.amazon.com/s3/)
// or in the local storage.
// ● Price
// ● Minimum Quantity
// ● Discount Rate
const productSchema = new mongoose.Schema(
    {
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
        },
        name: {
            type: String ,
            unique: true
        },
        description: {
            type: String
        },
        image: {
            type: String,
            default: ""
        },
        images: [
            {
                type: String
            }
        ],
        price: {
            type: Number,
            default: 0
        },
        minQuantity: {
            type: Number,
            default: 0
        },
        discountRate: {
            type: Number,
            default: 0
        },
        productCode: {
            type: String,
            unique: true
        }
    },
    { timestamps: true }
);

// I want to generate unique values p01 p02 p03 p04 etc... so may you give more details about that
// creating virtuals 

//handling _id issue for getting id( creating virtuals)
// productSchema.virtual('id').get(function() {
//     return this._id.toHexString();
// });

// productSchema.set("toJSON", {
//     virtuals: true
// });
module.exports = mongoose.model("Product", productSchema);