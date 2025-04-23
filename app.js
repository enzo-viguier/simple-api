const express = require('express');
const clientRoutes = require('./routes/client');

const app = express();
app.use(express.json());

app.use('/api/clients', clientRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
