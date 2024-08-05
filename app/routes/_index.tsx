import {
  ActionFunction,
  ActionFunctionArgs,
  json,
  type MetaFunction,
} from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { asc, eq } from "drizzle-orm";
import db from "~/db";
import { tasks } from "~/db/schema";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  if (request.method == "PUT") {
    await db
      .update(tasks)
      .set({
        text: formData.get("text"),
        stateId: formData.get("state"),
      })
      .where(eq(tasks.id, formData.get("id")));
  }

  if (request.method === "POST") {
    await db.insert(tasks).values({
      text: formData.get("text"),
      stateId: formData.get("state"),
    });
  }

  if (request.method === "DELETE") {
    await db.delete(tasks).where(eq(tasks.id, formData.get("id")));
  }

  return json({ status: "ok" });
}

export async function loader() {
  const tasks = await db.query.tasks.findMany({
    with: {
      state: true,
    },
    orderBy: (tasks, { desc }) => [desc(tasks.order)],
  });

  const states = await db.query.states.findMany();

  return json({ tasks, states });
}

export default function Index() {
  const { tasks, states } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();
  return (
    <div className="font-sans text-md p-4">
      Tasks
      <fetcher.Form method="POST">
        <input type="text" name="text" id="t-text" />
        <select name="state" defaultValue={1}>
          {states &&
            states.map((state) => {
              return (
                <option key={`t-state-${state.id}`} value={state.id}>
                  {state.name}
                </option>
              );
            })}
        </select>
        <button type="submit">Create Task</button>
      </fetcher.Form>
      <ul>
        {tasks &&
          tasks.map((task) => {
            return (
              <li key={`task-${task.id}`}>
                <fetcher.Form
                  method="PUT"
                  onChange={(event) =>
                    fetcher.submit(event.target.form, { method: "PUT" })
                  }
                >
                  <input type="hidden" name="id" value={task.id} />
                  <input type="text" name="text" defaultValue={task.text} />
                  <select defaultValue={task.stateId} name="state">
                    {states &&
                      states.map((state) => {
                        return (
                          <option key={`t-state-${state.id}`} value={state.id}>
                            {state.name}
                          </option>
                        );
                      })}
                  </select>
                  <button
                    type="submit"
                    onClick={(event) => {
                      event.preventDefault();
                      fetcher.submit(event.target.form, {
                        method: "DELETE",
                      });
                    }}
                  >
                    X
                  </button>
                </fetcher.Form>
              </li>
            );
          })}
      </ul>
      <pre>{JSON.stringify(tasks, null, 2)}</pre>
      <pre>{JSON.stringify(states, null, 2)}</pre>
    </div>
  );
}
