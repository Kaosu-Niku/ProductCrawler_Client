function Sidebar({setContentIndex}) {
    return (
    <div id="sidebar">
        <div className="sidebar_root flex">
            <div className="sidebar_item_div flex">
                <div className="sidebar_item_space"></div>
            </div>
            <div className="sidebar_item_div flex">
                <button className="sidebar_item_button flex" onClick={() => { setContentIndex(0) }}>
                    <img className="sidebar_item_img" src="/asset/home.png" alt="home"/>
                    <p className="sidebar_item_text">首頁</p>
                </button>
            </div>
            <div className="sidebar_item_div flex">
                <button className="sidebar_item_button flex" onClick={() => { setContentIndex(1) }}>
                    <img className="sidebar_item_img" src="/asset/favorite.png" alt="favorite"/>
                    <p className="sidebar_item_text">收藏</p>
                </button>
            </div>        
        </div>        
    </div>
    );
}

export default Sidebar;