require('dotenv').config()
const app=  require("../index");
const supertest = require("supertest");
const User = require("../models/User");
const request = supertest(app);

const mongoose = require("mongoose");
let token;
const databaseName = process.env.MONGO_URL
const path  =require("path")
let user,accessToken;
beforeAll(async () => {
    const url = `${databaseName}`
    await mongoose.connect(url, { useNewUrlParser: true });

});

afterAll(async () => {
    //disconnect mongoose
    await mongoose.connection.close()
});

describe("User db", () => {
    it("should create a new user", async () => {
        user = await User.create({
            name: "test",
            email: "aa@mail.com",
            password: "123456",
            isAdmin: true,
            imageUrl: "test",
            googleId: "test",
            lastLogin: Date.now()
        })
        // jest User model after creating a new user
        expect(user).toBeTruthy();
        expect(user.name).toBe("test");
        expect(user.email).toBe("aa@mail.com");
        expect(user.password).toBe("123456");
        expect(user.isAdmin).toBe(true);
        expect(user.imageUrl).toBe("test");
        expect(user.googleId).toBe("test"); 
    })
    it("should update a user", async () => {
        const updatedUser = await User.findByIdAndUpdate(user._id,{
            name: "test2",
            email: "zz@mauk,com",
            password: "1234567",
            isAdmin: false,
            imageUrl: "test2",
            googleId: "test2" 
        },{new:true})
        expect(updatedUser).toBeTruthy();
        expect(updatedUser.name).toBe("test2");
        expect(updatedUser.email).toBe("zz@mauk,com");
        expect(updatedUser.password).toBe("1234567");
        expect(updatedUser.isAdmin).toBe(false);
        expect(updatedUser.imageUrl).toBe("test2");
        expect(updatedUser.googleId).toBe("test2");
    })  
    it("should delete a user", async () => {
        const deletedUser = await User.findByIdAndDelete(user._id)
        expect(deletedUser).toBeTruthy();
    })


})

// test api routes with supertest and jest
describe("User api", () => {
    it("should create a new user", async () => {
        const response = await request.post("/api/v1/users/register").send({
            name: "test",
            email: "aza@mauk,com",
            password: "123456",
            imageUrl: "test",
            googleId: "test" 
        })   
        // get token from response
        const token = response.body.token;
        user = response.body;

        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy(); 
        expect(response.body.name).toBe("test");
        expect(response.body.email).toBe("aza@mauk,com");
         

    })

    it("should login a user", async () => {
        const response = await request.post("/api/v1/users/login").send({
            email: "aza@mauk,com",
            password: "123456"
        })  
          
        accessToken = response.body.accessToken;

        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy(); 
        expect(response.body.name).toBe("test");
        expect(response.body.email).toBe("aza@mauk,com");
          
 
    })
})
 
// get by id


describe("User api", () => {
    it("should get a user by id", async () => {
        
        const response = await request.get("/api/v1/users/"+(user._id))
        .set("token",  accessToken) 
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
        expect(response.body.data.name).toBe("test");
        expect(response.body.data.email).toBe("aza@mauk,com");
    })

})
// delete user by id with token accessToken in headers josn web token
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

