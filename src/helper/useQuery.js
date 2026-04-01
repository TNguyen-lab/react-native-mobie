import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}
export default useQuery;
