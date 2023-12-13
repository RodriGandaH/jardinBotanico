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
                <footer className="footer bg-success-subtle" style={{ paddingTop: '5px' }}>
                    <section className="text-center py-2">
                        <i className="bi bi-house-door-fill"></i> C. R. Rivero Torrez 1630, Cochabamba (Muyurina) 1638 Cochabamba, Bolivia
                        {infoFooter.map(info => {
                            if (info.name === "Telefono" || info.name === "Email") {
                                return (<a key={info.id}><i className={"ms-4 bi " + icons.get(info.name)}></i> {info.data}</a>);
                            }
                        })}
                    </section>
                    <section className="text-center py-2" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                        {infoFooter.map(info => {
                            if (info.name != "Telefono" && info.name != "Email") {
                                return (
                                    <a key={info.id} className="text-reset" href={info.data} target="_blanck">
                                        <i className={"ms-4 bi " + icons.get(info.name)}></i>
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