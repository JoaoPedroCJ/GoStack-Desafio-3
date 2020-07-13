import React, { useState, useEffect } from "react";

import "./styles.css";

import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(
      ({ data }) => {
        setRepositories(data);
      }
    )
  }, []);

  async function handleAddRepository() {
    const project = {
      url: "https://github.com/JoaoPedroCJ",
      title: `Desafio ReactJS ${Date.now()}`,
      techs: ["React", "Node.js"],
    }

    const { data } = await api.post('repositories', project);

    setRepositories([...repositories, data]);
  }

  async function handleRemoveRepository(id) {
    const repositoryIndex = repositories.findIndex(project => project.id === id);

    if (repositoryIndex < 0) {
      return;
    }

    const filteredRepositories = repositories;

    repositories.splice(repositoryIndex, 1);

    setRepositories([...filteredRepositories]);

    await api.delete(`/repositories/${id}`);

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>{repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
