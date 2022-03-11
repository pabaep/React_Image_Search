import React from "react";

const QueryContext = React.createContext({
    query: "",
    updateQuery: (queryItem) => {}
});

export default QueryContext;