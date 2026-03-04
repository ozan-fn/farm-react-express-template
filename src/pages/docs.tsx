import { useEffect } from "react";

export default function Docs() {
    useEffect(() => {
        window.location.replace("/docs.html");
    }, []);

    return null;
}
