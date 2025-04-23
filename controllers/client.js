const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../clients.json');

const readData = () => JSON.parse(fs.readFileSync(dataPath));
const writeData = (data) => fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

exports.getClients = (req, res) => {
  const clients = readData();
  res.json(clients);
};

exports.getClient = (req, res) => {
  const clients = readData();
  const client = clients.find(c => c.id === parseInt(req.params.id));
  if (!client) return res.status(404).json({ message: 'Client non trouvé' });
  res.json(client);
};

exports.createClient = (req, res) => {
  const clients = readData();
  const newClient = {
    id: clients.length > 0 ? Math.max(...clients.map(c => c.id)) + 1 : 1,
    ...req.body
  };
  clients.push(newClient);
  writeData(clients);
  res.status(201).json(newClient);
};

exports.updateClient = (req, res) => {
  const clients = readData();
  const index = clients.findIndex(c => c.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Client non trouvé' });
  
  clients[index] = { ...clients[index], ...req.body };
  writeData(clients);
  res.json(clients[index]);
};

exports.deleteClient = (req, res) => {
  let clients = readData();
  clients = clients.filter(c => c.id !== parseInt(req.params.id));
  writeData(clients);
  res.status(204).send();
};
