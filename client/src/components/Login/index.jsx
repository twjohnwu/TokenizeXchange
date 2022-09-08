// @ts-check
import { Toast } from "react-bootstrap";
import React, { useState, useRef } from "react";
import "./style.css";
import { useEffect } from "react";

const DEMO_USERS = ["user001", "user002", "user003", "user004"];

export default function Login({ onLogIn }) {
  const [username, setUsername] = useState(
    () => DEMO_USERS[0]
  );
  const [error, setError] = useState(null);

  const onSubmit = async (event) => {
    event.preventDefault();
    onLogIn(username, setError);
  };

  return (
    <>
      <div className="login-form text-center login-page">
        <div
          className="rounded"
          style={{
            boxShadow: "0 0.75rem 1.5rem rgba(18,38,63,.03)",
          }}
        >
          <div className="position-relative">
            <div
              className="row no-gutters align-items-center"
              style={{
                maxWidth: 400,
                backgroundColor: "rgba(85, 110, 230, 0.25)",
                paddingLeft: 20,
                paddingRight: 20,
                borderTopLeftRadius: 4,
                borderTopRightRadius: 4,
              }}
            >
              <div className="col text-primary text-left">
                <h3 className="font-size-15">Sign in</h3>
              </div>
              <div className="col align-self-end">
              </div>
            </div>
          </div>

          <form
            className="bg-white text-left px-4"
            style={{
              paddingTop: 58,
              borderBottomLeftRadius: 4,
              borderBottomRightRadius: 4,
            }}
            onSubmit={onSubmit}
          >
            <label className="font-size-12">Name</label>

            <div className="username-select mb-3">
              <UsernameSelect
                username={username}
                setUsername={setUsername}
                names={DEMO_USERS}
              />
            </div>
            
            <div style={{ height: 30 }} />
            <button className="btn btn-lg btn-primary btn-block" type="submit">
              Sign in
            </button>
            <div className="login-error-anchor">
              <div className="toast-box">
                <Toast
                  style={{ minWidth: 277 }}
                  onClose={() => setError(null)}
                  show={error !== null}
                  delay={3000}
                  autohide
                >
                  <Toast.Header>
                    <img
                      src="holder.js/20x20?text=%20"
                      className="rounded mr-2"
                      alt=""
                    />
                    <strong className="mr-auto">Error</strong>
                  </Toast.Header>
                  <Toast.Body>{error}</Toast.Body>
                </Toast>
              </div>
            </div>
            <div style={{ height: 30 }} />
          </form>
        </div>
      </div>
    </>
  );
}

const UsernameSelect = ({ username, setUsername, names = [""] }) => {
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState(0);
  const ref = useRef();
  /** @ts-ignore */
  const clientRectWidth = ref.current?.getBoundingClientRect().width;
  useEffect(() => {
    /** @ts-ignore */
    setWidth(clientRectWidth);
  }, [clientRectWidth]);

  /** Click away listener */
  useEffect(() => {
    if (open) {
      const listener = () => setOpen(false);
      document.addEventListener("click", listener);
      return () => document.removeEventListener("click", listener);
    }
  }, [open]);

  /** Make the current div focused */
  useEffect(() => {
    if (open) {
      /** @ts-ignore */
      ref.current?.focus();
    }
  }, [open]);

  return (
    <div
      tabIndex={0}
      ref={ref}
      className={`username-select-dropdown ${open ? "open" : ""}`}
      onClick={() => setOpen((o) => !o)}
    >
      <div className="username-select-row">
        <div>{username}</div>
        <div>
          <svg width={24} height={24}>
            <path d="M7 10l5 5 5-5z" fill="#333" />
          </svg>
        </div>
      </div>
      <div
        style={{ width: width }}
        className={`username-select-block ${open ? "open" : ""}`}
      >
        {names.map((name) => (
          <div
            className="username-select-block-item"
            key={name}
            onClick={() => setUsername(name)}
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  );
};
