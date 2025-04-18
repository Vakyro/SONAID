export function reportPerformance(metricName: string, value: number) {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[Performance] ${metricName}: ${value.toFixed(2)}ms`)
  }
  
  // In production, you could send this to an analytics service
}

export function measurePageLoad() {
  if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
        reportPerformance('Total Page Load', navigation.loadEventEnd)
        reportPerformance('DOM Content Loaded', navigation.domContentLoadedEventEnd)
        reportPerformance('First Paint', performance.getEntriesByName('first-paint')[0]?.startTime || 0)
      }, 0)
    })
  }
}