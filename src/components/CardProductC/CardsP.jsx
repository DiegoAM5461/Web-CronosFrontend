import './CardsP.css'

export const CardsP = ({direccion, tagDireccion,nombre,precio}) => {
  return (
    <>
      <div className="card-product">
        <div className="container-img">
          <img src={direccion} alt={tagDireccion} />
          <span className="discount"></span>
        </div>
        <br />
        <div className="content-card-product">
          <div className="stars">
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-regular fa-star"></i>
          </div>
          <h3>{nombre}</h3>
          <span className="add-cart">
            <i className="fa-solid fa-basket-shopping"></i>
          </span>
          <p className="price">{precio}<span></span>
          </p>
        </div>
      </div>
    </>
  )
}
