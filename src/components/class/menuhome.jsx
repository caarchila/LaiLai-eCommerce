import React, { Component } from "react";
import Card from "../cardsmenu/card";
import axios from "axios";
import { Spinner } from "react-bootstrap";

class MenuHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: [],
    };
  }

  componentDidMount() {
    axios
      .get(
        "http://104.238.249.113:8080/clientapp-web/webresources/getMenus/APP"
      )
      .then((resp) => {
        this.setState({
          menu: resp.data.categorias,
        });
      });
  }

  render() {
    const { menu } = this.state;
    return (
      <>
        {menu.length === 0 ? (
          <Spinner animation="border" variant="primary" />
        ) : (
          menu.map((c) => (
            <Card
              key={c.id}
              id={c.id}
              idSub={0}
              imagen={c.imagenes.normal}
              unavailable={c.imagenes.unavailable}
              titulo={c.nombre}
            />
          ))
        )}
      </>
    );
  }
}

export default MenuHome;
