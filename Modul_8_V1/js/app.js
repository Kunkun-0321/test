(function () {
  const story = document.getElementById('story');
  const progressBar = document.getElementById('progressBar');
  const pageNow = document.getElementById('pageNow');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dashboardBtn = document.getElementById('dashboardBtn');
  const slides = Array.from(document.querySelectorAll('.slide'));

  function currentIndex() {
    const top = story.scrollTop;
    let idx = 0;
    let best = Infinity;

    slides.forEach((el, i) => {
      const dist = Math.abs(el.offsetTop - top);
      if (dist < best) {
        best = dist;
        idx = i;
      }
    });

    return idx;
  }

  function goTo(index) {
    const safeIndex = Math.min(Math.max(index, 0), slides.length - 1);
    slides[safeIndex]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function updateProgress() {
    const max = story.scrollHeight - story.clientHeight;
    const pct = max <= 0 ? 0 : (story.scrollTop / max) * 100;

    progressBar.style.width = `${pct}%`;
    pageNow.textContent = `${currentIndex() + 1} / ${slides.length}`;
  }



  function initMaps() {
    if (typeof window.initStoryMaps === 'function') {
      window.initStoryMaps();
    }
  }

  function initR5TrendChart() {
    const canvas = document.getElementById('r5TrendChart');
    if (!canvas || typeof Chart === 'undefined') return;
    if (canvas.dataset.ready === '1') return;

    canvas.dataset.ready = '1';

    const r5 = window.storyData?.r5 || {};
    const labels = r5.monthLabels || ['Jan', 'Feb', 'Mar', 'Apr', 'Mei'];
    const root = getComputedStyle(document.documentElement);

    const colorInk = root.getPropertyValue('--ink').trim() || '#263B4E';
    const colorTeal = root.getPropertyValue('--teal').trim() || '#168573';
    const colorBlue = root.getPropertyValue('--blue').trim() || '#6FA1C9';
    const colorOrange = root.getPropertyValue('--orange').trim() || '#F47B2F';
    const fontBody = root.getPropertyValue('--font-body').trim() || 'DM Sans, system-ui, sans-serif';

    const toData = series => labels.map(month => {
      const item = series.find(row => row.month === month);
      return item ? item.value : null;
    });

    new Chart(canvas, {
      type: 'line',
      data: {
        labels,
          datasets: [
            {
              label: 'Rata-rata',
              data: toData(r5.monthlySeries || r5.series || []),
              borderColor: colorInk,
              backgroundColor: colorInk,
              borderWidth: 3,
              pointRadius: 6,
              pointHoverRadius: 8,
              pointBackgroundColor: colorInk,
              pointBorderColor: colorInk,
              pointBorderWidth: 0,
              pointHoverBackgroundColor: colorInk,
              pointHoverBorderColor: colorInk,
              pointHoverBorderWidth: 0,
              tension: 0.35,
              fill: false
            },
            {
              label: 'Aceh',
              data: toData(r5.byProvinceMonthly?.['Aceh'] || []),
              borderColor: colorTeal,
              backgroundColor: colorTeal,
              borderWidth: 2.5,
              pointRadius: 5.5,
              pointHoverRadius: 7.5,
              pointBackgroundColor: colorTeal,
              pointBorderColor: colorTeal,
              pointBorderWidth: 0,
              pointHoverBackgroundColor: colorTeal,
              pointHoverBorderColor: colorTeal,
              pointHoverBorderWidth: 0,
              tension: 0.35,
              fill: false
            },
            {
              label: 'Sumatera Barat',
              data: toData(r5.byProvinceMonthly?.['Sumatera Barat'] || []),
              borderColor: colorOrange,
              backgroundColor: colorOrange,
              borderWidth: 2.5,
              pointRadius: 5.5,
              pointHoverRadius: 7.5,
              pointBackgroundColor: colorOrange,
              pointBorderColor: colorOrange,
              pointBorderWidth: 0,
              pointHoverBackgroundColor: colorOrange,
              pointHoverBorderColor: colorOrange,
              pointHoverBorderWidth: 0,
              tension: 0.35,
              fill: false
            },
            {
              label: 'Sumatera Utara',
              data: toData(r5.byProvinceMonthly?.['Sumatera Utara'] || []),
              borderColor: colorBlue,
              backgroundColor: colorBlue,
              borderWidth: 2.5,
              pointRadius: 5.5,
              pointHoverRadius: 7.5,
              pointBackgroundColor: colorBlue,
              pointBorderColor: colorBlue,
              pointBorderWidth: 0,
              pointHoverBackgroundColor: colorBlue,
              pointHoverBorderColor: colorBlue,
              pointHoverBorderWidth: 0,
              tension: 0.35,
              fill: false
            }
          ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              boxWidth: 10,
              boxHeight: 10,
              usePointStyle: true,
              color: colorInk,
              font: {
                family: fontBody,
                weight: 800
              }
            }
          },
          tooltip: {
            callbacks: {
              label: context => `${context.dataset.label}: ${context.parsed.y.toFixed(1).replace('.', ',')}%`
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: root.getPropertyValue('--ink-2').trim() || '#3E5D76',
              font: {
                family: fontBody,
                weight: 800
              }
            }
          },
          y: {
            suggestedMin: 50,
            suggestedMax: 90,
            ticks: {
              color: root.getPropertyValue('--ink-2').trim() || '#3E5D76',
              font: {
                family: fontBody,
                weight: 800
              },
              callback: value => `${value}%`
            },
            grid: {
              color: 'rgba(38,59,78,.12)'
            }
          }
        }
      }
    });
  }

  function initCarousel(carouselId) {
    const wrapper = document.getElementById(carouselId);
    if (!wrapper) return;

    const carousel = wrapper.querySelector('.map-carousel');
    const indicators = wrapper.querySelectorAll('.indicator');
    const items = wrapper.querySelectorAll('.map-carousel-item');
    
    if (!carousel || items.length === 0) return;

    let currentIndex = 0;
    let autoPlayInterval = null;
    let isPaused = false;

    function updateCarousel() {
      carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
      
      indicators.forEach((ind, i) => {
        ind.classList.toggle('active', i === currentIndex);
      });

      items.forEach((item, i) => {
        item.classList.toggle('active', i === currentIndex);
      });

      // Initialize maps for current item
      setTimeout(() => {
        const activeItem = items[currentIndex];
        const maps = activeItem.querySelectorAll('.leaflet-map');
        maps.forEach(map => {
          if (map.dataset.ready !== '1' && typeof window.initStoryMaps === 'function') {
            window.initStoryMaps();
          }
        });
      }, 100);
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % items.length;
      updateCarousel();
    }

    function startAutoPlay() {
      if (autoPlayInterval) clearInterval(autoPlayInterval);
      autoPlayInterval = setInterval(nextSlide, 3000);
    }

    function stopAutoPlay() {
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
      }
    }

    function goToSlide(index) {
      currentIndex = Math.min(Math.max(index, 0), items.length - 1);
      updateCarousel();
    }

    // Event listeners
    wrapper.addEventListener('mouseenter', stopAutoPlay);
    wrapper.addEventListener('mouseleave', startAutoPlay);

    indicators.forEach(indicator => {
      indicator.addEventListener('click', () => {
        goToSlide(parseInt(indicator.dataset.index, 10));
        stopAutoPlay();
        setTimeout(startAutoPlay, 500);
      });
    });

    updateCarousel();
    startAutoPlay();
  }

  function initR2ProvinceCarousel() {
  const wrapper = document.getElementById('r2ProvinceCarousel');
  if (!wrapper) return;
  if (wrapper.dataset.ready === '1') return;

  wrapper.dataset.ready = '1';

  const slides = Array.from(wrapper.querySelectorAll('.r2-province-slide'));
  const dots = Array.from(wrapper.querySelectorAll('.r2-carousel-dots button'));

  if (slides.length === 0) return;

  let index = 0;
  let timer = null;

  function show(nextIndex) {
    index = (nextIndex + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  function stop() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  function start() {
    stop();
    timer = setInterval(() => {
      show(index + 1);
    }, 5000);
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const nextIndex = Number(dot.dataset.r2Index);
      show(Number.isFinite(nextIndex) ? nextIndex : 0);
      start();
    });
  });

  wrapper.addEventListener('mouseenter', stop);
  wrapper.addEventListener('mouseleave', start);

  show(0);
  start();
}

