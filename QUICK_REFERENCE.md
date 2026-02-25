# Quick Reference Guide - Modern Dark Theme

## 🎨 Color Quick Reference

### Use These Colors For...

| Purpose | Color | Hex | Variable |
|---------|-------|-----|----------|
| Main backgrounds | Dark Navy | #0f1419 | --bg-primary |
| Cards & sections | Dark Blue | #1a1f2e | --bg-secondary |
| Hover states | Lighter Blue | #252d3d | --bg-tertiary |
| Primary text | Light Gray | #e8eaed | --text-primary |
| Secondary text | Medium Gray | #a0a7b5 | --text-secondary |
| Muted text | Dark Gray | #7a8192 | --text-tertiary |
| Primary buttons/links | Bright Blue | #5b7cfa | --accent-primary |
| Secondary accents | Purple | #7c3aed | --accent-secondary |
| Tertiary accents | Pink | #ec4899 | --accent-tertiary |
| Borders (normal) | Subtle White | rgba(255,255,255,0.08) | --border-color |
| Borders (hover) | Blue tint | rgba(91,124,250,0.3) | --border-color-hover |

---

## 🎯 Component Patterns

### Button Pattern
```jsx
// Primary button (full gradient)
<button className="btn-primary">Submit</button>

// Secondary button (outlined)
<button className="btn-secondary">Cancel</button>
```

### Card Pattern
```jsx
<div className="card">
  <h3>Card Title</h3>
  <p>Card content...</p>
</div>
```

### Form Pattern
```jsx
<div className="form-group">
  <label className="form-label">Label *</label>
  <input className="form-control" />
</div>
```

### Grid Pattern
```jsx
<div className="grid grid-3">
  {/* Items auto-wrap in 3-column grid */}
</div>
```

---

## 🔄 Animation Reference

### Available Animations

| Name | Duration | Usage |
|------|----------|-------|
| fadeIn | 0.3s | Elements fading in |
| slideInUp | 0.4-0.5s | Elements sliding from bottom |
| glow | Continuous | Hover glow effects |

### How to Use
```css
/* Apply fade-in to element */
.my-element {
  animation: fadeIn 0.3s ease-out;
}

/* Apply slide-in */
.another-element {
  animation: slideInUp 0.5s ease-out;
}
```

---

## 📐 Spacing Scale

Use these consistent spacings throughout:

```
2px   - Minimal space
4px   - Very tight
8px   - Tight
12px  - Compact
16px  - Standard
20px  - Comfortable
24px  - Spacious
32px  - Very spacious
40px  - Large gap
```

---

## 🔤 Typography Guidelines

### Text Colors
- **Headings**: Use `--text-primary` (#e8eaed)
- **Body text**: Use `--text-secondary` (#a0a7b5)
- **Helper text**: Use `--text-tertiary` (#7a8192)

### Font Sizes
```
h1: 3.2rem  (32px)
h2: 2.2rem  (22px)
h3: 1.8rem  (18px)
h4: 1.4rem  (14px)
h5: 1.1rem  (11px)
body: 1rem  (10px)
small: 0.9rem (9px)
```

### Font Weights
- **Bold**: 700 (headings)
- **Semi-bold**: 600 (subheadings)
- **Regular**: 400 (body, default)

---

## 🌊 Shadow Reference

### Use Shadows For...

| Shadow | Size | Usage |
|--------|------|-------|
| --shadow-sm | Small | Subtle elevation |
| --shadow-md | Medium | Card hover/focus |
| --shadow-lg | Large | Modal/important elements |
| --shadow-glow | Glow | Button/accent hover |

### Example
```css
.card {
  box-shadow: var(--shadow-sm);
}

.card:hover {
  box-shadow: var(--shadow-lg);
}
```

---

## ⚡ Hover Effect Pattern

### Standard Hover Pattern
```css
.element {
  transition: all 0.2s ease;  /* Always include transition */
}

.element:hover {
  transform: translateY(-2px);  /* Lift up */
  box-shadow: var(--shadow-md);  /* Add shadow */
  border-color: var(--border-color-hover);  /* Highlight border */
}
```

---

## 📱 Responsive Design Tips

### Media Query Breakpoints
```css
/* Tablet and below */
@media (max-width: 768px) {
  /* Single column layouts */
  /* Larger touch targets */
  /* Simplified spacing */
}

/* Mobile specific */
@media (max-width: 600px) {
  /* Extra large fonts for readability */
  /* Stacked navigation */
  /* No multi-column grids */
}
```

---

## 🔍 Common Patterns

### Centered Container
```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
```

### Page with Navbar Offset
```css
.page {
  padding-top: 90px;  /* Navbar height + margin */
  min-height: 100vh;
}
```

### Card Grid
```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}
```

### Gradient Text
```css
h1 {
  background: var(--gradient-primary);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

---

## ✅ Checklist for New Components

When creating new components:

- [ ] Use CSS variables for colors (not hardcoded hex)
- [ ] Include smooth transitions (0.2-0.3s)
- [ ] Add hover states for interactivity
- [ ] Test on mobile (max-width: 768px)
- [ ] Use semantic HTML (button, form, input, etc)
- [ ] Follow the spacing scale (8, 12, 16, 24, 32px)
- [ ] Add animation on load (fadeIn, slideInUp)
- [ ] Ensure 0.3s transitions for all effects
- [ ] Test with dark background
- [ ] Add focus states for accessibility
- [ ] Check contrast (WCAG AA minimum)

---

## 🚫 What NOT to Do

❌ Don't hardcode colors - use CSS variables  
❌ Don't use instant transitions (0s) - minimum 0.2s  
❌ Don't forget hover states on interactive elements  
❌ Don't create custom colors inconsistently  
❌ Don't ignore mobile responsiveness  
❌ Don't use light text on light backgrounds  
❌ Don't use heavy shadows (creates visual clutter)  
❌ Don't mix animation styles (keep 0.2-0.3s consistent)

---

## 🎓 Learning Resources

### CSS Variables (Custom Properties)
```css
/* Define */
:root {
  --my-color: #5b7cfa;
}

/* Use */
.element {
  color: var(--my-color);
}

/* With fallback */
color: var(--my-color, #5b7cfa);
```

### CSS Grid
```css
/* Auto-fit columns */
.grid {
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}
```

### Focus States (Accessibility)
```css
input:focus {
  outline: none;
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 3px rgba(91, 124, 250, 0.1);
}
```

---

## 💡 Tips & Tricks

1. **Use rgba() for transparent colors**: Better for dark themes
2. **Limit animations**: 2-3 per page maximum for performance
3. **Test on slow 3G**: Ensure smooth animations even on slow devices
4. **Use flex for alignment**: Easier than margins/padding
5. **CSS Grid for layouts**: More flexible than flex columns
6. **Custom scrollbars**: Match theme on dark background
7. **Gradients create depth**: Use them strategically
8. **Shadows add elevation**: Multiple shadows can stack

---

## 📞 Quick Fixes

### Content too cluttered?
- Increase spacing (gap, padding)
- Reduce font sizes
- Use simpler layouts

### Animations feel slow?
- Reduce duration (0.2s instead of 0.5s)
- Use easing functions (ease-out)

### Colors not popping?
- Use brighter accent colors
- Add glow effects
- Use gradients

### Mobile looks broken?
- Check media query (768px breakpoint)
- Test actual mobile device
- Use max-width containers

---

**Quick Reference v1.0**
Last updated: February 25, 2026
