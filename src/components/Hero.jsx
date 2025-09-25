export default function Hero({title, subtitle, background}) {
    const bgUrl = typeof background === "string" ? background : background?.src;
    
    return(
        <section 
        className="hero"
        style={{
            backgroundImage:`url(${bgUrl})`,
            backgroundSize:"cover",
            backgroundPosition:"center",
            color:"white",
            padding:"180px 20px",
            textAlign:"center",
        }}>
            <h1 className="text-xl md:text-3xl font-bold tracking-widest">{title}</h1>
            <p className="text-base md:text-lg">{subtitle}</p>
        </section>
    );
}