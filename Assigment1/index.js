// ================================
// Task Manager - JavaScript Console App
// ================================

// ✅ Tasks Array to store task objects
let tasks = [];

// ✅ Auto Increment ID Counter
let taskId = 1;

// ================================
// 1. Add Task Function
// ================================
const addTask = (title) => {
  const newTask = {
    id: taskId++,
    title: title,
    status: "pending",
  };

  tasks.push(newTask);
  console.log(`✅ Task Added: "${title}"`);
};

// ================================
// 2. Get All Tasks Function
// ================================
const getAllTasks = () => {
  console.log("\n📌 All Tasks:");
  console.table(tasks);
};

// ================================
// 3. Complete Task Function
// ================================
const completeTask = (id) => {
  const task = tasks.find((t) => t.id === id);

  if (task) {
    task.status = "completed";
    console.log(`✅ Task Completed: "${task.title}"`);
  } else {
    console.log("❌ Task Not Found!");
  }
};

// ================================
// 4. Delete Task Function (Using filter)
// ================================
const deleteTask = (id) => {
  const beforeLength = tasks.length;

  tasks = tasks.filter((t) => t.id !== id);

  if (tasks.length < beforeLength) {
    console.log(`🗑️ Task Deleted (ID: ${id})`);
  } else {
    console.log("❌ Task Not Found!");
  }
};

// ================================
// 5. Show Task Titles (Using map)
// ================================
const showTaskTitles = () => {
  const titles = tasks.map((t) => t.title);
  console.log("\n📌 Task Titles:", titles);
};

// ================================
// Demo Testing
// ================================

addTask("Learn JavaScript");
addTask("Build MERN Project");
addTask("Practice Node.js");

getAllTasks();

completeTask(2);

getAllTasks();

deleteTask(1);

getAllTasks();

showTaskTitles();
