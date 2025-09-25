export default function Hero({title, subtitle, background}) {
    return(
        <section 
        className="hero"
        style={{
            backgroundImage:`url(${background})`,
            backgroundSize:"cover",
            backgroundPosition:"center",
            color:"white",
            padding:"120px 20px",
            textAlign:"center",
        }}>
            <h1>{title}</h1>
            <p>{subtitle}</p>
        </section>
    );
}