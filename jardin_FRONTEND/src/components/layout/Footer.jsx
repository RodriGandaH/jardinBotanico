const Footer = () => {
    return (
        <footer className="footer bg-success-subtle" style={{ paddingTop: '3px' }}>
            <section className="text-center py-2">
                <i className="bi bi-house-door-fill"></i> C. R. Rivero Torrez 1630, Cochabamba (Muyurina) 1638 Cochabamba, Bolivia
                <i className="ms-4 bi bi-envelope-fill"></i> informaciones.jardin.botanico@gmail.com
                <i className="ms-4 bi bi-telephone-fill"></i> 62998028
            </section>
            <section className="text-center py-2" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                <a className="text-reset" href="https://www.facebook.com/profile.php?id=100078017859101" target="_blanck">
                    <i className="bi bi-facebook"></i>
                </a>
                <i className="ms-4 bi bi-twitter-x"></i>
                <i className="ms-4 bi bi-tiktok"></i>
                <i className="ms-4 bi bi-instagram"></i>
            </section>
        </footer >
    );
};

export default Footer;