import lily from '../assets/lily.png'

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-text">
        <p className="small-text">iFlowers</p>

        <h1>
          Fresh Flowers,
          <br />
          Beautiful Moments
        </h1>

        <p className="hero-description">
          Flowers that make ordinary moments feel special.
        </p>

        <a className="hero-button" href="#flowers">
          View Collection
        </a>
      </div>

      <div className="hero-image">
        <img src={lily} alt="Lily flower" />
      </div>
    </section>
  )
}

export default Hero