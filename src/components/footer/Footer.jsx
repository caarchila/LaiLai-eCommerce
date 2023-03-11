import React from "react";
import "./style.css";
import google from "../../images/Google.png";
import apple from "../../images/Apple.png";
import Redes from "../redes/Redes";
const Footer = () => (
  <div id="footer">
    <div className="contenido">
      <div className="store">
        <Redes />
        <div id="play">
          <a href="/">
            <img src={google} alt="google" className="iconosPlay" />
          </a>
          <a href="/">
            <img src={apple} alt="apple" className="iconosPlay" />
          </a>
        </div>
      </div>
      <p>
        <b>
          {" "}
          © 2020 Restaurante Lai Lai. Todos los derechos reservados. El nombre
          Lai Lai, logos, imágenes y marcas relacionadas son marcas registradas
          por Lai Lai.{" "}
        </b>
        <br />
        <br />
        PEPSI, PEPSI-COLA y el Logo de Pepsi, son marcas registradas de PepsiCo,
        Inc. Facebook e Instagram son marcas registrada de Facebook, LLC
        Disponibilidad de masas, áreas de cobertura, horarios, garantía de
        tiempo pueden variar por área. Muchas promociones descritas y ofrecidas
        en este sitio web son exclusivamente para la compra en línea. Para
        pedidos pagados con tarjeta de crédito, el dueño de la tarjeta deberá
        estar presente al momento de recibir el pedido para firmar el mismo y
        presentar su tarjeta de crédito y documento de identidad. Restaurante
        Lai Lai jamás enviará correos pidiendo tarjetas de crédito y claves.
      </p>
    </div>
  </div>
);

export default Footer;
