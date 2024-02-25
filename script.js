function Color(r, g, b) {
    this.r = Math.min(255, Math.max(0, r));
    this.g = Math.min(255, Math.max(0, g));
    this.b = Math.min(255, Math.max(0, b));
}

Color.prototype.rgb = function() {
    return `rgb(${this.r},${this.g},${this.b})`;
}

Color.prototype.hex = function() {
    return `hex(#${[this.r, this.g, this.b].map(x => x.toString(16).padStart(2, '0')).join('')})`;
}

Color.prototype.rgba = function(alpha) {
    return `rgba(${this.r},${this.g},${this.b},${alpha})`;
}

Color.prototype.hsl = function() {
    let [r, g, b] = [this.r, this.g, this.b].map(v => v / 255), max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min, l = (max + min) / 2;
    let h = d == 0 ? 0 : Math.round(((max == r ? (g - b) / d : max == g ? (b - r) / d + 2 : (r - g) / d + 4) / 6) * 360) % 360;
    return `hsl(${h}, ${Math.round(d == 0 ? 0 : d / (1 - Math.abs(2 * l - 1)) * 100)}%, ${Math.round(l * 100)}%)`;
};

Color.prototype.hsv = function() {
    let [r, g, b] = [this.r / 255, this.g / 255, this.b / 255], max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = max == min ? 0 : max == r ? (g - b) / (max - min) + (g < b ? 6 : 0) : max == g ? (b - r) / (max - min) + 2 : (r - g) / (max - min) + 4;
    return `hsv(${Math.round(h * 60) % 360}, ${Math.round(((max - min) / (max == 0 ? 1 : max)) * 100)}%, ${Math.round(max * 100)}%)`;
};

function updateColor() {
    let r = parseInt(document.getElementById('r').value);
    let g = parseInt(document.getElementById('g').value);
    let b = parseInt(document.getElementById('b').value);

    let color = new Color(r, g, b);

    document.getElementById('rgb').textContent = color.rgb();
    document.getElementById('hex').textContent = color.hex();
    document.getElementById('rgba').textContent = color.rgba(1); // alpha = 1
    document.getElementById('hsl').textContent = color.hsl();
    document.getElementById('hsv').textContent = color.hsv();

    document.body.style.backgroundColor = color.rgb(); 
}

window.onload = updateColor;
