const express = require('express');
const db = require('../models');
const router = express.Router();
const upload = require('../middleware/upload');

// Get all properties
router.get('/', async (req, res) => {
    try {
        const properties = await db.Property.findAll();
        console.log('Fetched properties:', properties); // Log properties
        res.json(properties);
    } catch (err) {
        console.error('Error fetching properties:', err);
        res.status(500).json({ message: err.message });
    }
});

// Create a property
router.post('/', upload, async (req, res) => {
    try {
        const { title, description, price, type, address } = req.body;
        const thumbnail = req.files['thumbnail'] ? req.files['thumbnail'][0].filename : null;
        const gallery = req.files['gallery'] ? req.files['gallery'].map(file => file.filename) : [];

        const property = await db.Property.create({
            title,
            description,
            price,
            type,
            address,
            thumbnail,
            gallery,
        });

        console.log('Created property:', property); // Log new property
        res.status(201).json(property);
    } catch (err) {
        console.error('Error creating property:', err);
        res.status(400).json({ message: err.message });
    }
});

// Update a property
router.put('/:id', upload, async (req, res) => {
    try {
        const property = await db.Property.findByPk(req.params.id);
        if (!property) return res.status(404).json({ message: 'Property not found' });

        const { title, description, price, type, address } = req.body;
        const thumbnail = req.files['thumbnail'] ? req.files['thumbnail'][0].filename : property.thumbnail;
        const gallery = req.files['gallery'] ? req.files['gallery'].map(file => file.filename) : property.gallery;

        property.title = title;
        property.description = description;
        property.price = price;
        property.type = type;
        property.address = address;
        property.thumbnail = thumbnail;
        property.gallery = gallery;

        await property.save();
        console.log('Updated property:', property); // Log updated property
        res.json(property);
    } catch (err) {
        console.error('Error updating property:', err);
        res.status(400).json({ message: err.message });
    }
});

// Delete a property
router.delete('/:id', async (req, res) => {
    try {
        const property = await db.Property.findByPk(req.params.id);
        if (!property) return res.status(404).json({ message: 'Property not found' });

        await property.destroy();
        console.log('Deleted property:', property); // Log deleted property
        res.json({ message: 'Property deleted' });
    } catch (err) {
        console.error('Error deleting property:', err);
        res.status(500).json({ message: err.message });
    }
});


// Get a single property
router.get('/:id', async (req, res) => {
    try {
      const property = await db.Property.findByPk(req.params.id);
      if (!property) return res.status(404).json({ message: 'Property not found' });
      res.json(property);
    } catch (err) {
      console.error('Error fetching property:', err);
      res.status(500).json({ message: err.message });
    }
  });



module.exports = router;
