# Weekly Board Completion Design

## Goal

Finish the weekly board feature: wire task creation to the backend, display tasks on day cards, and add view/edit/delete capabilities through dedicated dialog components.

## Component Architecture

Following Angular best practices (single responsibility, smart/dumb pattern):

```
WeeklyBoardComponent (smart)
  - Fetches tasks for visible week
  - Manages week navigation state
  - Orchestrates dialog opening

  DayCardComponent (dumb) x 7
    - @Input: day, tasks for this day
    - @Output: dayClick, taskClick
    - Displays day header + scrollable task list

  TaskCreationDialogComponent (smart)
    - Owns the creation form
    - Calls TaskService.createTask()
    - Resets form after save for continuous creation
    - Emits taskCreated event

  TaskViewDialogComponent (smart)
    - Displays full task details (read-only)
    - "Edit" button opens TaskEditDialog
    - "Delete" button with confirmation
    - "Complete/Uncomplete" toggle

  TaskEditDialogComponent (smart)
    - Pre-filled form with task data
    - Calls TaskService.updateTask()
    - Emits taskUpdated event
```

## Data Flow

### Fetching tasks for the week

```
WeeklyBoard.ngOnInit() / onWeekChange()
  -> TaskService.getTasksByDateRange(weekStart, weekEnd)
  -> Backend: GET /api/tasks?startDate=...&endDate=...
  -> Group tasks by dueDate into Map<string, Task[]>
  -> Pass filtered array to each DayCardComponent via @Input
```

### Creating a task

```
DayCard empty area click -> WeeklyBoard opens TaskCreationDialog with selectedDate
  -> User fills form -> "Create" button
  -> TaskCreationDialog calls TaskService.createTask(taskData)
  -> On success: form resets, task list refreshes (emit event to parent)
  -> Dialog stays open for another task
  -> "Close" button to dismiss
```

### Viewing a task

```
DayCard task click -> WeeklyBoard opens TaskViewDialog with task data
  -> Read-only display of title, description, priority, due date, status
  -> "Edit" button -> closes view, opens TaskEditDialog
  -> "Delete" button -> confirmation -> TaskService.deleteTask()
  -> "Complete" toggle -> TaskService.updateTask({completed: true})
```

### Editing a task

```
TaskViewDialog "Edit" -> WeeklyBoard opens TaskEditDialog with task data
  -> Pre-filled form -> user modifies -> "Save"
  -> TaskEditDialog calls TaskService.updateTask(taskId, changes)
  -> On success: dialog closes, task list refreshes
```

## Task Display on Day Cards

Each DayCardComponent renders all tasks for that day in a scrollable list:

- Priority color dot: red (high), orange (medium), green (low)
- Task title (truncated if long)
- Completed tasks: checkmark icon, muted color, strikethrough
- Clicking a task opens TaskViewDialog
- Clicking empty area opens TaskCreationDialog

## Error Handling

- Network errors on fetch: error banner above board with "Retry" button
- Create/update/delete failures: error shown via DialogService.error(), form data preserved
- Empty week: day cards show "No tasks", clicking still opens creation dialog

## Bug Fix

- generateWeekDays() currently ignores this.currentDate and recalculates from new Date(). Will fix to use this.currentDate as reference.

## Changes Summary

### New components (4)
1. DayCardComponent - presentational day card with task list
2. TaskCreationDialogComponent - create tasks with continuous creation flow
3. TaskViewDialogComponent - read-only task details with edit/delete/complete actions
4. TaskEditDialogComponent - edit existing tasks

### Modified components (2)
1. WeeklyBoardComponent - fetch tasks, group by day, orchestrate dialogs, fix navigation bug
2. AppModule - register new components

### Backend changes (1)
1. Tasks route - add date-range query support (GET /api/tasks?startDate=...&endDate=...)

### Data layer changes (1)
1. TaskRepository - add getTasksByDateRange() method
