import React, { useState, useEffect } from "react";
import { ContItemsShow } from "./ContItemsShow";

// PedidosCartaShow.jsx
export const PedidosCartaShow = ({ categories }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCategories = categories.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="pedidos-carta">
      <div className="pagination">
        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page + 1}
            className={`page-btn ${currentPage === page + 1 ? "active" : ""}`}
            onClick={() => paginate(page + 1)}
          >
            {page + 1}
          </button>
        ))}
      </div>
      <div className="carta-contentShow">
        <div className="carta-productsShow">
          {currentCategories.map((categoryId) => (
            <ContItemsShow key={categoryId} categoryId={categoryId} />
          ))}
        </div>
      </div>
    </div>
  );
};
