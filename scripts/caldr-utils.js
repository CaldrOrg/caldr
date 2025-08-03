


export function exportCaldrProject(projectData) {
  const dataStr = JSON.stringify(projectData, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `${projectData.project?.name || "caldr_project"}.caldr.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export function importCaldrProject(callback) {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".json";

  input.onchange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target.result);
        callback(json);
      } catch (err) {
        alert("Invalid Caldr project file.");
      }
    };
    reader.readAsText(file);
  };

  input.click();
}

export function exportCurrentModule(data, moduleName, projectMeta = {}) {
  const wrapper = {
    project: projectMeta,
    modules: {
      [moduleName]: data
    }
  };
  exportCaldrProject(wrapper);
}