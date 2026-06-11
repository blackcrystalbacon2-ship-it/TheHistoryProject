
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
    "My goal is to spread awareness of the safe and dangerous parts of springfield, along with fixing problems in the dangerous parts.",
    "I have a few small steps that can help with this problem, but first let me explain why I think this problem matters to me and could be important to non-residents looking to move and Activists who want to change their home.",
    "Springfield has a problem with people who think that it is a dangerous place to visit or live,",
    "This can affect local buisnesses and cause people to loose opprotunities to create a great buisness...",
    "There have been many actions to try and fix this problem, like Paul Tuthill who has ideas for the defense of existing buisness owners and future big buisnesses, check his work out in this <a id='LinkedText' href='https://www.wamc.org/new-england-news/2013-06-21/plan-aims-to-change-public-safety-perception-of-downtown-springfield'>WAMC Article</a>",
    "There are even many crime maps that show parts of Springfield from most dangerous to most safe like, <a id='LinkedText' href='https://nibrs.fbi.gov/2024/'>this crime map reccomended by the governments, .</a> you can download crime info on this website.",
    "I may be risking backlash from 'Dangerous' parts by promoting safer parts over the possibly dangerous parts, but thats why I also want the ones with less saftety to improve",
    "A personal example showing this problem is real is a local buisness, <a id = 'LinkedText' href='https://www.bumpysma.com'>Bumpys Natural and Organic Foods,</a> I loved this store and came to it every once in awhile, but every time I went, I noticed that barely anyone went there, even the owner would show up sometimes and be the cashier! And now after financial struggles, they are permanantly closed. I think this was caused by springfield's population issues.",
    "An example elsewhere of a solution to a similar problem working is from <a id = 'LinkedText' href='https://www.urban.org/stories/creating-lasting-change-through-community-leadership'>Camden, New Jersey</a> where the public image was that the area was hopeless, stuck in a cycle of poverty. You can Read more about it from the link"
    ,"I created this website within a day and created a plan from 3 doccuments, I was able to use my interest in javascript, and my need to finish this project for a grade to keep myself going"
    ,"To help spread awareness of this problem: <a id = 'DonateSite' href = 'Funding.html'>Site</a> ",

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
