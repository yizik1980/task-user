import {
  connectToSupabase,
  closeSupabase,
  UserRepository,
  TaskRepository,
} from "./index";

async function testSupabaseConnection() {
  console.log("\n╔════════════════════════════════════════╗");
  console.log("║  Supabase Connection Diagnostic Tool   ║");
  console.log("╚════════════════════════════════════════╝\n");

  try {
    await connectToSupabase();

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
    console.log("✅ User inserted:", testUser.id);

    // Test query
    console.log("\n📝 Testing query operation...");
    const fetchedUser = await UserRepository.getUserById(testUser.id!);
    console.log("✅ User retrieved:", fetchedUser?.email);

    // Test update
    console.log("\n📝 Testing update operation...");
    const updatedUser = await UserRepository.updateUser(testUser.id!, {
      firstName: "Updated",
    });
    console.log("✅ User updated:", updatedUser?.firstName);

    // Test task insert
    console.log("\n📝 Testing task insert...");
    const testTask = await TaskRepository.createTask({
      userId: testUser.id!,
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
    const userTasks = await TaskRepository.getUserTasks(testUser.id!);
    console.log("✅ Tasks retrieved:", userTasks.length);

    // Test delete (cascades to tasks)
    console.log("\n📝 Testing delete operation...");
    const deleted = await UserRepository.deleteUser(testUser.id!);
    console.log("✅ User deleted (tasks cascade):", deleted);

    console.log("\n╔════════════════════════════════════════╗");
    console.log("║  ✅ All tests passed!                  ║");
    console.log("╚════════════════════════════════════════╝\n");

    console.log("✨ Supabase is ready to use!\n");
  } catch (error) {
    console.error("\n❌ Test failed:", error);
    process.exit(1);
  } finally {
    await closeSupabase();
  }
}

testSupabaseConnection();
