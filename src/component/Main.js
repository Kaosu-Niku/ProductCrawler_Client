import React from 'react';
import { useState } from "react";
import Sidebar from './Sidebar';
import Search from './Search';
import Result from './Result';
import Favorite from './Favorite';
import Section from './Section';

function Main() {
    //todo 頁面主體資訊
    // 該變數需傳遞給Sidebar元件，Sidebar元件改變值來，實現切換頁面主體功能
    const [contentIndex, setContentIndex] = useState(0)
    //todo 商品資訊
    // 該變數需傳遞給Result元件，Result元件讀取變數值以呈現商品資訊
    const [productData, setProductData] = useState({ "Product": [] })
    //todo 收藏商品資訊
    // 該變數需傳遞給Favorite元件和Result元件，Result元件改變值，Favorite元件讀取變數值以呈現收藏商品資訊
    const [favoriteData, setFavoriteData] = useState({ "Product": [] })
    let favorite = {
        favoriteData: favoriteData,
        setFavoriteData: setFavoriteData
    }
    //todo 搜尋設定值
    // 該變數需傳遞給Section元件，Section元件改變值，實現商品資訊過濾功能
    // 以下變數打包成一個object方便使用(setting)
    const [checkMomo, setCheckMomo] = useState(true)
    const [checkPChome, setCheckPChome] = useState(true)
    const [checkYahoo, setCheckYahoo] = useState(true)
    const [lowPrice, setLowPrice] = useState(0)
    const [highPrice, setHighPrice] = useState(1000)
    const [sort, setSort] = useState(0) // 類型為int 0:不排序 1:價格低到高 2:價格高到低
    const [test, setTest] = useState(false) //! 測試用
    let setting = {
        checkMomo: checkMomo,
        setCheckMomo: setCheckMomo,
        checkPChome: checkPChome,
        setCheckPChome: setCheckPChome,
        checkYahoo: checkYahoo,
        setCheckYahoo: setCheckYahoo,
        lowPrice: lowPrice,
        setLowPrice: setLowPrice,
        highPrice: highPrice,
        setHighPrice: setHighPrice,
        sort: sort,
        setSort: setSort,
        test: test, //! 測試用
        setTest: setTest //! 測試用
    }
    //todo 頁面主體對照JSX元件
    let content = [
        <><Search search={requestProductData} /><Result data={productData} favorite={favorite} /></>,
        <><Favorite favorite={favorite} /></>
    ]
    //todo 與伺服器請求商品資訊(json格式)(參數填入欲搜索的商品名稱)
    // 該方法需傳遞給Search元件，Search元件改變值，實現搜尋功能
    function requestProductData(searchKeyword) {
        
        let data = { "Product": [] } //商品資訊範例
        
        let requestList = [] // 商品請求列表
        if (checkMomo === true) {
            let momoRequest = fetch('/search/momo/keyword=' + searchKeyword).then((d) => d.json()).then((d) => {
                d["Product"].forEach((dd) => {
                    data["Product"].push(dd)
                })
            })
            requestList.push(momoRequest)
        }
        if (checkPChome === true) {
            let pchomeRequest = fetch('/search/pchome/keyword=' + searchKeyword).then((d) => d.json()).then((d) => {
                d["Product"].forEach((dd) => {
                    data["Product"].push(dd)
                })
            })
            requestList.push(pchomeRequest)
        }
        if (checkYahoo === true) {
            let yahooRequest = fetch('/search/yahoo/keyword=' + searchKeyword).then((d) => d.json()).then((d) => {
                d["Product"].forEach((dd) => {
                    data["Product"].push(dd)
                })
            })
            requestList.push(yahooRequest)
        }
        if(test === true) { //! 測試用
            data = {
                "Product":[
                    {
                        "ProductShop": 'test',
                        "ProductName": 'product01',
                        "ProductPrice": 1000,
                        "ProductLink": 'http://.com/product01',
                        "ProductImage": 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Solid_red.svg/512px-Solid_red.svg.png?20150316143248'
                    },
                    {
                        "ProductShop": 'test',
                        "ProductName": 'product02',
                        "ProductPrice": 800,
                        "ProductLink": 'http://.com/product02',
                        "ProductImage": 'https://cdn11.bigcommerce.com/s-3uewkq06zr/images/stencil/1280x1280/products/146/385/lemon_yellow__63669.1494606073.png?c=2'
                    },
                    {
                        "ProductShop": 'test',
                        "ProductName": 'product03',
                        "ProductPrice": 900,
                        "ProductLink": 'http://.com/product02',
                        "ProductImage": 'https://www.travelandleisure.com/thmb/KTIha5CLifSoUD3gx0YP51xc3rY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/blue0517-4dfc85cb0200460ab717b101ac07888f.jpg'
                    }
                ]
            }
            let newData = filterProductData(data)
            setProductData(newData)
        }
        // 在發送所有的request後，等待所有的response都回傳後才執行過濾商品資料的動作
        Promise.all(requestList).then((a) => {
            let newData = filterProductData(data)
            setProductData(newData)
        })
    }
    //todo 根據搜尋設定過濾商品資料
    function filterProductData(product) {
        let newData = { "Product": [] }
        // 重新列出符合價格範圍的商品
        product["Product"].forEach(x => {
            let need = true
            if (x.ProductPrice < lowPrice || x.ProductPrice > highPrice)
                need = false
            if (need === true) {
                newData["Product"].push({
                    "ProductShop": x.ProductShop,
                    "ProductName": x.ProductName,
                    "ProductPrice": x.ProductPrice,
                    "ProductLink": x.ProductLink,
                    "ProductImage": x.ProductImage
                })
            }
        })
        // 重新排列商品順序
        switch(sort){
            case 1:
                function compireA(a,b){
                    if(a.ProductPrice < b.ProductPrice)
                        return -1
                    if(a.ProductPrice > b.ProductPrice)
                        return 1
                    return 0
                }
                newData["Product"].sort(compireA);
                break;
            case 2:
                function compireB(a,b){
                    if(a.ProductPrice > b.ProductPrice)
                        return -1
                    if(a.ProductPrice < b.ProductPrice)
                        return 1
                    return 0
                }
                newData["Product"].sort(compireB);
                break;
            default:
                break;
        }

        return newData
    }
    return (
        <div id="main">
            <div className="main_root flex">
                <Sidebar setContentIndex={setContentIndex} />
                <div id="content">
                    <div className="content_root flex">
                        {content[contentIndex]}
                    </div>
                </div>
                <Section setting={setting} />
            </div>
        </div>
    );
}

export default Main;