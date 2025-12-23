let filters = {
    brightness: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    contrast: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },

    saturation: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    hueRotation: {
        value: 0,
        min: 0,
        max: 360,
        unit: "deg"
    },
    blur: {
        value: 0,
        min: 0,
        max: 20,
        unit: "px"
    },
    grayscale: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    sepia: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    opacity: {
        value: 100,
        min: 0,
        max: 100,
        unit: "%"
    },
    invert: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    }
}

const filterContainer = document.querySelector(".filters");
const imageCanvas = document.getElementById("image-canvas");
const imageInput = document.getElementById("image-input");
const canvasCtx = imageCanvas.getContext("2d");
const imagePlaceholder = document.querySelector(".placeholder")
const resetBtn = document.getElementById("reset")
const downloadBtn = document.getElementById("download")
const presetsContainer = document.querySelector(".presets")
let originalImg = null;
function createFilterElement(name, unit = "%", value, min, max) {
    const div = document.createElement("div");
    div.classList.add("filter")

    const input = document.createElement("input");
    input.classList.add("slider")
    input.type = "range"
    input.min = min
    input.max = max
    input.value = value
    input.name = name
    input.id = name

    const p = document.createElement("p")
    p.innerText = name

    div.append(p)
    div.append(input)

    input.addEventListener("input", (e) => {
        const { name, value } = e.target;
        filters[name].value = value;
        applyFilters()
    });


    return div;
}

function createFilters() {
    Object.keys(filters).forEach(key => {
        const filterElement = createFilterElement(key, filters[key].unit, filters[key].value, filters[key].min, filters[key].max)
        filterContainer.appendChild(filterElement)
    })
}
createFilters()

imageInput.addEventListener("change", (e) => {
    const file = e.target.files[0]
    imagePlaceholder.style.display = "none"

    const img = new Image()
    img.src = URL.createObjectURL(file)

    img.onload = () => {
        originalImg = img;
        imageCanvas.width = img.width
        imageCanvas.height = img.height
        canvasCtx.drawImage(img, 0, 0)
        applyFilters()
    }
})

function applyFilters() {
    if (!originalImg) return; // no image yet

    canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);

    canvasCtx.filter = `
    brightness(${filters.brightness.value}${filters.brightness.unit})
    contrast(${filters.contrast.value}${filters.contrast.unit})
    saturate(${filters.saturation.value}${filters.saturation.unit})
    hue-rotate(${filters.hueRotation.value}${filters.hueRotation.unit})
    blur(${filters.blur.value}${filters.blur.unit})
    grayscale(${filters.grayscale.value}${filters.grayscale.unit})
    sepia(${filters.sepia.value}${filters.sepia.unit})
    opacity(${filters.opacity.value}${filters.opacity.unit})
    invert(${filters.invert.value}${filters.invert.unit})
  `;

    canvasCtx.drawImage(originalImg, 0, 0);
}

resetBtn.addEventListener("click", () => {
    filters = {
        brightness: {
            value: 100,
            min: 0,
            max: 200,
            unit: "%"
        },
        contrast: {
            value: 100,
            min: 0,
            max: 200,
            unit: "%"
        },

        saturation: {
            value: 100,
            min: 0,
            max: 200,
            unit: "%"
        },
        hueRotation: {
            value: 0,
            min: 0,
            max: 360,
            unit: "deg"
        },
        blur: {
            value: 0,
            min: 0,
            max: 20,
            unit: "px"
        },
        grayscale: {
            value: 0,
            min: 0,
            max: 100,
            unit: "%"
        },
        sepia: {
            value: 0,
            min: 0,
            max: 100,
            unit: "%"
        },
        opacity: {
            value: 100,
            min: 0,
            max: 100,
            unit: "%"
        },
        invert: {
            value: 0,
            min: 0,
            max: 100,
            unit: "%"
        }
    }
    applyFilters()
    filterContainer.innerHTML = ""
    createFilters()

})

downloadBtn.addEventListener("click",()=>{
    const link = document.createElement("a")
    link.download = "edited-image.png"
    link.href = imageCanvas.toDataURL()
    link.click()
})

const presets = {
  normal: {
    brightness: 100,
    contrast: 100,
    saturation: 100,
    hueRotation: 0,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0
  },

  drama: {
    brightness: 105,
    contrast: 140,
    saturation: 120,
    hueRotation: 0,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0
  },

  vintage: {
    brightness: 110,
    contrast: 90,
    saturation: 80,
    hueRotation: 10,
    blur: 0,
    grayscale: 10,
    sepia: 35,
    opacity: 100,
    invert: 0
  },

  oldSchool: {
    brightness: 95,
    contrast: 85,
    saturation: 70,
    hueRotation: 0,
    blur: 1,
    grayscale: 25,
    sepia: 45,
    opacity: 100,
    invert: 0
  },

  blackAndWhite: {
    brightness: 100,
    contrast: 120,
    saturation: 0,
    hueRotation: 0,
    blur: 0,
    grayscale: 100,
    sepia: 0,
    opacity: 100,
    invert: 0
  },

  cinematic: {
    brightness: 100,
    contrast: 130,
    saturation: 110,
    hueRotation: -5,
    blur: 0,
    grayscale: 0,
    sepia: 5,
    opacity: 100,
    invert: 0
  },

  warm: {
    brightness: 105,
    contrast: 100,
    saturation: 115,
    hueRotation: 8,
    blur: 0,
    grayscale: 0,
    sepia: 20,
    opacity: 100,
    invert: 0
  },

  cool: {
    brightness: 100,
    contrast: 105,
    saturation: 90,
    hueRotation: -10,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0
  },

  faded: {
    brightness: 110,
    contrast: 80,
    saturation: 70,
    hueRotation: 0,
    blur: 0,
    grayscale: 10,
    sepia: 10,
    opacity: 100,
    invert: 0
  },

  inverted: {
    brightness: 100,
    contrast: 100,
    saturation: 100,
    hueRotation: 0,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 100
  }
};

Object.keys(presets).forEach(presetname=>{
    const presetBtn = document.createElement("button")
    presetBtn.classList.add("preset-btn")
    presetBtn.innerText = presetname
    presetsContainer.appendChild(presetBtn)

    presetBtn.addEventListener("click",()=>{
        const preset = presets[presetname]
        
        Object.keys(preset).forEach(filterName=>{
            filters[filterName].value = preset[filterName]
        })
        applyFilters()
        filterContainer.innerHTML = ""
        createFilters()
    })
})