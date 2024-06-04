import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "..";

const Pages = observer(() => {
    const { product } = useContext(Context);
    const pageCount = Math.ceil(product.totalCount / product.limit);
    const pages = [];

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1);
    }

    const styles = `
        .pagination-container {
            display: flex;
            justify-content: center;
            align-items: center;
            list-style: none;
            padding: 0;
            margin-top: 20px;
        }

        .pagination-item {
            margin: 0 5px;
            padding: 5px 10px;
            border: 1px solid #ccc;
            border-radius: 3px;
            cursor: pointer;
            background-color: #f8f9fa;
        }

        .pagination-item.active {
            background-color: #808080;
            color: #fff;
        }
    `;

    return (
        <>
            <style>{styles}</style>
            <ul className="pagination-container">
                {pages.map(page =>
                    <li
                        key={page}
                        className={`pagination-item ${product.page === page ? 'active' : ''}`}
                        onClick={() => product.setPage(page)}
                    >
                        {page}
                    </li>
                )}
            </ul>
        </>
    )
});

export default Pages;
