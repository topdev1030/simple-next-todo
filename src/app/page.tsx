import { TodoList } from '@/components/todos';

export default function Home() {
  return (
    <main className="flex flex-col gap-10 p-10">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold"> Welcome to Full Stack Engineer Assessment</h1>
      </div>
      <TodoList />
    </main>
  );
}
