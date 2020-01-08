export default {
  mttRequestCount(state, done) {
    const { requestCount } = state;

    state.requestCount = done === 0 ? 0 : (done ? requestCount - 1 : requestCount + 1);
  }
};
