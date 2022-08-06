import Offcanvas from "react-bootstrap/Offcanvas";

export const ShoppingCart = ({ shoow, handleClose }) => {
  // const handleClose = () => setShow(false);

  return (
    <Offcanvas
      placement={"end"}
      show={shoow}
      onHide={handleClose}
      responsive="lg"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {/* <Stack ></Stack> */}
        <p>Your chosen products: {}</p>
      </Offcanvas.Body>
    </Offcanvas>
  );
};