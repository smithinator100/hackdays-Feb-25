document.addEventListener('DOMContentLoaded', () => {
    // Initialize all blocks
    document.querySelectorAll('.block').forEach((block, index) => {
        const shieldElement = block.querySelector('.shield');
        const shieldSpinElement = block.querySelector('.shield-spin');
        const rippleContainer = block.querySelector('.ripple-animation');
        const starburstContainer = block.querySelector('.starburst-animation');
        const linkElement = block.querySelector('.link');
        const underlineContainer = block.querySelector('.underline-animation');
        let isHovered = false;

        // Initialize underline animation
        let underlineAnimation;
        if (underlineContainer) {
            underlineAnimation = lottie.loadAnimation({
                container: underlineContainer,
                renderer: 'svg',
                loop: false,
                autoplay: false,
                path: 'lottie/underline.json'
            });
        }

        // Initialize Shield animation
        let shieldAnimation;
        if (shieldElement) {
            shieldAnimation = lottie.loadAnimation({
                container: shieldElement,
                renderer: 'svg',
                loop: false,
                autoplay: false,
                path: 'lottie/shield.json'
            });
        }

        // Initialize Shield Spin animation
        let shieldSpinAnimation;
        if (shieldSpinElement) {
            shieldSpinAnimation = lottie.loadAnimation({
                container: shieldSpinElement,
                renderer: 'svg',
                loop: false,
                autoplay: false,
                path: 'lottie/spin.json'
            });
        }

        // Initialize animations only if their containers exist
        let rippleAnimation;
        if (rippleContainer) {
            rippleAnimation = lottie.loadAnimation({
                container: rippleContainer,
                renderer: 'svg',
                loop: false,
                autoplay: false,
                path: 'lottie/ripple.json'
            });
        }

        let starburstAnimation;
        if (starburstContainer) {
            starburstAnimation = lottie.loadAnimation({
                container: starburstContainer,
                renderer: 'svg',
                loop: false,
                autoplay: false,
                path: 'lottie/starburst.json'
            });
        }

        linkElement?.addEventListener('mouseenter', () => {
            isHovered = true;
            
            // Play appropriate shield animation
            if (shieldAnimation) {
                shieldAnimation.setSpeed(1);
                shieldAnimation.play();
                shieldAnimation.setDirection(1);
            }
            if (shieldSpinAnimation) {
                shieldSpinAnimation.setSpeed(1);
                shieldSpinAnimation.play();
                shieldSpinAnimation.setDirection(1);
            }

            // Play starburst if it exists, otherwise play ripple if it exists
            if (starburstContainer && !starburstContainer.classList.contains('hidden')) {
                starburstAnimation.stop();
                starburstAnimation.setSpeed(1);
                starburstAnimation.play();
            } else if (rippleContainer && !rippleContainer.classList.contains('hidden')) {
                rippleAnimation.stop();
                rippleAnimation.setSpeed(1);
                rippleAnimation.play();
            }

            // Play underline animation
            if (underlineAnimation) {
                underlineAnimation.setDirection(1);
                underlineAnimation.play();
                underlineAnimation.setSpeed(1.5);
            }
        });

        linkElement?.addEventListener('mouseleave', () => {
            isHovered = false;
            
            // Reverse appropriate shield animation
            if (shieldAnimation) {
                shieldAnimation.setDirection(-1);
                shieldAnimation.setSpeed(1.6);
                shieldAnimation.play();
            }
            if (shieldSpinAnimation) {
                shieldSpinAnimation.setDirection(-1);
                shieldSpinAnimation.setSpeed(1.6);
                shieldSpinAnimation.play();
            }

            // Reverse underline animation
            if (underlineAnimation) {
                underlineAnimation.setDirection(-1);
                underlineAnimation.play();
                underlineAnimation.setSpeed(2);
            }

            if (rippleAnimation) rippleAnimation.stop();
            if (starburstAnimation) starburstAnimation.stop();
        });

        // Add delay between ripple loops
        if (rippleAnimation) {
            rippleAnimation.addEventListener('complete', () => {
                if (isHovered) {
                    setTimeout(() => {
                        if (isHovered) {  // Check if still hovering after delay
                            rippleAnimation.goToAndPlay(0);
                        }
                    }, 500);  // 500ms delay between loops
                }
            });
        }

        // Add delay between starburst loops
        if (starburstAnimation) {
            starburstAnimation.addEventListener('complete', () => {
                if (isHovered) {
                    setTimeout(() => {
                        if (isHovered) {  // Check if still hovering after delay
                            starburstAnimation.goToAndPlay(0);
                        }
                    }, 500);  // 500ms delay between loops
                }
            });
        }
    });

}); 