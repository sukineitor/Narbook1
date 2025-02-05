document.addEventListener("DOMContentLoaded", () => {
  const book = document.querySelector(".book")
  let isAnimating = false
  let lastScrollTop = 0

  // Efecto de página al hacer scroll
  window.addEventListener("scroll", () => {
    const st = window.pageYOffset || document.documentElement.scrollTop

    if (!isAnimating) {
      isAnimating = true

      if (st > lastScrollTop) {
        // Scrolling down
        book.style.transform = "perspective(1000px) rotateX(1deg)"
      } else {
        // Scrolling up
        book.style.transform = "perspective(1000px) rotateX(-1deg)"
      }

      setTimeout(() => {
        book.style.transform = "perspective(1000px) rotateX(0deg)"
        isAnimating = false
      }, 300)
    }

    lastScrollTop = st <= 0 ? 0 : st
  })

  // Animación de entrada para las citas
  const quoteBoxes = document.querySelectorAll(".quote-box")

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  quoteBoxes.forEach((quote) => {
    quote.style.opacity = "0"
    quote.style.transform = "translateY(20px)"
    quote.style.transition = "all 0.5s ease-out"
    observer.observe(quote)
  })

  // Efecto de parpadeo aleatorio para el símbolo de la cueva
  const caveSymbol = document.querySelector(".cave-symbol")

  function randomBlink() {
    const randomDelay = Math.random() * 5000 + 2000 // Entre 2 y 7 segundos
    setTimeout(() => {
      caveSymbol.style.opacity = "0.5"
      setTimeout(() => {
        caveSymbol.style.opacity = "1"
        randomBlink() // Llamar recursivamente para continuar el efecto
      }, 100)
    }, randomDelay)
  }

  randomBlink() // Iniciar el efecto de parpadeo
})

