const express = require('express')
const router = express.Router()

// get all the books
router.post('/foodData', async (request, response) => {
  try {
    if (global.food_items && global.food_categories) {
      return response.json([global.food_items, global.food_categories]);
    } else {
      return response.status(500).json({ message: 'Data not available.' });
    }
  }
  catch (error) {
    console.log(error.message)
    response.status(500).send({ message: error.message })
  }
});

module.exports = router
