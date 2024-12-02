import 'bootstrap/dist/css/bootstrap.min.css';

export const CardsP = ({ direccion, nombre }) => {
  return (
    <div className="card h-100 border-0 shadow rounded-3 position-relative">
      {/* Etiqueta de Oferta */}
      <div className="position-absolute top-0 start-0 bg-danger text-white px-3 py-1 rounded-end shadow">
        Mas Vendidos 🔥
      </div>

      {/* Imagen */}
      <img
        src={direccion}
        alt={nombre}
        className="card-img-top rounded-top"
        style={{ height: '200px', objectFit: 'cover' }}
      />

      {/* Contenido */}
      <div className="card-body text-center">
        <h5 className="card-title fw-bold">{nombre}</h5>
        <p className="card-text text-muted">
          Deliciosa opción para disfrutar. ¡Prueba ya!
        </p>
        <a href="/carta" className="btn btn-primary btn-sm mt-2">
          Ver Más
        </a>
      </div>
    </div>
  );
};
