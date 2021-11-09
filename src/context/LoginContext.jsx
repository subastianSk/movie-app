import React from "react";

const LoginContext = React.createContext();

const LoginReducer = (state, action) => {
  switch (action.type) {
    case "login": {
      return { logged: state.logged + 1 };
    }
    case "logout": {
      return { logged: state.logged - state.logged };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const LoginProvider = ({ children }) => {
  // useReducer
  const [state, dispatch] = React.useReducer(LoginReducer, { logged: 0 });
  // Make variable `value` and assign state & dispatch
  const value = { state, dispatch };
  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
};

const Uselogged = () => {
  // fill the default value of useContext
  const context = React.useContext(LoginContext);

  if (context === "undefined") {
    throw new Error("uselogged must be used within a LoginProvider");
  }

  return context;
};

export { LoginProvider, Uselogged };
