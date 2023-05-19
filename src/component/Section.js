import { useState } from "react";

function Section({setting}) {

    return (
    <div id="section">
        <div className="section_root">
            <div className="section_item_div"></div>
            <h1 className="section_item_h1">搜索條件</h1>
            <div className="section_shop_item flex">
                <img className="section_item_img_shop" src="/asset/shop.png" alt="shop"/>
                <h2 className="section_item_h2">商店選擇</h2>
            </div>
            <div className="section_shop_item flex">
                <input className="section_shop_item_input" checked={setting.checkMomo} type="checkbox" onChange={(event) => { setting.setCheckMomo(event.target.checked);  }}></input>
                <img className="section_shop_item_img" src="/asset/momo.png" alt="icon"/>
                <p className="section_shop_item_text">momo購物網</p>
            </div>
            <div className="section_shop_item flex">
                <input className="section_shop_item_input" checked={setting.checkPChome} type="checkbox" onChange={(event) => { setting.setCheckPChome(event.target.checked); }}></input>
                <img className="section_shop_item_img" src="/asset/pchome.jpg" alt="icon"/>
                <p className="section_shop_item_text">PChome</p>
            </div>            
            <div className="section_shop_item flex">
                <input className="section_shop_item_input" checked={setting.checkYahoo} type="checkbox" onChange={(event) => { setting.setCheckYahoo(event.target.checked); }}></input>
                <img className="section_shop_item_img" src="/asset/yahoo.jpg" alt="icon"/>
                <p className="section_shop_item_text">Yahoo購物網</p>
            </div>
            <div className="section_shop_item flex">
                <img className="section_item_img_money" src="/asset/money.png" alt="money"/>
                <h2 className="section_item_h2">價格區間</h2>
            </div>
            <div className="section_price_item flex">
                <p> $ </p>
                <input className="section_price_item_input" type="number" value={setting.lowPrice} onChange={(event) => { setting.setLowPrice(Number(event.target.value)); }}></input>
                <p> 元 </p>
                <p> ~ </p>
                <p> $ </p>
                <input className="section_price_item_input" type="number" value={setting.highPrice} onChange={(event) => { setting.setHighPrice(Number(event.target.value));  }}></input>
                <p> 元 </p>
            </div> 
            <div className="section_shop_item flex">
                <img className="section_item_img_sort" src="/asset/sort.png" alt="sort"/>
                <h2 className="section_item_h2">排序</h2>
            </div>
            <div className="section_shop_item flex">
                <input className="section_shop_item_input" checked={setting.sort === 0} type="radio" name="sort" onChange={(event) => { setting.setSort(0) }}></input>
                <p className="section_shop_item_text">不排序</p>
            </div>
            <div className="section_shop_item flex">
                <input className="section_shop_item_input" checked={setting.sort === 1} type="radio" name="sort" onChange={(event) => { setting.setSort(1) }}></input>
                <p className="section_shop_item_text">價格由低至高</p>
            </div>
            <div className="section_shop_item flex">
                <input className="section_shop_item_input" checked={setting.sort === 2} type="radio" name="sort" onChange={(event) => { setting.setSort(2) }}></input>
                <p className="section_shop_item_text">價格由高至低</p>
            </div>
            <div className="section_shop_item flex">
                <h2 className="section_item_h2">測試用</h2>
            </div>
            <div className="section_shop_item flex">
                <input className="section_shop_item_input" checked={setting.test} type="checkbox" onChange={(event) => { setting.setTest(event.target.checked); }}></input>
                <p className="section_shop_item_text">此選項為固定的商品表單，方便察看與測試</p>
            </div>
            <div className="section_item_div"></div>       
        </div>
    </div>
    );
}

export default Section;