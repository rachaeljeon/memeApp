import { memesData } from './data.js'

const emotionRadios = document.getElementById('emotion-radios')
const getImgButton = document.getElementById('get-image-btn')
const gifsOnlyOption = document.getElementById('gifs-only-option')
const memeModal = document.getElementById('meme-modal')
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn')

// 1. List out all emotions existing in data (incl. duplicates) into one place
function getEmotionArray(memes) {

    let emotionsArr = []
    
    for (let meme of memes) {
        for (let emotion of meme.emotionTags) {
            // 3. remove duplicates
            if (!emotionsArr.includes(emotion)) {
                emotionsArr.push(emotion)
            }
        }
    }
    return emotionsArr
}

// 2. Put each emotion into its own radio input in HTML
function renderEmotionsRadio(memes) {
    
    let radioItems = ``
    const allEmotions = getEmotionArray(memes)
    console.log("allEmotions: ", allEmotions)

    for (let emotion of allEmotions) {
        
        radioItems += `
        <div class="radio">
            <label>${emotion}</label>
            <input
                type="radio"
                id=${emotion}
                value=${emotion}
                name="emotions"
            >
        </div>
        `
    }
    emotionRadios.innerHTML = radioItems
}

renderEmotionsRadio(memesData)

emotionRadios.addEventListener('change', highlightCheckedOption)

// 4 && 5 : Highlight selected option
function highlightCheckedOption(e) {
    
    // 5. UN-highlight all the other NON selected options (via grabbing all common class names)
    const allRadios = document.getElementsByClassName('radio')

    for (let radio of allRadios){
        radio.classList.remove('highlight')
    }
 
    // 4. Add color to the element of the targeted ID
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

getImgButton.addEventListener('click', renderMeme)

// 6 && 7 : Find appropriate meme object
function getMatchingMemesArray() {
    
    // 6. Find all meme data objects that has matching emotion
    if (document.querySelector('input[type="radio"]:checked')) {
        
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
        const isGif = gifsOnlyOption.checked

        console.log("isGif: ", isGif)

        const matchingMemesArray = memesData.filter(function(meme){

            // 7. ...pick specifically ones if checkbox is checked
            if (isGif) {
                return meme.emotionTags.includes(selectedEmotion) && meme.isGif
            } else {
                return meme.emotionTags.includes(selectedEmotion)
            }
        })
        return matchingMemesArray
    }
}

// 8 : Pick one meme object 
function singleEmotionObject() {

    const matchingMemesArr = getMatchingMemesArray()

    console.log("matchingMemesArr: ", matchingMemesArr)

    if (matchingMemesArr.length === 1){
        return matchingMemesArr[0]
    } else {
        return matchingMemesArr[Math.floor(Math.random() * matchingMemesArr.length)]
    }

}

// 9 : Render meme in HTML modal
function renderMeme() {
    
    const singleMeme = singleEmotionObject()
    
    console.log("singleMeme: ", singleMeme)

    memeModalInner.innerHTML = `
    <img
        class="emotion"
        src="./images/${singleMeme.image}"
        alt=${singleMeme}
    >
    `
    memeModal.style.display = 'flex'
}

memeModalCloseBtn.addEventListener('click', closeModal)

// 10 : Close modal
function closeModal(e){
    memeModal.style.display = 'none'
}