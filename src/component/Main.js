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
    }
    //todo 搜尋中提示文字
    const [hintText, setHintText] = useState(null)
    //todo 頁面主體對照JSX元件
    let content = [
        <><Search search={requestProductData} /><p className="content_hint_text">{ hintText }</p><Result data={productData} favorite={favorite} /></>,
        <><Favorite favorite={favorite} /></>
    ]
    //todo 與伺服器請求商品資訊(json格式)(參數填入欲搜索的商品名稱)
    // 該方法需傳遞給Search元件，Search元件改變值，實現搜尋功能，顯示搜尋中提示
    function requestProductData(searchKeyword) {
        
        setHintText('搜尋中，請耐心等待...') //顯示提示文字

        let data = { "Product": [] } //商品資訊範例
        
        let requestList = [] // 商品請求列表
        if (checkMomo === true) {
            let momoRequest = fetch('https://product-crawler-server.fly.dev/search/momo/keyword=' + searchKeyword).then((d) => d.json()).then((d) => {
                d["Product"].forEach((dd) => {
                    data["Product"].push(dd)
                })
            })
            requestList.push(momoRequest)
        }
        if (checkPChome === true) {
            let pchomeRequest = fetch('https://product-crawler-server.fly.dev/search/pchome/keyword=' + searchKeyword).then((d) => d.json()).then((d) => {
                d["Product"].forEach((dd) => {
                    data["Product"].push(dd)
                })
            })
            requestList.push(pchomeRequest)
        }
        if (checkYahoo === true) {
            let yahooRequest = fetch('https://product-crawler-server.fly.dev/search/yahoo/keyword=' + searchKeyword).then((d) => d.json()).then((d) => {
                d["Product"].forEach((dd) => {
                    data["Product"].push(dd)
                })
            })
            requestList.push(yahooRequest)
        }
        // 在發送所有的request後，等待所有的response都回傳後才執行過濾商品資料的動作
        Promise.all(requestList).then((a) => {
            setHintText(null)
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