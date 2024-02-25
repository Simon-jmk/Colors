class Color {
    constructor(r, g, b) {
        this.r = Math.min(255, Math.max(0, r));
        this.g = Math.min(255, Math.max(0, g));
        this.b = Math.min(255, Math.max(0, b));
    }

    rgb() {
        return `rgb(${this.r},${this.g},${this.b})`;
    }

    hex() {
        return `#${[this.r, this.g, this.b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
    }

    rgba(alpha = 1) {
        return `rgba(${this.r},${this.g},${this.b},${alpha})`;
    }

    hsl() {
        let [r, g, b] = [this.r, this.g, this.b].map(v => v / 255), max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min, l = (max + min) / 2;
        let h = d === 0 ? 0 : Math.round(((max === r ? (g - b) / d : max === g ? (b - r) / d + 2 : (r - g) / d + 4) / 6) * 360) % 360;
        return `hsl(${h < 0 ? 360 + h : h}, ${Math.round(d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1)) * 100)}%, ${Math.round(l * 100)}%)`;
    }
    
    hsv() {
        let [r, g, b] = [this.r, this.g, this.b].map(v => v / 255), max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
        let h = max === min ? 0 : max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
        return `hsv(${Math.round(h * 60) % 360}, ${Math.round(max === 0 ? 0 : d / max * 100)}%, ${Math.round(max * 100)}%)`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const updateColor = () => {
        const r = parseInt(document.getElementById('r').value, 10);
        const g = parseInt(document.getElementById('g').value, 10);
        const b = parseInt(document.getElementById('b').value, 10);

        const color = new Color(r, g, b);

        document.getElementById('rgb').textContent = color.rgb();
        document.getElementById('hex').textContent = color.hex();
        document.getElementById('rgba').textContent = color.rgba(); // alpha = 1 by default
        document.getElementById('hsl').textContent = color.hsl();
        document.getElementById('hsv').textContent = color.hsv();

        document.body.style.backgroundColor = color.rgb(); 
    };
    
    updateColor();
    document.getElementById('r').addEventListener('input', updateColor);
    document.getElementById('g').addEventListener('input', updateColor);
    document.getElementById('b').addEventListener('input', updateColor);
});
