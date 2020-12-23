export const radioPlayerInit = () => {

    const radioNavigation = document.querySelector('.radio-navigation')
    const radioCoverImg = document.querySelector('.radio-cover__img')
    const radio = document.querySelector('.radio')
    const radioItem = document.querySelectorAll('.radio-item')
    const radioStop = document.querySelector('.radio-stop')
    const radioHeaderBig = document.querySelector('.radio-header__big')
    const radioVolume = document.querySelector('.radio-volume__range')
    const volumeDown = document.querySelector('.radio-volume-down')
    const volumeUp = document.querySelector('.radio-volume-up')

    const audio = new Audio()
    audio.type = 'audio/acc'

    const changeIconPlay = () => {
        if (audio.paused) {
            radio.classList.remove('play')
            radioStop.classList.add('fa-play')
            radioStop.classList.remove('fa-pause')
            radioStop.style.outline = 'none'
        } else {
            radio.classList.add('play')
            radioStop.classList.add('fa-pause')
            radioStop.classList.remove('fa-play')
            radioStop.style.outline = 'none'
        }
    }

    const selectItem = (elem) => {
        radioItem.forEach(i => {
            i.classList.remove('select')
            elem.classList.add('select')
        })
    }

    const volumeDownBtn = () => {
        audio.muted = true
        volumeDown.classList.remove('fa-volume-down')
        volumeDown.classList.add('fa-volume-off')
        radioVolume.value = 0
    }

    const volumeUpBtn = () => {
        audio.muted = false
        radioVolume.value = 80
        audio.volume =  radioVolume.value / 100
    }

    const checkVolumeIcon = () => {
        if (radioVolume.value <= 0) {
            volumeDown.classList.remove('fa-volume-down')
            volumeDown.classList.add('fa-volume-off')
        } else {
            volumeDown.classList.remove('fa-volume-off')
            volumeDown.classList.add('fa-volume-down')
        }
    }

    radioStop.disabled = true

    radioNavigation.addEventListener('change', event => {
        const target = event.target
        const parrent = target.closest('.radio-item')
        const title = parrent.querySelector('.radio-name').textContent
        const urlImg = parrent.querySelector('.radio-img').src
        const radioStantion = target.dataset.radioStantion


        selectItem(parrent)


        audio.src = radioStantion
        radioStop.disabled = false

        audio.play()
        changeIconPlay()

        radioHeaderBig.textContent = title

        radioCoverImg.src = urlImg
    })

    radioStop.addEventListener('click', () => {

        if (audio.paused) {
            audio.play()
        } else {
            audio.pause()
        }
        changeIconPlay()
    })

    radioVolume.addEventListener('input', () => {
        audio.volume = radioVolume.value / 100
        audio.muted = false

        if (radioVolume.value >= 1) {
            volumeDown.classList.remove('fa-volume-off')
            volumeDown.classList.add('fa-volume-down')
        }
        checkVolumeIcon()
    })

    volumeDown.addEventListener('click', volumeDownBtn)

    volumeUp.addEventListener('click', volumeUpBtn)
    

}

