import React from "react";

export default function RecipientCard(props) {
  return (
    <div className="card-receiver">
      <img src={props.icon} className="img-contact" alt="" />
      <h1 className="username">{props.fullName}</h1>
    </div>
  );
}
