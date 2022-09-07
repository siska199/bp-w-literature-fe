/* eslint-disable eqeqeq */
import React from "react";

export default function Contact(props) {
  return (
    <section
      onClick={
        !props.user ? () => props.handleActiveContact(props.idUser) : null
      }
      className={` ${!props.user ? "c-contact" : " "}`}
    >
      <div
        className={`container-contact  ${
          props.cotactId == props.idUser && !props.user
            ? " active-contact "
            : " non-active-contact "
        }`}
      >
        <img src={props.image} className="img-contact" alt="" />
        <div lg={8} className="container-contact-detail">
          <span className="username mb-1">{props.fullName}</span>
          <span className="new-message">{props.msg}</span>
        </div>
        {/* <div
          className="time-container d-grid align-items-center justify-content-center"
        >
          {!props.user && (
            <>
              {
                <div
                  className={`text-center  ${
                    props.active ? "" : " notif-msg "
                  } `}
                ></div>
              }
            </>
          )}
        </div> */}
      </div>
    </section>
  );
}
