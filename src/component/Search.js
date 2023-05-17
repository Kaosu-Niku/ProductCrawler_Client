import { useState } from "react";

function Search({search}) {
    const [searchKeyword , setSearchKeyword] = useState(null);
    return (
    <div id="search">
        <div className="search_root flex">
            <input className="search_item_input" value={searchKeyword} onChange={(event) => { setSearchKeyword(event.target.value) }}></input>
            <button className="search_item_button" onClick={() => { search(searchKeyword) }}>
                <img className="search_item_img" src="/asset/search.png" alt="search"/>
            </button>
        </div>
    </div>
    );
}

export default Search;