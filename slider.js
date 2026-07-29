// ── SLIDER FUNCTIONS ──
let currentSlideIndex = 0;

function showSlide(index) {
  const slides = document.querySelectorAll('.slide');
  const indicators = document.querySelectorAll('.indicator');
  if (index >= slides.length) {
    currentSlideIndex = 0;
  } else if (index < 0) {
    currentSlideIndex = slides.length - 1;
  } else {
    currentSlideIndex = index;
  }
  const offset = -currentSlideIndex * 100;
  document.querySelector('.slider').style.transform = `translateX(${offset}%)`;
  indicators.forEach((indicator, i) => {
    indicator.classList.toggle('active', i === currentSlideIndex);
  });
}

function nextSlide() {
  showSlide(currentSlideIndex + 1);
}

function prevSlide() {
  showSlide(currentSlideIndex - 1);
}

function currentSlide(index) {
  showSlide(index - 1);
}

// ── BOTONES DE SECCIONES ──
document.addEventListener('DOMContentLoaded', function () {
  const botones = document.querySelectorAll('.botones button');
  const secciones = document.querySelectorAll('.seccion');

  botones.forEach(boton => {
    boton.addEventListener('click', () => {
      botones.forEach(b => b.classList.remove('activo'));
      secciones.forEach(s => s.classList.remove('activa'));
      boton.classList.add('activo');
      const numero = boton.getAttribute('data-seccion');
      document.getElementById('seccion' + numero).classList.add('activa');
    });
  });
});

// Inicializa EmailJS con tu public key
emailjs.init('IbQjYnuIkXHlh9DTN')

document.getElementById('formulario').addEventListener('submit', function(e) {
  e.preventDefault()

  let valido = true

  const nombre = document.getElementById('nombre')
  const email = document.getElementById('email')
  const mensaje = document.getElementById('mensaje')

  const errorNombre = document.getElementById('error-nombre')
  const errorEmail = document.getElementById('error-email')
  const errorMensaje = document.getElementById('error-mensaje')

  errorNombre.textContent = ''
  errorEmail.textContent = ''
  errorMensaje.textContent = ''
  nombre.classList.remove('invalido')
  email.classList.remove('invalido')
  mensaje.classList.remove('invalido')

  if (nombre.value.trim().length < 3) {
    errorNombre.textContent = 'El nombre debe tener al menos 3 caracteres'
    nombre.classList.add('invalido')
    valido = false
  }

  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!regexEmail.test(email.value.trim())) {
    errorEmail.textContent = 'Ingresa un email válido'
    email.classList.add('invalido')
    valido = false
  }

  if (mensaje.value.trim().length < 10) {
    errorMensaje.textContent = 'El mensaje debe tener al menos 10 caracteres'
    mensaje.classList.add('invalido')
    valido = false
  }

  if (valido) {
    // Envía el correo real con EmailJS
    emailjs.send(
      'service_2bu66ve',
      'template_nm4s49i',
      {
        nombre: nombre.value,
        email: email.value,
        mensaje: mensaje.value
      }
    ).then(() => {
      document.getElementById('exito').classList.remove('oculto')
      document.getElementById('formulario').reset()
      setTimeout(() => {
        document.getElementById('exito').classList.add('oculto')
      }, 3000)
    }).catch((error) => {
      console.log('Error enviando:', error)
    })
  }
})

// ── API NOTICIAS ──
const API_KEY = 'pub_8d145d78a9a141b9af9db491d295716a'

async function cargarSlider() {
  try {
    const respuesta = await fetch(
      `https://newsdata.io/api/1/news?apikey=${API_KEY}&language=es&country=mx`
    )
    const datos = await respuesta.json()
    const noticias = datos.results.slice(0, 3)

    const slider = document.getElementById('slider')
    const indicators = document.getElementById('indicators')

    slider.innerHTML = ''
    indicators.innerHTML = ''

    noticias.forEach((noticia, index) => {

      const fecha = new Date(noticia.pubDate)
      const fechaFormateada = fecha.toLocaleDateString('es-MX', {
        day: 'numeric', month: 'long', year: 'numeric'
      })

      const slideDiv = document.createElement('div')
      slideDiv.classList.add('slide')
      slideDiv.id = `slide-${index + 1}`
      slideDiv.style.cursor = 'pointer'
      slideDiv.onclick = () => location.href = noticia.link

      if (noticia.image_url) {
        slideDiv.style.backgroundImage = `
          linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0)),
          url(${noticia.image_url})
        `
        slideDiv.style.backgroundSize = 'cover'
        slideDiv.style.backgroundPosition = 'center center'
        slideDiv.style.backgroundRepeat = 'no-repeat'
      }

      slideDiv.innerHTML = `
        <div class="recientes">
          <p>Última hora</p>
          <img class="live" src="icon/svg-spinners--pulse-3.svg" alt="">
        </div>
        <div class="contenido">
          <span class="etiqueta-2">${noticia.category ? noticia.category[0] : 'Noticias'}</span>
          <h1>${noticia.title}</h1>
          <p class="sub-text">${noticia.description || ''}</p>
          <div class="dato">
            <img src="icon/iconamoon--clock-light.svg" alt="">
            <p>${fechaFormateada}</p>
            <img src="icon/solar--eye-linear.svg" alt="">
            <p>Noticias recientes</p>
          </div>
        </div>
      `

      slider.appendChild(slideDiv)

      const indicator = document.createElement('span')
      indicator.classList.add('indicator')
      indicator.onclick = () => currentSlide(index + 1)
      indicators.appendChild(indicator)
    })

    showSlide(0)

  } catch (error) {
    console.log('Error slider:', error)
  }
}

