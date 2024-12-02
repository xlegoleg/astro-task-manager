CREATE TABLE "Task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "priority" TEXT NOT NULL,
    "dueDate" DATETIME NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false
);

INSERT INTO "Task" ("title", "description", "priority", "dueDate", "isCompleted")
VALUES
  ('Task 1', 'Description of task 1', 'High', '2024-12-10 09:00:00', false),
  ('Task 2', 'Description of task 2', 'Medium', '2024-12-12 10:00:00', false),
  ('Task 3', 'Description of task 3', 'Low', '2024-12-15 11:00:00', true);