async function addName() {
  const name = document.getElementById('nameInput').value;
  if (!name) return;

  const res = await fetch('/names', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ name })
  });

  const data = await res.json();
  document.getElementById('helloMessage').innerText = `HELLO ${data.name}`;
  document.getElementById('nameInput').value = '';
  loadNames();
}

async function deleteName(id) {
  await fetch(`/names/${id}`, { method: 'DELETE' });
  loadNames();
}

async function loadNames() {
  const res = await fetch('/names');
  const names = await res.json();

  const nameList = document.getElementById('nameList');
  nameList.innerHTML = '';

  names.forEach((entry) => {
    const li = document.createElement('li');
    li.textContent = entry.name;
    const btn = document.createElement('button');
    btn.innerText = 'X';
    btn.onclick = () => deleteName(entry.id);
    li.appendChild(btn);
    nameList.appendChild(li);
  });
}

window.onload = loadNames;
