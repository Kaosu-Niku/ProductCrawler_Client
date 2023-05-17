import React from 'react';
import Product from './Product';

function Result({data, favorite}) {  
    let products
    //將商品資訊呈現成HTML內容
    if(data != null){
        products = data["Product"].map((x) =>  
            <Product productData={{'productShop':x.ProductShop,'productName':x.ProductName,'productPrice':x.ProductPrice,'productLink':x.ProductLink,'productImage':x.ProductImage}} favorite={favorite}/> 
        )
    }
    else{
        products = <></>
    }
    return (
        <div id="result">
            <div className="result_root flex">
                <>{products}</>
            </div>
        </div>
    );
}

export default Result;