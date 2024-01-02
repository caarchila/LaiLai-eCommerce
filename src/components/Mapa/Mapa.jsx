import React, { Component } from "react";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import mapboxgl from "mapbox-gl";
import axios from "axios";
import swal from "sweetalert";
import "./style.css";
class MapaGL extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: undefined,
      lat: undefined,
      zoom: 15.99,
      pitch: 40,
      bearing: 20,
      antialias: true,
      map: {},
      marker: [],
      Poligono: [],
    };
    this.setLocation = this.setLocation.bind(this);
  }
  setLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState(
        {
          lng: position.coords.longitude,
          lat: position.coords.latitude,
        },
        () => {
          axios
            .get(
              `/clientapp-web/webresources/tiendas/cobertura?longitud=${this.state.lng}&latitud=${this.state.lat}`
            )
            .then((resp) => {
              if (resp.data.result === "ACT") {
                swal("Felicidades", `si hay cobertura`, "success");
                this.props.getLocation({
                  lng: this.state.lng,
                  lat: this.state.lat,
                });
              } else {
                swal("¡Mensaje de información!", `${resp.data.msg}`, "info");
              }
            });
        }
      );
      this.state.marker.setLngLat([this.state.lng, this.state.lat]);
      this.state.map.flyTo({
        center: [this.state.lng, this.state.lat],
        essential: true,
        zoom: 15.99,
      });
    });
  };

  componentDidMount() {
    mapboxgl.accessToken =
      "pk.eyJ1IjoidG9iZXJhbDk4IiwiYSI6ImNrajh2N3hpcTBjc3IydXA3MWZwMWNtZnYifQ.nrwnBSuM3s8or0EJkhBZEw";
    navigator.geolocation.getCurrentPosition((position) => {
      if (Object.keys(this.props.direccionSeleccionada).length > 0) {
        var latitud = parseFloat(this.props.direccionSeleccionada.latitud);
        var longitud = parseFloat(this.props.direccionSeleccionada.longitud);
        this.setState(
          {
            lng: longitud,
            lat: latitud,
          },
          () => {
            //TODO: i remove this url updated on index.js
            axios
              .get(
                `/clientapp-web/webresources/tiendas/cobertura?longitud=${this.state.lng}&latitud=${this.state.lat}`
              )
              .then((resp) => {
                swal("Felicidades", `si hay cobertura`, "success");
                if (resp.data.result === "ACT") {
                  this.props.getLocation({
                    lng: this.state.lng,
                    lat: this.state.lat,
                  });
                } else {
                  swal("¡Mensaje de información!", `${resp.data.msg}`, "info");
                }
              });
          }
        );
      } else {
        this.setState(
          {
            lng: position.coords.longitude,
            lat: position.coords.latitude,
          },
          () => {
            //TODO: i remove this url updated on index.js
            axios
              .get(
                `/clientapp-web/webresources/tiendas/cobertura?longitud=${this.state.lng}&latitud=${this.state.lat}`
              )
              .then((resp) => {
                swal("Felicidades", `si hay cobertura`, "success");
                if (resp.data.result === "ACT") {
                  this.props.getLocation({
                    lng: this.state.lng,
                    lat: this.state.lat,
                  });
                } else {
                  swal("¡Mensaje de información!", `${resp.data.msg}`, "info");
                }
              });
          }
        );
      }

      this.setState(
        {
          map: new mapboxgl.Map({
            container: this.mapContainer,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [this.state.lng, this.state.lat],
            zoom: 15.99,
            pitch: 40,
            bearing: 20,
            antialias: true,
          }),
        },
        () => {
          this.props.getMapa(this.state.map);
          if (this.props.cobertura) {
            //TODO: i remove this url updated on index.js
            axios
              .get("/clientapp-web/webresources/tiendas/list")
              .then((resp) => {
                this.setState(
                  {
                    Poligono: resp.data.tiendas,
                  },
                  () => {
                    this.state.map.on("load", () => {
                      this.state.Poligono.map((poligono) => {
                        console.log(poligono.poligono);
                        if (poligono.poligono !== undefined) {
                          this.state.map.addSource(`maine${poligono.id}`, {
                            type: "geojson",
                            data: {
                              type: "Feature",
                              geometry: {
                                type: "Polygon",
                                coordinates: [JSON.parse(poligono.poligono)],
                              },
                            },
                          });
                          this.state.map.addLayer({
                            id: `maine${poligono.id}`,
                            type: "fill",
                            source: `maine${poligono.id}`,
                            layout: {},
                            paint: {
                              "fill-color": "#E52822",
                              "fill-opacity": 0.8,
                            },
                          });
                        }
                      });
                    });
                  }
                );
              });
          }
          this.state.map.addControl(new mapboxgl.NavigationControl());
          this.state.map.addControl(new mapboxgl.FullscreenControl());
          this.setState(
            {
              marker: new mapboxgl.Marker({
                color: "red",
                draggable: true,
              })
                .setLngLat([this.state.lng, this.state.lat])
                .addTo(this.state.map),
            },
            () => {
              this.props.getMarker(this.state.marker);
            }
          );

          const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            zoom: 4,
            placeholder: "Buscar Lugares",
            mapboxgl: mapboxgl,
          });
          document
            .getElementById(`coordenadas${this.props.id}`)
            .appendChild(geocoder.onAdd(this.state.map));

          this.state.map.on("click", (e) => {
            this.setState(
              {
                lng: e.lngLat.lng,
                lat: e.lngLat.lat,
              },
              () => {
                console.log(this.state.lng);
                console.log(this.state.lat);
                //TODO: i remove this url updated on index.js
                axios
                  .get(
                    `/clientapp-web/webresources/tiendas/cobertura?longitud=${this.state.lng}&latitud=${this.state.lat}`
                  )
                  .then((resp) => {
                    console.log(resp);
                    if (resp.data.result === "ACT") {
                      swal("Felicidades", `si hay cobertura`, "success");
                      this.props.getLocation({
                        lng: this.state.lng,
                        lat: this.state.lat,
                      });
                    } else {
                      swal(
                        "¡Mensaje de información!",
                        `${resp.data.msg}`,
                        "info"
                      );
                    }
                  });
              }
            );
            this.state.marker.setLngLat([this.state.lng, this.state.lat]);
          });
          this.state.map.flyTo({
            center: [this.state.lng, this.state.lat],
            essential: true, // this animation is considered essential with respect to prefers-reduced-motion
            zoom: 15.99,
          });
        }
      );
    });
  }

  render() {
    return (
      <>
        {this.props.boton ? (
          <button
            onClick={this.setLocation}
            className="btn btn-danger location miUbicacion d-block"
          >
            {" "}
            usar ubicacion actual
          </button>
        ) : (
          <button
            onClick={this.setLocation}
            className="btn btn-danger location miUbicacion d-none"
          >
            {" "}
            usar ubicacion actual
          </button>
        )}
        {
          this.props.buscador ? (
            <div id={`coordenadas${this.props.id}`} className="d-block"></div>
          ) : (
            <div id={`coordenadas${this.props.id}`} className="d-none"></div>
          )
          //colocamos id para ocultar o realizar ciertas cosas dependiendo donde este el mapa.
        }
        <div
          ref={(el) => (this.mapContainer = el)}
          className="mapContainer"
          style={{ width: this.props.id === "1" ? "360px" : "100%" }}
        />
      </>
    );
  }
}

MapaGL.defaultProps = {
  boton: true,
  buscador: true,
  cobertura: false,
  direccionSeleccionada: {},
  id: "",
  getLocation: () => {},
  getMapa: () => {},
  getMarker: () => {},
};

export default MapaGL;
