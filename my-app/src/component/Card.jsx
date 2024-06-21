import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCart } from "./ContextReducer";

const CardComponent = (props) => {
  let cart = useCart();
  const [selectedNumber, setSelectedNumber] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");

  const handleNumberSelect = (e) => {
    setSelectedNumber(Number(e));
  };

  const handleSizeSelect = (e) => {
    setSelectedSize(e);
  };

  let option = props.options;
  let priceOption = Object.keys(option);

  useEffect(() => {
    if (priceOption.length > 0) {
      setSelectedSize(priceOption[0]);
    }
  }, []);
  const finalPrice = selectedNumber * parseInt(option[selectedSize] || 0);

  const handleAddToCart = async () => {
    const existingItem = cart.state.find(item => item.id === props.foodItem._id);
  
    const finalPrice = selectedNumber * parseInt(props.options[selectedSize]);
  
    if (existingItem) {
      if (existingItem.size === selectedSize) {
        await cart.dispatch({
          type: "UPDATE",
          id: props.foodItem._id,
          price: finalPrice,
          qty: selectedNumber,
        });
      } else {
        await cart.dispatch({
          type: "ADD",
          id: props.foodItem._id,
          name: props.foodItem.name,
          price: finalPrice,
          qty: selectedNumber,
          size: selectedSize,
          img: props.foodItem.img,
        });
      }
    } else {
      // Add new item to the cart
      await cart.dispatch({
        type: "ADD",
        id: props.foodItem._id,
        name: props.foodItem.name,
        price: finalPrice,
        qty: selectedNumber,
        size: selectedSize,
        img: props.foodItem.img,
      });
    }
  
   
  };
  

  return (
    <Card className="m-4" style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src={props.foodItem.img}
        style={{ height: "200px" }}
      />
      <Card.Body>
        <Card.Title>{props.foodItem.name}</Card.Title>
        <div className="d-flex align-items-center">
          <DropdownButton
            id="dropdown-basic-button"
            title={selectedNumber}
            onSelect={handleNumberSelect}
            className="me-2"
            size="sm"
          >
            <Dropdown.Item eventKey="1">1</Dropdown.Item>
            <Dropdown.Item eventKey="2">2</Dropdown.Item>
            <Dropdown.Item eventKey="3">3</Dropdown.Item>
            <Dropdown.Item eventKey="4">4</Dropdown.Item>
            <Dropdown.Item eventKey="5">5</Dropdown.Item>
          </DropdownButton>
          <DropdownButton
            id="dropdown-basic-button"
            title={selectedSize || "Select Size"}
            onSelect={handleSizeSelect}
            className="me-2"
            size="sm"
          >
            {priceOption.map((size) => (
              <Dropdown.Item key={size} eventKey={size}>
                {size}
              </Dropdown.Item>
            ))}
          </DropdownButton>
          <div className="d-inline h-100 fs-9">{finalPrice}</div>
        </div>
        <hr />
        <Button
          variant="primary"
          size="sm"
          className="mt-2"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CardComponent;
