import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import db from "~/db";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader() {
  const tasks = await db.query.tasks.findMany();
  return json({ tasks })
}

export default function Index() {
  const { tasks } = useLoaderData<typeof loader>();
  return (
    <div className="font-sans p-4">
      Tasks
      { tasks && tasks.map((task) => {
        return (<div key={`task-${task.id}`}>{task.text}</div>)
      })}
      <pre>{JSON.stringify(tasks, null, 2)}</pre>
    </div>
  );
}
