'use strict';

class Complex {
  constructor(r, v) {
    this.r = r; // 实数
    this.v = v; // 虚数
  }
}

function add(a, b) {
  return new Complex(a.r + b.r, a.v + b.v);
}

function mul(a, b) {
  const r = a.r * b.r - a.v * b.v;
  const v = a.r * b.v + b.r * a.v;
  return new Complex(r, v);
}

var a = new Complex(3, 2);
var b = new Complex(1, -4);

var c = add(mul(a, a), b);
console.log(c);

var z = new Complex(0.6, -0.6);
var c = new Complex(-0.5, 0);

function divergent(z, c, count = 5) {
  var x = [];
  var y = [];
  for (var i = 0; i < count; i++) {
    z = add(mul(z, z), c);
    x.push(z.r);
    y.push(z.v);
  }

  var maxX = Math.max(...x);
  var minX = Math.min(...x);
  var maxY = Math.max(...y);
  var minY = Math.min(...y);
  return (maxX - minX) * (maxY - minY);
}

var result = divergent(new Complex(0, 0), new Complex(-0.5, 0));
console.log(result);
var result = divergent(new Complex(0.7, 0.7), new Complex(-0.5, 0));
console.log(result);
var result = divergent(new Complex(1.3, 0), new Complex(-0.5, 0));
console.log(result);
var result = divergent(new Complex(0.5, 0.3), new Complex(-0.5, 0));
console.log(result);
// astringent

function julia (c, step = 0.1, count) {
  var set = [];
  for (var y = 1.3; y >= -1.3; y = y - step) {
    var line = [];
    for (var x = -1.3; x <= 1.3; x = x + step) {
      var z = new Complex(x, y);
      line.push(divergent(z, c, count));
    }
    set.push(line);
  }
  return set;
}

// // out
// hsb.h = self.hue
// hsb.s = self.brightness / 10 + 0.65 * self.saturation
// hsb.b = 1 - self.brightness
// s.colorOut = hsb.toRGB().double3

// // in
// hsb.b = (1 - cos(hsb.b * .pi)) / 8  // not evil at all
// s.colorIn = hsb.toRGB().double3

function rgb2hsb(r, g, b) {
  // assert 0 <= r && r <= 255;
  // assert 0 <= g && g <= 255;
  // assert 0 <= b && b <= 255;
  var rgb = [r, g, b];
  rgb.sort(rgb);
  var max = rgb[2];
  var min = rgb[0];

  var hsbB = max / 255.0;
  var hsbS = max == 0 ? 0 : (max - min) / max;

  var hsbH = 0;
  if (max == r && g >= b) {
    hsbH = (g - b) * 60 / (max - min) + 0;
  } else if (max == r && g < b) {
    hsbH = (g - b) * 60 / (max - min) + 360;
  } else if (max == g) {
    hsbH = (b - r) * 60 / (max - min) + 120;
  } else if (max == b) {
    hsbH = (r - g) * 60 / (max - min) + 240;
  }

  return [hsbH, hsbS, hsbB];
}

function hsb2rgb(h, s, v) {
  // assert Float.compare(h, 0.0f) >= 0 && Float.compare(h, 360.0f) <= 0;
  // assert Float.compare(s, 0.0f) >= 0 && Float.compare(s, 1.0f) <= 0;
  // assert Float.compare(v, 0.0f) >= 0 && Float.compare(v, 1.0f) <= 0;

  var r = 0, g = 0, b = 0;
  var i = Math.floor((h / 60) % 6);
  var f = (h / 60) - i;
  var p = v * (1 - s);
  var q = v * (1 - f * s);
  var t = v * (1 - (1 - f) * s);
  switch (i) {
  case 0:
      r = v;
      g = t;
      b = p;
      break;
  case 1:
      r = q;
      g = v;
      b = p;
      break;
  case 2:
      r = p;
      g = v;
      b = t;
      break;
  case 3:
      r = p;
      g = q;
      b = v;
      break;
  case 4:
      r = t;
      g = p;
      b = v;
      break;
  case 5:
      r = v;
      g = p;
      b = q;
      break;
  default:
      break;
  }
  return [
    Math.floor(r * 255),
    Math.floor(g * 255),
    Math.floor(b * 255)
  ];
}
