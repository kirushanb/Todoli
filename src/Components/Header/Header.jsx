import React from "react";
import { Row, Col } from "reactstrap";

const Header = () => {
 

  return (
  
    < >
      <Row style={{ marginTop: 15}}>
        <Col xs={8}>
          <img
          alt='todoli'
            style={{ height: "7vh" }}
            src={process.env.PUBLIC_URL + "logo.png"}
          ></img>
        </Col>

        <Col></Col>
      </Row>

      <hr />
    </>
  );
};

export default Header;
