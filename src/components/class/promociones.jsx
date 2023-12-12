import React, { Component } from "react";
import CarouselItem from "../Carrusel/Carrusel";
import { Carousel, Spinner } from "react-bootstrap";
import axios from "axios";
import "../Carrusel/style.css";
import { Link } from "react-router-dom";

class Promociones extends Component {
  constructor(props) {
    super(props);
    this.state = {
      promociones: [],
      index: 0,
    };
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect = (selectedIndex, e) => {
    this.setState({ index: selectedIndex });
  };

  componentDidMount() {
    axios
      .get(
        "http://104.238.249.113:8080/clientapp-web/webresources/getMenusPromo/APP"
      )
      .then((resp) => {
        this.setState({
          promociones: resp.data.promos,
        });
      });
  }

  render() {
    const promociones = this.state.promociones;
    return (
      <Carousel
        className="carrusel"
        activeIndex={this.state.index}
        onSelect={this.handleSelect}
      >
        {promociones.length === 0 ? (
          <Spinner animation="border" variant="primary" />
        ) : (
          promociones.map((p, index) => (
            <Link to={`/detalle/0/${p.id}`} key={p.id}>
              <CarouselItem
                clase={index === this.state.index ? "active" : ""}
                key={p.id}
                titulo={p.nombre}
                imagen={p.imagenes.normal}
                descripcion={p.descripcion}
              />
            </Link>
          ))
        )}
      </Carousel>
    );
  }
}

export default Promociones;
