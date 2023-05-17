function Header() {
    return (
    <div id="header">
        <div className="header_root flex">
            <img className="header_item_img_icon" src="/asset/icon.png" alt="icon"/>
            <p className="header_item_name">第三組</p>
            <div className="header_item_div"></div>
            <img className="header_item_img_user" src="/asset/user.png" alt="user"/>
            <button className="header_item_login">登入</button>
            <button className="header_item_register">註冊</button>                       
        </div>
    </div>
    );
}

export default Header;