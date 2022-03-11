import React, { useState } from 'react'
import QueryContext from './QueryContext'

const QueryProvider = (props) => {
    const [queryState, setQueryState] = useState({query: ''})

    const updateQueryItemHandler = queryItem => {
      setQueryState({query: queryItem});
    }


    const queryContext = {
      query: queryState.query,
      updateQuery: updateQueryItemHandler
    }
    // console.log(queryContext);

  return (
    <QueryContext.Provider value={queryContext}>{props.children}</QueryContext.Provider>
  )
}

export default QueryProvider;