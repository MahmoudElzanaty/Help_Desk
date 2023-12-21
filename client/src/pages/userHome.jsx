import React from "react";
import "./style.css";

export const UserHomepage = () => {
  return (
    <div className="user-homepage">
      <div className="overlap-wrapper">
        <div className="overlap">
          <div className="ellipse" />
          <img className="vector" alt="Vector" src="vector.svg" />
          <div className="div" />
          <div className="ellipse-2" />
          <div className="login-btn">
            <div className="overlap-group">
              <div className="text-wrapper">PERSONAL INFO</div>
            </div>
          </div>
          <img
            className="user-single-neutral"
            alt="User single neutral"
            src="user-single-neutral-male-close-geometric-human-person-single-up-user-male.png"
          />
          <div className="overlap-group-wrapper">
            <div className="overlap-group">
              <div className="text-wrapper">LIVE CHAT</div>
              <img
                className="img"
                alt="Chat two bubbles"
                src="chat-two-bubbles-oval-messages-message-bubble-chat-oval-conversation.svg"
              />
            </div>
          </div>
          <div className="div-wrapper">
            <div className="overlap-group">
              <div className="text-wrapper">KNOWLEDGE BASE</div>
              <img className="img" alt="Definition search" src="definition-search-book.svg" />
            </div>
          </div>
          <div className="login-btn-2">
            <div className="overlap-group">
              <div className="text-wrapper">SUPPORT TICKET</div>
              <img
                className="img"
                alt="Chat bubble square"
                src="chat-bubble-square-question-bubble-square-messages-notification-chat-message-question-help.svg"
              />
            </div>
          </div>
          <div className="welcome-user">WELCOME USER</div>
        </div>
      </div>
    </div>
  );
};
