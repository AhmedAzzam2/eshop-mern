require('dotenv').config()
const app=  require("../index");
const supertest = require("supertest");
const Category  =require("../models/Category")
const Product  =require("../models/Product")
const request = supertest(app);
const mongoose = require("mongoose");
const databaseName = process.env.MONGO_URL
const path  =require("path")

let category,product;
let user,accessToken;
beforeAll(async () => {
    const url = `${databaseName}`
    await mongoose.connect(url, { useNewUrlParser: true });

});

afterAll(async () => {
    //disconnect mongoose
    await mongoose.connection.close()
}); 

describe("Product db", () => {
    it("should create a new product", async () => {
         category = await Category.create({
            name: "test"
        })
        // jest Category model after creating a new category
         product = await Product.create({
            

            category: category._id,
            name: "test",
            description: "test",
            image: "test", 
            price: 0,
            minQuantity: 0,
            discountRate: 0,
            productCode: "test"
        })
        // jest Product model after creating a new product
        expect(product).toBeTruthy();
        expect(product.category).toBe(category._id);
        expect(product.name).toBe("test");
        expect(product.description).toBe("test");
        expect(product.image).toBe("test"); 
        expect(product.price).toBe(0);
        expect(product.minQuantity).toBe(0);
        expect(product.discountRate).toBe(0);
        expect(product.productCode).toBe("test");
    })
    it("should update a product", async () => {
        const updatedProduct = await Product.findByIdAndUpdate(product._id,{
            name: "test2",
            description: "test2",
            image: "test2", 
            price: 1,
            minQuantity: 1,
            discountRate: 1,
            productCode: "test2"
        },{new:true})
        expect(updatedProduct).toBeTruthy();
        expect(updatedProduct.name).toBe("test2");
        expect(updatedProduct.description).toBe("test2");
        expect(updatedProduct.image).toBe("test2"); 
        expect(updatedProduct.price).toBe(1);
        expect(updatedProduct.minQuantity).toBe(1);
        expect(updatedProduct.discountRate).toBe(1);
        expect(updatedProduct.productCode).toBe("test2");
    })
    it("should delete a product", async () => {
        const deletedProduct = await Product.findByIdAndDelete(product._id)
        expect(deletedProduct).toBeTruthy();
        expect(deletedProduct.name).toBe("test2");
        expect(deletedProduct.description).toBe("test2");
        expect(deletedProduct.image).toBe("test2"); 
        expect(deletedProduct.price).toBe(1);
        expect(deletedProduct.minQuantity).toBe(1);
        expect(deletedProduct.discountRate).toBe(1);
        expect(deletedProduct.productCode).toBe("test2");
    }
    )
    // update category  
    it("should update a category", async () => {
        const updatedCategory = await Category.findByIdAndUpdate(category._id,{
            name: "test2"
        },{new:true})
        expect(updatedCategory).toBeTruthy();
        expect(updatedCategory.name).toBe("test2");
    })

    // delete category 
    it("should delete a category", async () => {
        const deletedCategory = await Category.findByIdAndDelete(category._id)
        expect(deletedCategory).toBeTruthy();
        expect(deletedCategory.name).toBe("test2");
    }
    )

})


// test api routes with supertest and jest
describe("User api", () => {
    it("should create a new user", async () => {
        const response = await request.post("/api/v1/users/register").send({
            name: "test",
            email: "aza2@mauk,com",
            password: "123456",
            imageUrl: "test",
            googleId: "test" 
        })   
        // get token from response
        user = response.body;
        accessToken = response.body.accessToken;

        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy(); 
        expect(response.body.name).toBe("test");
        expect(response.body.email).toBe("aza2@mauk,com");
         

    })
})
// category api test 
describe("Category api", () => {
    it("should create a new category", async () => {
        const response = await request.post("/api/v1/categories")
        .set("token",  accessToken) 
        .send({
            name: "test"
        })
        category = response.body;
        expect(response.status).toBe(201);
        expect(response.body).toBeTruthy();
        expect(response.body.name).toBe("test");
    })
    it("should update a category", async () => {
        const response = await request.put(`/api/v1/categories/${category._id}`)
        .set("token",  accessToken) 
        .send({
            name: "test2"
        })
        expect(response.status).toBe(200); 
    })
    // product api test
    it("should create a new product", async () => {
        const response = await request.post("/api/v1/products")
        .set("token",  accessToken)
        .field("category", category._id)
        .field("name", "test")
        .field("description", "test")
        .field("image", "test")
        .field("price", 0)
        .field("minQuantity", 0)
        .field("discountRate", 0)
        .attach("image", path.join(__dirname, "test.jpg"))

        product = response.body;
        expect(response.status).toBe(201);
        expect(response.body).toBeTruthy();
        expect(response.body.category).toBe(category._id);
        expect(response.body.name).toBe("test");
        expect(response.body.description).toBe("test");
        expect(response.body.image).toBeTruthy();
        expect(response.body.price).toBe(0);
        expect(response.body.minQuantity).toBe(0);
        expect(response.body.discountRate).toBe(0);
        expect(response.body.productCode).toBeTruthy();
    })
    it("should update a product", async () => {
        const response = await request.put(`/api/v1/products/${product._id}`)
        .set("token",  accessToken)
        .field("category", category._id)
        .field("name", "test2")
        .field("description", "test2")
        .field("image", "test2")
        .field("price", 1)
        .field("minQuantity", 1)
        .field("discountRate", 1)
        .attach("image", path.join(__dirname, "test.jpg"))
        expect(response.status).toBe(200);
    })
    it("should delete a product", async () => {
        const response = await request.delete(`/api/v1/products/${product._id}`)
        .set("token",  accessToken)
        expect(response.status).toBe(200);
    })
 
    it("should delete a category", async () => {
        const response = await request.delete(`/api/v1/categories/${category._id}`) 
        .set("token",  accessToken) 
        expect(response.status).toBe(200);  
    })
})
 


describe("User api del", () => {
    it("should delete a user by id", async () => {
        
        const response = await request.delete("/api/v1/users/"+(user._id))
        .set("token",  accessToken) 
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe("User successfully deleted!");


    })

})