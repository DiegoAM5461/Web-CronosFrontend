import React from "react";
import { PedidosCarta } from "../../components/carta-components/PedidosCarta";
import { HeaderCarta } from "../../components/carta-components/HeaderCarta";

export const Pickeos = () => {
  return (
    <>
      <HeaderCarta title="Pickeos" imageUrl="https://blog.sanfernando.pe/wp-content/uploads/2023/07/alitas-bbq-1024x683.jpg" />
      <PedidosCarta categories={[15]} />
    </>
  );
};

