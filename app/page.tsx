"use server";

import { getAllTodos } from "@/api";
import AddTask from "./components/AddTask";
import TodoList from "./components/TodoList";
import dbConnect from "@/lib/dbConnect";
import { redirect } from "next/navigation";
import { Pool } from 'pg';

// Create pool instance for queries
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
});

export default async function Home() {
  await dbConnect();
  
  async function createNote(data: FormData) {
    "use server";
    const note = data.get('note')?.toString();
    
    if (!note) return;

    try {
      const client = await pool.connect();
      try {
        const newNote = await client.query(
          'INSERT INTO note (note) VALUES ($1) RETURNING *',
          [note]
        );
        console.log(newNote.rows[0]);
      } finally {
        client.release();
      }
    } catch (err) {
      console.error(err);
    }
    redirect('/');
  }

  const tasks = await getAllTodos();

  return (
    <main className="max-w-4xl mx-auto mt-4">
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Todo List</h1>
        <AddTask />
      </div>
      <TodoList tasks={tasks}/>

      <div className="mt-5">
        <h1 className="text-center mt-5">Add Note Task</h1>
        <form action={createNote} className="space-y-5">
          <input 
            type="text" 
            name="note" 
            id="task" 
            placeholder="add task" 
            className="mt-5 rounded-md h-10 p-3 w-full"
          />
          <button className="btn btn-primary w-full">Submit</button>
        </form>
      </div>
    </main>
  );
}
