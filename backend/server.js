const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('./models');
const path = require('path');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

db.sequelize.sync().then(() => {
  console.log('Database synced');
}).catch((err) => {
  console.error('Error syncing database:', err);
});

app.get('/', (req, res) => {
  res.send('Hello World');
});

const propertyRoutes = require('./routes/propertyRoutes');
app.use('/api/properties', propertyRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
