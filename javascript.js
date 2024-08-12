const typingText = document.querySelector('.typing-text p');
const input = document.querySelector('.wrapper .input-field');
const time = document.querySelector('.time span b');
const mistakes = document.querySelector('.mistake span b');
const wpm = document.querySelector('.wpm span b');
const cpm = document.querySelector('.cpm span b');
const btn = document.querySelector('button');


// set values
let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistake = 0;
let isTyping = false;

function loadParagraph(){
    const paragraph = [
        "Mastering typing speed requires a blend of practice, technique, and proper tools. Regular exercises focusing on accuracy and speed can help typists develop muscle memory and enhance their overall performance. Tools like typing tests and software can track progress and offer tailored drills to target specific areas for improvement.",
        
        "Achieving high typing speed involves more than just rapid keystrokes; it demands precise finger placement and consistent practice. Utilizing ergonomic keyboards and practicing touch typing can significantly improve both speed and accuracy. Incorporating typing games and challenges can also make the learning process engaging and effective.",
        
        "To reach optimal typing speeds, it’s essential to practice with various text formats and complexity levels. Typing drills that include diverse vocabulary and punctuation can help prepare for real-world typing scenarios. Regularly assessing performance and setting incremental goals can keep motivation high and progress steady."
    ]

    const randomIndex = Math.floor(Math.random()* paragraph.length)
    typingText.innerHTML = ""
    for(let char of paragraph[randomIndex])
       { 

        typingText.innerHTML += `<span>${char}</span>` 
       }
     typingText.querySelectorAll('span')[0].classList.add('active');
     document.addEventListener('keydown',()=>{
        input.focus()
     })
     typingText.addEventListener("click",()=>{
        input.focus()
     })
}

// handle user Input
function initTyping(){
    let char = typingText.querySelectorAll('span');
    let typedChar = input.value.charAt(charIndex);
    console.log('t',typedChar)
    if(charIndex < char.length && timeLeft >0){
        if(!isTyping){
            timer = setInterval(initTime,1000);
            isTyping = true;
        }
       
        // console.log('char[charIndex].innerText',char[charIndex].innerText === typedChar)
        if(char[charIndex].innerText === typedChar){
            // console.log('char',typedChar)
            char[charIndex].classList.add('correct');
            // console.log('correct')
            charIndex++;
        }
        else {
            mistake++;
            // console.log('charelse', char[charIndex])
            char[charIndex].classList.add('incorrect');
            // console.log('incorrect')
            charIndex++;
        }
        // charIndex++;
        mistakes.innerText = mistake;
        cpm.innerText = charIndex - mistake;

    }
    else {
        clearInterval(timer)
        input.value = '';
    }
}


function initTime(){
    if(timeLeft > 0){
        timeLeft-- ;   
         time.innerText = timeLeft;
         let wpmval = Math.round(((charIndex - mistake)/5)/(maxTime - timeLeft)*60);
         wpm.innerText = wpmval;
    }
    else{
        clearInterval(timer)
    }

}

function reset(){
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    time.innerText = timeLeft;
    input.value = '';
     charIndex = 0;
     mistake = 0;
     isTyping = false;
     wpm.innerText = 0;
     cpm.innerText = 0;
     mistake.innerText =0;
}
input.addEventListener("input",initTyping);
btn.addEventListener('click',reset)
loadParagraph();


