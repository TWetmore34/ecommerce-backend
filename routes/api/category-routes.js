// Done!

const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryInfo = await Category.findAll({
      include: [{ model: Product }]
    }) 
    res.status(200).json(categoryInfo)
  }
  catch (err){
    res.status(400).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryInfo = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    })
    res.status(200).json(categoryInfo)
  }
  catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  try {
    const newCategory = await req.body;
    Category.create(newCategory);
    res.status(201).json(newCategory)
  }
  catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateMe = await Category.findByPk(req.params.id)
    const categoryUpdate = await req.body;
    updateMe.update(categoryUpdate);
    res.status(200).json(categoryUpdate)
  }
  catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleteMe = await Category.findByPk(req.params.id);
    deleteMe.destroy()
    res.status(200).json('deleted!')
  }
  catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
