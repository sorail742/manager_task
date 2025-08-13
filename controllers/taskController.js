const Task = require('../models/Task');

// 📌 Création
exports.createTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📌 Modification
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!task) return res.status(404).json({ message: 'Tâche non trouvée' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📌 Suppression
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Tâche non trouvée' });
    res.json({ message: 'Tâche supprimée' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📌 Liste avec pagination + filtres + tri
exports.listTasks = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      priority,
      status,
      sort = 'createdAt',
      order = 'desc'
    } = req.query;

    // Filtrage
    const filter = {};
    if (priority) filter.priority = priority;
    if (status) filter.status = status;


    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Tri
    const sortObj = { [sort]: order === 'asc' ? 1 : -1 };

    const [items, total] = await Promise.all([
      Task.find(filter)
        .sort(sortObj)
        .skip(skip)
        .limit(parseInt(limit))
        .populate('assignedTo', 'name email'),
      Task.countDocuments(filter)
    ]);

    res.json({
      total,
      page: parseInt(page),
      perPage: parseInt(limit),
      items
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
