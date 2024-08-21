import { createContext } from "react";

const userContext = createContext({
    signedIn: false
});

export default userContext;