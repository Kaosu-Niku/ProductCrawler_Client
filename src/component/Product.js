import React from 'react';
import { useState } from "react";

function Product({productData,favorite}) {

    //初始確認該商品是否是已收藏商品(fav)
    let fav = false
    let f = {...favorite.favoriteData}
    let dataIndex = -1
    f["Product"].forEach((x) => {
        if(x.productLink === productData.productLink){
            dataIndex = f["Product"].indexOf(x)
            fav = true
        }
    })

    const [favimg, setFavimg] = useState(() => { if(fav === true) return '/asset/favorite.png'; else return '/asset/notfavorite.png' })

    return (
        <div id="product">
            <div className="product_root">
                <div className="product_flex flex">
                    <img className="product_image" src={productData["productImage"]} alt="ProductImage"></img>
                    <p className="product_shop">{productData["productShop"]}</p>
                    <p className="product_name">{productData["productName"]}</p>
                    <div className="product_price_flex flex">
                        <p>{'價格$'}</p>
                        <p>{productData["productPrice"]}</p>
                    </div>
                    <a href={productData["productLink"]} target="_blank" rel="noreferrer">{'商品連結'}</a>
                </div>
                <div className="product_favorite_position">
                    <button className="product_favorite" onClick={() => { 
                        if(fav === false){
                            // 該商品未加入收藏，將此商品加入收藏
                            setFavimg('/asset/favorite.png')
                            f["Product"].push(productData)
                            favorite.setFavoriteData(f)
                            fav = true
                        }
                        else{
                            // 該商品已加入收藏，將此商品移出收藏
                            setFavimg('/asset/notfavorite.png')
                            if(dataIndex > -1){
                                f["Product"].splice(dataIndex,1)
                            }   
                            favorite.setFavoriteData(f)
                            fav = false
                        }
                    }}>
                        <img className="product_favorite_img" src={favimg} alt="favorite"/>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Product;