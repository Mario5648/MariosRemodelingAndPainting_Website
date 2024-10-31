const faqQuestionAnswerMap = 
{
    1:"We provide a full range of remodeling services for both residential and commercial spaces, including kitchens, bathrooms, living spaces, offices, and entire property renovations. No project is too big or too small for our skilled team.",
    2:"Starting your project is easy! Just give us a call or fill out the contact form on our website. We'll schedule a consultation to discuss your needs, preferences, and budget, followed by a detailed proposal outlining the scope and timeline of your project.",
    3:"Absolutely. We pride ourselves on our ability to create beautiful, functional spaces within a variety of budgets. During our initial consultation, we'll discuss your budget and tailor our services to meet your financial requirements without compromising on quality.",
    4:"The duration of your project depends on the scope and complexity of the work. We'll provide a detailed timeline with our proposal, so you know what to expect every step of the way. We strive to minimize disruption and complete your project efficiently, without sacrificing quality.",

}

function minimizeAllFaqAnswers()
{
    let answerBoxId = '';
    for(let questionNumber = 1; questionNumber < 5; questionNumber += 1)
    {
        answerBoxId = "faqBoxAnswer" + questionNumber.toString()
        if (document.getElementById(answerBoxId).innerHTML != ``)
        {
            minimizeFaqAnswer(questionNumber);
        }
    }
}

function generateFaqAnswer(questionNumber)
{
    minimizeAllFaqAnswers();

    let boxId = "faqBox" + questionNumber.toString()
    let answerBoxId = "faqBoxAnswer" + questionNumber.toString()
    document.getElementById(answerBoxId).innerHTML = `<p>${faqQuestionAnswerMap[questionNumber]} <br><br><button class="normalButton" onclick="minimizeFaqAnswer(${questionNumber})">Hide Answer</button></p>`;
}

function minimizeFaqAnswer(questionNumber)
{
    let boxId = "faqBox" + questionNumber.toString()
    let answerBoxId = "faqBoxAnswer" + questionNumber.toString()
    document.getElementById(answerBoxId).innerHTML = ``;
}

// References to DOM Elements
var prevBtn = document.getElementById("prev-btn");
var nextBtn = document.getElementById("next-btn");
var book = document.getElementById("book");

var paper1 = document.getElementById("p1");
var paper2 = document.getElementById("p2");
var paper3 = document.getElementById("p3");


// Business Logic
let currentLocation = 1;
let numOfPapers = 2;
let maxLocation = numOfPapers + 1;

function openBook() {
    document.getElementById("book").style.transform = "translateX(50%)";
}

function closeBook(isAtBeginning) {
    if(isAtBeginning) {
        document.getElementById("book").style.transform = "translateX(0%)";
    } else {
        document.getElementById("book").style.transform = "translateX(100%)";
    }
}

function goNextPage() {
    if(currentLocation < maxLocation) {
        switch(currentLocation) {
            case 1:
                openBook();
                document.getElementById("p1").classList.add("flipped");
                document.getElementById("p1").style.zIndex = 1;
                break;
            case 2:
                document.getElementById("p2").classList.add("flipped");
                document.getElementById("p2").style.zIndex = 2;
                closeBook(false);
                break;
            default:
                throw new Error("unkown state");
        }
        currentLocation++;
    }
}

function goPrevPage() {
    if(currentLocation > 1) {
        switch(currentLocation) {
            case 2:
                closeBook(true);
                document.getElementById("p1").classList.remove("flipped");
                document.getElementById("p2").classList.remove("flipped");
                document.getElementById("p2").style.zIndex = 1;
                document.getElementById("p1").style.zIndex = 2;
                break;
            case 3:
                openBook();
                document.getElementById("p2").classList.remove("flipped");
                document.getElementById("p2").style.zIndex = 1;
                break;

            default:
                throw new Error("unkown state");
        }

        currentLocation--;
    }
}

function renderMobileMenu()
{
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

function sendMessageOnClick()
{
    document.getElementById("sendMessageButton").disabled = true;
    sendMessage( function(responseMessage)
        {

            if(responseMessage == "Successfully sent message!")
            {
                alert(responseMessage);
                location.reload();
            }else
            {
                alert(responseMessage);
                document.getElementById("sendMessageButton").disabled = false;
            }
        });
}

function sendMessage(callBack = null)
{

    let params = {
        "organization": "marioRP",
        "token": "fc06cbcca471b485bb756a240c876bf2341ddb44a70b7e68d3ae6d82f5e5e177",
        "name" : document.getElementById("clientName").value,
        "reason" : document.getElementById("clientReason").value,
        "email" : document.getElementById("clientEmail").value,
        "message": document.getElementById("clientMessage").value
    };
    
    endpointCall("sendMessage", params, function(data)
                                {
                                    //Store id and name in cookies for later use
                                    if(data["status"] == "success")
                                    {
                                        callBack('Successfully sent message!');
                                    }else if(data["status"] == "failed")
                                    {
                                        callBack("Failed to send message. Please try again!");
                                    }
                                });
}