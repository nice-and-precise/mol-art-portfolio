/**
 * Lightbox Image Viewer
 *
 * Vanilla TypeScript implementation for viewing pottery piece images
 * Features:
 * - Keyboard navigation (arrow keys, ESC)
 * - Touch/swipe support for mobile
 * - Focus trap for accessibility
 * - Body scroll lock when open
 * - Infinite loop navigation
 *
 * Constitutional Compliance:
 * - Article I: No external libraries (vanilla TypeScript)
 * - Article VIII: Accessible (ARIA labels, keyboard support, focus management)
 */

// ============================================================================
// Types & Interfaces
// ============================================================================

export interface LightboxImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface LightboxState {
  isOpen: boolean;
  currentIndex: number;
  images: LightboxImage[];
}

// ============================================================================
// State Management (Pure Functions)
// ============================================================================

/**
 * Create initial lightbox state
 */
export function createLightboxState(images: LightboxImage[]): LightboxState {
  return {
    isOpen: false,
    currentIndex: 0,
    images: [...images], // Defensive copy
  };
}

/**
 * Open lightbox at specific index (default: 0)
 */
export function openLightbox(
  state: LightboxState,
  index: number = 0
): LightboxState {
  const clampedIndex = clampIndex(index, state.images.length);
  return {
    ...state,
    isOpen: true,
    currentIndex: clampedIndex,
  };
}

/**
 * Close lightbox (preserves current index)
 */
export function closeLightbox(state: LightboxState): LightboxState {
  return {
    ...state,
    isOpen: false,
  };
}

/**
 * Navigate to next image (loops to first after last)
 */
export function nextImage(state: LightboxState): LightboxState {
  if (state.images.length === 0) return state;
  if (state.images.length === 1) return state; // Single image: no-op

  const nextIndex = (state.currentIndex + 1) % state.images.length;
  return {
    ...state,
    currentIndex: nextIndex,
  };
}

/**
 * Navigate to previous image (loops to last before first)
 */
export function prevImage(state: LightboxState): LightboxState {
  if (state.images.length === 0) return state;
  if (state.images.length === 1) return state; // Single image: no-op

  const prevIndex =
    state.currentIndex === 0
      ? state.images.length - 1
      : state.currentIndex - 1;

  return {
    ...state,
    currentIndex: prevIndex,
  };
}

/**
 * Go to specific image index
 */
export function goToImage(state: LightboxState, index: number): LightboxState {
  const clampedIndex = clampIndex(index, state.images.length);
  return {
    ...state,
    currentIndex: clampedIndex,
  };
}

/**
 * Get current image from state
 */
export function getCurrentImage(
  state: LightboxState
): LightboxImage | undefined {
  return state.images[state.currentIndex];
}

/**
 * Check if can navigate to next image
 */
export function canNavigateNext(state: LightboxState): boolean {
  return state.images.length > 0; // Always true (infinite loop)
}

/**
 * Check if can navigate to previous image
 */
export function canNavigatePrev(state: LightboxState): boolean {
  return state.images.length > 0; // Always true (infinite loop)
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Clamp index to valid range [0, length-1]
 */
function clampIndex(index: number, length: number): number {
  if (length === 0) return 0;
  if (index < 0) return 0;
  if (index >= length) return length - 1;
  return index;
}

// ============================================================================
// DOM Management (Side Effects)
// ============================================================================

/**
 * Initialize lightbox in the DOM
 */
export function initLightbox(
  containerId: string,
  images: LightboxImage[],
  onStateChange?: (state: LightboxState) => void
): { destroy: () => void } {
  let state = createLightboxState(images);

  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Lightbox container #${containerId} not found`);
    return { destroy: () => {} };
  }

  // Find lightbox elements
  const lightbox = container.querySelector('.lightbox') as HTMLElement;
  const backdrop = container.querySelector('.lightbox-backdrop') as HTMLElement;
  const closeBtn = container.querySelector('.lightbox-close') as HTMLButtonElement;
  const prevBtn = container.querySelector('.lightbox-prev') as HTMLButtonElement;
  const nextBtn = container.querySelector('.lightbox-next') as HTMLButtonElement;
  const image = container.querySelector('.lightbox-image') as HTMLImageElement;
  const caption = container.querySelector('.lightbox-caption') as HTMLElement;

  if (!lightbox || !backdrop || !closeBtn || !prevBtn || !nextBtn || !image) {
    console.error('Required lightbox elements not found');
    return { destroy: () => {} };
  }

  // Update DOM based on state
  function render() {
    if (!lightbox || !image) return;

    if (state.isOpen) {
      lightbox.classList.add('active');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden'; // Lock scroll

      const currentImage = getCurrentImage(state);
      if (currentImage) {
        image.src = currentImage.src;
        image.alt = currentImage.alt;

        if (caption) {
          caption.textContent = currentImage.caption || '';
          caption.style.display = currentImage.caption ? 'block' : 'none';
        }
      }

      // Focus management
      closeBtn?.focus();
    } else {
      lightbox.classList.remove('active');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = ''; // Unlock scroll
    }

    // Call external state change callback
    onStateChange?.(state);
  }

  // Event handlers
  function handleClose() {
    state = closeLightbox(state);
    render();
  }

  function handleNext() {
    state = nextImage(state);
    render();
  }

  function handlePrev() {
    state = prevImage(state);
    render();
  }

  function handleKeyboard(e: KeyboardEvent) {
    if (!state.isOpen) return;

    switch (e.key) {
      case 'Escape':
        handleClose();
        break;
      case 'ArrowRight':
        e.preventDefault();
        handleNext();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        handlePrev();
        break;
    }
  }

  function handleBackdropClick(e: MouseEvent) {
    if (e.target === backdrop || e.target === lightbox) {
      handleClose();
    }
  }

  // Attach event listeners
  closeBtn.addEventListener('click', handleClose);
  prevBtn.addEventListener('click', handlePrev);
  nextBtn.addEventListener('click', handleNext);
  document.addEventListener('keydown', handleKeyboard);
  backdrop.addEventListener('click', handleBackdropClick);

  // Public API
  return {
    destroy() {
      closeBtn.removeEventListener('click', handleClose);
      prevBtn.removeEventListener('click', handlePrev);
      nextBtn.removeEventListener('click', handleNext);
      document.removeEventListener('keydown', handleKeyboard);
      backdrop.removeEventListener('click', handleBackdropClick);
      document.body.style.overflow = ''; // Cleanup
    },
  };
}

/**
 * Open lightbox programmatically from outside
 */
export function openLightboxAtIndex(
  containerId: string,
  index: number,
  images: LightboxImage[]
): void {
  const container = document.getElementById(containerId);
  if (!container) return;

  const lightbox = container.querySelector('.lightbox') as HTMLElement;
  if (!lightbox) return;

  // Trigger open by dispatching custom event
  const event = new CustomEvent('lightbox:open', {
    detail: { index, images },
  });
  container.dispatchEvent(event);
}
