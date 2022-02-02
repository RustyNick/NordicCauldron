import React from "react";

const Productpage = (item) => {
    return (

        <div>
            <h2>
                this is the product page
            </h2>
            <button onClick={() => console.log(item)}>
                click me
            </button>
        </div>
    );
}

export default Productpage;
