/**
 * Unit Tests: Lightbox Image Viewer
 *
 * Tests for the vanilla TypeScript lightbox implementation
 * Following TDD approach (RED → GREEN)
 *
 * Coverage:
 * - State management
 * - Navigation (next/prev)
 * - Keyboard controls
 * - Focus management
 * - Accessibility
 */

import { describe, it, expect, beforeEach } from 'vitest';

// Import lightbox functions (will be implemented)
import {
  type LightboxState,
  type LightboxImage,
  createLightboxState,
  openLightbox,
  closeLightbox,
  nextImage,
  prevImage,
  goToImage,
  getCurrentImage,
  canNavigateNext,
  canNavigatePrev,
} from '../../src/scripts/lightbox';

describe('Lightbox - State Management', () => {
  let state: LightboxState;
  const mockImages: LightboxImage[] = [
    { src: '/image1.jpg', alt: 'Image 1', caption: 'First image' },
    { src: '/image2.jpg', alt: 'Image 2', caption: 'Second image' },
    { src: '/image3.jpg', alt: 'Image 3' },
  ];

  beforeEach(() => {
    state = createLightboxState(mockImages);
  });

  it('T109: should create initial state with closed lightbox', () => {
    expect(state.isOpen).toBe(false);
    expect(state.currentIndex).toBe(0);
    expect(state.images).toEqual(mockImages);
  });

  it('T110: should open lightbox and set to first image by default', () => {
    const newState = openLightbox(state);

    expect(newState.isOpen).toBe(true);
    expect(newState.currentIndex).toBe(0);
  });

  it('T111: should open lightbox at specific index', () => {
    const newState = openLightbox(state, 1);

    expect(newState.isOpen).toBe(true);
    expect(newState.currentIndex).toBe(1);
  });

  it('T112: should close lightbox and preserve current index', () => {
    const openedState = openLightbox(state, 2);
    const closedState = closeLightbox(openedState);

    expect(closedState.isOpen).toBe(false);
    expect(closedState.currentIndex).toBe(2); // Preserve index
  });

  it('T113: should get current image from state', () => {
    const openedState = openLightbox(state, 1);
    const currentImage = getCurrentImage(openedState);

    expect(currentImage).toEqual(mockImages[1]);
  });

  it('T114: should return undefined when getting current image from empty state', () => {
    const emptyState = createLightboxState([]);
    const currentImage = getCurrentImage(emptyState);

    expect(currentImage).toBeUndefined();
  });
});

describe('Lightbox - Navigation', () => {
  let state: LightboxState;
  const mockImages: LightboxImage[] = [
    { src: '/image1.jpg', alt: 'Image 1' },
    { src: '/image2.jpg', alt: 'Image 2' },
    { src: '/image3.jpg', alt: 'Image 3' },
  ];

  beforeEach(() => {
    state = createLightboxState(mockImages);
    state = openLightbox(state, 0);
  });

  it('T115: should navigate to next image', () => {
    const newState = nextImage(state);

    expect(newState.currentIndex).toBe(1);
    expect(newState.isOpen).toBe(true);
  });

  it('T116: should navigate to previous image', () => {
    state = goToImage(state, 2); // Start at third image
    const newState = prevImage(state);

    expect(newState.currentIndex).toBe(1);
  });

  it('T117: should loop to first image when navigating next from last', () => {
    state = goToImage(state, 2); // Last image
    const newState = nextImage(state);

    expect(newState.currentIndex).toBe(0); // Loop to first
  });

  it('T118: should loop to last image when navigating prev from first', () => {
    state = goToImage(state, 0); // First image
    const newState = prevImage(state);

    expect(newState.currentIndex).toBe(2); // Loop to last
  });

  it('T119: should go directly to specific image index', () => {
    const newState = goToImage(state, 1);

    expect(newState.currentIndex).toBe(1);
  });

  it('T120: should clamp index when going to invalid image', () => {
    const newState = goToImage(state, 99);

    expect(newState.currentIndex).toBe(2); // Clamp to last valid index
  });

  it('T121: should handle negative index when going to image', () => {
    const newState = goToImage(state, -1);

    expect(newState.currentIndex).toBe(0); // Clamp to first index
  });

  it('T122: canNavigateNext should return true when not at last image', () => {
    state = goToImage(state, 0);
    expect(canNavigateNext(state)).toBe(true);

    state = goToImage(state, 1);
    expect(canNavigateNext(state)).toBe(true);
  });

  it('T123: canNavigateNext should return true even at last image (loops)', () => {
    state = goToImage(state, 2);
    expect(canNavigateNext(state)).toBe(true); // Can loop to first
  });

  it('T124: canNavigatePrev should return true when not at first image', () => {
    state = goToImage(state, 1);
    expect(canNavigatePrev(state)).toBe(true);

    state = goToImage(state, 2);
    expect(canNavigatePrev(state)).toBe(true);
  });

  it('T125: canNavigatePrev should return true even at first image (loops)', () => {
    state = goToImage(state, 0);
    expect(canNavigatePrev(state)).toBe(true); // Can loop to last
  });
});

