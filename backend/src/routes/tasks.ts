import { Router, Request, Response } from "express";
import { TaskRepository } from "data-layer";

const router = Router();

// Get all tasks (with optional date range filter)
router.get("/", async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;

    let tasks;
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      start.setHours(0, 0, 0, 0);
      const end = new Date(endDate as string);
      end.setHours(23, 59, 59, 999);
      tasks = await TaskRepository.getTasksByDateRange(start, end);
    } else {
      tasks = await TaskRepository.getAllTasks();
    }

    res.json({
      success: true,
      data: tasks,
      count: tasks.length,
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch tasks",
    });
  }
});

// Get pending tasks
router.get("/status/pending", async (req: Request, res: Response) => {
  try {
    const tasks = await TaskRepository.getPendingTasks();
    res.json({
      success: true,
      data: tasks,
      count: tasks.length,
    });
  } catch (error) {
    console.error("Error fetching pending tasks:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch pending tasks",
    });
  }
});

// Get high priority tasks
router.get("/priority/high", async (req: Request, res: Response) => {
  try {
    const tasks = await TaskRepository.getHighPriorityTasks();
    res.json({
      success: true,
      data: tasks,
      count: tasks.length,
    });
  } catch (error) {
    console.error("Error fetching high priority tasks:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch high priority tasks",
    });
  }
});

// Get overdue tasks
router.get("/overdue", async (req: Request, res: Response) => {
  try {
    const tasks = await TaskRepository.getOverdueTasks();
    res.json({
      success: true,
      data: tasks,
      count: tasks.length,
    });
  } catch (error) {
    console.error("Error fetching overdue tasks:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch overdue tasks",
    });
  }
});

// Get task by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid task ID",
      });
    }

    const task = await TaskRepository.getTaskById(id);
    if (!task) {
      return res.status(404).json({
        success: false,
        error: "Task not found",
      });
    }

    res.json({
      success: true,
      data: task,
    });
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch task",
    });
  }
});

// Get tasks by user ID
router.get("/user/:userId", async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      return res.status(400).json({
        success: false,
        error: "Invalid user ID",
      });
    }

    const tasks = await TaskRepository.getTasksByUserId(userId);
    res.json({
      success: true,
      data: tasks,
      count: tasks.length,
    });
  } catch (error) {
    console.error("Error fetching user tasks:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch user tasks",
    });
  }
});

// Get tasks by user ID and status
router.get("/user/:userId/:status", async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const status = req.params.status.toLowerCase();

    if (isNaN(userId)) {
      return res.status(400).json({
        success: false,
        error: "Invalid user ID",
      });
    }

    const tasks = await TaskRepository.getTasksByUserIdAndStatus(
      userId,
      status,
    );
    res.json({
      success: true,
      data: tasks,
      count: tasks.length,
    });
  } catch (error) {
    console.error("Error fetching user tasks by status:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch user tasks",
    });
  }
});

// Create task
router.post("/", async (req: Request, res: Response) => {
  try {
    const { userId, title, description, status, priority, dueDate } = req.body;

    // Validation
    if (!userId || !title) {
      return res.status(400).json({
        success: false,
        error: "User ID and title are required",
      });
    }

    const newTask = await TaskRepository.createTask({
      userId,
      title,
      description: description || null,
      status: status || "pending",
      priority: priority || "medium",
      dueDate: dueDate ? new Date(dueDate) : null,
      completedAt: null,
    });

    res.status(201).json({
      success: true,
      data: newTask,
      message: "Task created successfully",
    });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create task",
    });
  }
});

// Update task
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid task ID",
      });
    }

    const task = await TaskRepository.getTaskById(id);
    if (!task) {
      return res.status(404).json({
        success: false,
        error: "Task not found",
      });
    }

    const updateData = req.body;
    if (updateData.dueDate) {
      updateData.dueDate = new Date(updateData.dueDate);
    }

    const updatedTask = await TaskRepository.updateTask(id, updateData);

    res.json({
      success: true,
      data: updatedTask,
      message: "Task updated successfully",
    });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update task",
    });
  }
});

// Complete task
router.patch("/:id/complete", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid task ID",
      });
    }

    const task = await TaskRepository.getTaskById(id);
    if (!task) {
      return res.status(404).json({
        success: false,
        error: "Task not found",
      });
    }

    const completedTask = await TaskRepository.completeTask(id);

    res.json({
      success: true,
      data: completedTask,
      message: "Task completed successfully",
    });
  } catch (error) {
    console.error("Error completing task:", error);
    res.status(500).json({
      success: false,
      error: "Failed to complete task",
    });
  }
});

// Delete task
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid task ID",
      });
    }

    const task = await TaskRepository.getTaskById(id);
    if (!task) {
      return res.status(404).json({
        success: false,
        error: "Task not found",
      });
    }

    const deleted = await TaskRepository.deleteTask(id);
    if (deleted) {
      res.json({
        success: true,
        message: "Task deleted successfully",
      });
    } else {
      res.status(500).json({
        success: false,
        error: "Failed to delete task",
      });
    }
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete task",
    });
  }
});

export default router;
