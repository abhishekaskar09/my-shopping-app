 const Product = require('../models/ProductModel');


exports.getProducts = async (req, res) => {
  try {
    const {
      pagination = 1,
      limit = 12,
      search = "",
   
    } = req.query;

    const page = Number(pagination);
    const limitNum = Number(limit);
    const skip = (page - 1) * limitNum;

    let query = {};

    // ✅ SEARCH FIX
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

  

    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);
      

    const totalProducts = await Product.countDocuments(query);

    res.status(200).json({
      products,
      totalProducts,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limitNum),
      search:search,
     });

  } catch (error) {
    console.log('Fetch get products Not Founds!', error);
    res.status(500).json({ message: 'Fetch get products Not Founds!', message: error.message })
  }
}

 