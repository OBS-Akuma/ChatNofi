// Smoother Ctrl + Scroll Zoom - Min 100% only
(function() {
    let ctrlPressed = false;
    let zoom = 1;
    const maxZoom = 3;
    const minZoom = 1;  // Locked at 100% minimum
    const zoomStep = 0.05;  // Smoother zoom increments
    
    const applyZoom = () => {
        document.documentElement.style.transform = `scale(${zoom})`;
        document.documentElement.style.transformOrigin = 'top left';
        document.documentElement.style.width = `${100 / zoom}%`;
        document.documentElement.style.transition = 'transform 0.05s ease-out';
    };
    
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey) ctrlPressed = true;
    });
    
    document.addEventListener('keyup', (e) => {
        if (e.key === 'Control') ctrlPressed = false;
    });
    
    window.addEventListener('wheel', (e) => {
        if (ctrlPressed) {
            e.preventDefault();
            
            let newZoom = zoom;
            
            if (e.deltaY < 0) {
                // Zoom in
                newZoom = Math.min(maxZoom, zoom + zoomStep);
                if (newZoom !== zoom) {
                    zoom = newZoom;
                    console.log(`🔍 Zoom: ${Math.round(zoom * 100)}%`);
                }
            } else if (e.deltaY > 0) {
                // Zoom out - but not past 100%
                if (zoom > minZoom) {
                    newZoom = Math.max(minZoom, zoom - zoomStep);
                    if (newZoom !== zoom) {
                        zoom = newZoom;
                        console.log(`🔍 Zoom: ${Math.round(zoom * 100)}%`);
                    }
                } else {
                    console.log(`🚫 At 100% - Cannot zoom out further`);
                }
            }
            
            applyZoom();
        }
    }, { passive: false });
    
    // Ctrl+0 reset
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === '0') {
            e.preventDefault();
            zoom = 1;
            applyZoom();
            console.log(`🔄 Zoom reset to 100%`);
        }
    });
    
    console.log('%c✅ Ctrl+Scroll Zoom ACTIVE - Min zoom: 100%', 'color: green; font-size: 14px');
    console.log('   • Ctrl + Scroll UP = Zoom IN');
    console.log('   • Ctrl + Scroll DOWN = Zoom OUT (stops at 100% 👈)');
    console.log('   • Ctrl+0 = Reset');
})();
