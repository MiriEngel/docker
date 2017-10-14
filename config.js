module.exports = {
  db: {
       production: "mongodb://"+process.env.MONGODB_ADDRESS+":27017/product_Tweet",
      development: "mongodb://mongodb:27017/Tweet",
  }
};