function initR1ProvinceCarousel() {
  const wrapper = document.getElementById('r1ProvinceCarousel');
  if (!wrapper) return;
  if (wrapper.dataset.ready === '1') return;

  wrapper.dataset.ready = '1';

  const slides = Array.from(wrapper.querySelectorAll('.r1-province-slide'));
  const dots = Array.from(wrapper.querySelectorAll('.r1-carousel-dots button'));

  if (slides.length === 0) return;

  let index = 0;
  let timer = null;

  function show(nextIndex) {
    index = (nextIndex + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  function stop() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  function start() {
    stop();
    timer = setInterval(() => {
      show(index + 1);
    }, 5000);
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const nextIndex = Number(dot.dataset.r1Index);
      show(Number.isFinite(nextIndex) ? nextIndex : 0);
      start();
    });
  });

  wrapper.addEventListener('mouseenter', stop);
  wrapper.addEventListener('mouseleave', start);

  show(0);
  start();
}

  story.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', () => {
    updateProgress();
    window.setTimeout(initMaps, 80);
  });

  prevBtn.addEventListener('click', () => goTo(currentIndex() - 1));
  nextBtn.addEventListener('click', () => goTo(currentIndex() + 1));

  window.addEventListener('keydown', event => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') goTo(currentIndex() + 1);
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') goTo(currentIndex() - 1);
  });

  dashboardBtn?.addEventListener('click', () => {
    window.alert('Hubungkan tombol ini ke dashboard interaktif final.');
  });

  initR5TrendChart();
  initMaps();
  // Ensure per-slide counters are correct: "X / total" for all slides
  // except the last slide which should not show a page number.
  function normalizeSlideCounts() {
    const slideEls = Array.from(document.querySelectorAll('section.slide'));
    const total = slideEls.length;
    slideEls.forEach((el, i) => {
      const counter = el.querySelector('.slide-count');
      if (!counter) return;
      if (i === total - 1) {
        // last slide: show a thank-you label instead of a number
        counter.textContent = 'Terima Kasih';
      } else {
        counter.textContent = `${i + 1} / ${total}`;
      }
    });
  }

  normalizeSlideCounts();
  updateProgress();
  initCarousel('slide3-carousel');
  initCarousel('slide5-carousel');
  initCarousel('slide6-carousel');
  initR2ProvinceCarousel();
  initR1ProvinceCarousel();
}());
