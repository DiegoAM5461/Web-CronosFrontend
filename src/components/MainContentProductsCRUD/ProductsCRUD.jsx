import React, { useState, useEffect } from "react";
import {
  listAllProducts,
  listProductsByCategoryId,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../../services/ProductServices";
import { listAllCategories } from "../../services/CategoryService";
import "./ProductsCRUD.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const ProductsCRUD = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const [form, setForm] = useState({
    productId: "",
    nombre: "",
    descripcion: "",
    precio: "",
    disponibilidad: true,
    stock: "",
    direccionImg: "",
    idCategory: "",
  });

  // Filtros
  const [filterCategory, setFilterCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await listAllProducts();
      setProducts(response.data);
    } catch (error) {
      console.error("Error cargando los productos:", error);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await listAllCategories();
      setCategories(response.data);
    } catch (error) {
      console.error("Error cargando las categorías:", error);
    }
  };

  const handleCategoryFilter = async (categoryId) => {
    try {
      if (categoryId === "") {
        loadProducts(); // Si no hay filtro, cargar todos los productos
      } else {
        const response = await listProductsByCategoryId(categoryId);
        setProducts(response.data.products);
      }
    } catch (error) {
      console.error("Error al filtrar productos por categoría:", error);
    }
  };

  const handleSearchFilter = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
  };

  const filteredProducts = products.filter((product) =>
    product.nombre.toLowerCase().includes(searchTerm)
  );

  const clearFilters = () => {
    setFilterCategory("");
    setSearchTerm("");
    loadProducts(); // Restablece todos los productos
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setForm(
      product || {
        productId: "",
        nombre: "",
        descripcion: "",
        precio: "",
        disponibilidad: true,
        stock: "",
        direccionImg: "",
        idCategory: categories.length > 0 ? categories[0].categoryId : "",
      }
    );
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const openDeleteModal = (product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setProductToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      if (selectedProduct) {
        // Editar producto
        const response = await updateProduct(form.productId, form);
        setProducts((prev) =>
          prev.map((product) =>
            product.productId === response.data.productId
              ? response.data
              : product
          )
        );
      } else {
        // Agregar producto
        const response = await addProduct(form);
        setProducts((prev) => [...prev, response.data]);
      }
      closeModal();
    } catch (error) {
      console.error("Error guardando el producto:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(productToDelete.productId);
      setProducts((prev) =>
        prev.filter(
          (product) => product.productId !== productToDelete.productId
        )
      );
      closeDeleteModal();
    } catch (error) {
      console.error("Error eliminando el producto:", error);
    }
  };

  return (
    <div className="products-container col py-3">
      <div className="box1-header">
        <i className="fa-solid fa-bars fa-2x"></i>
        <h1> ADMINISTRADOR DE PRODUCTOS </h1>
      </div>
      <div className="container mt-4">
        <div className="filters-container mb-3 d-flex align-items-center">
          <select
            className="form-select me-2"
            value={filterCategory}
            onChange={(e) => {
              setFilterCategory(e.target.value);
              handleCategoryFilter(e.target.value);
            }}
          >
            <option value="">Todas las categorías</option>
            {categories.map((category) => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.nombreCategory}
              </option>
            ))}
          </select>
          <input
            type="text"
            className="form-control me-2"
            placeholder="Buscar por nombre"
            value={searchTerm}
            onChange={handleSearchFilter}
          />
          <button className="btn btn-secondary" onClick={clearFilters}>
            Limpiar Filtros
          </button>
        </div>
        <div className="products-actions mb-3">
          <button
            className="btn btn-primary products-add-btn"
            onClick={() => openModal(null)}
          >
            Agregar Producto
          </button>
        </div>
        <table className="table table-bordered table-hover products-table">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Disponibilidad</th>
              <th>Stock</th>
              <th>Imagen</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.productId}>
                <td>{product.productId}</td>
                <td>{product.nombre}</td>
                <td>{product.descripcion}</td>
                <td>S/ {product.precio}</td>
                <td>{product.disponibilidad ? "Sí" : "No"}</td>
                <td>{product.stock}</td>
                <td>
                  <img
                    src={product.direccionImg}
                    alt={product.nombre}
                    style={{ width: "50px" }}
                  />
                </td>
                <td>{product.nombreCategory}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => openModal(product)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => openDeleteModal(product)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal para agregar/editar */}
        {isModalOpen && (
          <div className="modal show fade d-block">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {selectedProduct ? "Editar Producto" : "Agregar Producto"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={closeModal}
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="nombre" className="form-label">
                        Nombre
                      </label>
                      <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        className="form-control"
                        value={form.nombre}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="descripcion" className="form-label">
                        Descripción
                      </label>
                      <input
                        type="text"
                        id="descripcion"
                        name="descripcion"
                        className="form-control"
                        value={form.descripcion}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="precio" className="form-label">
                        Precio
                      </label>
                      <input
                        type="number"
                        id="precio"
                        name="precio"
                        className="form-control"
                        value={form.precio}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="direccionImg" className="form-label">
                        Dirección de la Imagen
                      </label>
                      <input
                        type="text"
                        id="direccionImg"
                        name="direccionImg"
                        className="form-control"
                        value={form.direccionImg}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="stock" className="form-label">
                        Stock
                      </label>
                      <input
                        type="number"
                        id="stock"
                        name="stock"
                        className="form-control"
                        value={form.stock}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="idCategory" className="form-label">
                        Categoría
                      </label>
                      <select
                        id="idCategory"
                        name="idCategory"
                        className="form-select"
                        value={form.idCategory}
                        onChange={handleChange}
                      >
                        <option value="">Seleccionar una categoría</option>
                        {categories.map((category) => (
                          <option
                            key={category.categoryId}
                            value={category.categoryId}
                          >
                            {category.nombreCategory}
                          </option>
                        ))}
                      </select>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeModal}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSave}
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal para eliminar */}
        {isDeleteModalOpen && (
          <div className="modal show fade d-block">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirmar Eliminación</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={closeDeleteModal}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>
                    ¿Estás seguro de que deseas eliminar el producto{" "}
                    <strong>{productToDelete?.nombre}</strong>?
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeDeleteModal}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleDelete}
                  >
                    Confirmar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
