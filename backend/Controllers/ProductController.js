 const Product = require('../models/ProductModel');


exports.getProducts = async (req, res) => {
  try {
    const {
      pagination = 1,
      limit = 12,
      search = "",
      category = "All"
    } = req.query;

    const page = Number(pagination);
    const limitNum = Number(limit);
    const skip = (page - 1) * limitNum;

    let query = {};

    // ✅ SEARCH FIX
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    // ✅ CATEGORY FILTER
    if (category && category !== "All") {
      query.category = category;
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
      category:category,
    });

  } catch (error) {
    console.log('Fetch get products Not Founds!', error);
    res.status(500).json({ message: 'Fetch get products Not Founds!', error: error.message })
  }
}


exports.getCategories=async(req,res)=>{
  try {
    const categories=await Product.distinct("category");
    res.status(200).json(['All',...categories]);
  } catch (error) {
    console.log('error in controller in getCategory');
    
    res.status(500).json({message:'error in getCategories in controller',error:error.message});
  }
}