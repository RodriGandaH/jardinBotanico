import { useEffect, useState } from "react";
import axios from "axios";

const Footer = () => {

    const [infoFooter, setInfoFooter] = useState(null);
    const [loading, setLoading] = useState(true);

    const icons = new Map([
        ["Email", "bi-envelope-fill"],
        ["Facebook", "bi-facebook"],
        ["Twitter", "bi-twitter-x"],
        ["Telefono", "bi-telephone-fill"],
        ["Instagram", "bi-instagram"]
    ]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/networks').then(response => {
            setInfoFooter(response.data);
            setLoading(false);
        });
    }, []);

    return (
        <>
            {loading ? (
                <div></div>
            ) : (
                <footer className="footer" style={{ paddingTop: '5px', backgroundColor: "#265f47" }}>
                    <section className="text-center py-2">
                        <i style={{ color: "#bfbfbf" }} className="h5 bi bi-house-door-fill"></i> <span className="text-light">C. R. Rivero Torrez 1630, Cochabamba (Muyurina) 1638 Cochabamba, Bolivia</span>
                        {infoFooter.map(info => {
                            if (info.name === "Telefono" || info.name === "Email") {
                                return (<a key={info.id}><i style={{ color: "#bfbfbf" }} className={"ms-4 bi h5 " + icons.get(info.name)}></i> <span className="text-light">{info.data}</span></a>);
                            }
                        })}
                    </section>
                    <section className="text-center py-2" style={{ backgroundColor: "#17392b" }}>
                        {infoFooter.map(info => {
                            if (info.name != "Telefono" && info.name != "Email") {
                                return (
                                    <a key={info.id} className="text-reset" href={info.data} target="_blanck">
                                        <i style={{ color: "#bfbfbf" }} className={"ms-4 bi h4 " + icons.get(info.name)}></i>
                                    </a>
                                );
                            }
                        })}
                    </section>
                </footer >
            )}
        </>
    );
};

export default Footer;