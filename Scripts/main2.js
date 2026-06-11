import * as THREE from "https://unpkg.com/three@0.179.1/build/three.module.js";

let spmulti = 1.2
export let spdirection = 0
spmulti = 1.3
            setTimeout(() => {
                spmulti = 0.1
            }, 6000);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.z = 50;

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0, 0);
document.body.appendChild(renderer.domElement);

const shootingStars = [];

/* -----------------------
   GLOW TEXTURE (circle)
------------------------ */
function createGlowTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;

    const ctx = canvas.getContext("2d");

    const gradient = ctx.createRadialGradient(
        32, 32, 0,
        32, 32, 32
    );

    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.2, "rgba(255,255,255,0.6)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);

    return new THREE.CanvasTexture(canvas);
}

const glowTexture = createGlowTexture();

/* -----------------------
   CREATE SHOOTING STARS
------------------------ */
for (let i = 0; i < 40; i++) {

    // Core star
    const star = new THREE.Mesh(
        new THREE.SphereGeometry(0.15, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
    );

    // Glow halo
    const glow = new THREE.Sprite(
        new THREE.SpriteMaterial({
            map: glowTexture,
            color: 0xffffff,
            transparent: true,
            blending: THREE.AdditiveBlending
        })
    );

    glow.scale.set(3, 3, 1);
    star.add(glow);

    star.position.set(
        (Math.random() - 0.5) * 200,
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 50
    );

    scene.add(star);

    shootingStars.push({
        star,
        baseSpeed: Math.random(),
        offset: 0.5
    });
}

/* -----------------------
   ANIMATION
------------------------ */
function animate() {
    requestAnimationFrame(animate);

    const direction = spdirection === 1 ? -1 : 1;

    shootingStars.forEach(obj => {
        obj.star.position.x += (obj.baseSpeed * spmulti + obj.offset) * direction;
        obj.star.position.y -= obj.baseSpeed * spmulti * 0;

        // Respawn on the side opposite the current direction
        if (direction > 0 && obj.star.position.x > 120) {
            obj.star.position.x = -120;
            obj.star.position.y = (Math.random() - 0.5) * 100;
        } else if (direction < 0 && obj.star.position.x < -120) {
            obj.star.position.x = 120;
            obj.star.position.y = (Math.random() - 0.5) * 100;
        }
    });

    renderer.render(scene, camera);
}

animate();

/* -----------------------
   RESIZE
------------------------ */
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
});

console.log("Start");

let keybindenabled = false;
document.addEventListener('keydown', function(event) {
    if (!keybindenabled) return;

    if (event.key === '.') {
        spdirection = 0;
        console.log('spdirection set to 0');
    } else if (event.key === ',') {
        spdirection = 1;
        console.log('spdirection set to 1');
    }
});
setTimeout(() => {
    keybindenabled = true;
    console.log('key binding enabled');
}, 6000);