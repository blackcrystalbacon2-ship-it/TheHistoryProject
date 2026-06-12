
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.size = Math.random() * 5 + 2;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;

        this.life = 1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        this.life -= 0.02;
        this.size *= 0.98;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.life;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = "red";
        ctx.fill();

        ctx.restore();
    }
}

window.addEventListener("mousemove", e => {
    for (let i = 0; i < 3; i++) {
        particles.push(new Particle(e.clientX, e.clientY));
    }
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();

        if (particles[i].life <= 0) {
            particles.splice(i, 1);
        }
    }

    requestAnimationFrame(animate);
}

animate();

const infoPara = document.getElementById('infoParagraph');
const texts = [
    "My name is Adem & I think I found a problem in Springfield...",
    "Welcome to My Civics Website on Awareness of Springfield Safety.",
    "My goal is to spread awareness of where the safe and dangerous parts of Springfield are located, and to suggest ways of addressing safety concerns in the dangerous parts.",
    "I have a few small steps that can help with the safety problem, but first let me explain why this problem matters to me, how it affects non-residents looking to move into the area, and  why it is important to local activists who want to make their homes safer.",
    "Springfield has a problem with a negative stigma - people think that it is a dangerous place to visit, live, and start a business.",
    "This can affect local buisnesses and cause people to loose opprotunities to create a successful buisness because the reputation of Springfield drives customers away to other towns they think are safer...",
    "Local residents have taken actions to try and fix this problem.  For example, Paul Tuthill has shared his ideas for the defense of existing buisness owners and future big buisnesses. Check his work out in this <a id='LinkedText' href='https://www.wamc.org/new-england-news/2013-06-21/plan-aims-to-change-public-safety-perception-of-downtown-springfield'>WAMC Article</a>",
    "People wanting to start a business can also target the safest neighborhoods.  There are even many crime maps that show parts of Springfield from most dangerous to most safe like this one, <a id='LinkedText' href='https://crimegrade.org/safest-places-in-springfield-ma/'>this crime map.</a> you can download crime info on this website.",
    "I may be risking backlash from 'Dangerous' parts by promoting safer parts over the possibly dangerous parts, but thats why I also want the neighborhoods with less saftety to have support and information to help them improve their safety and reputation",
    "A personal example showing this problem is real is a local buisness, <a id = 'LinkedText' href='https://www.bumpysma.com'>Bumpys Natural and Organic Foods,</a> I loved this store and came to it every once in awhile, but every time I went, I noticed that barely anyone went there. Even the owner would show up sometimes and be the cashier because he couldn't afford to pay an employee! And now after financial struggles caused by a lack of awareness that East Forest Park is a very safe area, Bumpy's is permanantly closed. I think this was caused by Springfield's perception issues.",
    "An example elsewhere of a solution to a similar problem working is from <a id = 'LinkedText' href='https://www.urban.org/stories/creating-lasting-change-through-community-leadership'>Camden, New Jersey</a> where the public image was that the area was hopeless, stuck in a cycle of poverty. You can read more about it from the link."
    ,"Scope of Work and Personal Investment: I created this website within a day not including revisions and used 3 planning doccuments in order to execute this website.   I was able to use my interest in javascript.  In addition to wantingto solve the problem, getting a good grade nmotivated me to put extra effort into this project.",
    "My mother is a supporter of my project because she wants to start a business in Springfield but has seen that clients don't want to come here for services.  She supports action that would improve the image of Springfield because it would make it easier for her to launch her business."
    ,"To help spread awareness of this problem, you can make a donation to support local neighborhood crime watch crews in Springfield: <a id = 'DonateSite' href = 'Funding.html'>Site</a> ",

];
let keybindenabled = false;
let currentIndex = 0;
function updateText() {
    infoPara.innerHTML = texts[currentIndex];
}
document.addEventListener('keydown', function(event) {

    if (!keybindenabled) return;

    if (event.key === '.') {
       if (currentIndex < texts.length - 1) {
            currentIndex++;
            updateText();
        }

    } else if (event.key === ',') {
        if (currentIndex > 0) {
            currentIndex--;
            updateText();
        }

    }
});

updateText();

setTimeout(() => {
    document.getElementById("infoParagraph").textContent = "Use < to go back and > to move forward";
    keybindenabled = true;
}, 6000);
