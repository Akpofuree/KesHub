import CircuitBreaker from "opossum";

const breakerOptions = {
  timeout: 5000,
  errorThresholdPercentage: 50,
  resetTimeout: 30000,
};

export function createBreaker(action, options = {}) {
  return new CircuitBreaker(action, { ...breakerOptions, ...options });
}
