import { createContext } from "react";

const apiContext = createContext({
    url: 'http://localhost:6900'
});

export default apiContext;