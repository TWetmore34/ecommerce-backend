const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const { bulkCreate } = require('../../models/Product');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }]
    })
    res.status(200).json(tagData)
  }
  catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
    })
    res.status(200).json(tagData)
  }
  catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  Tag.create(req.body)
    .then((tag) => {
      if (req.body.products.length) {
        const productTagIdArr = req.body.products.map((product) => {
          return {
            tag_id: tag.id,
            product_id: product,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      res.status(200).json(tag);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const changedTag = await Tag.update(req.body, { where: { id: req.params.id } })
    res.status(200).json(changedTag)
  }
  catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleted = await Tag.destroy({ where: { id: req.params.id } })
    res.status(200).json(deleted)
  }
  catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
