import React from 'react';
import Product from './Product';

function Favorite({favorite}) {  
    let products
    //將商品資訊呈現成HTML內容
    if(favorite.favoriteData["Product"] != null){
        products = favorite.favoriteData["Product"].map((x) =>
            <Product productData={{'productShop':x.productShop,'productName':x.productName,'productPrice':x.productPrice,'productLink':x.productLink,'productImage':x.productImage}} favorite={favorite}/> 
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

export default Favorite;