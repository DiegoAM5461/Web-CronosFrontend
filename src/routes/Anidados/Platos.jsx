import React from "react";
import { PedidosCarta } from "../../components/carta-components/PedidosCarta";
import { HeaderCarta } from "../../components/carta-components/HeaderCarta";

export const Platos = () => {
  return (
    <>
      <HeaderCarta title="Platos" imageUrl="https://i.ytimg.com/vi/r2oGrH__hT0/maxresdefault.jpg" />
      <PedidosCarta categories={[14]} />
    </>
  );
};
