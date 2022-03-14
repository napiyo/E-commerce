class ApiFeatures{
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }
     // search product by name
    search(){
            const keyword = this.queryStr.keyword ? {
                name:{
                    $regex : this.queryStr.keyword,
                    $options:'i',
                }
            }
            :{};
   
            this.query = this.query.find({...keyword});
       
            return this;
    }

    // filter
    filter(){
        //category wise
        const category = this.queryStr.category;
        if(category){

            this.query  = this.query.find({category});
        }
        // price wise
        let price = this.queryStr.price;
        if(price){

            price = JSON.stringify(price);
            price = price.replace(/\b(gt|lt|gte|lte)\b/g,key => `$${key}`);
            price=JSON.parse(price);
            this.query = this.query.find({price,category}); 
        }
        // }
        
        return this;

    }
    //pagition
    pagination(resultPerPage){
       
        let currentPage = this.queryStr.page || 1;
        
        if(currentPage<1){ currentPage == 1 };
        
        const skip = resultPerPage * (currentPage -1);
        
        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;


    }
    

}
module.exports = ApiFeatures;