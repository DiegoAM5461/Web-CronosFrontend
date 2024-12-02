import React from "react";
import { PedidosCarta } from "../../components/carta-components/PedidosCarta";
import { HeaderCarta } from "../../components/carta-components/HeaderCarta";

export const Bebidas = () => {
  return (
    <>
      <HeaderCarta title="Bebidas" imageUrl="https://i.blogs.es/9bf91c/pexels-isabella-mendes-107313-340996/1366_2000.jpg" />
      <PedidosCarta categories={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]} />
    </>
  );
};
