import * as React from "react";

import "./Subscribe.css";
import { useState } from "react";

import { Button, TextField } from "@mui/material";

export default function Subscribe(props) {
  const [email, setEmail] = useState("");

  return (
    <div>
      <form
        action="https://phishmeifyoucan.us7.list-manage.com/subscribe/post"
        method="POST"
        noValidate
        style={{ display: "flex", justifyContent: "center", flexWrap: 'wrap' }}
      >
        <input type="hidden" name="u" value="66b58fda85306ad2562755ec1" />
        <input type="hidden" name="id" value="88a5b5590b" />
        <TextField
          label="Your Email"
          variant="outlined"
          type="email"
          name="EMAIL"
          id="MERGE0"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button 
          type="submit"
          variant="contained"
          value="Subscribe"
          name="subscribe"
          id="mc-embedded-subscribe"
          style={{
            lineHeight: "1.4375em",
            padding: "16.5px 14px",
            backgroundColor: "#2a1e5c",
          }}
        >
          Subscribe
        </Button>

        <div
          style={{ position: "absolute", left: "-5000px" }}
        >
          <label htmlFor="b_name">Name: </label>
          <input
            type="text"
            name="b_name"
            tabIndex="-1"
            value=""
            placeholder="Freddie"
            id="b_name"
          />

          <label htmlFor="b_email">Email: </label>
          <input
            type="email"
            name="b_email"
            tabIndex="-1"
            value=""
            placeholder="youremail@gmail.com"
            id="b_email"
          />

          <label htmlFor="b_comment">Comment: </label>
          <textarea
            name="b_comment"
            tabIndex="-1"
            placeholder="Please comment"
            id="b_comment"
          ></textarea>
        </div>
      </form>
    </div>
  );
}
