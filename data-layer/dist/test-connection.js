"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
async function testMongoConnection() {
    console.log("\n╔════════════════════════════════════════╗");
    console.log("║  MongoDB Connection Diagnostic Tool    ║");
    console.log("╚════════════════════════════════════════╝\n");
    try {
        // Connect to MongoDB
        const db = await (0, index_1.connectToMongo)();
        console.log("\n🔄 Creating collection indexes...");
        await index_1.UserRepository.createIndexes();
        await index_1.TaskRepository.createIndexes();
        // Get collections info
        console.log("\n📊 Collections in database:");
        const collections = await db.listCollections().toArray();
        collections.forEach((col) => {
            console.log(`   ✓ ${col.name}`);
        });
        // Test insert
        console.log("\n📝 Testing insert operation...");
        const testUser = await index_1.UserRepository.createUser({
            email: `test-${Date.now()}@example.com`,
            username: "testuser",
            firstName: "Test",
            lastName: "User",
            password: "hashedpassword123",
            role: "user",
            isActive: true,
        });
        console.log("✅ User inserted:", testUser._id);
        // Test query
        console.log("\n📝 Testing query operation...");
        const fetchedUser = await index_1.UserRepository.getUserById(testUser._id.toString());
        console.log("✅ User retrieved:", fetchedUser?.email);
        // Test update
        console.log("\n📝 Testing update operation...");
        const updatedUser = await index_1.UserRepository.updateUser(testUser._id.toString(), {
            firstName: "Updated",
        });
        console.log("✅ User updated:", updatedUser?.firstName);
        // Test delete
        console.log("\n📝 Testing delete operation...");
        const deleted = await index_1.UserRepository.deleteUser(testUser._id.toString());
        console.log("✅ User deleted:", deleted);
        console.log("\n╔════════════════════════════════════════╗");
        console.log("║  ✅ All tests passed!                  ║");
        console.log("╚════════════════════════════════════════╝\n");
        console.log("✨ MongoDB is ready to use!\n");
    }
    catch (error) {
        console.error("\n❌ Test failed:", error);
        process.exit(1);
    }
    finally {
        await (0, index_1.closeMongo)();
    }
}
testMongoConnection();
//# sourceMappingURL=test-connection.js.map