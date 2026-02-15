import {
  connectToMongo,
  closeMongo,
  UserRepository,
  TaskRepository,
} from "./index";

async function testMongoConnection() {
  console.log("\n╔════════════════════════════════════════╗");
  console.log("║  MongoDB Connection Diagnostic Tool    ║");
  console.log("╚════════════════════════════════════════╝\n");

  try {
    // Connect to MongoDB
    const db = await connectToMongo();

    console.log("\n🔄 Creating collection indexes...");
    await UserRepository.createIndexes();
    await TaskRepository.createIndexes();

    // Get collections info
    console.log("\n📊 Collections in database:");
    const collections = await db.listCollections().toArray();
    collections.forEach((col) => {
      console.log(`   ✓ ${col.name}`);
    });

    // Test insert
    console.log("\n📝 Testing insert operation...");
    const testUser = await UserRepository.createUser({
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
    const fetchedUser = await UserRepository.getUserById(
      testUser._id!.toString(),
    );
    console.log("✅ User retrieved:", fetchedUser?.email);

    // Test update
    console.log("\n📝 Testing update operation...");
    const updatedUser = await UserRepository.updateUser(
      testUser._id!.toString(),
      {
        firstName: "Updated",
      },
    );
    console.log("✅ User updated:", updatedUser?.firstName);

    // Test delete
    console.log("\n📝 Testing delete operation...");
    const deleted = await UserRepository.deleteUser(testUser._id!.toString());
    console.log("✅ User deleted:", deleted);

    console.log("\n╔════════════════════════════════════════╗");
    console.log("║  ✅ All tests passed!                  ║");
    console.log("╚════════════════════════════════════════╝\n");

    console.log("✨ MongoDB is ready to use!\n");
  } catch (error) {
    console.error("\n❌ Test failed:", error);
    process.exit(1);
  } finally {
    await closeMongo();
  }
}

testMongoConnection();
