export const videoPlayerInit = () => {


    const videoPlayer = document.querySelector('.video-player')
    const videoButtonPlay = document.querySelector('.video-button__play')
    const videoButtonStop = document.querySelector('.video-button__stop')
    const videoTimePassed = document.querySelector('.video-time__passed')
    const videoProgress = document.querySelector('.video-progress')
    const videoTimeTotal = document.querySelector('.video-time__total')
    const videoVolume = document.querySelector('.video-volume__range')
    const volumeDown = document.querySelector('.fa-volume-down')
    const volumeUp = document.querySelector('.fa-volume-up')


    const toggleIcon = () => {
        if (videoPlayer.paused) {
            videoButtonPlay.classList.remove('fa-pause')
            videoButtonPlay.classList.add('fa-play')
        } else {
            videoButtonPlay.classList.add('fa-pause')
            videoButtonPlay.classList.remove('fa-play')
        }
    }

    const togglePlay = () => {
        if (videoPlayer.paused) {
            videoPlayer.play()
        } else {
            videoPlayer.pause()
        }
        toggleIcon()
    }

    const stopPlay = () => {
        videoPlayer.pause()
        videoPlayer.currentTime = 0
        videoButtonPlay.classList.remove('fa-pause')
        videoButtonPlay.classList.add('fa-play')
    }

    const addZero = n => n < 10 ? '0' + n : n

    const volumeDownBtn = () => {
        videoPlayer.muted = true
        volumeDown.classList.remove('fa-volume-down')
        volumeDown.classList.add('fa-volume-off')
        videoVolume.value = 0
    }

    const volumeUpBtn = () => {
        videoPlayer.muted = false
        videoVolume.value = 80
        videoPlayer.volume =  videoVolume.value / 100
    }

    videoButtonPlay.addEventListener('click', togglePlay)
    videoPlayer.addEventListener('click', togglePlay)

    videoButtonStop.addEventListener('click', stopPlay)


    videoPlayer.addEventListener('timeupdate', () => {
        const currentTime = videoPlayer.currentTime
        const duration = videoPlayer.duration

        videoProgress.value = (currentTime / duration) * 100

        let minutesPassed = Math.floor(currentTime / 60)
        let secondsPassed = Math.floor(currentTime % 60)

        let totalMinute = Math.floor(duration / 60)
        let totalSeconds = Math.floor(duration % 60)


        videoTimeTotal.textContent = `${addZero(totalMinute)}:${addZero(totalSeconds)}`
        videoTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`
    })

    videoProgress.addEventListener('change', () => {
        const duration = videoPlayer.duration
        const value = videoProgress.value

        videoPlayer.currentTime = (value / duration) * 100

    })

    videoVolume.addEventListener('input', () => {
        videoPlayer.volume = videoVolume.value / 100
        videoPlayer.muted = false

        if (videoVolume.value >= 1) {
            volumeDown.classList.remove('fa-volume-off')
            volumeDown.classList.add('fa-volume-down')
        }
    })

    volumeDown.addEventListener('click', volumeDownBtn)

    volumeUp.addEventListener('click', volumeUpBtn)
}

