import confetti from 'canvas-confetti';

interface ConfettiOptions {
  starCount?: number;
  hasBadge?: boolean;
  isPerfect?: boolean;
  origin?: { x: number; y: number };
}

/**
 * Triggers a multi-stage celebratory particle confetti explosion when completing a round successfully.
 * Designed with early-childhood developmental excitement: colorful bursts, angled dual cannons,
 * and a gentle floating star shimmer rain.
 */
export function triggerRoundSuccessConfetti({
  starCount = 3,
  hasBadge = false,
  isPerfect = false,
  origin = { x: 0.5, y: 0.65 },
}: ConfettiOptions = {}) {
  try {
    // Stage 1: Explosive center celebration burst with vibrant rainbow and gold
    confetti({
      particleCount: isPerfect ? 130 : starCount === 3 ? 100 : 70,
      spread: isPerfect ? 115 : 95,
      startVelocity: 42,
      origin,
      colors: ['#F59E0B', '#10B981', '#3B82F6', '#EC4899', '#8B5CF6', '#F43F5E', '#FDE047', '#06B6D4'],
      shapes: ['circle', 'square', 'star'],
      scalar: 1.15,
      disableForReducedMotion: true,
      zIndex: 9999,
    });

    // Stage 2: Dual angled side cannons shooting inwards and upwards (at 220ms)
    setTimeout(() => {
      try {
        // Left cannon shooting up and right across the screen
        confetti({
          particleCount: isPerfect ? 80 : 55,
          angle: 60,
          spread: 70,
          startVelocity: 52,
          origin: { x: 0.04, y: 0.8 },
          colors: ['#10B981', '#3B82F6', '#F59E0B', '#8B5CF6', '#FBBF24', '#06B6D4'],
          shapes: ['circle', 'square'],
          disableForReducedMotion: true,
          zIndex: 9999,
        });

        // Right cannon shooting up and left across the screen
        confetti({
          particleCount: isPerfect ? 80 : 55,
          angle: 120,
          spread: 70,
          startVelocity: 52,
          origin: { x: 0.96, y: 0.8 },
          colors: ['#EC4899', '#F59E0B', '#06B6D4', '#84CC16', '#F43F5E', '#FBBF24'],
          shapes: ['circle', 'square'],
          disableForReducedMotion: true,
          zIndex: 9999,
        });
      } catch {
        // Graceful fallback
      }
    }, 220);

    // Stage 3: Grand finale golden star & shimmer rain cascading downwards (at 520ms)
    setTimeout(() => {
      try {
        confetti({
          particleCount: isPerfect ? 95 : 70,
          spread: 130,
          startVelocity: 28,
          origin: { x: 0.5, y: 0.28 },
          ticks: 300,
          gravity: 0.65,
          scalar: 1.25,
          shapes: ['star', 'circle'],
          colors: ['#FFD700', '#F59E0B', '#FFA500', '#FFFBEB', '#F43F5E', '#38BDF8', '#FDE047'],
          disableForReducedMotion: true,
          zIndex: 9999,
        });
      } catch {
        // Graceful fallback
      }
    }, 520);

    // Stage 4: Extra micro-pop fountains for 3-star, perfect score, or badge earned (at 880ms)
    if (isPerfect || starCount === 3 || hasBadge) {
      setTimeout(() => {
        try {
          confetti({
            particleCount: 45,
            spread: 80,
            origin: { x: 0.25, y: 0.5 },
            colors: ['#FFD700', '#F43F5E', '#3B82F6', '#10B981'],
            shapes: ['star', 'circle'],
            scalar: 1.1,
            disableForReducedMotion: true,
            zIndex: 9999,
          });
          confetti({
            particleCount: 45,
            spread: 80,
            origin: { x: 0.75, y: 0.5 },
            colors: ['#FFD700', '#8B5CF6', '#EC4899', '#F59E0B'],
            shapes: ['star', 'circle'],
            scalar: 1.1,
            disableForReducedMotion: true,
            zIndex: 9999,
          });
        } catch {
          // Graceful fallback
        }
      }, 880);
    }
  } catch {
    // Graceful fallback if canvas is not supported
  }
}

/**
 * Triggers a dedicated golden badge celebration burst when an achievement badge is earned.
 */
export function triggerBadgeUnlockedConfetti() {
  try {
    confetti({
      particleCount: 120,
      spread: 100,
      startVelocity: 45,
      origin: { x: 0.5, y: 0.5 },
      colors: ['#FFD700', '#F59E0B', '#D97706', '#FDE68A', '#F43F5E', '#8B5CF6'],
      shapes: ['star', 'circle'],
      scalar: 1.3,
      ticks: 240,
      disableForReducedMotion: true,
      zIndex: 9999,
    });

    setTimeout(() => {
      try {
        confetti({
          particleCount: 70,
          spread: 140,
          origin: { x: 0.5, y: 0.35 },
          colors: ['#FFD700', '#FBBF24', '#38BDF8', '#A78BFA', '#FFFBEB'],
          ticks: 200,
          gravity: 0.6,
          scalar: 1.1,
          shapes: ['star'],
          disableForReducedMotion: true,
          zIndex: 9999,
        });
      } catch {
        // Graceful fallback
      }
    }, 280);
  } catch {
    // Graceful fallback
  }
}

/**
 * Interactive button click celebration (e.g. clicking replay confetti or star counter)
 */
export function triggerInteractiveConfetti(x = 0.5, y = 0.6) {
  try {
    confetti({
      particleCount: 85,
      spread: 90,
      origin: { x, y },
      colors: ['#F59E0B', '#10B981', '#3B82F6', '#EC4899', '#8B5CF6', '#F43F5E'],
      shapes: ['circle', 'square', 'star'],
      scalar: 1.15,
      disableForReducedMotion: true,
      zIndex: 9999,
    });

    setTimeout(() => {
      try {
        confetti({
          particleCount: 45,
          angle: 65,
          spread: 60,
          origin: { x: Math.max(0.05, x - 0.3), y: Math.min(0.85, y + 0.1) },
          colors: ['#38BDF8', '#34D399', '#FBBF24'],
          shapes: ['circle'],
          disableForReducedMotion: true,
          zIndex: 9999,
        });
        confetti({
          particleCount: 45,
          angle: 115,
          spread: 60,
          origin: { x: Math.min(0.95, x + 0.3), y: Math.min(0.85, y + 0.1) },
          colors: ['#F472B6', '#FBBF24', '#A78BFA'],
          shapes: ['star'],
          disableForReducedMotion: true,
          zIndex: 9999,
        });
      } catch {
        // Graceful fallback
      }
    }, 180);
  } catch {
    // Graceful fallback
  }
}