describe('Lightbox - Edge Cases', () => {
  it('T126: should handle single image gallery', () => {
    const singleImage: LightboxImage[] = [
      { src: '/image1.jpg', alt: 'Only image' },
    ];
    let state = createLightboxState(singleImage);
    state = openLightbox(state, 0);

    // Next/prev should stay on same image
    const nextState = nextImage(state);
    expect(nextState.currentIndex).toBe(0);

    const prevState = prevImage(state);
    expect(prevState.currentIndex).toBe(0);
  });

  it('T127: should handle empty image array', () => {
    const state = createLightboxState([]);

    expect(state.images).toEqual([]);
    expect(state.currentIndex).toBe(0);
    expect(getCurrentImage(state)).toBeUndefined();
  });

  it('T128: should handle image without caption', () => {
    const images: LightboxImage[] = [
      { src: '/image1.jpg', alt: 'No caption image' },
    ];
    const state = createLightboxState(images);
    const image = getCurrentImage(state);

    expect(image?.caption).toBeUndefined();
  });

  it('T129: should preserve state immutability', () => {
    const images: LightboxImage[] = [
      { src: '/image1.jpg', alt: 'Image 1' },
      { src: '/image2.jpg', alt: 'Image 2' },
    ];
    const state1 = createLightboxState(images);
    const state2 = openLightbox(state1, 1);
    const state3 = nextImage(state2);

    // Original states should remain unchanged
    expect(state1.isOpen).toBe(false);
    expect(state1.currentIndex).toBe(0);

    expect(state2.isOpen).toBe(true);
    expect(state2.currentIndex).toBe(1);

    expect(state3.isOpen).toBe(true);
    expect(state3.currentIndex).toBe(0); // Wrapped to first
  });
});

describe('Lightbox - Accessibility', () => {
  it('T130: should include alt text in image data', () => {
    const images: LightboxImage[] = [
      { src: '/pottery.jpg', alt: 'Earth Vessel - handcrafted pottery' },
    ];
    const state = createLightboxState(images);
    const image = getCurrentImage(state);

    expect(image?.alt).toBe('Earth Vessel - handcrafted pottery');
  });

  it('T131: should support optional captions for screen readers', () => {
    const images: LightboxImage[] = [
      {
        src: '/pottery.jpg',
        alt: 'Earth Vessel',
        caption: 'Hand-built using coil technique, reduction fired to cone 6',
      },
    ];
    const state = createLightboxState(images);
    const image = getCurrentImage(state);

    expect(image?.caption).toBeDefined();
    expect(image?.caption).toContain('Hand-built');
  });

  it('T132: should maintain image source integrity', () => {
    const images: LightboxImage[] = [
      { src: './images/piece-01/detail-1.jpg', alt: 'Detail shot' },
    ];
    const state = createLightboxState(images);
    const image = getCurrentImage(state);

    expect(image?.src).toBe('./images/piece-01/detail-1.jpg');
  });
});
