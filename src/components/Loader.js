import React from "react";
import { Container, Row, Spinner } from "reactstrap";

const Loader = (props) => (
  <Container fluid className={"d-flex " + (props.height_restriction ? "" : "vh-50 ") + (props.justify_center ? "justify-content-center" : "")}>
    <Row className="justify-content-center align-self-center w-100 text-center">
      <Spinner color="primary" />
    </Row>
  </Container>
);

export default Loader;
