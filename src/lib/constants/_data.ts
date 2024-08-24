const boardsPreData: Board[] = [
  { id: 9991, title: "Work" },
  { id: 2888, title: "Personal" },
];

const columnsPredata: Column[] = [
  { id: 1, boardId: 9991, title: "Uncategorized" },
  { id: 2, boardId: 9991, title: "To Do" },
  { id: 3, boardId: 9991, title: "In Progress" },
  { id: 7, boardId: 9991, title: "Finished" },
  { id: 4, boardId: 9991, title: "Reviewing" },
  { id: 5, boardId: 9991, title: "Done" },
];

const tasksPreData: Task[] = [
  // Uncategorized tasks
  { id: 431, columnId: 1, content: "Review last month's performance metrics" },
  { id: 234, columnId: 1, content: "Organize files on the shared drive" },
  { id: 343, columnId: 1, content: "Plan the next team meeting agenda" },
  { id: 443, columnId: 1, content: "Update team members on project status" },

  // To Do tasks
  { id: 3435, columnId: 2, content: "Draft the Q3 budget report" },
  {
    id: 6434,
    columnId: 2,
    content: "Prepare slides for the client presentation",
  },
  {
    id: 74343,
    columnId: 2,
    content: "Conduct market research for the new product",
  },
  {
    id: 8434,
    columnId: 2,
    content: "Set up a meeting with the development team",
  },

  // In Progress tasks
  {
    id: 94343,
    columnId: 3,
    content: "Write the first draft of the annual report",
  },
  {
    id: 10434,
    columnId: 3,
    content: "Develop new features for the mobile app",
  },
  { id: 43411, columnId: 3, content: "Test the latest software update" },
  {
    id: 12343,
    columnId: 3,
    content: "Create a marketing plan for the new campaign",
  },

  // Reviewing tasks
  { id: 13434, columnId: 4, content: "Proofread the client contract" },
  {
    id: 14434,
    columnId: 4,
    content: "Review code changes for the website redesign",
  },
  {
    id: 15343,
    columnId: 4,
    content: "Analyze feedback from the customer survey",
  },
  {
    id: 16434,
    columnId: 344,
    content: "Approve final designs for the product packaging",
  },

  // Done tasks
  {
    id: 174,
    columnId: 5,
    content: "Submit the finalized project plan to the board",
  },
  {
    id: 18434,
    columnId: 5,
    content: "Complete the end-of-year financial audit",
  },
  { id: 1943, columnId: 5, content: "Launch the new company website" },
  { id: 2034, columnId: 5, content: "Deliver the product demo to the client" },
];
export { columnsPredata, tasksPreData, boardsPreData };
