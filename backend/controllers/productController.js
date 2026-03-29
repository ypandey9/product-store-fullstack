const Product=require("../models/Product");

exports.getProducts=async(req,res)=>{
    try {
        const page=parseInt(req.query.page) || 1;
        const limit=parseInt(req.query.limit) || 5;
        const skip=(page-1)*limit;

        const filter={};
        if(req.query.search) {
            filter.name={
                $regex:req.query.search,
                $options:"i"
            };
        }

        let sort={};
        if(req.query.sort==="price") sort.price=1;
        if(req.query.sort==="-price") sort.price=-1;

        const products=await Product.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit);

        const total=await Product.countDocuments(filter);
        res.json({page,total,products});

    } catch(err) {

        res.status(500).json({message:"Server error"});

    }
};

exports.createProduct=async(req,res)=>{
 try {
    const { name,price,category }=req.body;

    const product=await Product.create({
        name,
        price,
        category
    });

    res.json(product);
 } catch(err) {
    res.status(500).json({message:"Error creating product"});
 }
};

exports.updateProduct = async (req, res) => {
  try {

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // VERY IMPORTANT
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updatedProduct);

  } catch (err) {
    res.status(500).json({ message: "Error updating product" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {

    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted" });

  } catch (err) {
    res.status(500).json({ message: "Error deleting product" });
  }
};