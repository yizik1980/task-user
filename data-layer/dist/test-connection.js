"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
async function testSupabaseConnection() {
    console.log("\n╔════════════════════════════════════════╗");
    console.log("║  Supabase Connection Diagnostic Tool   ║");
    console.log("╚════════════════════════════════════════╝\n");
    try {
        await (0, index_1.connectToSupabase)();
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
        console.log("✅ User inserted:", testUser.id);
        // Test query
        console.log("\n📝 Testing query operation...");
        const fetchedUser = await index_1.UserRepository.getUserById(testUser.id);
        console.log("✅ User retrieved:", fetchedUser?.email);
        // Test update
        console.log("\n📝 Testing update operation...");
        const updatedUser = await index_1.UserRepository.updateUser(testUser.id, {
            firstName: "Updated",
        });
        console.log("✅ User updated:", updatedUser?.firstName);
        // Test task insert
        console.log("\n📝 Testing task insert...");
        const testTask = await index_1.TaskRepository.createTask({
            userId: testUser.id,
            title: "Test Task",
            description: "A test task",
            status: "pending",
            priority: "medium",
            dueDate: null,
            completedAt: null,
        });
        console.log("✅ Task inserted:", testTask.id);
        // Test task query
        console.log("\n📝 Testing task query...");
        const userTasks = await index_1.TaskRepository.getUserTasks(testUser.id);
        console.log("✅ Tasks retrieved:", userTasks.length);
        // Test delete (cascades to tasks)
        console.log("\n📝 Testing delete operation...");
        const deleted = await index_1.UserRepository.deleteUser(testUser.id);
        console.log("✅ User deleted (tasks cascade):", deleted);
        console.log("\n╔════════════════════════════════════════╗");
        console.log("║  ✅ All tests passed!                  ║");
        console.log("╚════════════════════════════════════════╝\n");
        console.log("✨ Supabase is ready to use!\n");
    }
    catch (error) {
        console.error("\n❌ Test failed:", error);
        process.exit(1);
    }
    finally {
        await (0, index_1.closeSupabase)();
    }
}
testSupabaseConnection();
//# sourceMappingURL=test-connection.js.map