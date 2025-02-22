import { useNavigate } from "react-router-dom"
function HomePage() {
  const navigate = useNavigate();
  return (

    <section id="home" class="hero-section d-flex align-items-center">
      <div class="container text-center">
        <h1 class="display-1 mb-4">Welcome to Ashutosh's Website</h1>
        <div class="d-flex justify-content-center gap-3">
          <button class="btn btn-primary btn-lg" onClick={() => navigate('/products')}>Let's Get Started</button>
          {/* <button class="btn btn-outline-light btn-lg">Learn More</button> */}
        </div>
      </div>
    </section>
  )
}
export default HomePage;