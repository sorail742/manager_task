const Task = require('../models/Task');

// Créer une tâche
exports.createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const task = new Task({
      title,
      description,
      status,
      createdBy: req.user.id
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Récupérer les tâches
exports.getTasks = async (req, res) => {
  try {
    let tasks;
    if (req.user.role === 'admin') {
      tasks = await Task.find().populate('createdBy', 'name email');
    } else {
      tasks = await Task.find({ createdBy: req.user.id });
    }
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Mettre à jour une tâche
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: 'Tâche non trouvée' });

    if (req.user.role !== 'admin' && task.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Accès interdit' });
    }

    Object.assign(task, req.body);
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Supprimer une tâche
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: 'Tâche non trouvée' });

    if (req.user.role !== 'admin' && task.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Accès interdit' });
    }

    await task.deleteOne();
    res.json({ message: 'Tâche supprimée' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
