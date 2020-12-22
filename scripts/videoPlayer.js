export const videoPlayerInit = () => {


    const videoPlayer = document.querySelector('.video-player')
    const videoButtonPlay = document.querySelector('.video-button__play')
    const videoButtonStop = document.querySelector('.video-button__stop')
    const videoTimePassed = document.querySelector('.video-time__passed')
    const videoProgress = document.querySelector('.video-progress')
    const videoTimeTotal = document.querySelector('.video-time__total')

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

}

