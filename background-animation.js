// Premium feminine pink-red soft floating blurred circles background animation
(() => {
    const container = document.getElementById('background-container');
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    class Circle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.radius = 80 + Math.random() * 180;
            this.speedX = 0.02 + Math.random() * 0.1;
            this.speedY = 0.01 + Math.random() * 0.06;
            this.dirX = Math.random() < 0.5 ? -1 : 1;
            this.dirY = Math.random() < 0.5 ? -1 : 1;
            // Color gradient stops for pink-red with subtle transparency
            this.colorStops = [
                { offset: 0, color: 'rgba(255, 76, 114, 0.45)' },      // strong pink
                { offset: 0.4, color: 'rgba(255, 137, 172, 0.3)' },    // softer pink
                { offset: 1, color: 'rgba(42, 20, 41, 0)' }            // transparent dark bg
            ];
        }

        draw() {
            const gradient = ctx.createRadialGradient(this.x, this.y, this.radius * 0.2, this.x, this.y, this.radius);
            this.colorStops.forEach(stop => gradient.addColorStop(stop.offset, stop.color));

            ctx.beginPath();
            ctx.fillStyle = gradient;
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }

        update() {
            this.x += this.speedX * this.dirX;
            this.y += this.speedY * this.dirY;

            if (this.x - this.radius > width) this.x = -this.radius;
            else if (this.x + this.radius < 0) this.x = width + this.radius;

            if (this.y - this.radius > height) this.y = -this.radius;
            else if (this.y + this.radius < 0) this.y = height + this.radius;
        }
    }

    const circles = [];
    const count = 12;

    for (let i = 0; i < count; i++) {
        circles.push(new Circle());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        circles.forEach(circle => {
            circle.update();
            circle.draw();
        });

        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
})();
