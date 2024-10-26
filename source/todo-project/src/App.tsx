import { useMemo } from "react";
import { Container } from "./components/Container";
import { Content } from "./components/Content";
import { Filters } from "./components/Filters";
import { Form } from "./components/Form";
import { Item } from "./components/Item";
import { List } from "./components/List";
import { useLocalStorage } from "usehooks-ts";

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

export function App() {
  const [lista, setLista] = useLocalStorage<Todo[]>("tarefas", []);
  const [filter, setFilter] = useLocalStorage<"all" | "completed" | "uncompleted">("filtro", "all");

  const addTask = (task: string) => {
    setLista([
      ...lista,
      { id: Date.now().toString(), text: task, completed: false }
    ]);
  };

  const clearAllTasks = () => {
    setLista([]);
  };

  const listaFiltrada = useMemo(() => {
    if (filter === "all") {
      return lista;
    }
    if (filter === "completed") {
      return lista.filter((item) => item.completed);
    }
    return lista.filter((item) => !item.completed);
  }, [lista, filter]);

  return (
    <Container>
      <Content>
        <h1 className="text-gray-900 text-3xl font-bold mb-6 text-center tracking-tight">TODO - LIST - RAUL COSTA</h1>
        <Form onSubmit={addTask} />
        <Filters filter={filter} setFilter={setFilter} />
        <button 
          className="mt-4 p-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-md transition-all duration-150 transform hover:scale-105 focus:outline-none"
          onClick={clearAllTasks}
        >
          Limpar tarefas
        </button>
        <List>
          {listaFiltrada.map((item) => (
            <Item
              key={item.id}
              text={item.text}
              completed={item.completed}
              onClick={() => {
                setLista(lista.map((itemX) => {
                  if (itemX.id === item.id) {
                    return { ...itemX, completed: !itemX.completed };
                  }
                  return itemX;
                }));
              }}
            />
          ))}
        </List>
      </Content>
    </Container>
  );
}