cargarSlider()

// lista notas recientes //

async function cargarUltimaHora() {
  try {
    const respuesta = await fetch(
      `https://newsdata.io/api/1/news?apikey=${API_KEY}&language=es&country=mx`
    )
    const datos = await respuesta.json()
    const noticias = datos.results.slice(0, 8)
    const lista = document.getElementById('lista-ultima-hora')
    lista.innerHTML = ''

    noticias.forEach(noticia => {
      const fecha = new Date(noticia.pubDate)
      const hora = fecha.toLocaleTimeString('es-MX', {
        hour: '2-digit',
        minute: '2-digit'
      })

      lista.innerHTML += `
        <li>
          <a href="${noticia.link}" target="_blank">
            ${noticia.title}
          </a>
          <div class="hora">${hora}</div>
        </li>
      `
    })

  } catch (error) {
    console.log('Error última hora:', error)
  }
}
cargarUltimaHora()

// Deportes //

async function cargarNoticiaDeporte() {
    try {
      const respuesta = await fetch(
        `https://newsdata.io/api/1/news?apikey=${API_KEY}&language=es&country=mx`
      )
      const datos = await respuesta.json()
      const noticia = datos.response.results[0]
  
      const fecha = new Date(noticia.webPublicationDate)
      const fechaFormateada = fecha.toLocaleDateString('es-MX', {
        day: 'numeric', month: 'long', year: 'numeric'
      })
  
      const contenedor = document.getElementById('noticia-deporte')
      contenedor.innerHTML = `
        <a href="${noticia.webUrl}" class="nota" target="_blank">
          <div class="text">
            <h2>${noticia.fields.headline}</h2>
            <p class="sec-card-one">${fechaFormateada}</p>
            <h4>${noticia.fields.trailText || ''}</h4>
          </div>
        </a>
      `
  
    } catch (error) {
      console.log('Error noticia deporte:', error)
    }
  }
  
  cargarNoticiaDeporte()

  async function cargarDeportes() {
    try {
      const respuesta = await fetch(
        `https://newsdata.io/api/1/news?apikey=${API_KEY}&language=es&country=mx&category=sports`
      )
      const datos = await respuesta.json()
      const noticias = datos.results.filter(n => 
        n.category && n.category.includes('sports')
      )
  
      // ── NOTICIA PRINCIPAL ── nota-02 con imagen de fondo
      const noticia1 = noticias[0]
      const contenedorPrincipal = document.getElementById('noticia-principal-deporte')
  
      const fecha1 = new Date(noticia1.pubDate)
      const fechaFormateada1 = fecha1.toLocaleDateString('es-MX', {
        day: 'numeric', month: 'long', year: 'numeric'
      })
  
      const nota02 = document.createElement('div')
      nota02.classList.add('nota-02')
  
      if (noticia1.image_url) {
        nota02.style.backgroundImage = `
          linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0)),
          url(${noticia1.image_url})
        `
      }
  
      nota02.innerHTML = `
        <div class="text">
          <h2>${noticia1.title}</h2>
          <p class="sec-card-one">${fechaFormateada1}</p>
          <h4>${noticia1.description || ''}</h4>
        </div>
      `
      nota02.onclick = () => location.href = noticia1.link
      nota02.style.cursor = 'pointer'
      contenedorPrincipal.appendChild(nota02)
  
      // ── DOS NOTAS SECUNDARIAS ──
      const contenedorNotas = document.getElementById('notas-deporte')
      const notasSecundarias = noticias.slice(1, 3)
  
      notasSecundarias.forEach(noticia => {
        const fecha = new Date(noticia.pubDate)
        const fechaFormateada = fecha.toLocaleDateString('es-MX', {
          day: 'numeric', month: 'long', year: 'numeric'
        })
  
        const not = document.createElement('div')
        not.classList.add('not')
        not.onclick = () => location.href = noticia.link
        not.style.cursor = 'pointer'
  
        not.innerHTML = `
          <img class="img-not" 
               src="${noticia.image_url || ''}" 
               alt="${noticia.title}"
               onerror="this.style.display='none'">
          <div class="title">
            <a class="sub-etiqueta">Deportes</a>
            <h3>${noticia.title}</h3>
            <p class="sec-card">${fechaFormateada}</p>
          </div>
        `
        contenedorNotas.appendChild(not)
      })
  
    } catch (error) {
      console.log('Error deportes:', error)
    }
  }
  
  cargarDeportes()