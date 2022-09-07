/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useContext, useEffect, useState, useRef } from "react";
import { Col } from "react-bootstrap";
import Contact from "../components/Contact";
import Message from "../components/Message";
import SearchContact from "../components/search/SearchContact";
import RecipientCard from "../components/card/RecipientCard";
import { UserContext } from "../context/UserContext";
import { HiOutlineMail } from "react-icons/hi";
import { BiSend } from "react-icons/bi";
import { io } from "socket.io-client";

let socket;
export default function ChatUser() {
  const [listDataContacts, setListDataContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [contact, setContact] = useState("");
  const { dataUser } = useContext(UserContext);
  const refInp = useRef(null);
  const mesRef = useRef();
  const scrollRef = useRef();
  const [newMsg, setNewMsg] = useState([]);

  useEffect(() => {
    socket = io(process.env.REACT_APP_BASE_URL_BE, {
      auth: {
        token: localStorage.getItem("token"),
      },
      query: {
        id: dataUser?.id,
      },
    });

    loadContact();

    socket.on("connection_error", (err) => {
      new Error(err.message);
    });

    loadMessage();

    socket.on("new message", (id) => {
      const newMessages = [...newMsg, id];
      setNewMsg(newMessages);

      socket.emit("load messages", contact?.id);
    });
    return () => {
      socket.disconnect();
    };
  }, [messages, dataUser.isLogin]);

  const scrollToBottom = () => {
    mesRef.current.scroll({
      top: mesRef.current.scrollHeight,
      left: 0,
    });
  };

  const loadContact = () => {
    if (dataUser.status == "user") {
      socket.emit("load admin contact");
      socket.on("admin contact", (data) => {
        const dataRes = lastMessage(data);
        setListDataContacts([...dataRes]);
      });
    } else {
      socket.emit("load user contact");
      socket.on("user contact", (data) => {
        const dataRes = lastMessage(data);
        setListDataContacts([...dataRes]);
      });
    }
  };

  function lastMessage(data) {
    const dataResult = data.map((d) => {
      let msg;
      const idLastMsgSender = d.senderMessage[d.senderMessage.length - 1]?.id;
      const idLastMsgRecipient =
        d.recipientMessage[d.recipientMessage.length - 1]?.id;

      if (d.recipientMessage.length == 0 && d.senderMessage.length == 0) {
        msg = "Click here to start chatting";
      } else if (idLastMsgSender > idLastMsgRecipient) {
        msg = d.senderMessage[d.senderMessage.length - 1]?.message;
      } else {
        msg = d.recipientMessage[d.recipientMessage.length - 1]?.message;
      }

      return {
        ...d,
        msg,
      };
    });
    return dataResult;
  }

  const loadMessage = () => {
    socket.on("messages", (data) => {
      setMessages([...data]);
      setLoading(false);
      if (scrollRef.current) {
        scrollToBottom();
      }
    });
  };

  const handleActiveContact = (userId) => {
    const newMessages = newMsg.filter((d) => d != userId);
    setNewMsg(newMessages);
    setLoading(true);
    scrollRef.current = true;
    socket.emit("load messages", userId);
    const takeDataContact = listDataContacts.filter((d) => d?.id == userId)[0];
    setContact(takeDataContact);
  };

  const handleSendMsgUsingKeyEnter = (e) => {
    e.key == "Enter" && handleSendMsg(e);
  };

  const handleSendMsg = () => {
    const msg = refInp.current.value;
    const data = {
      idRecipient: contact?.id,
      message: msg,
    };
    socket.emit("send message", data);
    refInp.current.value = "";
  };

  return (
    <article className="container-chat">
      <section className="container-left">
        <Contact
          fullName={dataUser.fullName}
          msg={"Online"}
          user={true}
          image={dataUser.image}
          msger={true}
        />
        <hr />
        <div className="">
          {dataUser.status == "admin" && (
            <div className="container-search-contact">
              <SearchContact />
            </div>
          )}

          <div className="container-contacts">
            {listDataContacts[0] != "" && (
              <>
                {listDataContacts?.map((data, i) => {
                  let active = true;
                  return (
                    <Contact
                      active={active}
                      msg={data.msg}
                      key={i}
                      cotactId={contact?.id}
                      idUser={data.id}
                      fullName={data.fullName}
                      image={data.image}
                      handleActiveContact={handleActiveContact}
                    />
                  );
                })}
              </>
            )}
          </div>
        </div>
      </section>

      <section className="container-right">
        {contact ? (
          <>
            <RecipientCard fullName={contact.fullName} icon={contact.image} />

            <div ref={mesRef} className="my-3 container-chat-message">
              {messages[0] ? (
                <>
                  {loading ? (
                    <div>Loading...</div>
                  ) : (
                    <>
                      {messages.map((m, i) => {
                        let receiver = true;
                        let imageIcon = m.sender.image;
                        if (m.idRecipient == contact?.id) {
                          receiver = false;
                        }
                        return (
                          <Message
                            key={i}
                            image={imageIcon}
                            receiver={receiver}
                            contact={contact?.id}
                            msg={m.message}
                          />
                        );
                      })}
                    </>
                  )}
                </>
              ) : (
                <div className="mt-5">No message</div>
              )}
            </div>

            <div className="container-send-message">
              <input
                ref={refInp}
                placeholder="Type a message"
                className="inp-send-message"
                onKeyUp={(e) => handleSendMsgUsingKeyEnter(e)}
              />
              <div onClick={() => handleSendMsg()} className="send-msg-btn">
                <BiSend size="25px" />
              </div>
            </div>
          </>
        ) : (
          <div className="row justfy-content-center">
            <HiOutlineMail color="#AC47F5" size="400px" />
            <div className="complain-text ">Compalin Chat</div>
          </div>
        )}
      </section>
    </article>
  );
}
