// controllers/addonController.js
const Addon = require('../models/Addon');

exports.createAddon = async (req, res) => {
  try {
    const addon = await Addon.query().insert(req.body);
    res.status(201).json(addon);
  } catch (err) {
    res.status(400).json({ message: 'Error creating addon', error: err.message });
  }
};

exports.getAllAddons = async (req, res) => {
  try {
    const addons = await Addon.query();
    res.status(200).json(addons);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching addons', error: err.message });
  }
};

exports.getAddonById = async (req, res) => {
  try {
    const addon = await Addon.query().findById(req.params.id);
    if (!addon) return res.status(404).json({ message: 'Addon not found' });
    res.status(200).json(addon);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching addon', error: err.message });
  }
};

exports.updateAddon = async (req, res) => {
  try {
    const updated = await Addon.query().patchAndFetchById(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Addon not found' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Error updating addon', error: err.message });
  }
};

exports.deleteAddon = async (req, res) => {
  try {
    const rows = await Addon.query().deleteById(req.params.id);
    if (!rows) return res.status(404).json({ message: 'Addon not found' });
    res.status(200).json({ message: 'Addon deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting addon', error: err.message });
  }
};
